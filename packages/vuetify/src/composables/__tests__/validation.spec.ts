// Composables
import { makeValidationProps, useValidation } from '../validation'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'

// Types
import type { ValidationProps } from '../validation'

describe('validation', () => {
  function mountFunction (props: Partial<ValidationProps> = {}) {
    return mount(defineComponent({
      props: makeValidationProps(),
      emits: ['update:modelValue'],
      setup (props) {
        return useValidation(props, 'validation')
      },
      render: () => {}, // eslint-disable-line vue/require-render-return
    }), { props })
  }

  it.each([
    ['', [], []],
    ['', ['foo'], ['foo']],
    ['', [(v: any) => !!v || 'foo'], ['foo']],
    ['', [(v: any) => !!v || ''], ['']],
    ['', [(v: any) => Promise.resolve(!!v || 'fizz')], ['fizz']],
    ['', [(v: any) => new Promise<boolean | string>(resolve => resolve(!!v || 'buzz'))], ['buzz']],
    ['foo', [(v: any) => v === 'foo' || 'bar'], []],
    ['foo', [(v: any) => v === 'bar' || 'fizz'], ['fizz']],
  ])('should validate rules and return array of errorMessages %#', async (modelValue, rules, expected) => {
    const props = { rules, modelValue }
    const wrapper = mountFunction(props)

    expect(wrapper.vm.errorMessages).toEqual([])
    await wrapper.vm.validate()
    expect(wrapper.vm.errorMessages).toEqual(expected)
  })

  it.each([
    [undefined, 1],
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 4],
  ])('only validate up to the maximum error count %s', async (maxErrors, expected) => {
    const wrapper = mountFunction({
      maxErrors,
      rules: ['foo', 'bar', 'fizz', 'buzz'],
    })

    await wrapper.vm.validate()

    expect(wrapper.vm.errorMessages).toHaveLength(expected)
  })

  it.each([
    [undefined, 1],
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 4],
  ])('only display up to the maximum error count %s', async (maxErrors, expected) => {
    const wrapper = mountFunction({
      maxErrors,
      errorMessages: ['foo', 'bar', 'fizz', 'buzz'],
    })

    await wrapper.vm.validate()

    expect(wrapper.vm.errorMessages).toHaveLength(expected)
  })

  it.each([
    [undefined, ['foo']],
    [0, []],
    [1, ['foo']],
    [2, ['foo']],
  ])('should not trim error message if passed as text', async (maxErrors, expected) => {
    const wrapper = mountFunction({
      maxErrors,
      errorMessages: 'foo',
    })

    await wrapper.vm.validate()

    expect(wrapper.vm.errorMessages).toStrictEqual(expected)
  })

  it('should warn the user when using an improper rule fn', async () => {
    const rule = (v: any) => !!v || 1234
    const wrapper = mountFunction({
      rules: [rule as any],
    })

    await wrapper.vm.validate()

    expect(`${1234} is not a valid value. Rule functions must return boolean true or a string.`).toHaveBeenTipped()
  })

  it('should update isPristine when using the validate and reset methods', async () => {
    const wrapper = mountFunction({
      rules: [(v: any) => v === 'foo' || 'bar'],
      modelValue: '',
    })

    await nextTick()

    expect(wrapper.vm.isPristine).toBe(true)
    expect(wrapper.vm.isValid).toBeNull()

    await wrapper.vm.validate()

    expect(wrapper.vm.isPristine).toBe(false)
    expect(wrapper.vm.isValid).toBe(false)

    await wrapper.setProps({ modelValue: 'fizz' })

    await nextTick()
    await wrapper.vm.validate()

    expect(wrapper.vm.isPristine).toBe(false)
    expect(wrapper.vm.isValid).toBe(false)

    await wrapper.setProps({ modelValue: 'foo' })

    await nextTick()
    await wrapper.vm.validate()

    expect(wrapper.vm.isPristine).toBe(false)
    expect(wrapper.vm.isValid).toBe(true)

    wrapper.vm.reset()
    await nextTick() // model update
    await nextTick() // await rules

    expect(wrapper.vm.isPristine).toBe(true)
    expect(wrapper.vm.isValid).toBeNull()
  })

  it('should return valid if no rules are set', async () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.isValid).toBe(true)

    await wrapper.setProps({ rules: [] })

    expect(wrapper.vm.isValid).toBe(true)

    await wrapper.setProps({ error: true })

    expect(wrapper.vm.isValid).toBe(false)
  })

  it('should return invalid if error is manually set', async () => {
    const wrapper = mountFunction({
      error: true,
    })

    expect(wrapper.vm.isValid).toBe(false)

    await wrapper.setProps({ error: false, errorMessages: ['error'] })

    expect(wrapper.vm.isValid).toBe(false)

    await wrapper.setProps({ errorMessages: [] })

    expect(wrapper.vm.isValid).toBe(true)
  })
})
