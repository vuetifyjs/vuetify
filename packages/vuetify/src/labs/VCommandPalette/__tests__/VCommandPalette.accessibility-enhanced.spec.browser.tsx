// Components
import { VCommandPalette } from '../VCommandPalette'

// Utilities
import { render, screen, userEvent, wait } from '@test'
import { ref } from 'vue'

// Test data
const accessibilityItems = [
  {
    id: 'item1',
    title: 'First Item',
    subtitle: 'First item description',
    value: 'first',
    handler: vi.fn(),
  },
  {
    id: 'item2',
    title: 'Second Item',
    subtitle: 'Second item description',
    value: 'second',
    handler: vi.fn(),
  },
  {
    id: 'item3',
    title: 'Third Item',
    subtitle: 'Third item description',
    value: 'third',
    handler: vi.fn(),
  },
]

describe('VCommandPalette', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    // Ensure all dialogs are closed and DOM is clean
    const dialogs = document.querySelectorAll('[role="dialog"]')
    dialogs.forEach(dialog => {
      const closeButton = dialog.querySelector('[aria-label*="Close"]')
      if (closeButton) {
        (closeButton as HTMLElement).click()
      }
    })

    // Clear any remaining overlays
    const overlays = document.querySelectorAll('.v-overlay')
    overlays.forEach(overlay => overlay.remove())

    // Clear any remaining command palette elements
    const commandPalettes = document.querySelectorAll('.v-command-palette')
    commandPalettes.forEach(palette => palette.remove())
  })

  describe('Enhanced Accessibility - ARIA ActiveDescendant Pattern', () => {
    it('should implement proper aria-activedescendant pattern', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ accessibilityItems }
        />
      ))

      await screen.findByRole('dialog')

      // Wait for component to fully initialize
      await wait(50)

      // Should have listbox with aria-activedescendant
      const listbox = screen.getByRole('listbox')
      expect(listbox).toHaveAttribute('aria-activedescendant', 'command-palette-item-0')
      expect(listbox).toHaveAttribute('tabindex', '0')

      // First item should be referenced by aria-activedescendant
      const firstItem = screen.getByText('First Item').closest('[id^="command-palette-item"]')
      expect(firstItem).toHaveAttribute('id', 'command-palette-item-0')

      // Navigate to second item
      await userEvent.keyboard('{ArrowDown}')

      // Wait for navigation to complete
      await wait(50)

      // aria-activedescendant should update
      expect(listbox).toHaveAttribute('aria-activedescendant', 'command-palette-item-1')

      const secondItem = screen.getByText('Second Item').closest('[id^="command-palette-item"]')
      expect(secondItem).toHaveAttribute('id', 'command-palette-item-1')
    })

    it('should maintain aria-activedescendant in custom layouts', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ accessibilityItems }
          v-slots={{
            default: ({ items, rootProps, getItemProps }) => (
              <div { ...rootProps } class="custom-layout">
                { items.map((item, index) => (
                  <div
                    key={ item.id }
                    { ...getItemProps(item, index) }
                    class="custom-item"
                  >
                    { item.title }
                  </div>
                ))}
              </div>
            ),
          }}
        />
      ))

      await screen.findByRole('dialog')

      // Custom layout should still have proper ARIA
      const customLayout = screen.getByRole('listbox')
      expect(customLayout).toHaveClass('custom-layout')
      expect(customLayout).toHaveAttribute('aria-activedescendant', 'command-palette-item-0')

      // Items should have proper IDs
      const items = screen.getAllByRole('option')
      expect(items[0]).toHaveAttribute('id', 'command-palette-item-0')
      expect(items[1]).toHaveAttribute('id', 'command-palette-item-1')

      // Navigation should update aria-activedescendant
      await userEvent.keyboard('{ArrowDown}')
      expect(customLayout).toHaveAttribute('aria-activedescendant', 'command-palette-item-1')
    })

    it('should provide proper ARIA labels and descriptions', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ accessibilityItems }
          title="Test Command Palette"
        />
      ))

      await screen.findByRole('dialog')

      // Dialog should have proper labeling
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-modal', 'true')

      // Search input should be properly labeled
      const searchInput = screen.getByRole('textbox')
      expect(searchInput).toHaveAttribute('placeholder', 'Type a command or search...')

      // Listbox should be properly structured
      const listbox = screen.getByRole('listbox')
      expect(listbox).toHaveAttribute('role', 'listbox')
      expect(listbox).toHaveAttribute('tabindex', '0')

      // Items should have proper IDs for aria-activedescendant
      const items = accessibilityItems
      items.forEach((item, index) => {
        const element = screen.getByText(item.title).closest('[id^="command-palette-item"]')
        expect(element).toHaveAttribute('id', `command-palette-item-${index}`)
      })
    })

    it('should handle focus management correctly', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ accessibilityItems }
        />
      ))

      await screen.findByRole('dialog')

      // Listbox should have proper tabindex for keyboard navigation
      const listbox = screen.getByRole('listbox')
      expect(listbox).toHaveAttribute('tabindex', '0')

      // Search input should be present and accessible
      const searchInput = screen.getByRole('textbox')
      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toHaveAttribute('placeholder', 'Type a command or search...')
    })

    it('should announce selection changes to screen readers', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ accessibilityItems }
        />
      ))

      await screen.findByRole('dialog')

      // Wait for component to fully initialize
      await wait(50)

      const listbox = screen.getByRole('listbox')
      const firstItem = screen.getByText('First Item').closest('[id^="command-palette-item"]')
      const secondItem = screen.getByText('Second Item').closest('[id^="command-palette-item"]')

      // Initial state - first item should be active
      expect(listbox).toHaveAttribute('aria-activedescendant', firstItem?.id)

      // Navigate down
      await userEvent.keyboard('{ArrowDown}')

      // Wait for navigation to complete
      await wait(50)

      // Selection should update to second item
      expect(listbox).toHaveAttribute('aria-activedescendant', secondItem?.id)
    })

    it('should work with helper components and maintain accessibility', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ accessibilityItems }
          v-slots={{
            default: ({ items, rootProps, getItemProps }) => (
              <div { ...rootProps } data-testid="helper-container">
                { items.map((item, index) => (
                  <div
                    key={ item.id }
                    { ...getItemProps(item, index) }
                    data-testid={ `helper-item-${index}` }
                    class="custom-item"
                  >
                    { item.title }
                  </div>
                ))}
              </div>
            ),
          }}
        />
      ))

      await screen.findByRole('dialog')

      // Helper container should have proper ARIA
      const container = screen.getByTestId('helper-container')
      expect(container).toHaveAttribute('role', 'listbox')
      expect(container).toHaveAttribute('aria-activedescendant', 'command-palette-item-0')

      // Helper items should have proper ARIA
      const helperItems = screen.getAllByRole('option')
      expect(helperItems).toHaveLength(3)

      helperItems.forEach((item, index) => {
        expect(item).toHaveAttribute('id', `command-palette-item-${index}`)
        expect(item).toHaveAttribute('role', 'option')
        expect(item).toHaveClass('custom-item')
      })

      // First item should be active
      expect(container).toHaveAttribute('aria-activedescendant', 'command-palette-item-0')

      // Navigation should work
      await userEvent.keyboard('{ArrowDown}')

      expect(container).toHaveAttribute('aria-activedescendant', 'command-palette-item-1')
    })

    it('should handle empty states accessibly', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={[]}
        />
      ))

      await screen.findByRole('dialog')

      // Should still have proper structure even with no items
      const listbox = screen.getByRole('listbox')
      expect(listbox).toHaveAttribute('role', 'listbox')
      expect(listbox).toHaveAttribute('tabindex', '0')

      // Should not have aria-activedescendant when no items
      expect(listbox).not.toHaveAttribute('aria-activedescendant')

      // Should show no data message
      expect(screen.getByText('No data available')).toBeInTheDocument()
    })

    it('should handle keyboard navigation edge cases', async () => {
      const model = ref(true)
      const element = ref()
      render(() => (
        <VCommandPalette
          ref={ element }
          v-model={ model.value }
          items={ accessibilityItems }
        />
      ))

      await screen.findByRole('dialog')

      // Wait for component to fully initialize
      await wait(50)

      const listbox = screen.getByRole('listbox')

      // Should start with first item selected
      expect(element.value.selectedIndex).toBe(0)
      expect(listbox).toHaveAttribute('aria-activedescendant', 'command-palette-item-0')

      // Arrow up from first item should wrap to last
      await userEvent.keyboard('{ArrowUp}')

      // Wait for navigation to complete
      await wait(50)

      expect(listbox).toHaveAttribute('aria-activedescendant', 'command-palette-item-2')

      // Arrow down from last item should wrap to first
      await userEvent.keyboard('{ArrowDown}')

      // Wait for navigation to complete
      await wait(50)

      expect(listbox).toHaveAttribute('aria-activedescendant', 'command-palette-item-0')
    })
  })
})
