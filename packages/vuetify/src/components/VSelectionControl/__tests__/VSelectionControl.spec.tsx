// Components
import { makeVSelectionControlProps, useSelectionControl, VSelectionControl } from '../VSelectionControl'
import { VSelectionControlGroupSymbol } from '@/components/VSelectionControlGroup/VSelectionControlGroup'

// Utilities
import { mount } from '@vue/test-utils'
import { computed, defineComponent, nextTick, shallowRef } from 'vue'
import { createVuetify } from '@/framework'

describe('VSelectionControl', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount(defineComponent({
      props: makeVSelectionControlProps(),
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
    const update = vi.fn()
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
    const update = vi.fn()
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

  it('should notify the group and control when selecting an option', () => {
    const selected = shallowRef<string[]>([])
    const updateGroup = vi.fn((value: string[]) => { selected.value = value })
    const modelValue = computed({ get: () => selected.value, set: updateGroup })
    const update = vi.fn()
    const wrapper = mountFunction({
      props: {
        modelValue: [],
        multiple: true,
        value: 'a',
        'onUpdate:modelValue': update,
      },
      global: {
        plugins: [vuetify],
        provide: {
          [VSelectionControlGroupSymbol as symbol]: { modelValue },
        },
      },
    })

    wrapper.vm.model = true

    expect(selected.value).toEqual(['a'])
    expect(updateGroup).toHaveBeenCalledExactlyOnceWith(['a'])
    expect(update).toHaveBeenCalledExactlyOnceWith(['a'])
  })

  it('should apply focus classes when readonly and focused', async () => {
    const wrapper = mount(VSelectionControl, {
      global: { plugins: [vuetify] },
      attachTo: document.body,
      props: {
        readonly: true,
      },
    })
    const input = wrapper.find('input')

    input.element.focus()
    await nextTick()

    expect(wrapper.classes()).toContain('v-selection-control--focused')
    expect(wrapper.classes()).toContain('v-selection-control--focus-visible')

    await input.trigger('blur')
    await nextTick()

    expect(wrapper.classes()).not.toContain('v-selection-control--focused')
  })
})
