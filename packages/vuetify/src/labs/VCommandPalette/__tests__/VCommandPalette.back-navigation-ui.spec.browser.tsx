// Components
import { VCommandPalette } from '../VCommandPalette'

// Utilities
import { render, screen, userEvent, wait } from '@test'
import { ref } from 'vue'

// Test data
const itemsWithParent = [
  {
    id: 'item1',
    title: 'First Item',
    subtitle: 'First item subtitle',
    value: 'first',
    handler: vi.fn(),
  },
  {
    id: 'parent1',
    type: 'parent' as const,
    title: 'Parent Item',
    subtitle: 'Has children',
    children: [
      {
        id: 'child1',
        title: 'Child One',
        subtitle: 'First child',
        value: 'child1',
        handler: vi.fn(),
      },
      {
        id: 'child2',
        title: 'Child Two',
        subtitle: 'Second child',
        value: 'child2',
        handler: vi.fn(),
      },
    ],
  },
  {
    id: 'item2',
    title: 'Second Item',
    subtitle: 'Second item subtitle',
    value: 'second',
    handler: vi.fn(),
  },
]

describe('VCommandPalette Back Navigation UI', () => {
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

  it('should show search icon when at top level', async () => {
    const model = ref(true)
    render(() => (
      <VCommandPalette
        v-model={ model.value }
        items={ itemsWithParent }
      />
    ))

    await screen.findByRole('dialog')
    await wait(50)

    // Should show search icon when at top level
    const searchIcon = document.querySelector('.v-field__prepend-inner .v-icon')
    expect(searchIcon).toBeTruthy()

    // Should not show back button
    const backButton = screen.queryByLabelText(/navigate back/i)
    expect(backButton).toBeNull()
  })

  it('should show back button when navigated into parent', async () => {
    const model = ref(true)
    render(() => (
      <VCommandPalette
        v-model={ model.value }
        items={ itemsWithParent }
      />
    ))

    await screen.findByRole('dialog')
    await wait(50)

    // Click parent to drill down
    await userEvent.click(await screen.findByText('Parent Item'))
    await wait(50)

    // Should now show back button instead of search icon
    const backButton = await screen.findByLabelText(/navigate back/i)
    expect(backButton).toBeTruthy()
    expect(backButton.tagName.toLowerCase()).toBe('button')

    // Should be in children view
    await expect(screen.findByText('Child One')).resolves.toBeVisible()
    expect(screen.queryByText('First Item')).toBeNull()
  })

  it('should navigate back when back button is clicked', async () => {
    const model = ref(true)
    render(() => (
      <VCommandPalette
        v-model={ model.value }
        items={ itemsWithParent }
      />
    ))

    await screen.findByRole('dialog')
    await wait(50)

    // Click parent to drill down
    await userEvent.click(await screen.findByText('Parent Item'))
    await wait(50)

    // Should be in children view
    await expect(screen.findByText('Child One')).resolves.toBeVisible()

    // Click the back button
    const backButton = await screen.findByLabelText(/navigate back/i)
    await userEvent.click(backButton)
    await wait(50)

    // Should be back at the top level
    await expect(screen.findByText('Parent Item')).resolves.toBeVisible()
    await expect(screen.findByText('First Item')).resolves.toBeVisible()
    expect(screen.queryByText('Child One')).toBeNull()

    // Should show search icon again, not back button
    const searchIcon = document.querySelector('.v-field__prepend-inner .v-icon')
    expect(searchIcon).toBeTruthy()
    expect(screen.queryByLabelText(/navigate back/i)).toBeNull()
  })

  it('should work correctly with keyboard and mouse navigation between levels', async () => {
    const model = ref(true)
    render(() => (
      <VCommandPalette
        v-model={ model.value }
        items={ itemsWithParent }
      />
    ))

    await screen.findByRole('dialog')
    await wait(50)

    // Use keyboard to navigate to parent and enter
    await userEvent.keyboard('{ArrowDown}') // Navigate to Parent Item
    await wait(50)
    await userEvent.keyboard('{Enter}') // Enter into parent
    await wait(50)

    // Should be in children view with back button
    await expect(screen.findByText('Child One')).resolves.toBeVisible()
    const backButton = await screen.findByLabelText(/navigate back/i)
    expect(backButton).toBeTruthy()

    // Use mouse to click back button
    await userEvent.click(backButton)
    await wait(50)

    // Should be back at top level
    await expect(screen.findByText('Parent Item')).resolves.toBeVisible()
    expect(screen.queryByLabelText(/navigate back/i)).toBeNull()
  })
})
