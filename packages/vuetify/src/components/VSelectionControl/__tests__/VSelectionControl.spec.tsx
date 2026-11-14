// Components
import { makeVSelectionControlProps, useSelectionControl, VSelectionControl } from '../VSelectionControl'

// Utilities
import { mount } from '@vue/test-utils'
import { computed, defineComponent, nextTick, ref } from 'vue'
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

  it('should emit again when a writable model rejects the update', async () => {
    const updates = vi.fn()
    const source = ref(false)
    let accept = false
    const model = computed({
      get: () => source.value,
      set: (value: boolean) => {
        updates(value)
        if (accept) source.value = value
      },
    })

    const wrapper = mount(defineComponent({
      setup () {
        return () => (
          <VSelectionControl
            modelValue={ model.value }
            type="checkbox"
            onUpdate:modelValue={ (value: boolean) => { model.value = value } }
          />
        )
      },
    }), {
      attachTo: document.body,
      global: { plugins: [vuetify] },
    })

    const input = wrapper.get('input').element as HTMLInputElement

    input.click()
    await nextTick()

    expect(updates).toHaveBeenCalledTimes(1)
    expect(updates).toHaveBeenLastCalledWith(true)
    expect(source.value).toBe(false)
    expect(input.checked).toBe(false)

    input.click()
    await nextTick()

    expect(updates).toHaveBeenCalledTimes(2)
    expect(updates).toHaveBeenLastCalledWith(true)
    expect(input.checked).toBe(false)

    accept = true
    input.click()
    await nextTick()

    expect(updates).toHaveBeenCalledTimes(3)
    expect(source.value).toBe(true)
    expect(input.checked).toBe(true)

    wrapper.unmount()
  })

  it('should keep the input checked when the model accepts the update', async () => {
    const source = ref(false)
    const model = computed({
      get: () => source.value,
      set: (value: boolean) => {
        source.value = value
      },
    })

    const wrapper = mount(defineComponent({
      setup () {
        return () => (
          <VSelectionControl
            modelValue={ model.value }
            type="checkbox"
            onUpdate:modelValue={ (value: boolean) => { model.value = value } }
          />
        )
      },
    }), {
      attachTo: document.body,
      global: { plugins: [vuetify] },
    })

    const input = wrapper.get('input').element as HTMLInputElement

    input.click()
    await nextTick()

    expect(source.value).toBe(true)
    expect(input.checked).toBe(true)

    input.click()
    await nextTick()

    expect(source.value).toBe(false)
    expect(input.checked).toBe(false)

    wrapper.unmount()
  })
})
