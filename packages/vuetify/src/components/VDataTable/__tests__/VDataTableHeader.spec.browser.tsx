// Components
import { VDataTable } from '../VDataTable'

// Utilities
import { page, render, userEvent } from '@test'
import { computed, shallowRef } from 'vue'

describe('VDataTableHeader - Desktop', () => {
  it('should set aria-label on select all checkbox', async () => {
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

    await expect.element(page.getByRole('checkbox', { name: 'Select all rows' })).toBeInTheDocument()
  })
})

describe('VDataTableHeader - Reactivity', () => {
  it('should react to props changes and show/hide elements properly', async () => {
    const showSelect = shallowRef(true)
    const disableSort = shallowRef(false)
    const sortable = shallowRef(false)

    const headers = computed(() => ([
      {
        title: 'Name',
        key: 'id',
        value: 'id',
        sortable: sortable.value,
      },
      {
        title: 'Two',
        key: 'value',
        value: 'value',
        sortable: sortable.value,
      },
    ]))

    const items = Array(3).fill(0).map((_, i) => ({ id: i, name: `Name ${i}`, value: Math.random() > 0.5 ? 'hello' : 'world' }))

    render(() => (
      <VDataTable
        headers={ headers.value }
        items={ items }
        mobile
        showSelect={ showSelect.value }
        disableSort={ disableSort.value }
      />
    ))

    // 1. Initial state: showSelect = true, disableSort = false, sortable = false (NO sortable columns)
    await expect.element(page.getByTestId('v-data-table-thead-mobile-sort-selector')).not.toBeInTheDocument()
    await expect.element(page.getByTestId('v-data-table-thead-mobile-select-checkbox')).toBeInTheDocument()
    await expect.element(page.getByRole('checkbox', { name: 'Select all rows' })).toBeInTheDocument()
    await expect.element(page.getByText('Select all rows')).toBeInTheDocument()

    // 2. State: showSelect = true, disableSort = false, sortable = true (WITH sortable columns)
    sortable.value = true

    await expect.element(page.getByTestId('v-data-table-thead-mobile-sort-selector')).toBeInTheDocument()
    await expect.element(page.getByTestId('v-data-table-thead-mobile-select-checkbox')).toBeInTheDocument()
    await expect.element(page.getByRole('checkbox', { name: 'Select all rows' })).toBeInTheDocument()
    await expect.element(page.getByText('Select all rows')).not.toBeInTheDocument() // aria-label only

    // 3. State: showSelect = true, disableSort = true, sortable = true (Sorting disabled globally)
    disableSort.value = true

    await expect.element(page.getByTestId('v-data-table-thead-mobile-sort-selector')).not.toBeInTheDocument()
    await expect.element(page.getByTestId('v-data-table-thead-mobile-select-checkbox')).toBeInTheDocument()
    await expect.element(page.getByRole('checkbox', { name: 'Select all rows' })).toBeInTheDocument()
    await expect.element(page.getByText('Select all rows')).toBeInTheDocument()

    // 4. State: showSelect = false, disableSort = true, sortable = true (No select, no sort)
    showSelect.value = false

    await expect.element(page.getByTestId('v-data-table-thead-mobile-sort-selector')).not.toBeInTheDocument()
    await expect.element(page.getByTestId('v-data-table-thead-mobile-select-checkbox')).not.toBeInTheDocument()
  })

  it('should toggle aria-label on select all checkbox when all rows are selected/deselected', async () => {
    const items = Array(3).fill(0).map((_, i) => ({ id: i, name: `Name ${i}`, value: 'hello' }))
    const selected = shallowRef<number[]>([])

    render(() => (
      <VDataTable
        v-model={ selected.value }
        headers={[
          { title: 'Name', key: 'id', value: 'id', sortable: true },
          { title: 'Two', key: 'value', value: 'value', sortable: true },
        ]}
        items={ items }
        showSelect
      />
    ))

    // Initial state: nothing selected, label should be "Select all rows"
    const checkbox = page.getByRole('checkbox', { name: 'Select all rows' }).first()
    await expect.element(checkbox).toBeInTheDocument()

    // Click a row to select it, putting "Select All" in indeterminate state
    await userEvent.click(page.getByRole('checkbox', { name: 'Select row' }).first())

    // Label should change to the indeterminate state "Select all rows ({0} selected)"
    const indeterminateCheckbox = page.getByRole('checkbox', { name: 'Select all rows (1 selected)' }).first()
    await expect.element(indeterminateCheckbox).toBeInTheDocument()

    // Click it to select ALL rows
    await userEvent.click(indeterminateCheckbox)

    // State changes: All rows selected, label should be "Deselect all rows ({0} selected)"
    const allSelectedCheckbox = page.getByRole('checkbox', { name: 'Deselect all rows (3 selected)' }).first()
    await expect.element(allSelectedCheckbox).toBeInTheDocument()

    // Click it to deselect ALL rows
    await userEvent.click(allSelectedCheckbox)

    // Back to initial state
    await expect.element(page.getByRole('checkbox', { name: 'Select all rows' }).first()).toBeInTheDocument()
  })
})
