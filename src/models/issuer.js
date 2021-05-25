const { u8ToHex, u32ToBe, encode, decode } = require('../utils/hex')

/**
 * Issuer {
    version:     u8,
    class_count: u32,
    set_count:   u32,
    info:        <size: u16> + <content>
  }
 */
class Issuer {
  #version = 0
  #classCount = 0
  #setCount = 0
  #info = ''

  constructor(classCount, setCount = 0, info = '') {
    this.#classCount = classCount
    this.#setCount = setCount
    this.#info = info
  }

  toString() {
    return `0x${u8ToHex(this.#version)}${u32ToBe(this.#classCount)}${u32ToBe(this.#setCount)}${encode(this.#info)}`
  }

  static fromString(data) {
    const temp = remove0x(data)
    if (temp.length < 22) {
      throw new Error('Issuer data invalid')
    }
    const version = parseInt(temp.slice(0, 2), 16)
    const classCount = parseInt(temp.slice(2, 10), 16)
    const setCount = parseInt(temp.slice(10, 18), 16)
    const info = temp.slice(18)
    return Issuer(version, classCount, setCount, info)
  }
}

module.exports = {
  Issuer,
}
