import { mergeClasses, mergeListeners, mergeStyles } from '../mergeData'

describe('mergeClasses', () => {
  it('should merge classes', () => {
    const cUndefined = undefined
    const cEmptyString = ''
    const cString = 'foo bar'
    const cArray = ['foo', 'bar']
    const cObject = { foo: true, bar: false }

    expect(mergeClasses(cUndefined, cUndefined)).toBeUndefined()
    expect(mergeClasses(cUndefined, cObject)).toBe(cObject)
    expect(mergeClasses(cEmptyString, cUndefined)).toBe(cEmptyString)
    expect(mergeClasses(cUndefined, cObject)).toBe(cObject)
    expect(mergeClasses(cString, cUndefined)).toBe(cString)
    expect(mergeClasses(cString, cEmptyString)).toBe(cString)
    expect(mergeClasses(cString, cString)).toStrictEqual([cString, cString])
    expect(mergeClasses(cString, cArray)).toStrictEqual([cString, ...cArray])
    expect(mergeClasses(cString, cObject)).toStrictEqual([cString, cObject])
    expect(mergeClasses(cArray, cUndefined)).toBe(cArray)
    expect(mergeClasses(cArray, cEmptyString)).toBe(cArray)
    expect(mergeClasses(cArray, cString)).toStrictEqual([...cArray, cString])
    expect(mergeClasses(cArray, cArray)).toStrictEqual([...cArray, ...cArray])
    expect(mergeClasses(cArray, cObject)).toStrictEqual([...cArray, cObject])
    expect(mergeClasses(cObject, cUndefined)).toBe(cObject)
    expect(mergeClasses(cObject, cEmptyString)).toBe(cObject)
    expect(mergeClasses(cObject, cString)).toStrictEqual([cObject, cString])
    expect(mergeClasses(cObject, cArray)).toStrictEqual([cObject, ...cArray])
    expect(mergeClasses(cObject, cObject)).toStrictEqual([cObject, cObject])
  })
})

describe('mergeStyles', () => {
  it('should merge styles', () => {
    const cUndefined = undefined
    const cEmptyString = ''
    const cString = 'foo: bar; fizz-buzz: 10px; background: var(--background)'
    const cObject = { foo: 'bar', fizzBuzz: '10px', background: 'var(--background)' }

    expect(mergeStyles(cUndefined, cUndefined)).toBeUndefined()
    expect(mergeStyles(cUndefined, cObject)).toBe(cObject)
    expect(mergeStyles(cEmptyString, cUndefined)).toBeUndefined()
    expect(mergeStyles(cUndefined, cObject)).toBe(cObject)
    expect(mergeStyles(cString, cUndefined)).toBe(cString)
    expect(mergeStyles(cString, cEmptyString)).toBe(cString)
    expect(mergeStyles(cString, cString)).toStrictEqual([cObject, cObject])
    expect(mergeStyles(cString, cObject)).toStrictEqual([cObject, cObject])
    expect(mergeStyles(cObject, cUndefined)).toBe(cObject)
    expect(mergeStyles(cObject, cEmptyString)).toBe(cObject)
    expect(mergeStyles(cObject, cString)).toStrictEqual([cObject, cObject])
    expect(mergeStyles(cObject, cObject)).toStrictEqual([cObject, cObject])
  })
})

describe('mergeListeners', () => {
  it('should merge listeners', () => {
    const listener1 = () => {}
    const listener2 = () => {}

    expect(mergeListeners(undefined, undefined)).toBeUndefined()
    expect(mergeListeners(undefined, { one: listener1 })).toStrictEqual({ one: listener1 })
    expect(mergeListeners(undefined, { one: [listener1, listener2] })).toStrictEqual({ one: [listener1, listener2] })
    expect(mergeListeners({ one: listener1 }, undefined)).toStrictEqual({ one: listener1 })
    expect(mergeListeners({ one: [listener1, listener2] }, undefined)).toStrictEqual({ one: [listener1, listener2] })
    expect(mergeListeners({ one: listener1 }, { one: listener2 })).toStrictEqual({ one: [listener1, listener2] })
    expect(mergeListeners({ one: listener1 }, { one: [listener2] })).toStrictEqual({ one: [listener1, listener2] })
    expect(mergeListeners({ one: [listener1, listener2] }, { one: [listener2] })).toStrictEqual({ one: [listener1, listener2, listener2] })
  })
})
