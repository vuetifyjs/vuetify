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
]

describe('VCommandPalette showSearchBackButton Prop', () => {
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

  it('should show back button in search by default when nested', async () => {
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

    // Should show back button by default
    const backButton = await screen.findByLabelText(/navigate back/i)
    expect(backButton).toBeTruthy()
    expect(backButton.tagName.toLowerCase()).toBe('button')
  })

  it('should not show back button in search when showSearchBackButton=false', async () => {
    const model = ref(true)
    render(() => (
      <VCommandPalette
        v-model={ model.value }
        items={ itemsWithParent }
        showSearchBackButton={ false }
      />
    ))

    await screen.findByRole('dialog')
    await wait(50)

    // Click parent to drill down
    await userEvent.click(await screen.findByText('Parent Item'))
    await wait(50)

    // Should NOT show back button in search
    const backButton = screen.queryByLabelText(/navigate back/i)
    expect(backButton).toBeNull()

    // Should be in children view though
    await expect(screen.findByText('Child One')).resolves.toBeVisible()
  })

  it('should allow back navigation via subheader slot when search back button is disabled', async () => {
    const model = ref(true)
    render(() => (
      <VCommandPalette
        v-model={ model.value }
        items={ itemsWithParent }
        showSearchBackButton={ false }
        v-slots={{
          subheader: (scope: any) => (
            <div data-testid="subheader">
              { scope.navigationStack.value.length > 0 && (
                <button
                  key="subheader-back-button"
                  data-testid="subheader-back-button"
                  onClick={ () => scope.navigateBack() }
                >
                  ← Back
                </button>
              )}
              Results: { scope.totalResults }
            </div>
          ),
        }}
      />
    ))

    await screen.findByRole('dialog')
    await wait(50)

    // Click parent to drill down
    await userEvent.click(await screen.findByText('Parent Item'))
    await wait(50)

    // Should be in children view
    await expect(screen.findByText('Child One')).resolves.toBeVisible()

    // Type a search to show subheader
    const searchInput = await screen.findByRole('textbox')
    await userEvent.type(searchInput, 'Child')
    await wait(50)

    // Should have subheader with back button
    const subheader = await screen.findByTestId('subheader')
    expect(subheader).toBeVisible()

    const subheaderBackButton = await screen.findByTestId('subheader-back-button')
    expect(subheaderBackButton).toBeVisible()
    expect(subheaderBackButton).toHaveTextContent('← Back')

    // Click the subheader back button
    await userEvent.click(subheaderBackButton)
    await wait(50)

    // Should be back at top level
    await expect(screen.findByText('Parent Item')).resolves.toBeVisible()
    expect(screen.queryByText('Child One')).toBeNull()
  })

  it('should show back button in search when showSearchBackButton=true (explicit)', async () => {
    const model = ref(true)
    render(() => (
      <VCommandPalette
        v-model={ model.value }
        items={ itemsWithParent }
        showSearchBackButton
      />
    ))

    await screen.findByRole('dialog')
    await wait(50)

    // Click parent to drill down
    await userEvent.click(await screen.findByText('Parent Item'))
    await wait(50)

    // Should show back button when explicitly enabled
    const backButton = await screen.findByLabelText(/navigate back/i)
    expect(backButton).toBeTruthy()
  })

  it('should not show back button at top level regardless of prop value', async () => {
    const model = ref(true)
    render(() => (
      <VCommandPalette
        v-model={ model.value }
        items={ itemsWithParent }
        showSearchBackButton
      />
    ))

    await screen.findByRole('dialog')
    await wait(50)

    // Should not show back button at top level even when prop is true
    const backButton = screen.queryByLabelText(/navigate back/i)
    expect(backButton).toBeNull()
  })
})
