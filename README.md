Minecord
===

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square&maxAge=86400)](LICENSE)
[![npm](https://img.shields.io/npm/v/minecord.svg?style=flat-square&maxAge=86400)](https://www.npmjs.com/package/minecord)
[![npm](https://img.shields.io/npm/dt/minecord.svg?style=flat-square)](https://www.npmjs.com/package/minecord)

Connects [Minecraft](https://minecraft.net) Server and [Discord](https://discordapp.com/) without any mods or plugins.

![Minecord](https://raw.githubusercontent.com/wiki/node-link/minecord/images/minecord.gif)

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
    "death",
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

And run Minecord.

```
minecord --config /path/to/config.json
```

Alternatively, the setting can be given as an option.

```
minecord --help

  Usage: minecord [options]

  Options:

    -V, --version                         output the version number
    -c, --config <file>                   set configuration file
    -p, --plugins-dir <dir>               set local plugins directory
    --enable <plugins>                    enable plugin by name, "--enable PLUGIN1,PLUGIN2" for multiple plugins
    --disable <plugins>                   disable plugin by name, "--disable PLUGIN1,PLUGIN2" for multiple plugins
    --minecraft-log <path>                set the path to Minecraft log (It is recommended to specify them collectively in the configuration file)
    --minecraft-rcon-host <host>          set the Minecraft Server rcon host (It is recommended to specify them collectively in the configuration file)
    --minecraft-rcon-port <port>          set the Minecraft Server rcon port (It is recommended to specify them collectively in the configuration file)
    --minecraft-rcon-password <password>  set the Minecraft Server rcon password (It is recommended to specify them collectively in the configuration file)
    --discord-bot-token <token>           set Discord bot token (It is recommended to specify them collectively in the configuration file)
    --discord-channel <id>                set Discord channel ID for for the discord bot (It is recommended to specify them collectively in the configuration file)
    -h, --help                            output usage information
```

If you are an administrator of the channel of Discord, you can use it more conveniently by unifying Discord's nickname and Minecraft's username.

## Plugins

By default, the following plugins are included.

* chat : Sharing messages entered by users with Minecraft and Discord on their respective screens. (Default: enable)
* login : Transfer login notification in Minecraft to Discord. (Default: disable)
* death : Transfer the dead player notification in Minecraft to Discord. (Default: disable)
* whitelist : Transfer whitelist operation notification in Minecraft to Discord. (Default: disable)
* server : Transfer notification of start and stop of Minecraft server to Discord. (Default: disable)

## How to make a plugin

To load the local plugin, please put the plugin in the directory specified by the `--plugins-dir` option and specify it in the configuration file.

When publishing the global plugin, please publish it as `minecord-plugin-[PLUGIN]`.

```js
export default Plugin => new Plugin({
  discord ({message, channel, user, sendToDiscord, sendToMinecraft}) {
    // Processing when receiving a message from Discord.
  },
  minecraft ({log, time, causedAt, level, message, channel, user, sendToDiscord, sendToMinecraft}) {
    // Processing when receiving a message from Minecraft.
  }
})
```

### `discord()` method

It is executed when a message is received from the Discord channel.

Argument `message` is [`Message`](https://discord.js.org/#/docs/main/stable/class/Message) object of [discord.js](https://discord.js.org).

Argument `channel` is [`TextChannel`](https://discord.js.org/#/docs/main/stable/class/TextChannel) object of [discord.js](https://discord.js.org).

Argument `user` is [`User`](https://discord.js.org/#/docs/main/stable/class/User) object of [discord.js](https://discord.js.org).

Argument `sendToDiscord` is [`send`](https://discord.js.org/#/docs/main/stable/class/TextChannel?scrollTo=send) function of [discord.js](https://discord.js.org).

Argument `sendToMinecraft` is `send` function of [node-modern-rcon](https://github.com/levrik/node-modern-rcon).

### `minecraft()` method

It is executed when new Minecraft log is detected.

Argument `log` is one Minecraft log line.

Argument `time`, `causedAt`, `level` and `message` is the value obtained by parsing the Minecraft log.

For example, it becomes as follows.

```
[01:23:45] [Server thread/INFO]: player joined the game
```

```js
export default Plugin => new Plugin({
  minecraft ({log, time, causedAt, level, message, channel, user, sendToDiscord, sendToMinecraft}) {
    console.log(log === '[01:23:45] [Server thread/INFO]: player joined the game')
    console.log(time === '01:23:45')
    console.log(causedAt === 'Server thread')
    console.log(level === 'INFO')
    console.log(message === 'player joined the game')
    // All true
  }
})
```

Argument `channel` is [`TextChannel`](https://discord.js.org/#/docs/main/stable/class/TextChannel) object of [discord.js](https://discord.js.org).

Argument `user` is [`User`](https://discord.js.org/#/docs/main/stable/class/User) object of [discord.js](https://discord.js.org).

Argument `sendToDiscord` is [`send`](https://discord.js.org/#/docs/main/stable/class/TextChannel?scrollTo=send) function of [discord.js](https://discord.js.org).

Argument `sendToMinecraft` is `send` function of [node-modern-rcon](https://github.com/levrik/node-modern-rcon).

## Author

[@n0f](https://github.com/n0f)

[![Follow](https://img.shields.io/twitter/follow/n0f.svg?style=social&label=Follow)](https://twitter.com/n0f)

## Contribution

I would be delighted if you rewrite `README.md` in native English!!

Of course, I would be delighted if you point out any problems or improvements related to the program.

Or, I would appreciate it if you increase the number of plugins included by default.

https://github.com/node-link/minecord/issues

## Licence

[MIT](LICENSE)
