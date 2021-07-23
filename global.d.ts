/// <reference types="@nervosnetwork/ckb-types" />

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
  state?: U8
}
