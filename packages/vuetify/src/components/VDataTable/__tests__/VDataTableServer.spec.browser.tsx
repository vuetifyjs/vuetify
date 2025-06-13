// Components
import { VDataTableServer } from '..'

// Utilities
import { render, userEvent } from '@test'
import { nextTick, ref } from 'vue'
// import { vi } from 'vitest' // Removed: Assuming vi is global

const DESSERT_HEADERS = [
  { title: 'Dessert (100g serving)', key: 'name' },
  { title: 'Calories', key: 'calories' },
  { title: 'Fat (g)', key: 'fat' },
  { title: 'Carbs (g)', key: 'carbs' },
  { title: 'Protein (g)', key: 'protein' },
  { title: 'Iron (%)', key: 'iron' },
]

const DESSERT_ITEMS = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1%',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1%',
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7%',
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8%',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16%',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0%',
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2%',
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45%',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: '22%',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6%',
  },
]

describe('VDataTableServer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('should render table', () => {
    const itemsLength = 2
    const { container } = render(() => (
      <VDataTableServer
        headers={ DESSERT_HEADERS }
        items={ DESSERT_ITEMS.slice(0, itemsLength) }
        itemsLength={ itemsLength }
      />
    ))
    expect(container.querySelectorAll('.v-data-table thead th')).toHaveLength(DESSERT_HEADERS.length)
    expect(container.querySelectorAll('.v-data-table tbody tr')).toHaveLength(itemsLength)
  })

  it('should only trigger update event once on mount', async () => {
    const items = ref<any[]>([])
    const options = ref({
      itemsLength: 0,
      page: 1,
      itemsPerPage: 2,
    })
    const onUpdateOptions = vi.fn()

    function load (loadOpts: { page: number, itemsPerPage: number, sortBy: any[], groupBy: any[], search: string | undefined }) {
      setTimeout(() => {
        const start = (loadOpts.page - 1) * loadOpts.itemsPerPage
        const end = start + loadOpts.itemsPerPage
        items.value = DESSERT_ITEMS.slice(start, end)
        options.value = { ...loadOpts, itemsLength: DESSERT_ITEMS.length }
        onUpdateOptions(loadOpts)
      }, 10)
    }

    render(() => (
      <VDataTableServer
        headers={ DESSERT_HEADERS }
        items={ items.value }
        itemsLength={ options.value.itemsLength }
        page={ options.value.page }
        itemsPerPage={ options.value.itemsPerPage }
        onUpdate:options={ load }
      />
    ))

    vi.runAllTimers()
    await nextTick()

    expect(onUpdateOptions).toHaveBeenCalledTimes(1)
  })

  it.skip('should trigger update events correctly when changing itemsPerPage', async () => {
    const items = ref<any[]>([])
    const serverOptions = ref({
      itemsLength: DESSERT_ITEMS.length,
      page: 1,
      itemsPerPage: 2,
      sortBy: [],
      groupBy: [],
      search: undefined,
    })
    const onUpdateOptions = vi.fn()

    function load (loadOpts: any) {
      setTimeout(() => {
        const start = (loadOpts.page - 1) * loadOpts.itemsPerPage
        const end = start + loadOpts.itemsPerPage
        items.value = DESSERT_ITEMS.slice(start, end)
        serverOptions.value = { ...loadOpts, itemsLength: DESSERT_ITEMS.length }
        onUpdateOptions(loadOpts)
      }, 10)
    }

    const { container } = render(() => (
      <VDataTableServer
        headers={ DESSERT_HEADERS }
        items={ items.value }
        itemsLength={ serverOptions.value.itemsLength }
        page={ serverOptions.value.page }
        itemsPerPage={ serverOptions.value.itemsPerPage }
        sortBy={ serverOptions.value.sortBy }
        groupBy={ serverOptions.value.groupBy }
        search={ serverOptions.value.search }
        onUpdate:options={ load }
      />
    ))

    vi.runAllTimers()
    await nextTick()
    expect(onUpdateOptions).toHaveBeenCalledTimes(1)
    expect(onUpdateOptions).toHaveBeenLastCalledWith({ page: 1, itemsPerPage: 2, sortBy: [], groupBy: [], search: undefined })

    const nextPageButton = container.querySelector('.v-btn[aria-label="Next page"]')
    if (nextPageButton) await userEvent.click(nextPageButton)
    vi.runAllTimers()
    await nextTick()
    expect(onUpdateOptions).toHaveBeenCalledTimes(2)
    expect(onUpdateOptions).toHaveBeenLastCalledWith({ page: 2, itemsPerPage: 2, sortBy: [], groupBy: [], search: undefined })

    const itemsPerPageSelect = container.querySelector('.v-data-table-footer .v-select .v-input__control')
    if (itemsPerPageSelect) await userEvent.click(itemsPerPageSelect)
    await nextTick()

    let tenItemsPerPageOption = document.body.querySelector('.v-list-item[aria-label="10"]')
    if (!tenItemsPerPageOption) {
      const allListItems = Array.from(document.body.querySelectorAll('.v-menu .v-list-item'))
      tenItemsPerPageOption = allListItems.find(item => item.textContent?.includes('10')) ?? null
    }

    if (tenItemsPerPageOption) {
      await userEvent.click(tenItemsPerPageOption)
    } else {
      // Option not found, the call count assertion later will fail, indicating this issue.
    }
    vi.runAllTimers()
    await nextTick()

    expect(onUpdateOptions).toHaveBeenCalledTimes(3)
    expect(onUpdateOptions).toHaveBeenLastCalledWith({ page: 1, itemsPerPage: 10, sortBy: [], groupBy: [], search: undefined })
  })

  it('should trigger update events correctly when changing sort', async () => {
    const items = ref<any[]>([])
    const serverOptions = ref<any>({
      itemsLength: DESSERT_ITEMS.length,
      page: 1,
      itemsPerPage: 2,
      sortBy: [],
      groupBy: [],
      search: undefined,
    })
    const onUpdateOptions = vi.fn()

    function load (loadOpts: any) {
      setTimeout(() => {
        const start = (loadOpts.page - 1) * loadOpts.itemsPerPage
        const end = start + loadOpts.itemsPerPage
        items.value = DESSERT_ITEMS.slice(start, end)
        serverOptions.value = { ...loadOpts, itemsLength: DESSERT_ITEMS.length }
        onUpdateOptions(loadOpts)
      }, 10)
    }

    const { container } = render(() => (
      <VDataTableServer
        headers={ DESSERT_HEADERS }
        items={ items.value }
        { ...serverOptions.value }
        onUpdate:options={ load }
      />
    ))

    vi.runAllTimers()
    await nextTick()
    expect(onUpdateOptions).toHaveBeenCalledTimes(1)
    expect(onUpdateOptions).toHaveBeenLastCalledWith({ page: 1, itemsPerPage: 2, sortBy: [], groupBy: [], search: undefined })

    const firstHeader = container.querySelector('thead th')
    if (firstHeader) await userEvent.click(firstHeader)
    vi.runAllTimers()
    await nextTick()

    expect(onUpdateOptions).toHaveBeenCalledTimes(2)
    expect(onUpdateOptions).toHaveBeenLastCalledWith(
      { page: 1, itemsPerPage: 2, sortBy: [{ key: 'name', order: 'asc' }], groupBy: [], search: undefined }
    )
  })

  it('should trigger update events correctly when search changes', async () => {
    const items = ref<any[]>([])
    const serverOptions = ref<any>({
      itemsLength: DESSERT_ITEMS.length,
      page: 1,
      itemsPerPage: 2,
      sortBy: [],
      groupBy: [],
      search: '',
    })
    const onUpdateOptions = vi.fn()

    function load (loadOpts: any) {
      setTimeout(() => {
        const start = (loadOpts.page - 1) * loadOpts.itemsPerPage
        const end = start + loadOpts.itemsPerPage
        const filteredItems = DESSERT_ITEMS.filter(item =>
          !loadOpts.search || item.name.toLowerCase().includes(loadOpts.search.toLowerCase())
        )
        items.value = filteredItems.slice(start, end)
        serverOptions.value = { ...loadOpts, itemsLength: filteredItems.length }
        onUpdateOptions(loadOpts)
      }, 10)
    }

    const currentSearch = ref('')

    render(() => (
      <VDataTableServer
        headers={ DESSERT_HEADERS }
        items={ items.value }
        itemsLength={ serverOptions.value.itemsLength }
        page={ serverOptions.value.page }
        itemsPerPage={ serverOptions.value.itemsPerPage }
        sortBy={ serverOptions.value.sortBy }
        groupBy={ serverOptions.value.groupBy }
        search={ currentSearch.value }
        onUpdate:options={ load }
      />
    ))

    vi.runAllTimers()
    await nextTick()
    expect(onUpdateOptions).toHaveBeenCalledTimes(1)
    expect(onUpdateOptions).toHaveBeenLastCalledWith({ page: 1, itemsPerPage: 2, sortBy: [], groupBy: [], search: '' })

    currentSearch.value = 'frozen'
    await nextTick()
    vi.runAllTimers()
    await nextTick()

    expect(onUpdateOptions).toHaveBeenCalledTimes(2)
    expect(onUpdateOptions).toHaveBeenLastCalledWith({ page: 1, itemsPerPage: 2, sortBy: [], groupBy: [], search: 'frozen' })
  })
})
