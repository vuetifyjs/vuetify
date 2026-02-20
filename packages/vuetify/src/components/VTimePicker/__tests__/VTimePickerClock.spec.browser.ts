// Components
import { VTimePickerClock } from '../VTimePickerClock'

// Utilities
import { render, screen, userEvent } from '@test'

describe('VTimePickerClock', () => {
  describe('keyboard navigation', () => {
    it.each([
      ['ArrowUp', 6],
      ['ArrowDown', 4],
      ['ArrowRight', 6],
      ['ArrowLeft', 4],
    ])('should update value on %s', async (key, expectedValue) => {
      const onInput = vi.fn()
      const onChange = vi.fn()

      render(VTimePickerClock, {
        props: {
          min: 0,
          max: 11,
          modelValue: 5,
          viewMode: 'hour',
          onInput,
          onChange,
        },
      })

      const clock = screen.getByRole('spinbutton')
      clock.focus()
      await userEvent.keyboard(`{${key}}`)

      expect(onInput).toHaveBeenCalledWith(expectedValue)
      expect(onChange).not.toHaveBeenCalled()
    })

    it('should emit change on Enter to confirm selection', async () => {
      const onInput = vi.fn()
      const onChange = vi.fn()

      render(VTimePickerClock, {
        props: {
          min: 0,
          max: 11,
          modelValue: 5,
          viewMode: 'hour',
          onInput,
          onChange,
        },
      })

      const clock = screen.getByRole('spinbutton')
      clock.focus()
      await userEvent.keyboard('{Enter}')

      expect(onInput).not.toHaveBeenCalled()
      expect(onChange).toHaveBeenCalledWith(5)
    })

    it.each([
      ['max to min', 11, '{ArrowUp}', 0],
      ['min to max', 0, '{ArrowDown}', 11],
    ])('should wrap around from %s', async (_, modelValue, key, expectedValue) => {
      const onInput = vi.fn()

      render(VTimePickerClock, {
        props: {
          min: 0,
          max: 11,
          modelValue,
          viewMode: 'hour',
          onInput,
        },
      })

      const clock = screen.getByRole('spinbutton')
      clock.focus()
      await userEvent.keyboard(key)

      expect(onInput).toHaveBeenCalledWith(expectedValue)
    })

    it('should skip disallowed values', async () => {
      const onInput = vi.fn()
      const allowedValues = (v: number) => v !== 6

      render(VTimePickerClock, {
        props: {
          min: 0,
          max: 11,
          modelValue: 5,
          viewMode: 'hour',
          allowedValues,
          onInput,
        },
      })

      const clock = screen.getByRole('spinbutton')
      clock.focus()
      await userEvent.keyboard('{ArrowUp}')

      // Should skip 6 and go to 7
      expect(onInput).toHaveBeenCalledWith(7)
    })

    it.each([
      ['disabled', { disabled: true }],
      ['readonly', { readonly: true }],
    ])('should not respond when %s', async (_, extraProps) => {
      const onInput = vi.fn()
      const onChange = vi.fn()

      render(VTimePickerClock, {
        props: {
          min: 0,
          max: 11,
          modelValue: 5,
          viewMode: 'hour',
          ...extraProps,
          onInput,
          onChange,
        },
      })

      const clock = screen.getByRole('spinbutton')
      clock.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }))
      clock.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

      expect(onInput).not.toHaveBeenCalled()
      expect(onChange).not.toHaveBeenCalled()
    })
  })
})
