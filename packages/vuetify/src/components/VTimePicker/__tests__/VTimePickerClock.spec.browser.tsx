// Components
import { VTimePickerClock } from '../VTimePickerClock'

// Utilities
import { render, screen } from '@test'

describe('VTimePickerClock', () => {
  describe('aria-disabled', () => {
    it('should set aria-disabled on items disabled by allowedValues', () => {
      render(() => (
        <VTimePickerClock
          min={ 0 }
          max={ 11 }
          modelValue={ 0 }
          allowedValues={ (v: number) => v % 2 === 0 }
        />
      ))

      const items = screen.getAllByCSS('.v-time-picker-clock__item')
      const evenItems = items.filter((_, index) => index % 2 === 0)
      const oddItems = items.filter((_, index) => index % 2 !== 0)

      // Even values (0, 2, 4, 6, 8, 10) should NOT have aria-disabled
      evenItems.forEach(item => {
        expect(item).not.toHaveAttribute('aria-disabled')
      })

      // Odd values (1, 3, 5, 7, 9, 11) should have aria-disabled="true"
      oddItems.forEach(item => {
        expect(item).toHaveAttribute('aria-disabled', 'true')
      })
    })

    it('should set aria-disabled on all items when disabled prop is true', () => {
      render(() => (
        <VTimePickerClock
          min={ 0 }
          max={ 11 }
          modelValue={ 0 }
          disabled
        />
      ))

      const items = screen.getAllByCSS('.v-time-picker-clock__item')

      items.forEach(item => {
        expect(item).toHaveAttribute('aria-disabled', 'true')
      })
    })

    it('should not set aria-disabled on enabled items', () => {
      render(() => (
        <VTimePickerClock
          min={ 0 }
          max={ 11 }
          modelValue={ 0 }
        />
      ))

      const items = screen.getAllByCSS('.v-time-picker-clock__item')

      items.forEach(item => {
        expect(item).not.toHaveAttribute('aria-disabled')
      })
    })

    it('should set aria-disabled when both disabled prop and allowedValues are used', () => {
      render(() => (
        <VTimePickerClock
          min={ 0 }
          max={ 5 }
          modelValue={ 0 }
          disabled
          allowedValues={ (v: number) => v % 2 === 0 }
        />
      ))

      const items = screen.getAllByCSS('.v-time-picker-clock__item')

      // All items should have aria-disabled because disabled prop overrides everything
      items.forEach(item => {
        expect(item).toHaveAttribute('aria-disabled', 'true')
      })
    })
  })
})
