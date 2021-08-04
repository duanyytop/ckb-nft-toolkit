/// <reference types="@nervosnetwork/ckb-types" />
declare var TextEncoder: any
declare var TextDecoder: any

type U8 = number
type U16 = number
type U32 = number

type Hex = string
type DynHex = string // <size: u16> + <content>

interface IndexerCell {
  blockNumber: CKBComponents.BlockNumber
  outPoint: CKBComponents.OutPoint
  output: CKBComponents.CellOutput
  outputData: Hex[]
  txIndex: Hex
}
type IndexerCells = {
  objects: IndexerCell[]
  lastCursor: Hex
}

enum UpdateActions {
  LOCK,
  CLAIM,
  ADD_EXT_INFO,
  UPDATE_CHARACTERISTIC,
  UPDATE_STATE_WITH_ISSUER,
  UPDATE_STATE_WITH_CLASS,
}

type UpdateNFTProps = {
  extInfo?: DynHex
  characteristic?: U8[]
  issuerOutPoint?: CKBComponents.OutPoint
  classOutPoint?: CKBComponents.OutPoint
  state?: Hex
}

type NftIssuerProps = {
  issuerOutPoint: CKBComponents.OutPoint
  nftOutPoint: CKBComponents.OutPoint
}

type NftClassProps = {
  classOutPoint: CKBComponents.OutPoint
  nftOutPoint: CKBComponents.OutPoint
}

type IssuerProps = {
  version: U8
  classCount: U32
  setCount: U32
  info: DynHex
}

type TokenClassProps = {
  version: U8
  total: U32
  issued: U32
  configure: Hex
  name: DynHex
  description: DynHex
  renderer: DynHex
}

type NftProps = {
  version: U8
  characteristic: U8[]
  configure: Hex
  state: Hex
  extinfoData: DynHex
}
