#!/usr/bin/env node

import 'babel-polyfill'
import { config } from 'dotenv'
import { Client } from 'discord.js'
import Rcon from 'modern-rcon'
import { Tail } from 'tail'
import Plugin from './Plugin'

config()

const MINECRAFT_SERVER_LOG_PATH = process.env.MINECRAFT_SERVER_LOG_PATH || '/var/minecraft/logs/latest.log'
const MINECRAFT_SERVER_RCON_HOST = process.env.MINECRAFT_SERVER_RCON_HOST || 'localhost'
const MINECRAFT_SERVER_RCON_PORT = parseInt(process.env.MINECRAFT_SERVER_RCON_PORT) || 53174
const MINECRAFT_SERVER_RCON_PASSWORD = process.env.MINECRAFT_SERVER_RCON_PASSWORD || 'password'
const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID || 'channel_id'
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || 'bot_token'

const plugins = []

process.env.PLUGINS.split(',').forEach(async pluginName => {
  let plugin
  try {
    plugin = (await import(`minecord-plugin-${pluginName}`)).default
  } catch (e) {
    try {
      plugin = (await import(`./plugins/${pluginName}`)).default
    } catch (e) {}
  }
  if (typeof plugin === 'function') plugins.push(plugin(Plugin))
})

const discord = new Client()
const rcon = new Rcon(MINECRAFT_SERVER_RCON_HOST, MINECRAFT_SERVER_RCON_PORT, MINECRAFT_SERVER_RCON_PASSWORD)
const log = new Tail(MINECRAFT_SERVER_LOG_PATH)

let channel

const sendToDiscord = async (...args) => await channel.send(...args)
const sendToMinecraft = async (...args) => await rcon.send(...args)

discord.on('ready', () => {
  channel = discord.channels.get(DISCORD_CHANNEL_ID)
})

discord.on('message', async message => {
  if (message.channel.id !== channel.id) return
  if (message.author.id === discord.user.id) return

  await rcon.connect()
  await Promise.all(plugins.map(async plugin => plugin.discord({
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

  await Promise.all(plugins.map(async plugin => plugin.minecraft({
    log,
    time,
    causedAt,
    level,
    message,
    sendToDiscord,
    sendToMinecraft,
  })))
})

discord.login(DISCORD_BOT_TOKEN)
