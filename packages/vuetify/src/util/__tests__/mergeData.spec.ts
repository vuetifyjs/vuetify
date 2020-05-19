import { mergeClasses, mergeListeners, mergeStyles } from '../mergeData'

function verifyFactory (mergeMethod: (target: any, source: any) => any) {
  return function verify (target: any, source: any, expected: any) {
    if (expected === target) {
      expect(mergeMethod(target, source)).toBe(expected)
    } else {
      expect(mergeMethod(target, source)).toStrictEqual(expected)
    }
  }
}

describe('mergeClasses', () => {
  const cUndefined = undefined
  const cEmptyString = ''
  const cString = 'foo bar'
  const cArray = ['foo', 'bar']
  const cObject = { foo: true, bar: false }

  it.each([
    [cUndefined, cUndefined, cUndefined],
    [cUndefined, cObject, cObject],
    [cEmptyString, cUndefined, cEmptyString],
    [cUndefined, cObject, cObject],
    [cString, cUndefined, cString],
    [cString, cEmptyString, cString],
    [cString, cString, [cString, cString]],
    [cString, cArray, [cString, ...cArray]],
    [cString, cObject, [cString, cObject]],
    [cArray, cUndefined, cArray],
    [cArray, cEmptyString, cArray],
    [cArray, cString, [...cArray, cString]],
    [cArray, cArray, [...cArray, ...cArray]],
    [cArray, cObject, [...cArray, cObject]],
    [cObject, cUndefined, cObject],
    [cObject, cEmptyString, cObject],
    [cObject, cString, [cObject, cString]],
    [cObject, cArray, [cObject, ...cArray]],
    [cObject, cObject, [cObject, cObject]],
  ])('should merge classes', verifyFactory(mergeClasses))
})

describe('mergeStyles', () => {
  const cUndefined = undefined
  const cEmptyString = ''
  const cString = 'foo: bar; fizz-buzz: 10px; background: var(--background)'
  const cObject = { foo: 'bar', fizzBuzz: '10px', background: 'var(--background)' }

  it.each([
    [cUndefined, cUndefined, cUndefined],
    [cUndefined, cObject, cObject],
    [cEmptyString, cUndefined, cUndefined],
    [cUndefined, cObject, cObject],
    [cString, cUndefined, cString],
    [cString, cEmptyString, cString],
    [cString, cString, [cObject, cObject]],
    [cString, cObject, [cObject, cObject]],
    [cObject, cUndefined, cObject],
    [cObject, cEmptyString, cObject],
    [cObject, cString, [cObject, cObject]],
    [cObject, cObject, [cObject, cObject]],
  ])('should merge styles', verifyFactory(mergeStyles))
})

describe('mergeListeners', () => {
  const listener1 = () => {}
  const listener2 = () => {}

  it.each([
    [undefined, undefined, undefined],
    [undefined, { one: listener1 }, { one: listener1 }],
    [undefined, { one: [listener1, listener2] }, { one: [listener1, listener2] }],
    [{ one: listener1 }, undefined, { one: listener1 }],
    [{ one: [listener1, listener2] }, undefined, { one: [listener1, listener2] }],
    [{ one: listener1 }, { one: listener2 }, { one: [listener1, listener2] }],
    [{ one: listener1 }, { one: [listener2] }, { one: [listener1, listener2] }],
    [{ one: [listener1, listener2] }, { one: [listener2] }, { one: [listener1, listener2, listener2] }],
    [{ one: [listener1, listener2] }, { two: listener2 }, { one: [listener1, listener2], two: listener2 }],
  ])('should merge listeners', verifyFactory(mergeListeners))
})
