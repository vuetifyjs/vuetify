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

    interface Entry {
      method: string
      missing: boolean
    }
    const missingMethods = [
      'focus',
      'blur',
      'reset',
      'resetValidation',
      'validate',
    ].map(k => ({ method: k, missing: typeof cmp.value[k] !== 'function' } as Entry))
      .filter(({ missing }) => missing).map(({ method }) => method)

    expect(missingMethods).toEqual([])

    expect('isValid' in cmp.value).toBe(true)
    expect(cmp.value.validate()).toBeInstanceOf(Promise)

    cmp.value.focus()
    expect(document.activeElement).toBe(screen.getByCSS('.v-color-input input'))
  })
})
