// Components
import { VColorInput } from '../VColorInput'

// Utilities
import { render, screen, userEvent, waitIdle } from '@test'
import { ref } from 'vue'

describe('VColorInput', () => {
  it('should not fire @update:focus twice when clicking bottom of input', async () => {
    const onFocus = vi.fn()
    const { element } = render(() => (
      <VColorInput onUpdate:focused={ onFocus } />
    ))

    await userEvent.click(element, { position: { x: 92, y: 55 } })

    expect(onFocus).toHaveBeenCalledTimes(1)
  })

  it('should expose the VTextField api it wraps', async () => {
    const cmp = ref<any>()

    render(() => <VColorInput ref={ cmp } />)
    await waitIdle()

    for (const key of ['focus', 'blur', 'reset', 'resetValidation', 'validate']) {
      // eslint-disable-next-line @vitest/prefer-expect-type-of
      expect(typeof cmp.value[key], key).toBe('function')
    }

    expect('isValid' in cmp.value).toBe(true)
    expect(cmp.value.validate()).toBeInstanceOf(Promise)

    cmp.value.focus()
    expect(document.activeElement).toBe(screen.getByCSS('.v-color-input input'))
  })
})
