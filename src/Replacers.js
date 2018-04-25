import Replacer from './Replacer'

export default class Replacers {
  constructor () {
    this.replacers = []
  }

  add (regexp, replacer) {
    this.replacers.push(new Replacer(regexp, replacer))
    return this
  }

  replace (str) {
    const replacer = this.replacers.find(replacer => replacer.test(str))
    return replacer ? replacer.replace(str) : false
  }
}
