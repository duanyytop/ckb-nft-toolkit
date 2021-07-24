import { hexToBytes } from '@nervosnetwork/ckb-sdk-utils'
import { u8ToHex, encode, remove0x, decode } from '../utils/hex'

class Nft {
  version: U8 = 0
  characteristic: U8[] = [0, 0, 0, 0, 0, 0, 0, 0]
  configure: U8 = 0
  state: U8 = 0
  extinfoData: DynHex = ''
  extension: DynHex = ''

  constructor(version = 0, characteristic: U8[], configure: U8, state: U8, extinfoData = '') {
    this.version = version
    this.characteristic = characteristic
    this.configure = configure
    this.state = state
    this.extinfoData = extinfoData
  }

  toString() {
    const chars = this.characteristic.map(char => u8ToHex(char)).join('')
    let result = `0x${u8ToHex(this.version)}${chars}${u8ToHex(this.configure)}${u8ToHex(this.state)}`
    result = this.extinfoData ? `${result}${encode(this.extinfoData)}` : result
    result = this.extension ? `${result}${encode(this.extension)}` : result
    return result
  }

  lock() {
    if ((this.configure & 0b0000_0010) === 0b0000_0000) {
      this.state = this.state | 0b0000_0010
    } else {
      throw new Error('The NFT cell cannot be locked.')
    }
  }

  allowClaim() {
    return (this.configure & 0b0000_0001) === 0b0000_0000
  }

  claim() {
    if ((this.configure & 0b0000_0001) === 0b0000_0000) {
      this.state = this.state | 0b0000_0001
    } else {
      throw new Error('The NFT cell cannot be claimed.')
    }
  }

  addExtInfo(extInfo: DynHex) {
    if ((this.configure & 0b0000_0100) === 0b0000_0000) {
      this.extension = this.extension + encode(extInfo)
    } else {
      throw new Error('The NFT cell cannot be added extension info data.')
    }
  }

  updateCharacteristic(chars: Array<U8>) {
    if ((this.configure & 0b0000_1000) === 0b0000_0000) {
      this.characteristic = chars
    } else {
      throw new Error('The NFT characteristic cannot be updated.')
    }
  }

  updateState(state: U8) {
    this.state = state
  }

  static fromString(data: Hex) {
    const temp = remove0x(data)
    if (temp.length < 22) {
      throw new Error('Nft data invalid')
    }
    const version = parseInt(temp.slice(0, 2), 16)
    const characteristic = Array.from(hexToBytes(`0x${temp.slice(2, 18)}`))
    const configure = parseInt(temp.slice(18, 20), 16)
    const state = parseInt(temp.slice(20, 22), 16)
    const extinfoData = decode(temp.slice(22))
    return new Nft(version, characteristic, configure, state, extinfoData)
  }
}

export default Nft
