#!/usr/bin/env node

import 'babel-polyfill'
import config from './config'
import { Client } from 'discord.js'
import Rcon from 'modern-rcon'
import { createReadStream } from 'tail-stream'
import { createInterface } from 'readline'
import Plugin from './Plugin'

config().then(({pluginsDir, enable, disable, minecraftLog, minecraftRconHost, minecraftRconPort, minecraftRconPassword, discordBotToken, discordChannel}) => {
  process.stdout.write('Starting Minecord ... ')

  const discord = new Client()
  const rcon = new Rcon(minecraftRconHost, minecraftRconPort, minecraftRconPassword)
  const tail = createInterface({
    input: createReadStream(minecraftLog, {
      beginAt: 'end',
      onMove: 'stay',
      onTruncate: 'reset',
      waitForCreate: true,
    })
  })

  let channel
  const plugins = []

  enable.filter(pluginName => !disable.includes(pluginName)).forEach(async pluginName => {
    let plugin

    try {
      if (pluginsDir) plugin = (await import(`${pluginsDir}/${pluginName}`)).default
    } catch (e) {}

    try {
      if (!plugin) plugin = (await import(`minecord-plugin-${pluginName}`)).default
    } catch (e) {}

    try {
      if (!plugin) plugin = (await import(`./plugins/${pluginName}`)).default
    } catch (e) {}

    if (plugin) plugins.push(plugin(Plugin))
  })

  const sendToDiscord = async (...args) => await channel.send(...args)
  const sendToMinecraft = async (...args) => await rcon.send(...args)

  discord.on('ready', () => {
    channel = discord.channels.get(discordChannel)
    console.log('Done!!')
  })

  discord.on('message', async message => {
    if (message.channel.id !== channel.id) return
    if (message.author.bot || message.author.id === discord.user.id) return

    await rcon.connect()
    await Promise.all(plugins.map(async plugin => await plugin.discord({
      message,
      channel,
      user: discord.user,
      sendToDiscord,
      sendToMinecraft,
    })))
    await rcon.disconnect()
  })

  const RegExpLog = /^\[(.*)]\s\[([^/]*)\/(.*)]:\s(.*)$/

  tail.on('line', async line => {
    if (!RegExpLog.test(line)) return

    const [log, time, causedAt, level, message] = RegExpLog.exec(line)
    console.log(log)

    await Promise.all(plugins.map(async plugin => await plugin.minecraft({
      log,
      time,
      causedAt,
      level,
      message,
      channel,
      user: discord.user,
      sendToDiscord,
      sendToMinecraft,
    })))
  })

  discord.login(discordBotToken)
})
