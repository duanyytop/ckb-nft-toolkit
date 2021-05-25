const { u8ToHex, u32ToBe, encode } = require('../utils/hex')

/**
 * Class {
    version:     u8,
    total:       u32,
    issued:      u32,
    configure:   u8,
    name:        <size: u16> + <content>,
    description: <size: u16> + <content>,
    renderer:    <size: u16> + <content>,
    extinfoData: <size: u16> + <content>,
  }
 */
class TokenClass {
  #version = 0
  #total = 0
  #issued = 0
  #configure = 0
  #name = ''
  #description = ''
  #renderer = ''
  #extinfoData = ''

  constructor(total, issued, configure, name, description, renderer, extinfoData = '') {
    this.#total = total
    this.#issued = issued
    this.#configure = configure
    this.#name = name
    this.#description = description
    this.#renderer = renderer
    this.#extinfoData = extinfoData
  }

  toString() {
    const dynamic = `${encode(this.#name)}${encode(this.#description)}${encode(this.#renderer)}${encode(
      this.#extinfoData,
    )}`
    return `0x${u8ToHex(this.#version)}${u32ToBe(this.#total)}${u32ToBe(this.#issued)}${u8ToHex(
      this.#configure,
    )}${dynamic}`
  }

  static fromString(data) {
    const temp = remove0x(data)
    if (temp.length < 24) {
      throw new Error('Class data invalid')
    }
    const version = parseInt(temp.slice(0, 2), 16)
    const total = parseInt(temp.slice(2, 10), 16)
    const issued = parseInt(temp.slice(10, 18), 16)
    const configure = parseInt(temp.slice(18, 20), 16)

    const nameLen = parseInt(temp.slice(20, 24), 16)
    const name = temp.slice(24, nameLen + 24)

    if (temp.length < 28 + nameLen) {
      throw new Error('Class data invalid')
    }

    const descriptionLen = parseInt(temp.slice(nameLen + 24, nameLen + 28), 16)
    const description = temp.slice(nameLen + 28, descriptionLen + nameLen + 28)

    if (temp.length < descriptionLen + nameLen + 32) {
      throw new Error('Class data invalid')
    }

    const rendererLen = parseInt(temp.slice(descriptionLen + nameLen + 28, descriptionLen + nameLen + 32), 16)
    const renderer = temp.slice(descriptionLen + nameLen + 32, descriptionLen + nameLen + rendererLen + 32)

    return new TokenClass(total, issued, configure, name, description, renderer)
  }
}

module.exports = {
  TokenClass,
}
