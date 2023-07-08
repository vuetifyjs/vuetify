import { propsFactory } from '../propsFactory'

// Utilities
import { describe, expect, it } from '@jest/globals'

describe('propsFactory', () => {
  it.each([
    [String, undefined, { type: String }],
    [String, '', { type: String, default: '' }],
    [String, false, { type: String, default: false }],
    [{ type: String }, '', { type: String, default: '' }],

    [[Boolean, String], undefined, { type: [Boolean, String] }],
    [[Boolean, String], 6, { type: [Boolean, String], default: 6 }],

    [null, undefined, { type: null }],
  ])('propsFactory %#', (definition, defaults, result) => {
    expect(
      // @ts-expect-error
      propsFactory({ foo: definition })(
        defaults === undefined ? defaults : { foo: defaults }
      )
    ).toStrictEqual({ foo: result })
  })

  it.each([
    [String, undefined, { type: String }],
    [String, 'bar', { type: String, source: 'bar' }],
    [{ type: String }, 'bar', { type: String, source: 'bar' }],
    [[Boolean, String], 'bar', { type: [Boolean, String], source: 'bar' }],
  ])('should set source property %#', (definition, source, result) => {
    expect(
      // @ts-expect-error
      propsFactory({ foo: definition }, source)()
    ).toStrictEqual({ foo: result })
  })
})
