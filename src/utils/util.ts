import camelcaseKeys from 'camelcase-keys'

export const toCamelcase = (object: any) => {
  try {
    return JSON.parse(
      JSON.stringify(
        camelcaseKeys(object, {
          deep: true,
        }),
      ),
    )
  } catch (error) {
    console.error(error)
  }
  return null
}

export enum UpdateActions {
  LOCK,
  CLAIM,
  ADD_EXT_INFO,
  UPDATE_CHARACTERISTIC,
  UPDATE_STATE_WITH_ISSUER,
  UPDATE_STATE_WITH_CLASS,
}

export default toCamelcase
