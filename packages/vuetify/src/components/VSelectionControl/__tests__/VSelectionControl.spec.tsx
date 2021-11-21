// Components
import { VSelectionControl } from '..'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from '@jest/globals'

describe('VSelectionControl', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount({
      render: () => (<VSelectionControl ref="control" />),
    }, {
      global: { plugins: [vuetify] },
      ...options,
    })
  }

  it('should expose variables when using refs', () => {
    const wrapper = mountFunction()
    const vm = wrapper.findComponent({ ref: 'control' })
    const input = wrapper.find('input')

    expect(vm.componentVM.isFocused).toBe(false)

    input.trigger('focus')

    expect(vm.componentVM.isFocused).toBe(true)
  })
})
