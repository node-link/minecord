export default class Plugin {
  constructor ({discord = () => {}, minecraft = () => {}}) {
    this.discord = discord
    this.minecraft = minecraft
  }
}
