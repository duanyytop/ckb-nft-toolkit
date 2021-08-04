import { hexToBytes } from '@nervosnetwork/ckb-sdk-utils'
import { u8ToHex, encode, remove0x, decode, hexToU8, append0x } from '../utils/hex'

class Nft {
  version: U8 = 0
  characteristic: U8[] = [0, 0, 0, 0, 0, 0, 0, 0]
  #configure: U8 = 0
  #state: U8 = 0
  extinfoData: DynHex = ''
  extension: DynHex = ''

  constructor(version = 0, characteristic: U8[], configure: Hex, state: Hex, extinfoData = '') {
    this.version = version
    this.characteristic = characteristic
    this.#configure = hexToU8(configure)
    this.#state = hexToU8(state)
    this.extinfoData = extinfoData
  }

  getConfigure(): Hex {
    return append0x(u8ToHex(this.#configure))
  }

  updateConfigure(configure: Hex) {
    this.#configure = hexToU8(configure)
  }

  getState(): Hex {
    return append0x(u8ToHex(this.#configure))
  }

  updateState(state: Hex) {
    this.#state = hexToU8(state)
  }

  toString() {
    const chars = this.characteristic.map(char => u8ToHex(char)).join('')
    let result = append0x(
      `${u8ToHex(this.version)}${chars}${remove0x(this.getConfigure())}${remove0x(this.getState())}`,
    )
    result = this.extinfoData ? `${result}${encode(this.extinfoData)}` : result
    result = this.extension ? `${result}${encode(this.extension)}` : result
    return result
  }

  lock() {
    if ((this.#configure & 0b0000_0010) === 0b0000_0000) {
      this.#state = this.#state | 0b0000_0010
    } else {
      throw new Error('The NFT cell cannot be locked.')
    }
  }

  allowClaim() {
    return (this.#configure & 0b0000_0001) === 0b0000_0000
  }

  claim() {
    if ((this.#configure & 0b0000_0001) === 0b0000_0000) {
      this.#state = this.#state | 0b0000_0001
    } else {
      throw new Error('The NFT cell cannot be claimed.')
    }
  }

  addExtInfo(extInfo: DynHex) {
    if ((this.#configure & 0b0000_0100) === 0b0000_0000) {
      this.extension = this.extension + encode(extInfo)
    } else {
      throw new Error('The NFT cell cannot be added extension info data.')
    }
  }

  updateCharacteristic(chars: U8[]) {
    if ((this.#configure & 0b0000_1000) === 0b0000_0000) {
      this.characteristic = chars
    } else {
      throw new Error('The NFT characteristic cannot be updated.')
    }
  }

  static fromProps(props: NftProps): Nft {
    const { version, characteristic, configure, state, extinfoData } = props
    return new Nft(version, characteristic, configure, state, extinfoData)
  }

  static fromString(data: Hex) {
    const temp = remove0x(data)
    if (temp.length < 22) {
      throw new Error('Nft data invalid')
    }
    const version = parseInt(temp.slice(0, 2), 16)
    const characteristic = Array.from(hexToBytes(`0x${temp.slice(2, 18)}`))
    const configure = append0x(temp.slice(18, 20))
    const state = append0x(temp.slice(20, 22))
    const extinfoData = decode(temp.slice(22))
    return new Nft(version, characteristic, configure, state, extinfoData)
  }
}

export default Nft
