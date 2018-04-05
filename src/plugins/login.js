const RegExpJoin = /^(.*)\sjoined\sthe\sgame$/
const RegExpLeft = /^(.*)\sleft\sthe\sgame$/

export default Plugin => new Plugin({
  async minecraft ({causedAt, level, message, sendDiscord}) {
    if (causedAt !== 'Server thread' || level !== 'INFO') return

    if (RegExpJoin.test(message)) {
      await sendDiscord(message)
    } else if (RegExpLeft.test(message)) {
      await sendDiscord(message)
    }
  }
})
