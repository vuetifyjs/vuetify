// Components
import { VSwitch } from '../VSwitch'

// Utilities
import { mount } from '@vue/test-utils'
import { computed, defineComponent, nextTick, ref } from 'vue'
import { createVuetify } from '@/framework'

describe('VSwitch', () => {
  const vuetify = createVuetify()

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
          <VSwitch
            modelValue={ model.value }
            onUpdate:modelValue={ (value: boolean | null) => { if (value != null) model.value = value } }
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
})
