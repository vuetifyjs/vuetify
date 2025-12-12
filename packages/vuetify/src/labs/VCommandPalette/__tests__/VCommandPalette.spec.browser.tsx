// Components
import { VCommandPalette } from '../VCommandPalette'

// Utilities
import { render, screen, userEvent, wait } from '@test'
import { ref } from 'vue'

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
  afterEach(() => {
    const overlays = document.querySelectorAll('.v-overlay')
    overlays.forEach(overlay => overlay.remove())
  })

  describe('Rendering', () => {
    it('should render dialog closed by default', () => {
      render(() => <VCommandPalette items={ testItems } />)
      expect(document.querySelector('[role="dialog"]')).not.toBeInTheDocument()
    })

    it('should render dialog when modelValue is true', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette v-model={ model.value } items={ testItems } />
      ))

      await screen.findByRole('dialog')
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should render items with titles, subtitles, subheaders, and dividers', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette v-model={ model.value } items={ testItems } />
      ))

      await screen.findByRole('dialog')

      // Action items
      expect(screen.getByText('File')).toBeInTheDocument()
      expect(screen.getByText('Create new file')).toBeInTheDocument()

      // Subheader
      expect(screen.getByText('Recent')).toBeInTheDocument()

      // Divider
      expect(document.querySelectorAll('.v-divider').length).toBeGreaterThan(0)
    })

    it('should show no-data message when no items match search', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette v-model={ model.value } items={ testItems } />
      ))

      await screen.findByRole('dialog')
      const input = screen.getByRole('textbox')

      await userEvent.type(input, 'nonexistent')
      await wait(50)

      expect(screen.getByText('No data available')).toBeInTheDocument()
    })
  })

  describe('Search & Filtering', () => {
    it('should filter items by title (case insensitive)', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette v-model={ model.value } items={ testItems } />
      ))

      await screen.findByRole('dialog')
      const input = screen.getByRole('textbox')

      await userEvent.type(input, 'FILE')
      await wait(50)

      expect(screen.getByText('File')).toBeInTheDocument()
      expect(screen.getByText('Open File')).toBeInTheDocument()
      expect(screen.queryByText('Folder')).not.toBeInTheDocument()
    })

    it('should clear search when dialog closes and reopens', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette v-model={ model.value } items={ testItems } />
      ))

      await screen.findByRole('dialog')
      const input = screen.getByRole('textbox') as HTMLInputElement

      await userEvent.type(input, 'test')
      await wait(50)
      expect(input.value).toBe('test')

      // Close and reopen
      model.value = false
      await wait(50)
      model.value = true
      await screen.findByRole('dialog')

      const newInput = screen.getByRole('textbox') as HTMLInputElement
      expect(newInput.value).toBe('')
    })
  })

  describe('Keyboard Navigation', () => {
    it('should navigate with arrow keys and skip dividers/subheaders', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette v-model={ model.value } items={ testItems } />
      ))

      await screen.findByRole('dialog')
      await wait(100)
      const listbox = screen.getByRole('listbox')

      // Items: File(0), Folder(1), Project(2), Divider(3), Subheader(4), Open File(5)
      // Selectable: 0, 1, 2, 5

      // Start at first item
      expect(listbox.getAttribute('aria-activedescendant')).toMatch(/^v-list-item-.*-0$/)

      // Navigate through items
      await userEvent.keyboard('{ArrowDown}')
      await wait(50)
      expect(listbox.getAttribute('aria-activedescendant')).toMatch(/^v-list-item-.*-1$/)

      await userEvent.keyboard('{ArrowDown}')
      await wait(50)
      expect(listbox.getAttribute('aria-activedescendant')).toMatch(/^v-list-item-.*-2$/)

      // Should skip divider(3) and subheader(4), land on Open File(5)
      await userEvent.keyboard('{ArrowDown}')
      await wait(50)
      expect(listbox.getAttribute('aria-activedescendant')).toMatch(/^v-list-item-.*-5$/)

      // Should wrap to first item
      await userEvent.keyboard('{ArrowDown}')
      await wait(50)
      expect(listbox.getAttribute('aria-activedescendant')).toMatch(/^v-list-item-.*-0$/)

      // Arrow up should go back to last selectable
      await userEvent.keyboard('{ArrowUp}')
      await wait(50)
      expect(listbox.getAttribute('aria-activedescendant')).toMatch(/^v-list-item-.*-5$/)
    })

    it('should keep focus in search input while navigating', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette v-model={ model.value } items={ testItems } />
      ))

      await screen.findByRole('dialog')
      const input = screen.getByRole('textbox')

      await userEvent.click(input)
      expect(input).toHaveFocus()

      await userEvent.keyboard('{ArrowDown}')
      await wait(50)

      expect(input).toHaveFocus()
    })
  })

  describe('Item Execution', () => {
    it('should execute item with Enter key and close dialog', async () => {
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

      // Navigate to second item and execute
      await userEvent.keyboard('{ArrowDown}')
      await wait(50)
      await userEvent.keyboard('{Enter}')
      await wait(100)

      expect(onClickItem).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Folder', value: 'folder' }),
        expect.any(KeyboardEvent)
      )
      expect(model.value).toBe(false)
    })

    it('should execute item with mouse click', async () => {
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

      const folderItem = screen.getByText('Folder')
      await userEvent.click(folderItem)
      await wait(100)

      expect(onClickItem).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Folder', value: 'folder' }),
        expect.any(MouseEvent)
      )
    })

    it('should call item onClick handler when executed', async () => {
      const handleClick = vi.fn()
      const model = ref(true)
      const itemsWithHandler = [
        {
          title: 'Action Item',
          value: 'action',
          onClick: handleClick,
        },
      ]

      render(() => (
        <VCommandPalette v-model={ model.value } items={ itemsWithHandler } />
      ))

      await screen.findByRole('dialog')
      await wait(100)

      await userEvent.keyboard('{Enter}')
      await wait(100)

      expect(handleClick).toHaveBeenCalled()
    })
  })

  describe('Hotkeys', () => {
    it('should open palette with global hotkey', async () => {
      const model = ref(false)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ testItems }
          hotkey="ctrl+shift+p"
        />
      ))

      expect(document.querySelector('[role="dialog"]')).not.toBeInTheDocument()

      await userEvent.keyboard('{Control>}{Shift>}p{/Shift}{/Control}')
      await wait(100)

      expect(document.querySelector('[role="dialog"]')).toBeInTheDocument()
    })

    it('should trigger item hotkey when palette is open', async () => {
      const model = ref(true)
      const handleClick = vi.fn()
      const itemsWithHotkeys = [
        {
          title: 'Save File',
          value: 'save',
          hotkey: 'ctrl+s',
          onClick: handleClick,
        },
      ]

      render(() => (
        <VCommandPalette v-model={ model.value } items={ itemsWithHotkeys } />
      ))

      await screen.findByRole('dialog')
      await wait(100)

      await userEvent.keyboard('{Control>}s{/Control}')
      await wait(100)

      expect(handleClick).toHaveBeenCalledWith(expect.any(KeyboardEvent), 'save')
      expect(document.querySelector('[role="dialog"]')).not.toBeInTheDocument()
    })
  })

  describe('Slots', () => {
    it('should render prepend, append, and no-data slots', async () => {
      const model = ref(true)
      const search = ref('nonexistent')
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          v-model:search={ search.value }
          items={ testItems }
          v-slots={{
            prepend: () => <div data-testid="prepend-slot">Prepend</div>,
            append: () => <div data-testid="append-slot">Append</div>,
            'no-data': () => <div data-testid="no-data-slot">No results</div>,
          } as any}
        />
      ))

      await screen.findByRole('dialog')

      expect(screen.getByTestId('prepend-slot')).toBeInTheDocument()
      expect(screen.getByTestId('append-slot')).toBeInTheDocument()
      expect(screen.getByTestId('no-data-slot')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes on listbox and options', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette v-model={ model.value } items={ testItems } />
      ))

      await screen.findByRole('dialog')
      await wait(100)

      const listbox = screen.getByRole('listbox')
      expect(listbox).toHaveAttribute('aria-activedescendant')

      const options = screen.getAllByRole('option')
      expect(options).toHaveLength(4) // 4 action items, not divider/subheader
      options.forEach(option => {
        expect(option).toHaveAttribute('aria-selected')
      })
    })

    it('should update aria-selected when navigating', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette v-model={ model.value } items={ testItems } />
      ))

      await screen.findByRole('dialog')
      await wait(100)

      const options = screen.getAllByRole('option')
      expect(options[0].getAttribute('aria-selected')).toBe('true')
      expect(options[1].getAttribute('aria-selected')).toBe('false')

      await userEvent.keyboard('{ArrowDown}')
      await wait(100)

      expect(options[0].getAttribute('aria-selected')).toBe('false')
      expect(options[1].getAttribute('aria-selected')).toBe('true')
    })
  })
})
