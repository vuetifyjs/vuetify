// Components
import { VDataTable } from '../'

// Utilities
import { render, screen, userEvent } from '@test'
import { ref } from 'vue'

describe('VDataTable', () => {
  it('mirrors external updates', async () => {
    const items = ref([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ])

    render(() => (
      <VDataTable
        items={ items.value }
        columns={[{ key: 'name', title: 'Name' }]}
      />
    ))

    const cells = screen.getAllByRole('cell')
    expect.element(cells[0]).toHaveTextContent('1')

    // Update items
    items.value = [{ id: 3, name: 'Item 3' }]

    await expect
      .poll(() => screen.getAllByRole('cell')[0])
      .toHaveTextContent('3')
  })
  it('renders an empty table when no items are provided', () => {
    const items = ref([])
    render(() => (
      <VDataTable
        items={ items.value }
        columns={[{ key: 'name', title: 'Name' }]}
      />
    ))

    expect.element(screen.getByRole('table')).toBeInTheDocument()
    expect.element(screen.getByText('No data available')).toBeInTheDocument()
  })
  it('shows a loading state when data is being fetched', async () => {
    const loading = ref(true)
    const items = ref([])
    render(() => (
      <VDataTable
        items={ items.value }
        loading={ loading.value }
        columns={[{ key: 'name', title: 'Name' }]}
      />
    ))

    const table = screen.getByRole('table')
    expect.element(table).toHaveClass('v-data-table--loading')

    loading.value = false
    expect.element(table).not.toHaveClass('v-data-table--loading')
  })

  describe('slot rendering', () => {
    it('renders default slot', () => {
      render(() => <VDataTable />)
      expect(screen.getByRole('table')).toBeInTheDocument()
    })

    it('renders with custom header', () => {
      const items = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ]
      render(() => (
        <VDataTable items={ items }>
          <slot name="top">
            <div>Custom Top Content</div>
          </slot>
        </VDataTable>
      ))
      const customTopContent = screen.getByText('Custom Top Content')
      expect(customTopContent).toBeInTheDocument()
    })
    // TODO Add more slot test cases
  })

  describe('sorting functionality', () => {
    it('handles column sorting', async () => {
      const items = ref([
        { id: 1, name: 'B Item' },
        { id: 2, name: 'A Item' },
      ])

      render(() => (
        <VDataTable
          items={ items.value }
          columns={[{ key: 'name', title: 'Name', sortable: true }]}
        />
      ))

      const headerCell = screen.getByText('Name')
      await userEvent.click(headerCell)

      const cells = screen.getAllByRole('cell')
      expect.element(cells[0]).toHaveTextContent('A Item')
    })
  })
})
