# Minecord

Connects Discord and Minecraft Servers without any mods or plugins.

## Installation

```
npm install -g minecord
```

## Usage

Set up the `.env` file.

```
PLUGINS="chat,login,whitelist,server"
MINECRAFT_SERVER_LOG_PATH="/var/minecraft/logs/latest.log"
MINECRAFT_SERVER_RCON_HOST="localhost"
MINECRAFT_SERVER_RCON_PORT=25575
MINECRAFT_SERVER_RCON_PASSWORD="password"
DISCORD_CHANNEL_ID="channel_id"
DISCORD_BOT_TOKEN="bot_token"
```

## How to make a plugin

Please publish it as `minecord-plugin-[PLUGIN]`.

```js
export default Plugin => new Plugin({
  discord ({message, sendDiscord, sendMinecraft}) {
    // Processing when message is received from Discord.
  },
  minecraft ({log, time, causedAt, level, message, sendDiscord, sendMinecraft}) {
    // Processing when receiving a message from Minecraft.
  }
})
```