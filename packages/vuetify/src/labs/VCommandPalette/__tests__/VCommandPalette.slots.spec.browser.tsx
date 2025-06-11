// Components
import { VCommandPalette } from '../VCommandPalette'

// Utilities
import { render, screen, userEvent } from '@test'
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
]

describe('VCommandPalette', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Slots', () => {
    it('should render custom item slot content', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          v-slots={{
            item: ({ item }: any) => (
              <div data-testid={ `custom-${item.raw.id}` }>
                Custom: { item.raw.title }
              </div>
            ),
          }}
        />
      ))

      await expect(screen.findByTestId('custom-item1')).resolves.toBeVisible()
      await expect(screen.findByText('Custom: First Item')).resolves.toBeVisible()
    })

    it('should render custom no-data slot content', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={[]}
          v-slots={{
            'no-data': () => <div data-testid="custom-no-data">No items found!</div>,
          }}
        />
      ))

      await expect(screen.findByTestId('custom-no-data')).resolves.toBeVisible()
      await expect(screen.findByText('No items found!')).resolves.toBeVisible()
    })

    it('should render header and footer slots', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          v-slots={{
            header: () => <div data-testid="custom-header">Custom Header</div>,
            footer: () => <div data-testid="custom-footer">Custom Footer</div>,
          }}
        />
      ))

      await expect(screen.findByTestId('custom-header')).resolves.toBeVisible()
      await expect(screen.findByTestId('custom-footer')).resolves.toBeVisible()
    })

    it('should render prepend and append slots', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          v-slots={{
            prepend: () => <div data-testid="custom-prepend">Prepend Content</div>,
            append: () => <div data-testid="custom-append">Append Content</div>,
          }}
        />
      ))

      await expect(screen.findByTestId('custom-prepend')).resolves.toBeVisible()
      await expect(screen.findByTestId('custom-append')).resolves.toBeVisible()
    })

    it('should render prepend-list and append-list slots', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          v-slots={{
            'prepend-list': () => <div data-testid="custom-prepend-list">Before List</div>,
            'append-item': () => <div data-testid="custom-append-item">After List</div>,
          }}
        />
      ))

      await expect(screen.findByTestId('custom-prepend-list')).resolves.toBeVisible()
      await expect(screen.findByTestId('custom-append-item')).resolves.toBeVisible()
    })

    it('should maintain keyboard navigation with custom item slot', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          v-slots={{
            item: ({ item }: any) => (
              <div data-testid={ `custom-${item.raw.id}` } class="custom-item">
                Custom: { item.raw.title }
              </div>
            ),
          }}
        />
      ))

      await screen.findByRole('dialog')

      // Verify custom items are rendered
      await expect(screen.findByTestId('custom-item1')).resolves.toBeVisible()
      await expect(screen.findByText('Custom: First Item')).resolves.toBeVisible()

      // First item is selected by default
      const handler = basicItems[0].handler
      await userEvent.keyboard('{Enter}')
      expect(handler).toHaveBeenCalledTimes(1)
    })
  })
})
