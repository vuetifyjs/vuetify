// Components
import { VChip } from '../VChip'
import { VAvatar } from '@/components/VAvatar'
import { VIcon } from '@/components/VIcon'

// Utilities
import { render, screen, userEvent } from '@test'
import { getByCSS } from '@testing-library/vue'
import { nextTick, shallowRef } from 'vue'

describe('VChip', () => {
  describe('size', () => {
    it.each([
      ['x-small', 20],
      ['small', 26],
      ['default', 32],
      ['large', 38],
      ['x-large', 44],
    ])('should match %s and size="%s"', async (name, num) => {
      render(() => (
        <>
          <VChip size={ name } data-testid="named">{ name }</VChip>
          <VChip size={ num } data-testid="numeric">{ num }</VChip>
        </>
      ))

      const named = getComputedStyle(screen.getByTestId('named'))
      const numeric = getComputedStyle(screen.getByTestId('numeric'))

      expect(named.height).toBe(numeric.height)
      expect(named.fontSize).toBe(numeric.fontSize)
      expect(named.minWidth).toBe(numeric.minWidth)
      expect(named.padding).toBe(numeric.padding)
    })

    it.each([
      ['x-small', 20],
      ['small', 26],
      ['default', 32],
      ['large', 38],
      ['x-large', 44],
    ])('should match %s and size="%s" with avatar', async (name, num) => {
      render(() => (
        <>
          <VChip size={ name } data-testid="named">
            {{
              default: () => name,
              prepend: () => <VAvatar start><VIcon icon="$vuetify" /></VAvatar>,
            }}
          </VChip>
          <VChip size={ num } data-testid="numeric">
            {{
              default: () => num,
              prepend: () => <VAvatar start><VIcon icon="$vuetify" /></VAvatar>,
            }}
          </VChip>
        </>
      ))

      const namedChip = screen.getByTestId('named')
      const numericChip = screen.getByTestId('numeric')

      const named = getComputedStyle(namedChip)
      const numeric = getComputedStyle(numericChip)

      expect(named.height).toBe(numeric.height)
      expect(named.fontSize).toBe(numeric.fontSize)
      expect(named.minWidth).toBe(numeric.minWidth)
      expect(named.padding).toBe(numeric.padding)

      const namedAvatar = getByCSS(namedChip, '.v-avatar')
      const numericAvatar = getByCSS(numericChip, '.v-avatar')
      expect(getComputedStyle(namedAvatar).height).toBe(getComputedStyle(numericAvatar).height)

      const namedIcon = getByCSS(namedChip, '.v-icon')
      const numericIcon = getByCSS(numericChip, '.v-icon')
      expect(getComputedStyle(namedIcon).height).toBe(getComputedStyle(numericIcon).height)
    })
  })

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
})
