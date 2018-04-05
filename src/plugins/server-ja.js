const RegExpStoppingServer = /^Stopping\sserver$/
const RegExpStartingServer = /^Starting\sminecraft\sserver\sversion\s.*$/
const RegExpStartingServerDone = /^Done\s\(.*s\)!\sFor\shelp,\stype\s"help"\sor\s"\?"$/

export default Plugin => new Plugin({
  async minecraft ({causedAt, level, message, sendDiscord}) {
    if (causedAt !== 'Server thread' || level !== 'INFO') return

    if (RegExpStoppingServer.test(message)) {
      await sendDiscord('サーバーが止まったみたい。')
    } else if (RegExpStartingServer.test(message)) {
      await sendDiscord('サーバーが動きだしたみたい。')
    } else if (RegExpStartingServerDone.test(message)) {
      await sendDiscord('サーバーの準備ができたみたい。')
    }
  }
})
