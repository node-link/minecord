const RegExpJoin = /^(.*)\sjoined\sthe\sgame$/
const RegExpLeft = /^(.*)\sleft\sthe\sgame$/

export default Plugin => new Plugin({
  async minecraft ({causedAt, level, message, sendToDiscord}) {
    if (causedAt !== 'Server thread' || level !== 'INFO') return

    if (RegExpJoin.test(message)) {
      const [, player] = RegExpJoin.exec(message)
      await sendToDiscord(`${player} がログインしたみたい。`)
    } else if (RegExpLeft.test(message)) {
      const [, player] = RegExpLeft.exec(message)
      await sendToDiscord(`${player} がログアウトしたみたい。`)
    }
  }
})
