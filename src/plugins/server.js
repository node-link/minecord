const regexpArray = [
  /^Stopping\sserver$/,
  /^Starting\sminecraft\sserver\sversion\s.*$/,
  /^Done\s\(.*s\)!\sFor\shelp,\stype\s"help"\sor\s"\?"$/,
]

export default Plugin => new Plugin({
  async minecraft ({causedAt, level, message, sendToDiscord}) {
    if (causedAt !== 'Server thread' || level !== 'INFO') return

    if (regexpArray.some(regexp => regexp.test(message)))
      await sendToDiscord(message)
  }
})
