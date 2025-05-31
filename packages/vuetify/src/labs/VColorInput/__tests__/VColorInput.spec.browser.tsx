// Components
import { VColorInput } from '../VColorInput'

// Utilities
import { render, userEvent } from '@test'

describe('VColorInput', () => {
  it('should not fire @update:focus twice when clicking bottom of input', async () => {
    const onFocus = vi.fn()
    const { element } = render(() => (
      <VColorInput onUpdate:focused={ onFocus } />
    ))

    await userEvent.click(element, { y: 1 })

    expect(onFocus).toHaveBeenCalledTimes(1)
  })
})
