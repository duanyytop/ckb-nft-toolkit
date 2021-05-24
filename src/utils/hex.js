const remove0x = hex => {
  if (hex.startsWith('0x')) {
    return hex.substring(2)
  }
  return hex
}

const ArrayBufferToHex = arrayBuffer => {
  return Array.prototype.map.call(new Uint8Array(arrayBuffer), x => ('00' + x.toString(16)).slice(-2)).join('')
}

const u32ToHex = (u32, littleEndian) => {
  let buffer = new ArrayBuffer(4)
  let view = new DataView(buffer)
  view.setUint32(0, u32, littleEndian)
  return ArrayBufferToHex(buffer)
}

const u32ToBe = u32 => {
  return u32ToHex(u32, false)
}

const u32ToLe = u32 => {
  return u32ToHex(u32, true)
}

const u8ToHex = u8 => {
  let buffer = new ArrayBuffer(1)
  let view = new DataView(buffer)
  view.setUint8(0, u8)
  return ArrayBufferToHex(buffer)
}

const u64ToLe = u64 => {
  if (typeof u64 !== 'bigint') {
    throw new Error('u64 must be bigint')
  }
  const val = u64.toString(16)
  const viewRight = u32ToLe(`0x${val.slice(0, 8)}`).slice(2)
  const viewLeft = u32ToLe(`0x${val.slice(8)}`).slice(2)
  return `${viewLeft}${viewRight}`
}

module.exports = {
  u8ToHex,
  u32ToBe,
  u64ToLe,
  remove0x,
}
