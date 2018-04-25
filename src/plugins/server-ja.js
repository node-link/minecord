import Replacers from '../Replacers'

const replacers = (new Replacers)
  .add(/^Stopping\sserver$/, () => 'サーバーが止まったみたい。')
  .add(/^Starting\sminecraft\sserver\sversion\s.*$/, () => 'サーバーが動きだしたみたい。')
  .add(/^Done\s\(.*s\)!\sFor\shelp,\stype\s"help"\sor\s"\?"$/, () => 'サーバーの準備ができたみたい。')

export default Plugin => new Plugin({
  async minecraft ({causedAt, level, message, sendToDiscord}) {
    if (causedAt !== 'Server thread' || level !== 'INFO') return

    const newMessage = replacers.replace(message)
    if (newMessage !== false) await sendToDiscord(newMessage)
  }
})
