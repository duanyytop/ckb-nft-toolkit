const { hexToBytes } = require('@nervosnetwork/ckb-sdk-utils')
const { u8ToHex, encode, remove0x } = require('../utils/hex')

/**
 * Nft {
    version:        u8,
    characteristic: [u8; 8],
    configure:      u8,
    state:          u8,
    extinfo_data:   <size: u16> + <vartext>
  }
 */
class Nft {
  #version = 0
  #characteristic = [0, 0, 0, 0, 0, 0, 0, 0]
  #configure = 0
  #state = 0
  #extinfoData = ''

  constructor(version, characteristic, configure, state, extinfoData = '') {
    this.#version = version
    this.#characteristic = characteristic
    this.#configure = configure
    this.#state = state
    this.#extinfoData = extinfoData
  }

  toString() {
    const chars = this.#characteristic.map(char => u8ToHex(char)).join('')
    const result = `0x${u8ToHex(this.#version)}${chars}${u8ToHex(this.#configure)}${u8ToHex(this.#state)}`
    return this.#extinfoData ? `${result}${encode(this.#extinfoData)}` : result
  }

  get characteristic() {
    return this.#characteristic
  }

  get configure() {
    return this.#configure
  }

  get state() {
    return this.#state
  }

  static fromString(data) {
    const temp = remove0x(data)
    if (temp.length < 22) {
      throw new Error('Nft data invalid')
    }
    const version = parseInt(temp.slice(0, 2), 16)
    const characteristic = Array.from(hexToBytes(temp.slice(2, 18)))
    const configure = parseInt(temp.slice(18, 20), 16)
    const state = parseInt(temp.slice(20, 22), 16)
    const extinfoData = temp.slice(22)
    return new Nft(version, characteristic, configure, state, extinfoData)
  }
}

module.exports = {
  Nft,
}