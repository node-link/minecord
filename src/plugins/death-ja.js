import Replacers from '../Replacers'

const replacers = (new Replacers).add(
  /^(.*)\swas\sshot\sby\sarrow$/,
  (message, player) => `${player} が矢で射抜かれて逝ったみたい。`,
).add(
  /^(.*)\swas\sshot\sby\s(.*)$/,
  (message, player, playerOrMob) => `${player} が ${playerOrMob} に射抜かれて逝ったみたい。`,
).add(
  /^(.*)\swas\sshot\sby\s(.*)\susing\s(.*)$/,
  (message, player, playerOrMob, bowName) => `${player} が ${playerOrMob} の ${bowName} に射抜かれて逝ったみたい。`,
).add(
  /^(.*)\swas\spricked\sto\sdeath$/,
  (message, player) => `${player} が刺されて逝ったみたい。`,
).add(
  /^(.*)\shugged\sa\scactus$/,
  (message, player) => `${player} がサボテンを抱きしめて逝ったみたい。`,
).add(
  /^(.*)\swalked\sinto\sa\scactus\swhile\strying\sto\sescape\s(.*)$/,
  (message, player, playerOrMob) => `${player} が ${playerOrMob} から逃げようとして、サボテンに触って逝ったみたい。`,
).add(
  /^(.*)\swas\sstabbed\sto\sdeath$/,
  (message, player) => `${player} が刺されて逝ったみたい。`,
).add(
  /^(.*)\sdrowned$/,
  (message, player) => `${player} が溺れて逝ったみたい。`,
).add(
  /^(.*)\sdrowned\swhilst\strying\sto\sescape\s(.*)$/,
  (message, player, playerOrMob) => `${player} が ${playerOrMob} から逃げようとして、溺れて逝ったみたい。`,
).add(
  /^(.*)\ssuffocated\sin\sa\swall$/,
  (message, player) => `${player} が壁の中で窒息して逝ったみたい。`,
).add(
  /^(.*)\swas\ssquished\stoo\smuch$/,
  (message, player) => `${player} が激しく押し潰されて逝ったみたい。`,
).add(
  /^(.*)\sexperienced\skinetic\senergy$/,
  (message, player) => `${player} が有り余る運動エネルギーを体験して逝ったみたい。`,
).add(
  /^(.*)\sremoved\san\selytra\swhile\sflying$/,
  (message, player) => `${player} が飛行中にエリトラが壊れて逝ったみたい。`,
).add(
  /^(.*)\sblew\sup$/,
  (message, player) => `${player} が爆裂して逝ったみたい。`,
).add(
  /^(.*)\swas\sblown\sup\sby\s(.*)$/,
  (message, player, playerOrMob) => `${player} が ${playerOrMob} に爆破されて逝ったみたい。`,
).add(
  /^(.*)\swas\skilled\sby\s(.*)$/,
  (message, player, object) => `${player} が ${object} にやられて逝ったみたい。`,
).add(
  /^(.*)\shit\sthe\sground\stoo\shard$/,
  (message, player) => `${player} が地面と激突して逝ったみたい。`,
).add(
  /^(.*)\sfell\sfrom\sa\shigh\splace$/,
  (message, player) => `${player} が高いところから落ちて逝ったみたい。`,
).add(
  /^(.*)\sfell\soff\sa\sladder$/,
  (message, player) => `${player} がはしごから落ちて逝ったみたい。`,
).add(
  /^(.*)\sfell\soff\ssome\svines$/,
  (message, player) => `${player} がツタから滑り落ちて逝ったみたい。`,
).add(
  /^(.*)\sfell\sout\sof\sthe\swater$/,
  (message, player) => `${player} が水から落ちて逝ったみたい。`,
).add(
  /^(.*)\sfell\sinto\sa\spatch\sof\sfire$/,
  (message, player) => `${player} が火の海に落ちて逝ったみたい。`,
).add(
  /^(.*)\sfell\sinto\sa\spatch\sof\scacti$/,
  (message, player) => `${player} がサボテンの上に落ちて逝ったみたい。`,
).add(
  /^(.*)\swas\sdoomed\sto\sfall\sby\s(.*)$/,
  (message, player, playerOrMob) => `${player} が ${playerOrMob} に落とされ逝ったみたい。`,
).add(
  /^(.*)\swas\sshot\soff\ssome\svines\sby\s(.*)$/,
  (message, player, playerOrMob) => `${player} が ${playerOrMob} にツタから撃墜され逝ったみたい。`,
).add(
  /^(.*)\swas\sshot\soff\sa\sladder\sby\s(.*)$/,
  (message, player, playerOrMob) => `${player} が ${playerOrMob} にはしごから撃墜され逝ったみたい。`,
).add(
  /^(.*)\swas\sblown\sfrom\sa\shigh\splace\sby\s(.*)$/,
  (message, player, playerOrMob) => `${player} が ${playerOrMob} に高いところから吹き飛ばされ逝ったみたい。`,
).add(
  /^(.*)\swas\ssquashed\sby\sa\sfalling\sanvil$/,
  (message, player) => `${player} が落下してきた金床に押し潰されて逝ったみたい。`,
).add(
  /^(.*)\swas\ssquashed\sby\sa\sfalling\sblock$/,
  (message, player) => `${player} が落下してきたブロックに押し潰されて逝ったみたい。`,
).add(
  /^(.*)\swent\sup\sin\sflames$/,
  (message, player) => `${player} が炎に巻かれて逝ったみたい。`,
).add(
  /^(.*)\sburned\sto\sdeath$/,
  (message, player) => `${player} がこんがりと焼けて逝ったみたい。`,
).add(
  /^(.*)\swas\sburnt\sto\sa\scrisp\swhilst\sfighting\s(.*)$/,
  (message, player, playerOrMob) => `${player} が ${playerOrMob} と戦いながら、カリカリに焼けて逝ったみたい。`,
).add(
  /^(.*)\swalked\sinto\sa\sfire\swhilst\sfighting\s(.*)$/,
  (message, player, playerOrMob) => `${player} が ${playerOrMob} と戦いながら、炎の中に踏み入って逝ったみたい。`,
).add(
  /^(.*)\swent\soff\swith\sa\sbang$/,
  (message, player) => `${player} がドカンと儚く逝ったみたい。`,
).add(
  /^(.*)\stried\sto\sswim\sin\slava$/,
  (message, player) => `${player} が溶岩を遊泳して逝ったみたい。`,
).add(
  /^(.*)\stried\sto\sswim\sin\slava\swhile\strying\sto\sescape\s(.*)$/,
  (message, player, playerOrMob) => `${player} が ${playerOrMob} から逃げようとして、溶岩を遊泳して逝ったみたい。`,
).add(
  /^(.*)\swas\sstruck\sby\slightning$/,
  (message, player) => `${player} が雷に打たれて逝ったみたい。`,
).add(
  /^(.*)\sdiscovered\sfloor\swas\slava$/,
  (message, player) => `${player} が溶岩を踏んで逝ったみたい。`,
).add(
  /^(.*)\swas\sslain\sby\s(.*)$/,
  (message, player, playerOrMob) => `${player} が ${playerOrMob} にやられて逝ったみたい。`,
).add(
  /^(.*)\swas\sslain\sby\s(.*)\susing\s(.*)$/,
  (message, player, playerOrMob, weapon) => `${player} が ${playerOrMob} の ${weapon} にやられて逝ったみたい。`,
).add(
  /^(.*)\sgot\sfinished\soff\sby\s(.*)$/,
  (message, player, playerOrMob) => `${player} が ${playerOrMob} の手によって逝ったみたい。`,
).add(
  /^(.*)\sgot\sfinished\soff\sby\s(.*)\susing\s(.*)$/,
  (message, player, playerOrMob, weapon) => `${player} が ${playerOrMob} の ${weapon} によって逝ったみたい。`,
).add(
  /^(.*)\swas\sfireballed\sby\s(.*)$/,
  (message, player, mob) => `${player} が ${mob} に火だるまにされて逝ったみたい。`,
).add(
  /^(.*)\swas\skilled\sby\smagic$/,
  (message, player) => `${player} が魔法を食らって逝ったみたい。`,
).add(
  /^(.*)\swas\skilled\sby\s(.*)\susing\smagic$/,
  (message, player, playerOrMob) => `${player} が ${playerOrMob} から魔法を食らって逝ったみたい。`,
).add(
  /^(.*)\sstarved\sto\sdeath$/,
  (message, player) => `${player} が飢えに飢えて逝ったみたい。`,
).add(
  /^(.*)\swas\skilled\swhile\strying\sto\shurt\s(.*)$/,
  (message, player, playerOrMob) => `${player} が ${playerOrMob} に返り討ちにされて逝ったみたい。`,
).add(
  /^(.*)\swas\simpaled\sby\s(.*)$/,
  (message, player, playerOrMob) => `${player} が ${playerOrMob} に襲われて逝ったみたい。`,
).add(
  /^(.*)\sfell\sout\sof\sthe\sworld$/,
  (message, player) => `${player} が奈落の底へ落ちて逝ったみたい。`,
).add(
  /^(.*)\sfell\sfrom\sa\shigh\splace\sand\sfell\sout\sof\sthe\sworld$/,
  (message, player) => `${player} が高いところからそのまま奈落の底へ落ちて逝ったみたい。`,
).add(
  /^(.*)\sdidn't\swant\sto\slive\sin\sthe\ssame\sworld\sas\s(.*)$/,
  (message, player, playerOrMob) => `${player} が ${playerOrMob} から拒絶されて逝ったみたい。`,
).add(
  /^(.*)\swithered\saway$/,
  (message, player) => `${player} が干からびて逝ったみたい。`,
).add(
  /^(.*)\swas\spummeled\sby\s(.*)$/,
  (message, victim, killer) => `${victim} が ${killer} にぺしゃんこにされて逝ったみたい。`,
).add(
  /^(.*)\sdied$/,
  (message, player) => `${player} が逝ったみたい。`,
)

export default Plugin => new Plugin({
  async minecraft ({causedAt, level, message, sendToDiscord}) {
    if (causedAt !== 'Server thread' || level !== 'INFO') return

    const newMessage = replacers.replace(message)
    if (newMessage !== false) await sendToDiscord(newMessage)
  }
})
