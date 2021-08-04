import { u8ToHex, u32ToBe, encode, remove0x } from '../utils/hex'

class Issuer {
  version: U8 = 0
  classCount: U32 = 0
  setCount: U32 = 0
  info: DynHex = ''

  constructor(version = 0, classCount: U32, setCount = 0, info = '') {
    this.version = version
    this.classCount = classCount
    this.setCount = setCount
    this.info = info
  }

  toString() {
    return `0x${u8ToHex(this.version)}${u32ToBe(this.classCount)}${u32ToBe(this.setCount)}${encode(this.info)}`
  }

  updateClassCount(count: U32) {
    this.classCount = count
  }

  updateInfo(info: DynHex) {
    this.info = info
  }

  static fromProps(props: IssuerProps): Issuer {
    const { version, classCount, setCount, info } = props
    return new Issuer(version, classCount, setCount, info)
  }

  static fromString(data: Hex) {
    const temp = remove0x(data)
    if (temp.length < 18) {
      throw new Error('Issuer data invalid')
    }
    const version = parseInt(temp.slice(0, 2), 16)
    const classCount = parseInt(temp.slice(2, 10), 16)
    const setCount = parseInt(temp.slice(10, 18), 16)
    const info = temp.slice(18)
    return new Issuer(version, classCount, setCount, info)
  }
}

export default Issuer
