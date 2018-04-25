export default class Replacer {
  constructor (regexp, replacer) {
    this.regexp = regexp
    this.replacer = replacer
  }

  test (str) {
    return this.regexp.test(str)
  }

  replace (str) {
    return str.replace(this.regexp, this.replacer)
  }
}
