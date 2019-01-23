import config from './config'

export default class Plugin {
  constructor ({discord = () => {}, minecraft = () => {}}) {
    this.discord = discord
    this.minecraft = minecraft
  }
}

export const loadPlugins = (pluginNames = []) => {
  const {pluginsDir} = config()

  const plugins = []

  pluginNames.map(pluginName => {
    let plugin

    try {
      if (pluginsDir) plugin = require(`${pluginsDir}/${pluginName}`).default
    } catch (e) {}

    try {
      if (!plugin) plugin = require(`minecord-plugin-${pluginName}`).default
    } catch (e) {}

    try {
      if (!plugin) plugin = require(`./plugins/${pluginName}`).default
    } catch (e) {}

    if (plugin) plugins.push(plugin(Plugin))
  })

  return plugins
}
