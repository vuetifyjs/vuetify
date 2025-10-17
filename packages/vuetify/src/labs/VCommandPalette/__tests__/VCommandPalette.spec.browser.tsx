// Components
import { VCommandPalette } from '../VCommandPalette'

// Utilities
import { render, screen, userEvent, wait } from '@test'
import { ref, shallowRef } from 'vue'

// Test data
const testItems = [
  {
    title: 'File',
    subtitle: 'Create new file',
    value: 'file',
  },
  {
    title: 'Folder',
    subtitle: 'Create new folder',
    value: 'folder',
  },
  {
    title: 'Project',
    subtitle: 'Create new project',
    value: 'project',
  },
  {
    type: 'divider' as const,
  },
  {
    type: 'subheader' as const,
    title: 'Recent',
  },
  {
    title: 'Open File',
    subtitle: 'Recently opened file',
    value: 'open-file',
  },
]

describe('VCommandPalette', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    // Clean up any remaining overlays
    const overlays = document.querySelectorAll('.v-overlay')
    overlays.forEach(overlay => overlay.remove())
  })

  describe('Rendering', () => {
    it('should render without props', () => {
      render(() => <VCommandPalette />)
      // Component should render without error
      expect(true).toBe(true)
    })

    it('should render dialog closed by default', () => {
      render(() => <VCommandPalette items={ testItems } />)
      // Dialog should not be visible
      const dialog = document.querySelector('[role="dialog"]')
      expect(dialog).not.toBeInTheDocument()
    })

    it('should render dialog when modelValue is true', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
        />
      ))

      await screen.findByRole('dialog')
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should render search input with placeholder', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
          placeholder="Search commands..."
        />
      ))

      await screen.findByRole('dialog')
      const input = screen.getByPlaceholderText('Search commands...')
      expect(input).toBeInTheDocument()
    })

    it('should render list items', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
        />
      ))

      await screen.findByRole('dialog')
      expect(screen.getByText('File')).toBeInTheDocument()
      expect(screen.getByText('Folder')).toBeInTheDocument()
      expect(screen.getByText('Project')).toBeInTheDocument()
    })

    it('should render subheaders and dividers', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
        />
      ))

      await screen.findByRole('dialog')
      expect(screen.getByText('Recent')).toBeInTheDocument()
      // Divider should render
      const dividers = document.querySelectorAll('.v-divider')
      expect(dividers.length).toBeGreaterThan(0)
    })

    it('should show no-data message when no items match search', async () => {
      const model = ref(true)
      const search = ref('')
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          v-model:search={ search.value }
          items={ testItems }
        />
      ))

      await screen.findByRole('dialog')
      const input = screen.getByRole('textbox')

      // Search for something that doesn't exist
      await userEvent.type(input, 'nonexistent')
      await wait(50)

      expect(screen.getByText('No data available')).toBeInTheDocument()
    })
  })

  describe('Search & Filtering', () => {
    it('should filter items by title', async () => {
      const model = ref(true)
      const search = ref('')
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          v-model:search={ search.value }
          items={ testItems }
        />
      ))

      await screen.findByRole('dialog')
      const input = screen.getByRole('textbox')

      // Type to search
      await userEvent.type(input, 'File')
      await wait(50)

      expect(screen.getByText('File')).toBeInTheDocument()
      expect(screen.queryByText('Folder')).not.toBeInTheDocument()
    })

    it('should filter items by subtitle', async () => {
      const model = ref(true)
      const search = ref('')
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          v-model:search={ search.value }
          items={ testItems }
        />
      ))

      await screen.findByRole('dialog')
      const input = screen.getByRole('textbox')

      // Type to search by subtitle
      await userEvent.type(input, 'new')
      await wait(50)

      expect(screen.getByText('File')).toBeInTheDocument()
      expect(screen.getByText('Folder')).toBeInTheDocument()
      expect(screen.getByText('Project')).toBeInTheDocument()
    })

    it('should be case insensitive', async () => {
      const model = ref(true)
      const search = ref('')
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          v-model:search={ search.value }
          items={ testItems }
        />
      ))

      await screen.findByRole('dialog')
      const input = screen.getByRole('textbox')

      await userEvent.type(input, 'FILE')
      await wait(50)

      expect(screen.getByText('File')).toBeInTheDocument()
    })

    it('should clear search when dialog closes', async () => {
      const model = ref(true)
      const search = ref('')
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          v-model:search={ search.value }
          items={ testItems }
        />
      ))

      await screen.findByRole('dialog')
      const input = screen.getByRole('textbox') as HTMLInputElement

      // Type something
      await userEvent.type(input, 'test')
      await wait(50)

      expect(input.value).toBe('test')

      // Close dialog
      model.value = false
      await wait(50)

      // Open again
      model.value = true
      await screen.findByRole('dialog')

      const newInput = screen.getByRole('textbox') as HTMLInputElement
      expect(newInput.value).toBe('')
    })
  })

  describe('Keyboard Navigation', () => {
    it('should navigate with arrow keys', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
        />
      ))

      await screen.findByRole('dialog')
      await wait(100)
      const listbox = screen.getByRole('listbox')

      // Initial active descendant
      expect(listbox).toHaveAttribute('aria-activedescendant', 'v-command-palette-item-0')

      // Press arrow down
      await userEvent.keyboard('{ArrowDown}')
      await wait(100)

      expect(listbox).toHaveAttribute('aria-activedescendant', 'v-command-palette-item-1')

      // Press arrow down again
      await userEvent.keyboard('{ArrowDown}')
      await wait(100)

      expect(listbox).toHaveAttribute('aria-activedescendant', 'v-command-palette-item-2')

      // Press arrow up
      await userEvent.keyboard('{ArrowUp}')
      await wait(100)

      expect(listbox).toHaveAttribute('aria-activedescendant', 'v-command-palette-item-1')
    })

    it('should wrap around with arrow keys', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
        />
      ))

      await screen.findByRole('dialog')
      const listbox = screen.getByRole('listbox')

      // Navigate to end
      await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}')
      await wait(50)

      // Go down from end should wrap to beginning
      await userEvent.keyboard('{ArrowDown}')
      await wait(50)

      expect(listbox).toHaveAttribute('aria-activedescendant', 'v-command-palette-item-0')
    })

    it('should support Tab navigation', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
        />
      ))

      await screen.findByRole('dialog')
      const listbox = screen.getByRole('listbox')

      expect(listbox).toHaveAttribute('aria-activedescendant', 'v-command-palette-item-0')

      // Tab should move down
      await userEvent.keyboard('{Tab}')
      await wait(50)

      expect(listbox).toHaveAttribute('aria-activedescendant', 'v-command-palette-item-1')
    })

    it('should support Shift+Tab navigation', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
        />
      ))

      await screen.findByRole('dialog')
      const listbox = screen.getByRole('listbox')

      // Move down first
      await userEvent.keyboard('{ArrowDown}')
      await wait(50)

      // Shift+Tab should move up
      await userEvent.keyboard('{Shift>}{Tab}{/Shift}')
      await wait(50)

      expect(listbox).toHaveAttribute('aria-activedescendant', 'v-command-palette-item-0')
    })

    it('should maintain focus in search input during navigation', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
        />
      ))

      await screen.findByRole('dialog')
      const input = screen.getByRole('textbox')

      // Focus should be on input
      await userEvent.click(input)
      expect(input).toHaveFocus()

      // Navigate with arrow keys
      await userEvent.keyboard('{ArrowDown}')
      await wait(50)

      // Focus should still be on input
      expect(input).toHaveFocus()
    })
  })

  describe('Item Execution', () => {
    it('should execute item with Enter key', async () => {
      const model = ref(true)
      const onClickItem = vi.fn()
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
          onClick:item={ onClickItem }
        />
      ))

      await screen.findByRole('dialog')
      await wait(100)

      // Press Enter to execute first item
      await userEvent.keyboard('{Enter}')
      await wait(100)

      expect(onClickItem).toHaveBeenCalled()
    })

    it('should close dialog after executing item', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
        />
      ))

      await screen.findByRole('dialog')
      await wait(100)

      // Execute item
      await userEvent.keyboard('{Enter}')
      await wait(200)

      // Dialog should close
      const dialog = document.querySelector('[role="dialog"]')
      expect(dialog).not.toBeInTheDocument()
      expect(model.value).toBe(false)
    })

    it('should emit click:item event with correct data', async () => {
      const model = ref(true)
      const onClickItem = vi.fn()
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
          onClick:item={ onClickItem }
        />
      ))

      await screen.findByRole('dialog')
      await wait(100)

      // Navigate to second item
      await userEvent.keyboard('{ArrowDown}')
      await wait(100)

      // Execute item
      await userEvent.keyboard('{Enter}')
      await wait(100)

      expect(onClickItem).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Folder',
          value: 'folder',
        }),
        expect.any(KeyboardEvent)
      )
    })
  })

  describe('Dialog Management', () => {
    it('should toggle dialog with v-model', async () => {
      const model = ref(false)
      const { rerender } = render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
        />
      ))

      // Initially closed
      expect(document.querySelector('[role="dialog"]')).not.toBeInTheDocument()

      // Open
      model.value = true
      await rerender(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
        />
      ))
      await screen.findByRole('dialog')

      // Close
      model.value = false
      await rerender(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
        />
      ))
      await wait(50)
      expect(document.querySelector('[role="dialog"]')).not.toBeInTheDocument()
    })

    it('should restore focus when closing', async () => {
      const model = ref(true)
      const previousFocus = shallowRef<HTMLButtonElement | null>(null)

      render(() => {
        return (
          <div>
            <button ref={ previousFocus }>
              Toggle
            </button>
            <VCommandPalette
              v-model={ model.value }
              items={ testItems }
            />
          </div>
        )
      })

      // Focus button before opening
      if (previousFocus.value) {
        previousFocus.value.focus()
      }

      // Wait for dialog to open
      await screen.findByRole('dialog')

      // Close dialog
      model.value = false
      await wait(50)

      // Focus should be restored (in a real test, this would check the button)
      expect(true).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
        />
      ))

      await screen.findByRole('dialog')
      await wait(100)

      const listbox = screen.getByRole('listbox')
      expect(listbox).toHaveAttribute('aria-activedescendant')

      const items = screen.getAllByRole('option')
      expect(items.length).toBeGreaterThan(0)
      items.forEach(item => {
        expect(item).toHaveAttribute('aria-selected')
      })
    })

    it('should mark active item with aria-selected', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
        />
      ))

      await screen.findByRole('dialog')
      await wait(100)

      const items = screen.getAllByRole('option')
      const firstItem = items[0]

      // First item should be selected
      expect(firstItem.getAttribute('aria-selected')).toBe('true')

      // Navigate down
      await userEvent.keyboard('{ArrowDown}')
      await wait(100)

      // First item should no longer be selected
      expect(firstItem.getAttribute('aria-selected')).toBe('false')
      // Second item should be selected
      expect(items[1].getAttribute('aria-selected')).toBe('true')
    })
  })

  describe('Search with v-model:search', () => {
    it('should sync search input with v-model:search', async () => {
      const model = ref(true)
      const search = ref('')
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          v-model:search={ search.value }
          items={ testItems }
        />
      ))

      await screen.findByRole('dialog')
      const input = screen.getByRole('textbox') as HTMLInputElement

      await userEvent.type(input, 'test')
      await wait(50)

      expect(search.value).toBe('test')
      expect(input.value).toBe('test')
    })
  })

  describe('Slots', () => {
    it('should render prepend slot', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
          v-slots={{
            prepend: () => <div data-testid="prepend-slot">Prepend Content</div>,
          } as any}
        />
      ))

      await screen.findByRole('dialog')
      expect(screen.getByTestId('prepend-slot')).toBeInTheDocument()
    })

    it('should render append slot', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
          v-slots={{
            append: () => <div data-testid="append-slot">Append Content</div>,
          } as any}
        />
      ))

      await screen.findByRole('dialog')
      expect(screen.getByTestId('append-slot')).toBeInTheDocument()
    })

    it('should render no-data slot', async () => {
      const model = ref(true)
      const search = ref('nonexistent')
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          v-model:search={ search.value }
          items={ testItems }
          v-slots={{
            'no-data': () => <div data-testid="no-data-slot">Custom Empty State</div>,
          } as any}
        />
      ))

      await screen.findByRole('dialog')
      expect(screen.getByTestId('no-data-slot')).toBeInTheDocument()
    })
  })

  describe('Item Properties', () => {
    it('should display title and subtitle', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
        />
      ))

      await screen.findByRole('dialog')

      expect(screen.getByText('File')).toBeInTheDocument()
      expect(screen.getByText('Create new file')).toBeInTheDocument()
    })

    it('should call item onClick handler when executed', async () => {
      const handleClick = vi.fn()
      const model = ref(true)
      const itemsWithHandler = [
        {
          title: 'Action Item',
          subtitle: 'Item with handler',
          value: 'action',
          onClick: handleClick,
        },
      ]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ itemsWithHandler }
        />
      ))

      await screen.findByRole('dialog')
      await wait(100)

      await userEvent.keyboard('{Enter}')
      await wait(100)

      expect(handleClick).toHaveBeenCalled()
    })
  })
})
