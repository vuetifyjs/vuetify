// Composables
import { useValidation } from '../validation'

// Utilites
import { ref } from 'vue'
import { describe, expect, it } from '@jest/globals'

// Types
import type { ValidationProps, ValidationRules } from './../validation'

describe('validation.ts', () => {
  it.each([
    [[], []],
    [['foo'], ['foo']],
    [[() => 'bar'], ['bar']],
    [[() => true], []],
    [[() => false], []],
    [[() => Promise.resolve('fizz')], ['fizz']],
    [[() => new Promise(resolve => resolve('buzz'))], ['buzz']],
  ])('should validate rules and return array of errorMessages', async (
    rules: ValidationRules,
    expected: any
  ) => {
    const model = ref('')
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
    errorCount: number | null,
    expected: number,
  ) => {
    const { errorMessages, validate } = useValidation({
      errorCount,
      rules: ['foo', 'bar', 'fizz', 'buzz'],
    }, ref(''))

    await validate()

    expect(errorMessages.value).toHaveLength(expected)
  })
})
