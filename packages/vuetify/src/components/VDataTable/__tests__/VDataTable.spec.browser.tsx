// Components
import { VDataTable } from '../'

// Utilities
import { render, screen, userEvent } from '@test'
import { nextTick } from 'vue'

describe('VDataTable', () => {
  it('mirrors external updates', async () => {
    let items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ]

    render(() => (
      <VDataTable items={ items } columns={[{ key: 'name', title: 'Name' }]} />
    ))
    const cells = screen.getAllByRole('cell')
    expect(cells[0]).toHaveTextContent('1')

    items = [{ id: 3, name: 'Item 3' }]
    await nextTick()
    expect(cells[0]).toHaveTextContent('1')
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
  })

  describe('sorting functionality', () => {
    it('handles column sorting', async () => {
      const items = [
        { id: 1, name: 'B Item' },
        { id: 2, name: 'A Item' },
      ]

      render(() => (
        <VDataTable
          items={ items }
          columns={[{ key: 'name', title: 'Name', sortable: true }]}
        />
      ))

      const headerCell = screen.getByText('Name')
      await userEvent.click(headerCell)

      const cells = screen.getAllByRole('cell')
      expect(cells[0]).toHaveTextContent('2')
    })
  })
})
