import { VSnackbar } from '..'

// Utilities
import { render, screen } from '@test'

// Tests
describe('VSnackbar', () => {
  it.each([
    [{}],
    [{ timer: 'bottom' }],
  ])('should cover the whole snackbar with the tonal underlay %o', async props => {
    render(() => (
      <VSnackbar
        modelValue
        color="success"
        variant="tonal"
        timeout={ -1 }
        text="Saved"
        { ...props }
      />
    ))

    const wrapper = await screen.findByCSS('.v-snackbar__wrapper')
    const underlay = wrapper.querySelector(':scope > .v-snackbar__underlay')!

    await expect.poll(() => wrapper.getBoundingClientRect().height).toBeGreaterThan(0)

    const wrapperRect = wrapper.getBoundingClientRect()
    const underlayRect = underlay.getBoundingClientRect()

    expect(underlayRect.width).toBe(wrapperRect.width)
    expect(underlayRect.height).toBe(wrapperRect.height)
  })
})
