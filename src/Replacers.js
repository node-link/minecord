import Replacer from './Replacer'

export default class Replacers extends Array {
  add (regexp, replacer) {
    this.push(new Replacer(regexp, replacer))
    return this
  }

  replace (str) {
    const replacer = this.find(replacer => replacer.test(str))
    return replacer ? replacer.replace(str) : false
  }
}
