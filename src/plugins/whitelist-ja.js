import Replacers from '../Replacers'

const replacers = (new Replacers)
  .add(/^\[(.*):\sAdded\s(.*)\sto\sthe\swhitelist]$/, (message, player, target) => `${player} が ${target} をホワイトリストに追加したみたい。`)
  .add(/^\[(.*):\sRemoved\s(.*)\sfrom\sthe\swhitelist]$/, (message, player, target) => `${player} が ${target} をホワイトリストから削除したみたい。`)

export default Plugin => new Plugin({
  async minecraft ({causedAt, level, message, sendToDiscord}) {
    if (causedAt !== 'Server thread' || level !== 'INFO') return

    const newMessage = replacers.replace(message)
    if (newMessage !== false) await sendToDiscord(newMessage)
  }
})
