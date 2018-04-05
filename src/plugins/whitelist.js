const RegExpWhiteListAdd = /^\[(.*):\sAdded\s(.*)\sto\sthe\swhitelist]$/
const RegExpWhiteListRemove = /^\[(.*):\sRemoved\s(.*)\sfrom\sthe\swhitelist]$/

export default Plugin => new Plugin({
  async minecraft ({causedAt, level, message, sendDiscord}) {
    if (causedAt !== 'Server thread' || level !== 'INFO') return

    if (RegExpWhiteListAdd.test(message)) {
      await sendDiscord(message)
    } else if (RegExpWhiteListRemove.test(message)) {
      await sendDiscord(message)
    }
  }
})
