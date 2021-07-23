import { hexToBytes, bytesToHex } from '@nervosnetwork/ckb-sdk-utils'

export const remove0x = (hex: string) => {
  if (hex.startsWith('0x')) {
    return hex.substring(2)
  }
  return hex
}

const ArrayBufferToHex = (arrayBuffer: ArrayBuffer) => {
  return Array.prototype.map.call(new Uint8Array(arrayBuffer), x => ('00' + x.toString(16)).slice(-2)).join('')
}

export const u16ToBe = (u16: number) => {
  let buffer = new ArrayBuffer(2)
  let view = new DataView(buffer)
  view.setUint16(0, u16, false)
  return ArrayBufferToHex(buffer)
}

const u32ToHex = (u32: string | number, littleEndian?: boolean) => {
  let buffer = new ArrayBuffer(4)
  let view = new DataView(buffer)
  view.setUint32(0, Number(u32), littleEndian)
  return ArrayBufferToHex(buffer)
}

export const u32ToBe = (u32: string | number) => {
  return u32ToHex(u32, false)
}

export const u32ToLe = (u32: string | number) => {
  return u32ToHex(u32, true)
}

export const u8ToHex = (u8: number) => {
  let buffer = new ArrayBuffer(1)
  let view = new DataView(buffer)
  view.setUint8(0, u8)
  return ArrayBufferToHex(buffer)
}

export const u64ToLe = (u64: bigint) => {
  if (typeof u64 !== 'bigint') {
    throw new Error('u64 must be bigint')
  }
  const val = u64.toString(16).padStart(16, '0')
  const viewRight = u32ToLe(`0x${val.slice(0, 8)}`)
  const viewLeft = u32ToLe(`0x${val.slice(8)}`)
  return `${viewLeft}${viewRight}`
}

export const encode = (hex: string) => {
  if (!hex) {
    return '0000'
  }
  return `${u16ToBe(remove0x(hex).length / 2)}${remove0x(hex)}`
}

export const decode = (hex: string) => {
  if (hex === '' || hex === '0000') {
    return ''
  }
  const size = parseInt(hex.slice(0, 4)) * 2
  if (size !== hex.length - 4) {
    throw new Error('Dynamic data format invalid')
  }
  return hex.slice(4)
}

export const utf8ToHex = (text: string) => {
  let result = text.trim()
  if (result.startsWith('0x')) {
    return result
  }
  result = bytesToHex(new TextEncoder().encode(result))
  return result
}

export const hexToUtf8 = (hex: string) => {
  let result = hex.trim()
  try {
    result = new TextDecoder().decode(hexToBytes(result))
  } catch (error) {
    console.error('hexToUtf8 error:', error)
  }
  return result
}
