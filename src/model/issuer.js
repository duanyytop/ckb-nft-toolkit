const { u8ToHex, u32ToBe, remove0x } = require('../utils/hex')

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
    const infoData = `${u32ToBe(remove0x(this.#info).length)}${remove0x(this.#info)}`
    return `0x${u8ToHex(this.#version)}${u32ToBe(this.#classCount)}${u32ToBe(this.#setCount)}${infoData}`
  }
}

module.exports = {
  Issuer,
}
