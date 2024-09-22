import { VChip } from '../'

// Utilities
import { render, screen, userEvent } from '@test'
import { nextTick, shallowRef } from 'vue'

describe('VChip', () => {
  it('should emit events when closed', async () => {
    const close = vi.fn()
    const update = vi.fn()

    render(() => (
      <VChip
        closable
        onUpdate:modelValue={ update }
        onClick:close={ close }
        text="Chip"
      />
    ))

    const button = screen.getByCSS('.v-chip__close')

    await userEvent.click(button)
    expect(close).toHaveBeenCalled()
    expect(update).toHaveBeenCalled()
  })

  it('should have aria-label', async () => {
    const closeLabel = shallowRef<string | undefined>('Foo')

    render(() => (
      <VChip
        closable
        closeLabel={ closeLabel.value }
        text="Chip"
      />
    ))

    const button = screen.getByCSS('.v-chip__close')

    expect(button).toHaveAttribute('aria-label', 'Foo')

    closeLabel.value = 'Bar'

    await nextTick()

    expect(button).toHaveAttribute('aria-label', 'Bar')

    closeLabel.value = undefined

    await nextTick()

    expect(button).toHaveAttribute('aria-label', 'Close')
  })
})
