// Components
import { VDataTable } from '../VDataTable'

// Utilities
import { page, render, userEvent } from '@test'

describe('VDataTableRow', () => {
  it('should toggle aria-label on row select checkbox when selected/deselected', async () => {
    const items = Array(3).fill(0).map((_, i) => ({ id: i, name: `Name ${i}`, value: 'hello' }))

    render(() => (
      <VDataTable
        headers={[
          { title: 'Name', key: 'id', value: 'id', sortable: true },
          { title: 'Two', key: 'value', value: 'value', sortable: true },
        ]}
        items={ items }
        showSelect
      />
    ))

    // Initial state: Rows are not selected, label should be "Select row"
    const checkbox = page.getByRole('checkbox', { name: 'Select row' }).first()
    await expect.element(checkbox).toBeInTheDocument()
    await expect.element(checkbox).toHaveAttribute('aria-label', 'Select row')

    // Click to select the row
    await userEvent.click(checkbox)

    // State changes: Row is selected, label should be "Deselect row"
    const selectedCheckbox = page.getByRole('checkbox', { name: 'Deselect row' }).first()
    await expect.element(selectedCheckbox).toBeInTheDocument()
    await expect.element(selectedCheckbox).toHaveAttribute('aria-label', 'Deselect row')

    // Click to deselect the row
    await userEvent.click(selectedCheckbox)

    // State changes back: Row is deselected, label should be "Select row" again
    const deselectedCheckbox = page.getByRole('checkbox', { name: 'Select row' }).first()
    await expect.element(deselectedCheckbox).toBeInTheDocument()
    await expect.element(deselectedCheckbox).toHaveAttribute('aria-label', 'Select row')
  })
})
