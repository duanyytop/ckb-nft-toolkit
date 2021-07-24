import { u8ToHex, u32ToBe, encode, remove0x } from '../utils/hex'

class TokenClass {
  version: U8 = 0
  total: U32 = 0
  issued: U32 = 0
  configure: U8 = 0
  name: DynHex = ''
  description: DynHex = ''
  renderer: DynHex = ''
  extinfoData: DynHex = ''

  constructor(
    version = 0,
    total: U32,
    issued: U32,
    configure: U8,
    name: DynHex,
    description: DynHex,
    renderer: DynHex,
    extinfoData = '',
  ) {
    this.version = version
    this.total = total
    this.issued = issued
    this.configure = configure
    this.name = name
    this.description = description
    this.renderer = renderer
    this.extinfoData = extinfoData
  }

  toString() {
    const dynamic = `${encode(this.name)}${encode(this.description)}${encode(this.renderer)}${encode(this.extinfoData)}`
    return `0x${u8ToHex(this.version)}${u32ToBe(this.total)}${u32ToBe(this.issued)}${u8ToHex(this.configure)}${dynamic}`
  }

  updateIssued(issued) {
    this.issued = issued
  }

  updateName(name) {
    this.name = name
  }

  static fromString(data: Hex) {
    const temp = remove0x(data)
    if (temp.length < 24) {
      throw new Error('Class data invalid')
    }
    const version = parseInt(temp.slice(0, 2), 16)
    const total = parseInt(temp.slice(2, 10), 16)
    const issued = parseInt(temp.slice(10, 18), 16)
    const configure = parseInt(temp.slice(18, 20), 16)

    const nameLen = parseInt(temp.slice(20, 24), 16) * 2
    const name = temp.slice(24, nameLen + 24)

    if (temp.length < 28 + nameLen) {
      throw new Error('Class data invalid')
    }

    const descriptionLen = parseInt(temp.slice(nameLen + 24, nameLen + 28), 16) * 2
    const description = temp.slice(nameLen + 28, descriptionLen + nameLen + 28)

    if (temp.length < descriptionLen + nameLen + 32) {
      throw new Error('Class data invalid')
    }

    const rendererLen = parseInt(temp.slice(descriptionLen + nameLen + 28, descriptionLen + nameLen + 32), 16) * 2
    const renderer = temp.slice(descriptionLen + nameLen + 32, descriptionLen + nameLen + rendererLen + 32)

    return new TokenClass(version, total, issued, configure, name, description, renderer)
  }
}

export default TokenClass
