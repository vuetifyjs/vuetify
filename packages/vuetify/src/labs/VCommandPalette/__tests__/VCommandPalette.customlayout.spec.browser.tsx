// Components
import { VCommandPalette, VCommandPaletteItemComponent as VCommandPaletteItem, VCommandPaletteItems } from '../VCommandPalette'

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
  {
    id: 'item3',
    title: 'Third Item',
    subtitle: 'Third item subtitle',
    value: 'third',
    handler: vi.fn(),
  },
]

describe('VCommandPalette', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Custom Layout Support', () => {
    it('should render default slot when provided', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          v-slots={{
            default: ({ items, rootProps, getItemProps }) => (
              <div class="custom-layout" { ...rootProps }>
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

      // Should render custom layout
      const customLayout = screen.getByRole('listbox')
      expect(customLayout).toHaveClass('custom-layout')

      // Should render custom items
      const customItems = screen.getAllByRole('option')
      expect(customItems).toHaveLength(3)
      expect(customItems[0]).toHaveClass('custom-item')
      expect(customItems[0]).toHaveTextContent('First Item')
    })

    it('should provide correct slot scope properties', async () => {
      const model = ref(true)
      const slotProps = ref<any>(null)

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          v-slots={{
            default: props => {
              slotProps.value = props
              return <div>Custom content</div>
            },
          }}
        />
      ))

      await screen.findByRole('dialog')

      // Should provide correct slot scope
      expect(slotProps.value).toBeDefined()
      expect(slotProps.value.items).toBeDefined()
      expect(slotProps.value.rootProps).toBeDefined()
      expect(slotProps.value.getItemProps).toBeTypeOf('function')

      // Items should be reactive
      expect(slotProps.value.items).toHaveLength(3)

      // getItemProps should return correct props
      const itemProps = slotProps.value.getItemProps(basicItems[0], 0)
      expect(itemProps).toHaveProperty('id')
      expect(itemProps).toHaveProperty('role', 'option')
      expect(itemProps).toHaveProperty('aria-selected')
    })

    it('should maintain backward compatibility when no default slot is provided', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
        />
      ))

      await screen.findByRole('dialog')

      // Should render the default VCommandPaletteList
      const list = screen.getByRole('listbox')
      expect(list).toHaveClass('v-command-palette__list')

      // Should render all items
      const items = screen.getAllByRole('option')
      expect(items).toHaveLength(3)
      expect(items[0]).toHaveTextContent('First Item')
    })

    it('should work with VCommandPaletteItems helper component', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          v-slots={{
            default: ({ items }) => (
              <VCommandPaletteItems>
                { items.map((item, index) => (
                  <VCommandPaletteItem
                    key={ item.id }
                    item={ item }
                    index={ index }
                    v-slots={{
                      default: ({ item }) => (
                        <div class="helper-item">{ item.title }</div>
                      ),
                    }}
                  />
                ))}
              </VCommandPaletteItems>
            ),
          }}
        />
      ))

      await screen.findByRole('dialog')

      // Should render VCommandPaletteItems wrapper
      const itemsWrapper = screen.getByRole('listbox')
      expect(itemsWrapper).toHaveClass('v-command-palette-items')
      expect(itemsWrapper).toHaveClass('v-command-palette-items--list')

      // Should render VCommandPaletteItem components
      const items = screen.getAllByRole('option')
      expect(items).toHaveLength(3)
      expect(items[0]).toHaveClass('v-command-palette-item')

      // Should render custom content
      const helperItems = screen.getAllByText(/Item/)
      expect(helperItems[0]).toHaveClass('helper-item')
    })

    it('should handle keyboard navigation in custom layout', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          v-slots={{
            default: ({ items, rootProps, getItemProps }) => (
              <div { ...rootProps }>
                { items.map((item, index) => (
                  <div
                    key={ item.id }
                    { ...getItemProps(item, index) }
                    data-testid={ `custom-item-${index}` }
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

      // First item should be auto-selected
      const firstItem = screen.getByTestId('custom-item-0')
      expect(firstItem).toHaveClass('v-list-item--active')

      // Arrow right should move selection in custom layout
      await userEvent.keyboard('{ArrowRight}')

      const secondItem = screen.getByTestId('custom-item-1')
      await expect.poll(() =>
        secondItem.classList.contains('v-list-item--active')
      ).toBeTruthy()

      expect(firstItem).not.toHaveClass('v-list-item--active')
    })

    it('should execute items in custom layout with Enter key', async () => {
      const model = ref(true)
      const handler = vi.fn()
      const itemsWithHandler = [
        { id: 'test', title: 'Test Item', handler },
      ]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ itemsWithHandler }
          v-slots={{
            default: ({ items, rootProps, getItemProps }) => (
              <div { ...rootProps }>
                { items.map((item, index) => (
                  <div
                    key={ item.id }
                    { ...getItemProps(item, index) }
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

      // Execute with Enter key
      await userEvent.keyboard('{Enter}')

      // Should execute the handler
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('should select custom item on click and reflect active state', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          v-slots={{
            default: ({ items, rootProps, getItemProps }) => (
              <div { ...rootProps }>
                { items.map((item, index) => (
                  <div
                    key={ item.id }
                    { ...getItemProps(item, index) }
                    data-testid={ `click-item-${index}` }
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

      const second = await screen.findByTestId('click-item-1')
      await userEvent.click(second)

      // second should carry active class now
      await expect.poll(() => second.classList.contains('v-list-item--active')).toBeTruthy()
    })
  })
})
