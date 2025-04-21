// Components
import { VDateInput } from '../VDateInput'
// import { VForm } from '@/components/VForm'

// Utilities
import { render, userEvent } from '@test'

describe('VDateInput', () => {
  it('should not fire @update:focus twice when clicking bottom of input', async () => {
    const onFocus = vi.fn()
    const { element } = render(() => (
      <VDateInput  onUpdate:focused={ onFocus } />
    ))

    await userEvent.click(element, { y: 1 })

    expect(onFocus).toHaveBeenCalledTimes(1)
  })
})
