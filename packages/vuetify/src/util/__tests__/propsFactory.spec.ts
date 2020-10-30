import propsFactory from '../propsFactory'

test.each([
  [String, undefined, String],
  [String, '', { type: String, default: '' }],
  [String, false, { type: String, default: false }],
  [{ type: String }, '', { type: String, default: '' }],

  [[Boolean, String], undefined, [Boolean, String]],
  [[Boolean, String], 6, { type: [Boolean, String], default: 6 }],

  [null, undefined, null],
])('propsFactory %#', (definition, defaults, result) => {
  expect(
    propsFactory({ foo: definition })(
      defaults === undefined ? defaults : { foo: defaults }
    )
  ).toStrictEqual({ foo: result })
})
