const RegExpTalk = /^[<[](.*)[>\]]\s(.*)$/

export default Plugin => new Plugin({
  async discord ({message, sendMinecraft}) {
    await sendMinecraft(`tellraw @a ${JSON.stringify({
      text: `<${message.member && message.member.nickname || message.author.username}> ${message.cleanContent}`
    })}`)
  },
  async minecraft ({causedAt, level, message, sendDiscord}) {
    if (causedAt !== 'Server thread' || level !== 'INFO') return
    if (!RegExpTalk.test(message)) return

    const [, player, text] = RegExpTalk.exec(message)
    await sendDiscord(`**${player}**: ${text}`)
  }
})
