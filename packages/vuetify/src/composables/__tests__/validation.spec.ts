// Composables
import { useValidation } from '../validation'

// Utilites
import { ref } from 'vue'
import { describe, expect, it } from '@jest/globals'

// Types
import type { ValidationProps, ValidationRule } from './../validation'

describe('validation.ts', () => {
  it.each([
    ['', [], []],
    ['', ['foo'], ['foo']],
    ['', [(v: any) => !!v || 'foo'], ['foo']],
    ['', [(v: any) => !!v || ''], ['']],
    ['', [(v: any) => Promise.resolve(!!v || 'fizz')], ['fizz']],
    ['', [(v: any) => new Promise(resolve => resolve(!!v || 'buzz'))], ['buzz']],
    ['foo', [(v: any) => v === 'foo' || 'bar'], []],
    ['foo', [(v: any) => v === 'bar' || 'fizz'], ['fizz']],
  ])('should validate rules and return array of errorMessages', async (
    value: any,
    rules: ValidationRule[],
    expected: any
  ) => {
    const model = ref(value)
    const props = { rules } as ValidationProps
    const { errorMessages, validate } = useValidation(props, model)

    expect(errorMessages.value).toEqual([])

    await validate()

    expect(errorMessages.value).toEqual(expected)
  })

  it.each([
    [null, 1],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 4],
  ])('only validate up to the maximum error count', async (
    maxErrors: number | string,
    expected: number,
  ) => {
    const { errorMessages, validate } = useValidation({
      maxErrors,
      rules: ['foo', 'bar', 'fizz', 'buzz'],
    }, ref(''))

    await validate()

    expect(errorMessages.value).toHaveLength(expected)
  })

  it('should warn the user when using an improper rule fn', async () => {
    const rule = (v: any) => !!v || 1234
    const { validate } = useValidation({
      rules: [rule as any],
    }, ref(''))

    await validate()

    expect(`${1234} is not a valid value. Rule functions should return boolean true or a string.`).toHaveBeenTipped()
  })

  it('should update isPristine when using the validate and reset methods', async () => {
    const model = ref('')
    const { isPristine, isValid, validate, reset } = useValidation({
      rules: [(v: any) => v === 'foo' || 'bar'],
    }, model)

    expect(isPristine.value).toBe(true)
    expect(isValid.value).toBeNull()

    await validate()

    expect(isPristine.value).toBe(false)
    expect(isValid.value).toBe(false)

    model.value = 'fizz'

    await validate()

    expect(isPristine.value).toBe(false)
    expect(isValid.value).toBe(false)

    model.value = 'foo'

    await validate()

    expect(isPristine.value).toBe(false)
    expect(isValid.value).toBe(true)

    reset()

    expect(isPristine.value).toBe(true)
    expect(isValid.value).toBeNull()
  })
})
