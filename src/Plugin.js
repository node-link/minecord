import config from './config'

export default class Plugin {
  constructor ({discord = () => {}, minecraft = () => {}}) {
    this.discord = discord
    this.minecraft = minecraft
  }
}

export const loadPlugins = async (pluginNames = []) => {
  const {pluginsDir} = await config()

  const plugins = []

  await Promise.all(pluginNames.map(async pluginName => {
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
  }))

  return plugins
}
