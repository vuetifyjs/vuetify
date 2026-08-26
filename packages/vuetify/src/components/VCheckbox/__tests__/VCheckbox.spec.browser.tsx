// Components
import { VCheckbox } from '@/components/VCheckbox'

// Utilities
import { render, screen, userEvent, waitIdle } from '@test'
import { ref } from 'vue'

describe('VCheckbox exposed focus', () => {
  it('should focus and blur from a ref', async () => {
    const cmp = ref<any>()

    render(() => <VCheckbox ref={ cmp } />)
    await waitIdle()

    // eslint-disable-next-line @vitest/prefer-expect-type-of
    expect(typeof cmp.value.focus).toBe('function')
    // eslint-disable-next-line @vitest/prefer-expect-type-of
    expect(typeof cmp.value.blur).toBe('function')

    cmp.value.focus()
    expect(document.activeElement).toBe(screen.getByCSS('input[type="checkbox"]'))

    cmp.value.blur()
    expect(document.activeElement).not.toBe(screen.getByCSS('input[type="checkbox"]'))
  })

  it('should set the focus-visible class when focus({ focusVisible: true }) is used', async () => {
    const cmp = ref<any>()

    render(() => <VCheckbox ref={ cmp } />)
    await waitIdle()

    cmp.value.focus({ focusVisible: true })
    await waitIdle()

    expect(screen.getByCSS('.v-selection-control')).toHaveClass('v-selection-control--focus-visible')
  })

  it('should still set focus-visible when the input is already focused', async () => {
    const cmp = ref<any>()

    render(() => <VCheckbox ref={ cmp } />)
    await waitIdle()

    // a pointer-driven focus deliberately leaves the ring off
    await userEvent.click(screen.getByCSS('input[type="checkbox"]'))
    await waitIdle()
    expect(screen.getByCSS('.v-selection-control')).not.toHaveClass('v-selection-control--focus-visible')

    // no focus event fires here — the flag has to be set directly
    cmp.value.focus({ focusVisible: true })
    await waitIdle()

    expect(screen.getByCSS('.v-selection-control')).toHaveClass('v-selection-control--focus-visible')
  })

  it('should expose the VInput api it wraps and not shadow it', async () => {
    const cmp = ref<any>()

    render(() => <VCheckbox ref={ cmp } />)
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
  })
})
