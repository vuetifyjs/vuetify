import { VColorPicker } from '../VColorPicker'

// Utilities
import { render, screen, userEvent } from '@test'
import { within } from '@testing-library/vue'

describe('VColorPicker', () => {
  it('should default to emitting hex value if no value is provided', async () => {
    const update = vi.fn()
    render(() => (
      <VColorPicker onUpdate:modelValue={ update } />
    ))

    const canvas = screen.getByCSS('canvas')
    await userEvent.click(canvas)
    expect(update).toHaveBeenCalledTimes(1)
    expect(update).toHaveBeenCalledWith(expect.stringMatching(/^#[A-F0-9]{6}$/))
  })

  it('should emit hexa value if hexa value is provided', async () => {
    const update = vi.fn()
    render(() => (
      <VColorPicker modelValue="#ff00ff00" onUpdate:modelValue={ update } />
    ))

    const canvas = screen.getByCSS('canvas')
    await userEvent.click(canvas)
    expect(update).toHaveBeenCalledTimes(1)
    expect(update).toHaveBeenCalledWith(expect.stringMatching(/^#[A-F0-9]{8}$/))
  })

  it('should emit hex value if hex value is provided', async () => {
    const update = vi.fn()
    render(() => (
      <VColorPicker modelValue="#ff00ff" onUpdate:modelValue={ update } />
    ))

    const canvas = screen.getByCSS('canvas')
    await userEvent.click(canvas)
    expect(update).toHaveBeenCalledTimes(1)
    expect(update).toHaveBeenCalledWith(expect.stringMatching(/^#[A-F0-9]{6}$/))
  })

  it('should emit hsla value if hsla value is provided', async () => {
    const update = vi.fn()
    render(() => (
      <VColorPicker modelValue={{ h: 100, s: 0, l: 1, a: 1 }} onUpdate:modelValue={ update } />
    ))

    const canvas = screen.getByCSS('canvas')
    await userEvent.click(canvas)
    expect(update).toHaveBeenCalledTimes(1)
    expect(update).toHaveBeenCalledWith(expect.objectContaining({
      h: expect.any(Number),
      s: expect.any(Number),
      l: expect.any(Number),
      a: expect.any(Number),
    }))
  })

  it('should emit rgba value if rgba value is provided', async () => {
    const update = vi.fn()
    render(() => (
      <VColorPicker modelValue={{ r: 100, g: 20, b: 100, a: 1 }} onUpdate:modelValue={ update } />
    ))

    const canvas = screen.getByCSS('canvas')
    await userEvent.click(canvas)
    expect(update).toHaveBeenCalledTimes(1)
    expect(update).toHaveBeenCalledWith(expect.objectContaining({
      r: expect.any(Number),
      g: expect.any(Number),
      b: expect.any(Number),
      a: expect.any(Number),
    }))
  })

  it('should hide mode switch if only one mode is enabled', () => {
    render(() => (
      <VColorPicker modes={['rgba']} />
    ))
    expect(screen.queryByCSS('.v-color-picker-edit > .v-btn')).toBeNull()
  })

  it('should hide alpha slider if mode does not include alpha', () => {
    render(() => (
      <VColorPicker modes={['rgb']} modelValue="#ff00ff" />
    ))
    expect(screen.queryByCSS('.v-color-picker-preview__alpha')).toBeNull()
  })

  it('should emit value when changing hue slider', async () => {
    const update = vi.fn()
    render(() => (
      <VColorPicker modelValue="#0000ff" onUpdate:modelValue={ update } />
    ))

    await userEvent.click(screen.getByCSS('.v-color-picker-preview__hue'))
    expect(update).toHaveBeenCalledTimes(1)
    expect(update).not.toHaveBeenCalledWith('#0000ff')
  })

  it('should emit value when changing alpha slider', async () => {
    const update = vi.fn()
    render(() => (
      <VColorPicker modelValue="#0000ff" onUpdate:modelValue={ update } />
    ))

    await userEvent.click(screen.getByCSS('.v-color-picker-preview__alpha'))
    // expect(update).toHaveBeenCalledTimes(1) // TODO: fix double update
    expect(update).not.toHaveBeenCalledWith('#0000ff')
  })

  it('should emit value when clicking on swatch', async () => {
    const update = vi.fn()
    render(() => (
      <VColorPicker showSwatches onUpdate:modelValue={ update } />
    ))

    const color = screen.getByCSS(
      '.v-color-picker-swatches__swatch:nth-of-type(5) .v-color-picker-swatches__color:nth-of-type(1)'
    )
    await userEvent.click(color)
    within(color).findByCSS('.v-icon')
    expect(update).toHaveBeenCalledTimes(1)
  })

  it('should not use global defaults for slider color', async () => {
    render(VColorPicker, null, {
      defaults: {
        VSlider: {
          color: 'primary',
          trackColor: 'primary',
          trackFillColor: 'primary',
        },
      },
    })

    expect(screen.queryByCSS('.bg-primary')).toBeNull()
    expect(screen.queryByCSS('.text-primary')).toBeNull()
  })

  it('should not show dot or input values if no color is set', async () => {
    render(VColorPicker)

    expect(screen.queryByCSS('.v-color-picker-canvas__dot')).toBeNull()
    screen.getAllByCSS('.v-color-picker-edit__input input').forEach(el => {
      expect(el).not.toHaveValue()
    })

    await userEvent.click(screen.getByCSS('canvas'))
    expect(screen.getByCSS('.v-color-picker-canvas__dot')).toBeVisible()
    screen.getAllByCSS('.v-color-picker-edit__input input').forEach(el => {
      expect(el).toHaveValue()
    })
  })

  it('should emit correct color when typing in hex field', async () => {
    const update = vi.fn()
    render(() => (
      <VColorPicker mode="hexa" onUpdate:modelValue={ update } />
    ))

    const input = screen.getByCSS('.v-color-picker-edit__input input')
    await userEvent.type(input, 'FF00CC')
    await userEvent.click(document.body)
    expect(update).toHaveBeenCalledTimes(1)
    expect(update).toHaveBeenCalledWith('#FF00CC')
  })
})
