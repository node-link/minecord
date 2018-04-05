const RegExpStoppingServer = /^Stopping\sserver$/
const RegExpStartingServer = /^Starting\sminecraft\sserver\sversion\s.*$/
const RegExpStartingServerDone = /^Done\s\(.*s\)!\sFor\shelp,\stype\s"help"\sor\s"\?"$/

export default Plugin => new Plugin({
  async minecraft ({causedAt, level, message, sendToDiscord}) {
    if (causedAt !== 'Server thread' || level !== 'INFO') return

    if (RegExpStoppingServer.test(message)) {
      await sendToDiscord(message)
    } else if (RegExpStartingServer.test(message)) {
      await sendToDiscord(message)
    } else if (RegExpStartingServerDone.test(message)) {
      await sendToDiscord(message)
    }
  }
})
