import { mapOrUndefined } from './utils'

describe('mapOrUndefined', () => {
  it('should act like unary map if items are changed', () => {
    const arr = ['string', 1]
    const cb = x => typeof x
    const tested = mapOrUndefined(arr, cb)
    const original = arr.map(cb)
    expect(tested).toEqual(original)
  })

  it('should return undefined if items are unchanged', () => {
    const arr = [0, 1, {}]
    const cb = x => x
    const tested = mapOrUndefined(arr, cb)
    expect(tested).toBe(undefined)
  })
})
