// Components
import { makeSelectionControlProps, useSelectionControl } from '../VSelectionControl'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { createVuetify } from '@/framework'

describe('VSelectionControl', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount(defineComponent({
      props: makeSelectionControlProps(),
      setup (props) {
        return useSelectionControl(props as any)
      },
      render: () => undefined,
    }), {
      global: { plugins: [vuetify] },
      ...options,
    })
  }

  it('should use value', async () => {
    const wrapper = mountFunction({
      props: {
        value: 'foo',
      },
    })
    expect(wrapper.vm.model).toBe(false)
    wrapper.setProps({ modelValue: 'foo' })
    await nextTick()
    expect(wrapper.vm.model).toBe(true)
  })

  it('should use trueValue', async () => {
    const update = jest.fn()
    const wrapper = mountFunction({
      props: {
        trueValue: 'on',
        falseValue: 'off',
        modelValue: 'off',
        'onUpdate:modelValue': update,
      },
    })
    expect(wrapper.vm.model).toBe(false)
    wrapper.vm.model = true
    expect(update).toHaveBeenCalledTimes(1)
    expect(update).toHaveBeenCalledWith('on')
  })

  it('should use falseValue', async () => {
    const update = jest.fn()
    const wrapper = mountFunction({
      props: {
        trueValue: 'on',
        falseValue: 'off',
        modelValue: 'on',
        'onUpdate:modelValue': update,
      },
    })
    expect(wrapper.vm.model).toBe(true)
    wrapper.vm.model = false
    await nextTick()
    expect(update).toHaveBeenCalledTimes(1)
    expect(update).toHaveBeenCalledWith('off')
  })
})
