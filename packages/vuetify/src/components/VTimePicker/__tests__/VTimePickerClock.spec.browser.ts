// Components
import { VTimePickerClock } from '../VTimePickerClock'

// Utilities
import { render, screen, userEvent } from '@test'

describe('VTimePickerClock', () => {
  it.each([
    ['{ArrowUp}', 11, 1],
    ['{ArrowDown}', 1, 11],
  ])('should wrap and skip disallowed values on %s', async (key, modelValue, expected) => {
    const onInput = vi.fn()
    render(VTimePickerClock, {
      props: { min: 0, max: 11, modelValue, allowedValues: (v: number) => v !== 0, onInput },
    })

    screen.getByRole('spinbutton').focus()
    await userEvent.keyboard(key)

    expect(onInput).toHaveBeenCalledWith(expected)
  })

  it.each([
    [{ viewMode: 'hour', ampm: true, modelValue: 15 }, /^3\sPM$/],
    [{ viewMode: 'minute', modelValue: 5 }, /^5 minutes$/],
  ] as const)('should announce value %o', (props, expected) => {
    render(VTimePickerClock, { props: { min: 0, max: 59, ...props } })

    expect(screen.getByRole('spinbutton')).toHaveAttribute('aria-valuetext', expect.stringMatching(expected))
  })
})
