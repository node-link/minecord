# Minecord

Connects Discord and Minecraft Servers without any mods or plugins.

## Installation

```
npm install -g minecord
```

## Usage

In your Minecraft `server.properties`, make sure you have and restart the server.

```
enable-rcon=true
rcon.password=[minecraftRconPassword]
rcon.port=[minecraftRconPort]
```

Create a bot of Discord from [here](https://discordapp.com/developers/applications/me) and get bot token.

Then let the created Bot participate in a specific channel from the OAuth 2 URL Generator.

Set up the `config.json` file.

```json
{
  "pluginsDir": null,
  "enable": [
    "chat",
    "login",
    "whitelist",
    "server"
  ],
  "disable": [],
  "minecraftLog": "/var/minecraft/logs/latest.log",
  "minecraftRconHost": "localhost",
  "minecraftRconPort": 25575,
  "minecraftRconPassword": "password",
  "discordBotToken": "bot_token",
  "discordChannel": "channel_id"
}
```

In order to acquire the channel ID, enable developer mode in your Discord client, then right click channel and select "Copy ID".

And run Minecord. (In the directory where `.env` resides)

```
minecord --config /path/to/config.json
```

## How to make a plugin

To load the local plugin, please put the plugin in the directory specified by the `--plugins-dir` option and specify it in the configuration file.

When publishing the global plugin, please publish it as `minecord-plugin-[PLUGIN]`.

```js
export default Plugin => new Plugin({
  discord ({message, sendToDiscord, sendToMinecraft}) {
    // Processing when receiving a message from Discord.
  },
  minecraft ({log, time, causedAt, level, message, sendToDiscord, sendToMinecraft}) {
    // Processing when receiving a message from Minecraft.
  }
})
```

## Contribution

I would be delighted if you rewrite `README.md` in native English!!

Of course, I would be delighted if you point out any problems or improvements related to the program.

https://github.com/node-link/minecord/issues
