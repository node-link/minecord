const RegExpWhiteListAdd = /^\[(.*):\sAdded\s(.*)\sto\sthe\swhitelist]$/
const RegExpWhiteListRemove = /^\[(.*):\sRemoved\s(.*)\sfrom\sthe\swhitelist]$/

export default Plugin => new Plugin({
  async minecraft ({causedAt, level, message, sendToDiscord}) {
    if (causedAt !== 'Server thread' || level !== 'INFO') return

    if (RegExpWhiteListAdd.test(message)) {
      const [, player, target] = RegExpWhiteListAdd.exec(message)
      await sendToDiscord(`${player} が ${target} をホワイトリストに追加したみたい。`)
    } else if (RegExpWhiteListRemove.test(message)) {
      const [, player, target] = RegExpWhiteListRemove.exec(message)
      await sendToDiscord(`${player} が ${target} をホワイトリストから削除したみたい。`)
    }
  }
})
