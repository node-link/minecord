#!/usr/bin/env node

import 'babel-polyfill'
import config from './config'
import { Client } from 'discord.js'
import Rcon from 'modern-rcon'
import { Tail } from 'tail'
import Plugin from './Plugin'

config().then(({pluginsDir, enable, disable, minecraftLog, minecraftRconHost, minecraftRconPort, minecraftRconPassword, discordBotToken, discordChannel}) => {
  const discord = new Client()
  const rcon = new Rcon(minecraftRconHost, minecraftRconPort, minecraftRconPassword)
  const log = new Tail(minecraftLog)

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
  })

  discord.on('message', async message => {
    if (message.channel.id !== channel.id) return
    if (message.author.id === discord.user.id) return

    await rcon.connect()
    await Promise.all(plugins.map(async plugin => await plugin.discord({
      message,
      sendToDiscord,
      sendToMinecraft,
    })))
    await rcon.disconnect()
  })

  const RegExpLog = /^\[(.*)]\s\[([^/]*)\/(.*)]:\s(.*)$/

  log.on('line', async line => {
    if (!RegExpLog.test(line)) return

    const [log, time, causedAt, level, message] = RegExpLog.exec(line)
    console.log(log)

    await Promise.all(plugins.map(async plugin => await plugin.minecraft({
      log,
      time,
      causedAt,
      level,
      message,
      sendToDiscord,
      sendToMinecraft,
    })))
  })

  discord.login(discordBotToken)
})
