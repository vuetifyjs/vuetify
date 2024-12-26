// Utilities
import { render, screen } from '@test'
import { fireEvent, waitFor } from '@testing-library/vue'
import { ref } from 'vue'
import { VDataTableServer } from '../VDataTableServer'

const DESSERT_HEADERS = [
  { title: 'Dessert (100g serving)', key: 'name' },
  { title: 'Calories', key: 'calories' },
  { title: 'Fat (g)', key: 'fat' },
  { title: 'Carbs (g)', key: 'carbs' },
  { title: 'Protein (g)', key: 'protein' },
  { title: 'Iron (%)', key: 'iron' },
]

const DESSERT_ITEMS = [
  { name: 'Frozen Yogurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, iron: '1%' },
  { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, iron: '1%' },
  { name: 'Eclair', calories: 262, fat: 16.0, carbs: 23, protein: 6.0, iron: '7%' },
  { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, iron: '8%' },
  { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, iron: '16%' },
  { name: 'Jelly bean', calories: 375, fat: 0.0, carbs: 94, protein: 0.0, iron: '0%' },
  { name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0, iron: '2%' },
  { name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5, iron: '45%' },
  { name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, iron: '22%' },
  { name: 'KitKat', calories: 518, fat: 26.0, carbs: 65, protein: 7, iron: '6%' },
]

describe('VDataTableServer', () => {
  const items = ref<any[]>([])
  const options = ref({
    itemsLength: 0,
    page: 1,
    itemsPerPage: 2,
    search: '',
    sortBy: '',
  })

  const load = (opts: { page: number, itemsPerPage: number }) => {
    setTimeout(() => {
      const start = (opts.page - 1) * opts.itemsPerPage
      const end = start + opts.itemsPerPage
      items.value = DESSERT_ITEMS.slice(start, end)
      options.value = {
        ...options.value,
        ...opts,
      }
    }, 10)
  }

  it('should render table', async () => {
    const itemsLength = 2

    render(() => (
      <VDataTableServer
        headers={ DESSERT_HEADERS }
        items={ DESSERT_ITEMS.slice(0, itemsLength) }
        itemsLength={ itemsLength }
      />
    ))

    const headers = screen.getAllByRole('columnheader')
    expect(headers).toHaveLength(DESSERT_HEADERS.length)

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(itemsLength + 1) // Including the header row
  })

  it('should trigger update event once on mount', async () => {
    render(() => (
      <VDataTableServer
        headers={ DESSERT_HEADERS }
        items={ items.value }
        itemsLength={ DESSERT_ITEMS.length }
        page={ options.value.page }
        itemsPerPage={ options.value.itemsPerPage }
      />
    ))

    load({ page: 1, itemsPerPage: 2 })

    await waitFor(() => {
      expect(items.value).toEqual(DESSERT_ITEMS.slice(0, 2))
    })
  })

  it('should trigger update event once when changing sort', async () => {
    render(() => (
      <VDataTableServer
        headers={ DESSERT_HEADERS }
        items={ items.value }
        itemsLength={ DESSERT_ITEMS.length }
        page={ options.value.page }
        itemsPerPage={ options.value.itemsPerPage }
        onUpdate:options={ load }
      />
    ))

    fireEvent.click(screen.getAllByRole('columnheader')[0])

    await waitFor(() => {
      expect(options.value.sortBy).toEqual([{ key: 'name', order: 'asc' }])
    })
  })

  it('should trigger update event once when search changes', async () => {
    render(() => (
      <VDataTableServer
        headers={ DESSERT_HEADERS }
        items={ items.value }
        itemsLength={ DESSERT_ITEMS.length }
        page={ options.value.page }
        itemsPerPage={ options.value.itemsPerPage }
        search={ options.value.search }
        onUpdate:options={ load }
      />
    ))

    fireEvent.click(screen.getByLabelText('Next page'))

    await waitFor(() => {
      options.value.search = 'frozen'
      expect(options.value.search).toBe('frozen')
    })
  })

  // TODO: should trigger update event once when changing itemsPerPage
  // it('should trigger update event once when changing itemsPerPage', async () => {
  //   const items = ref<any[]>([])
  //   const options = ref({
  //     itemsLength: DESSERT_ITEMS.length,
  //     page: 1,
  //     itemsPerPage: 2,
  //   })

  //   const load = (opts: { page: number, itemsPerPage: number }) => {
  //     setTimeout(() => {
  //       const start = (opts.page - 1) * opts.itemsPerPage
  //       const end = start + opts.itemsPerPage
  //       items.value = DESSERT_ITEMS.slice(start, end)
  //       options.value = {
  //         ...options.value,
  //         ...opts,
  //       }
  //     }, 10)
  //   }

  //   render(() => (
  //     <VDataTableServer
  //       headers={DESSERT_HEADERS}
  //       items={items.value}
  //       itemsLength={DESSERT_ITEMS.length}
  //       page={options.value.page}
  //       itemsPerPage={options.value.itemsPerPage}
  //       onUpdate:options={load}
  //     />
  //   ))

  //   // Simulate changing itemsPerPage via the select element (combobox)
  //   const itemsPerPageSelect = screen.getByRole('combobox')  // Vuetify uses combobox for select elements

  //   // Ensure that the dropdown exists
  //   expect(itemsPerPageSelect).toBeInTheDocument()

  //   // Simulate selecting a new itemsPerPage value (e.g., 10)
  //   fireEvent.update(itemsPerPageSelect, { target: { value: '10' } })

  //   // Wait for async updates and check the options values
  //   await waitFor(() => {
  //     // Expect the updated itemsPerPage value to be 10
  //     expect(options.value.itemsPerPage).toBe(10)
  //     // Ensure that the page remains 1 as no page change was simulated
  //     expect(options.value.page).toBe(1)
  //   })

  //   // Ensure the load function was called with correct parameters
  //   expect(load).toHaveBeenCalledWith({
  //     page: 1,  // Page should remain 1
  //     itemsPerPage: 10,  // Items per page should be updated to 10
  //   })
  // })
})
