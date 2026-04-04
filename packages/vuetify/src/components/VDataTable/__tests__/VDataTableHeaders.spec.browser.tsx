// Components
import { VDataTable } from '../VDataTable'

// Utilities
import { page, render, userEvent } from '@test'
import { computed, shallowRef } from 'vue'

describe('VDataTableHeaders - Mobile', () => {
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

    const items = Array(3).fill(0).map((_, i) => ({ id: i, name: `Name ${i}`, value: 'hello' }))

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

    // 2. State: showSelect = true, disableSort = false, sortable = true (WITH sortable columns)
    sortable.value = true

    await expect.element(page.getByTestId('v-data-table-thead-mobile-sort-selector')).toBeInTheDocument()
    await expect.element(page.getByTestId('v-data-table-thead-mobile-select-checkbox')).toBeInTheDocument()
    await expect.element(page.getByRole('checkbox', { name: 'Select all rows' })).toBeInTheDocument()

    // 3. State: showSelect = true, disableSort = true, sortable = true (Sorting disabled globally)
    disableSort.value = true

    await expect.element(page.getByTestId('v-data-table-thead-mobile-sort-selector')).not.toBeInTheDocument()
    await expect.element(page.getByTestId('v-data-table-thead-mobile-select-checkbox')).toBeInTheDocument()
    await expect.element(page.getByRole('checkbox', { name: 'Select all rows' })).toBeInTheDocument()

    // 4. State: showSelect = false, disableSort = true, sortable = true (No select, no sort)
    showSelect.value = false

    await expect.element(page.getByTestId('v-data-table-thead-mobile-sort-selector')).not.toBeInTheDocument()
    await expect.element(page.getByTestId('v-data-table-thead-mobile-select-checkbox')).not.toBeInTheDocument()
  })

  it('should render lonely select checkbox when showSelect is true and no sortable columns', async () => {
    const items = Array(3).fill(0).map((_, i) => ({ id: i, name: `Name ${i}`, value: 'hello' }))

    render(() => (
      <VDataTable
        headers={[
          { title: 'Name', key: 'id', value: 'id', sortable: false },
          { title: 'Two', key: 'value', value: 'value', sortable: false },
        ]}
        items={ items }
        mobile
        showSelect
      />
    ))

    await expect.element(page.getByTestId('v-data-table-thead-mobile-sort-selector')).not.toBeInTheDocument()
    await expect.element(page.getByTestId('v-data-table-thead-mobile-select-checkbox')).toBeInTheDocument()
    await expect.element(page.getByRole('checkbox', { name: 'Select all rows' })).toBeInTheDocument()
  })

  it('should render sort selector and append select checkbox when showSelect is true and has sortable columns', async () => {
    const items = Array(3).fill(0).map((_, i) => ({ id: i, name: `Name ${i}`, value: 'hello' }))

    render(() => (
      <VDataTable
        headers={[
          { title: 'Name', key: 'id', value: 'id', sortable: true },
          { title: 'Two', key: 'value', value: 'value', sortable: true },
        ]}
        items={ items }
        mobile
        showSelect
      />
    ))

    await expect.element(page.getByTestId('v-data-table-thead-mobile-sort-selector')).toBeInTheDocument()
    await expect.element(page.getByTestId('v-data-table-thead-mobile-select-checkbox')).toBeInTheDocument()
    await expect.element(page.getByRole('checkbox', { name: 'Select all rows' })).toBeInTheDocument()
  })

  it('should render lonely select checkbox when disableSort is true globally, even with sortable columns', async () => {
    const items = Array(3).fill(0).map((_, i) => ({ id: i, name: `Name ${i}`, value: 'hello' }))

    render(() => (
      <VDataTable
        headers={[
          { title: 'Name', key: 'id', value: 'id', sortable: true },
          { title: 'Two', key: 'value', value: 'value', sortable: true },
        ]}
        items={ items }
        mobile
        showSelect
        disableSort
      />
    ))

    await expect.element(page.getByTestId('v-data-table-thead-mobile-sort-selector')).not.toBeInTheDocument()
    await expect.element(page.getByTestId('v-data-table-thead-mobile-select-checkbox')).toBeInTheDocument()
    await expect.element(page.getByRole('checkbox', { name: 'Select all rows' })).toBeInTheDocument()
  })

  it('should not render selector or checkbox when showSelect is false and disableSort is true', async () => {
    const items = Array(3).fill(0).map((_, i) => ({ id: i, name: `Name ${i}`, value: 'hello' }))

    render(() => (
      <VDataTable
        headers={[
          { title: 'Name', key: 'id', value: 'id', sortable: true },
          { title: 'Two', key: 'value', value: 'value', sortable: true },
        ]}
        items={ items }
        mobile
        disableSort
      />
    ))

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
        mobile
        showSelect
      />
    ))

    // Initial state: nothing selected, label should be "Select all rows"
    const checkbox = page.getByRole('checkbox', { name: 'Select all rows' }).first()
    await expect.element(checkbox).toBeInTheDocument()

    // Click a row to select it, putting "Select All" in indeterminate state
    // We get the first row select checkbox
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
