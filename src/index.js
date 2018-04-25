#!/usr/bin/env node

import 'babel-polyfill'
import config from './config'
import { Client } from 'discord.js'
import Rcon from 'modern-rcon'
import Tail from './Tail'
import { loadPlugins } from './Plugin'

(async () => {
  const {
    enable,
    disable,
    minecraftLog,
    minecraftRconHost,
    minecraftRconPort,
    minecraftRconPassword,
    discordBotToken,
    discordChannel,
  } = await config()

  process.stdout.write('Starting Minecord ... ')

  const plugins = await loadPlugins(enable.filter(pluginName => !disable.includes(pluginName)))

  const client = new Client()
  const rcon = new Rcon(minecraftRconHost, minecraftRconPort, minecraftRconPassword)
  const tail = new Tail(minecraftLog)

  let channel

  const sendToDiscord = (...args) => channel.send(...args)
  const sendToMinecraft = (...args) => rcon.send(...args)

  client.on('ready', () => {
    channel = client.channels.get(discordChannel)
    console.log('Done!!')
  })

  client.on('message', async message => {
    if (message.channel.id !== channel.id) return
    if (message.author.bot || message.author.id === client.user.id) return

    await rcon.connect()
    await Promise.all(plugins.map(({discord}) => discord({
      message,
      channel,
      user: client.user,
      sendToDiscord,
      sendToMinecraft,
    })))
    await rcon.disconnect()
  })

  const regexpLog = /^\[(.*)]\s\[([^/]*)\/(.*)]:\s(.*)$/

  tail.on('line', async line => {
    if (!regexpLog.test(line)) return

    const [log, time, causedAt, level, message] = regexpLog.exec(line)
    console.log(log)

    await Promise.all(plugins.map(({minecraft}) => minecraft({
      log,
      time,
      causedAt,
      level,
      message,
      channel,
      user: client.user,
      sendToDiscord,
      sendToMinecraft,
    })))
  })

  await client.login(discordBotToken)
})()
