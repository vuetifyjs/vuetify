import { VDataTableServer } from '..'

// Utilities
import { commands, render, screen, userEvent, wait } from '@test'
import { nextTick, ref } from 'vue'

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
  it('should render table', () => {
    const itemsLength = 2

    render(() => (
      <VDataTableServer
        headers={ DESSERT_HEADERS }
        items={ DESSERT_ITEMS.slice(0, itemsLength) }
        itemsLength={ itemsLength }
      />
    ))

    expect(screen.queryAllByCSS('.v-data-table thead th')).toHaveLength(DESSERT_HEADERS.length)
    expect(screen.queryAllByCSS('.v-data-table tbody tr')).toHaveLength(itemsLength)
  })

  it('should only trigger update event once on mount', () => {
    let optionsEmitsCount = 0
    const items = ref<any[]>([])
    const options = ref({
      itemsLength: 0,
      page: 1,
      itemsPerPage: 2,
    })

    function load (opts: { page: number, itemsPerPage: number }) {
      optionsEmitsCount++
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

    render(() => (
      <VDataTableServer
        headers={ DESSERT_HEADERS }
        items={ items.value }
        { ...options.value }
        onUpdate:options={ load }
      />
    ))

    expect(optionsEmitsCount).toBe(1)
  })

  it('should only trigger update event once when changing itemsPerPage', async () => {
    const optionsEmits: any[] = []
    const items = ref<any[]>([])
    const options = ref({
      itemsLength: DESSERT_ITEMS.length,
      page: 1,
      itemsPerPage: 2,
    })

    // eslint-disable-next-line sonarjs/no-identical-functions
    function load (opts: { page: number, itemsPerPage: number }) {
      optionsEmits.push(opts)
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

    render(() => (
      <VDataTableServer
        headers={ DESSERT_HEADERS }
        items={ items.value }
        { ...options.value }
        onUpdate:options={ load }
      />
    ))

    await userEvent.click(screen.getByCSS('.v-btn[aria-label="Next page"]'))
    await userEvent.click(screen.getByCSS('.v-select'))
    await commands.waitStable('.v-list')
    await userEvent.click(screen.getAllByCSS('.v-list-item')[0])
    await wait(100)

    expect(optionsEmits).toEqual([
      { page: 1, itemsPerPage: 2, sortBy: [], groupBy: [], search: undefined },
      { page: 2, itemsPerPage: 2, sortBy: [], groupBy: [], search: undefined },
      { page: 1, itemsPerPage: 10, sortBy: [], groupBy: [], search: undefined },
    ])
  })

  it('should only trigger update event once when changing sort', async () => {
    const optionsEmits: any[] = []
    const items = ref<any[]>([])
    const options = ref({
      itemsLength: DESSERT_ITEMS.length,
      page: 1,
      itemsPerPage: 2,
    })

    // eslint-disable-next-line sonarjs/no-identical-functions
    function load (opts: { page: number, itemsPerPage: number }) {
      optionsEmits.push(opts)
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

    render(() => (
      <VDataTableServer
        headers={ DESSERT_HEADERS }
        items={ items.value }
        { ...options.value }
        onUpdate:options={ load }
      />
    ))

    await userEvent.click(screen.getByCSS('.v-btn[aria-label="Next page"]'))
    await userEvent.click(screen.getAllByCSS('th')[0])

    expect(optionsEmits).toEqual([
      { page: 1, itemsPerPage: 2, sortBy: [], groupBy: [], search: undefined },
      { page: 2, itemsPerPage: 2, sortBy: [], groupBy: [], search: undefined },
      { page: 1, itemsPerPage: 2, sortBy: [{ key: 'name', order: 'asc' }], groupBy: [], search: undefined },
    ])
  })

  it.skip('should only trigger update event once when search changes', async () => {
    const optionsEmits: any[] = []
    const items = ref<any[]>([])
    const search = ref('')
    const options = ref({
      itemsLength: DESSERT_ITEMS.length,
      page: 1,
      itemsPerPage: 2,
    })

    // eslint-disable-next-line sonarjs/no-identical-functions
    function load (opts: { page: number, itemsPerPage: number, search: string }) {
      optionsEmits.push(opts)
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

    render(() => (
      <VDataTableServer
        headers={ DESSERT_HEADERS }
        items={ items.value }
        { ...options.value }
        search={ search.value }
        onUpdate:options={ load }
      />
    ))

    await userEvent.click(screen.getByCSS('.v-btn[aria-label="Next page"]'))

    search.value = 'frozen'
    await nextTick()

    expect(optionsEmits).toEqual([
      { page: 1, itemsPerPage: 2, sortBy: [], groupBy: [], search: '' },
      { page: 2, itemsPerPage: 2, sortBy: [], groupBy: [], search: '' },
      // { page: 2, itemsPerPage: 2, sortBy: [], groupBy: [], search: 'frozen' },
      { page: 1, itemsPerPage: 2, sortBy: [], groupBy: [], search: 'frozen' },
    ])
  })
})
