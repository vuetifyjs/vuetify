import { makeVSelectionControlProps, useSelectionControl } from '../VSelectionControl'

// Utilities
import { render } from '@test'
import { defineComponent, nextTick, ref } from 'vue'

// Types
import type { ComponentPublicInstance } from 'vue'

// Define an interface for the expected VM structure
interface VSelectionControlInstance extends ComponentPublicInstance {
  model: boolean
  // modelValue is a prop, so it's accessed via $props
  $props: { modelValue?: any, value?: any, trueValue?: any, falseValue?: any }
  // Include other properties returned by useSelectionControl if needed for tests
  id: string
  isDirty: boolean
  // ... any other relevant properties from useSelectionControl
}

describe('VSelectionControl', () => {
  function renderFunction (propsData = {}, setupReturns = {}) {
    return render(defineComponent({
      props: makeVSelectionControlProps(),
      setup (props) {
        const control = useSelectionControl(props as any)
        return { ...control, ...setupReturns }
      },
      render: () => undefined,
    }), {
      props: propsData,
    }) as { vm: VSelectionControlInstance } // Cast the vm type here
  }

  it('should use value', async () => {
    const { vm } = renderFunction({
      value: 'foo',
      modelValue: undefined, // Explicitly pass modelValue if it can be undefined
    })
    expect(vm.model).toBe(false) // model should be false if modelValue !== value
    // To change the model by simulating external v-model update:
    // We need to re-render or directly update the prop that useSelectionControl reacts to.
    // useSelectionControl uses a computed `model` based on `props.modelValue` vs `props.value` (or true/false value)
    // Let's test by re-rendering with the new modelValue.
    const { vm: vm2 } = renderFunction({
      value: 'foo',
      modelValue: 'foo',
    })
    expect(vm2.model).toBe(true)
  })

  it('should use trueValue and falseValue for model', async () => {
    const onUpdate = vi.fn()
    const { vm } = renderFunction({
      trueValue: 'on',
      falseValue: 'off',
      modelValue: 'off',
      'onUpdate:modelValue': onUpdate,
    })
    expect(vm.model).toBe(false)

    // Simulate internal change that should emit 'on'
    vm.model = true // This directly sets the ref returned by useSelectionControl
    await nextTick() // Wait for watchers and emits
    expect(onUpdate).toHaveBeenCalledTimes(1)
    expect(onUpdate).toHaveBeenCalledWith('on')

    // Simulate external change to 'on' and check model
    const { vm: vm2 } = renderFunction({
      trueValue: 'on',
      falseValue: 'off',
      modelValue: 'on',
      'onUpdate:modelValue': vi.fn(), // new mock for this render
    })
    expect(vm2.model).toBe(true)
  })

  it('should use falseValue when model set to false', async () => {
    const onUpdate = vi.fn()
    const { vm } = renderFunction({
      trueValue: 'on',
      falseValue: 'off',
      modelValue: 'on',
      'onUpdate:modelValue': onUpdate,
    })
    expect(vm.model).toBe(true)

    vm.model = false // This directly sets the ref returned by useSelectionControl
    await nextTick()
    expect(onUpdate).toHaveBeenCalledTimes(1)
    expect(onUpdate).toHaveBeenCalledWith('off')
  })
})
