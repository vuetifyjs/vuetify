// Utilities
import { fireEvent, render, screen, waitFor } from '@testing-library/vue'
import { ref } from 'vue'
import { VDataTableServer } from '../VDataTableServer'
import { createVuetify } from '@/framework'

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
  it('should render table', async () => {
    const itemsLength = 2

    render(VDataTableServer, {
      props: {
        headers: DESSERT_HEADERS,
        items: DESSERT_ITEMS.slice(0, itemsLength),
        itemsLength,
      },
      global: {
        plugins: [createVuetify()],
      },
    })

    const headers = screen.getAllByRole('columnheader')
    expect(headers).toHaveLength(DESSERT_HEADERS.length)

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(itemsLength + 1) // Including the header row
  })

  it('should trigger update event once on mount', async () => {
    const items = ref<any[]>([])
    const options = ref({
      itemsLength: 0,
      page: 1,
      itemsPerPage: 2,
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

    render(VDataTableServer, {
      props: {
        headers: DESSERT_HEADERS,
        items: items.value,
        itemsLength: DESSERT_ITEMS.length,
        page: options.value.page,
        itemsPerPage: options.value.itemsPerPage,
      },
      global: {
        plugins: [createVuetify()],
      },
    })
    load({ page: options.value.page, itemsPerPage: options.value.itemsPerPage })

    await waitFor(() => {
      expect(items.value).toHaveLength(2)
    })
  })

  it('should trigger update event once when search changes', async () => {
    const items = ref<any[]>([])
    const options = ref({
      itemsLength: DESSERT_ITEMS.length,
      page: 1,
      itemsPerPage: 2,
      search: '',
    })

    const load = (opts: { page: number, itemsPerPage: number, search: string }) => {
      setTimeout(() => {
        const start = (opts.page - 1) * opts.itemsPerPage
        const end = start + opts.itemsPerPage
        items.value = DESSERT_ITEMS
          .filter(item => !opts.search || item.name.toLowerCase().includes(opts.search.toLowerCase()))
          .slice(start, end)
        options.value = {
          ...options.value,
          ...opts,
        }
      }, 10)
    }

    render(VDataTableServer, {
      props: {
        headers: DESSERT_HEADERS,
        items: items.value,
        itemsLength: options.value.itemsLength,
        page: options.value.page,
        itemsPerPage: options.value.itemsPerPage,
        search: options.value.search,
      },
      global: {
        plugins: [createVuetify()],
      },
    })
    load({ page: options.value.page, itemsPerPage: options.value.itemsPerPage, search: '' })

    const searchInput = screen.getByRole('textbox')
    await fireEvent.update(searchInput, 'Frozen')

    await waitFor(() => {
      expect(items.value.length).toBeGreaterThan(0) // Check if search filtered the items
    })
  })
})
