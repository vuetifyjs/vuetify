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
    title: 'Another Thing',
    subtitle: 'Different item',
    value: 'third',
    handler: vi.fn(),
  },
]

const itemsWithParent = [
  ...basicItems,
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

describe('VCommandPalette Subheader Slot', () => {
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

  it('should not show subheader when no search query', async () => {
    const model = ref(true)
    render(() => (
      <VCommandPalette
        v-model={ model.value }
        items={ basicItems }
        v-slots={{
          subheader: (scope: any) => (
            <div data-testid="subheader">
              Results ({ scope.totalResults })
            </div>
          ),
        }}
      />
    ))

    await screen.findByRole('dialog')
    await wait(50)

    // Should not show subheader when no search query
    expect(screen.queryByTestId('subheader')).toBeNull()
  })

  it('should show subheader when searching', async () => {
    const model = ref(true)
    render(() => (
      <VCommandPalette
        v-model={ model.value }
        items={ basicItems }
        v-slots={{
          subheader: (scope: any) => (
            <div data-testid="subheader">
              Results ({ scope.totalResults })
            </div>
          ),
        }}
      />
    ))

    await screen.findByRole('dialog')
    await wait(50)

    // Type a search query
    const searchInput = await screen.findByRole('textbox')
    await userEvent.type(searchInput, 'Item')
    await wait(50)

    // Should now show subheader
    const subheader = await screen.findByTestId('subheader')
    expect(subheader).toBeVisible()
    expect(subheader).toHaveTextContent('Results (3)') // Should match "First Item", "Second Item", and "Another Thing" (subtitle: "Different item")
  })

  it('should provide correct slot scope properties', async () => {
    const mockSubheader = vi.fn()
    const model = ref(true)

    render(() => (
      <VCommandPalette
        v-model={ model.value }
        items={ basicItems }
        v-slots={{
          subheader: (scope: any) => {
            mockSubheader(scope)
            return (
              <div data-testid="subheader">
                Search: "{ scope.search.value }" | Results: { scope.totalResults } | Has Query: { scope.hasQuery.toString() }
              </div>
            )
          },
        }}
      />
    ))

    await screen.findByRole('dialog')
    await wait(50)

    // Type a search query
    const searchInput = await screen.findByRole('textbox')
    await userEvent.type(searchInput, 'Item')
    await wait(50)

    // Check that subheader was called with correct scope
    expect(mockSubheader).toHaveBeenCalled()
    const lastCall = mockSubheader.mock.calls[mockSubheader.mock.calls.length - 1][0]

    expect(lastCall).toHaveProperty('search')
    expect(lastCall.search.value).toBe('Item')
    expect(lastCall.totalResults).toBe(3)
    expect(lastCall.hasQuery).toBe(true)
    expect(lastCall).toHaveProperty('filteredItems')
    expect(lastCall.filteredItems).toHaveLength(3)
    expect(lastCall).toHaveProperty('navigateBack')
    expect(typeof lastCall.navigateBack).toBe('function')
    expect(lastCall).toHaveProperty('navigationStack')
  })

  it('should update subheader dynamically based on search results', async () => {
    const model = ref(true)
    render(() => (
      <VCommandPalette
        v-model={ model.value }
        items={ basicItems }
        v-slots={{
          subheader: (scope: any) => (
            <div data-testid="subheader">
              Query: "{ scope.search.value }" | Results: { scope.totalResults }
            </div>
          ),
        }}
      />
    ))

    await screen.findByRole('dialog')
    await wait(50)

    const searchInput = await screen.findByRole('textbox')

    // Search for "Item" - should match 3 items
    await userEvent.type(searchInput, 'Item')
    await wait(50)

    const subheader = await screen.findByTestId('subheader')
    expect(subheader).toHaveTextContent('Query: "Item"')
    expect(subheader).toHaveTextContent('Results: 3')
  })

  it('should provide navigateBack function that works in nested navigation', async () => {
    const model = ref(true)

    render(() => (
      <VCommandPalette
        v-model={ model.value }
        items={ itemsWithParent }
        v-slots={{
          subheader: (scope: any) => (
            <div data-testid="subheader">
              <button
                data-testid="go-back-button"
                onClick={ () => scope.navigateBack() }
              >
                Go Back
              </button>
              Results ({ scope.totalResults }) | Stack: { scope.navigationStack.value.length }
            </div>
          ),
        }}
      />
    ))

    await screen.findByRole('dialog')
    await wait(50)

    // Navigate into a parent item
    await userEvent.click(await screen.findByText('Parent Item'))
    await wait(50)

    // Should be in children view
    await expect(screen.findByText('Child One')).resolves.toBeVisible()

    // Type a search to show subheader
    const searchInput = await screen.findByRole('textbox')
    await userEvent.type(searchInput, 'Child')
    await wait(50)

    // Subheader should show with navigation stack info
    const subheader = await screen.findByTestId('subheader')
    expect(subheader).toHaveTextContent('Stack: 1') // Should indicate we're nested

    // Click the back button in subheader
    const goBackButton = await screen.findByTestId('go-back-button')
    await userEvent.click(goBackButton)
    await wait(50)

    // Should be back at top level
    await expect(screen.findByText('Parent Item')).resolves.toBeVisible()
    expect(screen.queryByText('Child One')).toBeNull()
  })

  it('should work with both search and navigation states', async () => {
    const model = ref(true)
    render(() => (
      <VCommandPalette
        v-model={ model.value }
        items={ itemsWithParent }
        v-slots={{
          subheader: (scope: any) => (
            <div data-testid="subheader">
              Level: { scope.navigationStack.value.length } | Results: { scope.totalResults }
            </div>
          ),
        }}
      />
    ))

    await screen.findByRole('dialog')
    await wait(50)

    // Start searching at top level
    const searchInput = await screen.findByRole('textbox')
    await userEvent.type(searchInput, 'Item')
    await wait(50)

    let subheader = await screen.findByTestId('subheader')
    expect(subheader).toHaveTextContent('Level: 0') // Top level
    expect(subheader).toHaveTextContent('Results: 4') // Should include "First Item", "Second Item", "Another Thing" (subtitle), "Parent Item"

    // Navigate into parent (without clearing search to avoid timing issues)
    await userEvent.click(await screen.findByText('Parent Item'))
    await wait(50)

    // Search in nested level
    await userEvent.clear(searchInput)
    await userEvent.type(searchInput, 'Child')
    await wait(50)

    subheader = await screen.findByTestId('subheader')
    expect(subheader).toHaveTextContent('Level: 1') // Nested level
    expect(subheader).toHaveTextContent('Results: 2') // "Child One", "Child Two"
  })
})
