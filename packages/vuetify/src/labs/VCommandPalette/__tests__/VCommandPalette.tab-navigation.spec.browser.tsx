// Components
import { VCommandPalette } from '../VCommandPalette'

// Utilities
import { render, screen, userEvent, wait } from '@test'
import { ref } from 'vue'

// Test data
const basicItems = [
  {
    id: 'item1',
    title: 'First Item',
    subtitle: 'First item subtitle',
    value: 'first',
    handler: vi.fn(),
  },
  {
    id: 'item2',
    title: 'Second Item',
    subtitle: 'Second item subtitle',
    value: 'second',
    handler: vi.fn(),
  },
  {
    id: 'item3',
    title: 'Third Item',
    subtitle: 'Third item subtitle',
    value: 'third',
    handler: vi.fn(),
  },
]

describe('VCommandPalette Tab Navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    // Clean up
    const dialogs = document.querySelectorAll('[role="dialog"]')
    dialogs.forEach(dialog => {
      const closeButton = dialog.querySelector('[aria-label*="Close"]')
      if (closeButton) {
        (closeButton as HTMLElement).click()
      }
    })

    const overlays = document.querySelectorAll('.v-overlay')
    overlays.forEach(overlay => overlay.remove())

    const commandPalettes = document.querySelectorAll('.v-command-palette')
    commandPalettes.forEach(palette => palette.remove())
  })

  it('should navigate forward with Tab key', async () => {
    const model = ref(true)
    render(() => (
      <VCommandPalette
        v-model={ model.value }
        items={ basicItems }
      />
    ))

    await screen.findByRole('dialog')
    await wait(50)

    const listbox = screen.getByRole('listbox')

    // First item should be auto-selected initially
    expect(listbox).toHaveAttribute('aria-activedescendant', 'command-palette-item-0')

    // Press Tab - should move to second item
    await userEvent.keyboard('{Tab}')
    await wait(50)

    expect(listbox).toHaveAttribute('aria-activedescendant', 'command-palette-item-1')

    // Press Tab again - should move to third item
    await userEvent.keyboard('{Tab}')
    await wait(50)

    expect(listbox).toHaveAttribute('aria-activedescendant', 'command-palette-item-2')

    // Press Tab again - should wrap to first item
    await userEvent.keyboard('{Tab}')
    await wait(50)

    expect(listbox).toHaveAttribute('aria-activedescendant', 'command-palette-item-0')
  })

  it('should navigate backward with Shift+Tab key', async () => {
    const model = ref(true)
    render(() => (
      <VCommandPalette
        v-model={ model.value }
        items={ basicItems }
      />
    ))

    await screen.findByRole('dialog')
    await wait(50)

    const listbox = screen.getByRole('listbox')

    // First item should be auto-selected initially
    expect(listbox).toHaveAttribute('aria-activedescendant', 'command-palette-item-0')

    // Press Shift+Tab - should wrap to last item
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}')
    await wait(100) // Longer wait to ensure processing

    expect(listbox).toHaveAttribute('aria-activedescendant', 'command-palette-item-2')

    // Press Shift+Tab again - should move to second item
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}')
    await wait(100)

    expect(listbox).toHaveAttribute('aria-activedescendant', 'command-palette-item-1')
  })

  it('should handle Tab navigation after mouse hover correctly', async () => {
    const model = ref(true)
    render(() => (
      <VCommandPalette
        v-model={ model.value }
        items={ basicItems }
      />
    ))

    await screen.findByRole('dialog')
    await wait(50)

    const listbox = screen.getByRole('listbox')

    // Hover over second item
    const secondItem = await screen.findByText('Second Item')
    await userEvent.hover(secondItem)
    await wait(50)

    // Second item should be selected due to hover
    expect(listbox).toHaveAttribute('aria-activedescendant', 'command-palette-item-1')

    // Press Tab - should move to third item (keyboard should override hover)
    await userEvent.keyboard('{Tab}')
    await wait(50)

    expect(listbox).toHaveAttribute('aria-activedescendant', 'command-palette-item-2')

    // Move mouse away to clear hover state
    await userEvent.unhover(secondItem)
    await wait(50)

    // Tab should still work correctly - wrap to first item
    await userEvent.keyboard('{Tab}')
    await wait(50)

    expect(listbox).toHaveAttribute('aria-activedescendant', 'command-palette-item-0')
  })

  it('should execute item with Enter after Tab navigation', async () => {
    const model = ref(true)
    const handler = vi.fn()
    const itemsWithHandler = [
      { id: 'item1', title: 'First Item', handler: vi.fn() },
      { id: 'item2', title: 'Second Item', handler },
      { id: 'item3', title: 'Third Item', handler: vi.fn() },
    ]

    render(() => (
      <VCommandPalette
        v-model={ model.value }
        items={ itemsWithHandler }
      />
    ))

    await screen.findByRole('dialog')
    await wait(50)

    const listbox = screen.getByRole('listbox')

    // Tab to second item
    await userEvent.keyboard('{Tab}')
    await wait(50)

    expect(listbox).toHaveAttribute('aria-activedescendant', 'command-palette-item-1')

    // Execute with Enter
    await userEvent.keyboard('{Enter}')
    await wait(50)

    expect(handler).toHaveBeenCalledTimes(1)
  })
})
