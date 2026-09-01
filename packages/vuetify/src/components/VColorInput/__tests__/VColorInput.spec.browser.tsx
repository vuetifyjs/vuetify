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

    const missing = [
      'focus',
      'blur',
      'reset',
      'resetValidation',
      'validate',
    ].filter(k => typeof cmp.value[k] !== 'function')

    expect(missing).toEqual([])

    expect('isValid' in cmp.value).toBe(true)
    expect(cmp.value.validate()).toBeInstanceOf(Promise)

    cmp.value.focus()
    expect(document.activeElement).toBe(screen.getByCSS('.v-color-input input'))
  })
})
