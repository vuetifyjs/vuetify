// Components
import { VColorInput } from '../VColorInput'

// Utilities
import { render, screen, userEvent } from '@test'

const openPickers = () => [...document.querySelectorAll<HTMLElement>('.v-color-picker')].filter(el => el.checkVisibility())

describe('VColorInput', () => {
  it('should close the picker when tabbing out of the field', async () => {
    render(() => (
      <>
        <button data-testid="before">before</button>
        <VColorInput />
        <button data-testid="after">after</button>
      </>
    ))

    const input = screen.getByCSS('.v-color-input input[type="text"]')

    await userEvent.click(input)
    await expect.poll(openPickers).toHaveLength(1)

    await userEvent.keyboard('{Shift>}{Tab}{/Shift}')
    await expect.poll(openPickers).toHaveLength(0)
    expect(document.activeElement).toBe(screen.getByTestId('before'))

    await userEvent.click(input)
    await expect.poll(openPickers).toHaveLength(1)

    await userEvent.keyboard('{Tab}')
    await expect.poll(openPickers).toHaveLength(0)
    expect(document.activeElement).toBe(screen.getByTestId('after'))
  })

  it('should keep only the focused field open when both use open-on-focus', async () => {
    render(() => (
      <>
        <VColorInput label="A" openOnFocus />
        <VColorInput label="B" openOnFocus />
      </>
    ))

    const inputs = screen.getAllByCSS('.v-color-input input[type="text"]')

    inputs[0].focus()
    await expect.poll(openPickers).toHaveLength(1)

    await userEvent.keyboard('{Tab}')
    await expect.poll(() => document.activeElement).toBe(inputs[1])
    await expect.poll(openPickers).toHaveLength(1)

    await userEvent.keyboard('{Shift>}{Tab}{/Shift}')
    await expect.poll(() => document.activeElement).toBe(inputs[0])
    await expect.poll(openPickers).toHaveLength(1)
  })

  it('should not fire @update:focus twice when clicking bottom of input', async () => {
    const onFocus = vi.fn()
    const { element } = render(() => (
      <VColorInput onUpdate:focused={ onFocus } />
    ))

    await userEvent.click(element, { position: { x: 92, y: 55 } })

    expect(onFocus).toHaveBeenCalledTimes(1)
  })
})
