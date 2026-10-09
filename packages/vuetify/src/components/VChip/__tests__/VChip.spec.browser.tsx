import { VChip } from '../VChip'

// Components
import { VChipGroup } from '@/components/VChipGroup'

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

    await userEvent.click(screen.getByTestId('close-chip'))
    expect(close).toHaveBeenCalledTimes(1)
    expect(update).toHaveBeenCalledTimes(1)
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

    const button = screen.getByTestId('close-chip')

    expect(button).toHaveAttribute('aria-label', 'Foo')

    closeLabel.value = 'Bar'
    await nextTick()
    expect(button).toHaveAttribute('aria-label', 'Bar')

    closeLabel.value = undefined
    await nextTick()
    expect(button).toHaveAttribute('aria-label', 'Close')
  })

  it('should only render phrasing content inside its span root', () => {
    const { container } = render(() => (
      <VChipGroup>
        <VChip
          appendIcon="$next"
          filter
          prependIcon="$prev"
          text="Chip"
        />
      </VChipGroup>
    ))

    const chip = container.querySelector('.v-chip')!

    expect(chip.tagName).toBe('SPAN')
    expect(chip.querySelector('.v-chip__filter')).not.toBeNull()
    expect(chip.querySelector('.v-chip__prepend')).not.toBeNull()
    expect(chip.querySelector('.v-chip__append')).not.toBeNull()
    expect(chip.querySelectorAll('div')).toHaveLength(0)
  })
})
