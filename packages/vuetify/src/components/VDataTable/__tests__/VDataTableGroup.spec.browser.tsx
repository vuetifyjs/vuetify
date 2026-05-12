// Components
import { VDataTable } from '..'

// Utilities
import { render, screen, userEvent } from '@test'
import { nextTick, ref } from 'vue'

const DESSERT_HEADERS = [
  { title: 'Dessert', key: 'name' },
  { title: 'Calories', key: 'calories' },
  { title: 'Category', key: 'category' },
]

const DESSERT_ITEMS = [
  { name: 'Frozen Yogurt', calories: 159, category: 'Dairy' },
  { name: 'Ice cream sandwich', calories: 237, category: 'Dairy' },
  { name: 'Eclair', calories: 262, category: 'Pastry' },
  { name: 'Cupcake', calories: 305, category: 'Pastry' },
  { name: 'Gingerbread', calories: 356, category: 'Cookie' },
  { name: 'Jelly bean', calories: 375, category: 'Candy' },
]

describe('VDataTable - v-model:opened (group-by)', () => {
  it('renders only group headers when opened is empty', () => {
    render(() => (
      <VDataTable
        items={ DESSERT_ITEMS }
        headers={ DESSERT_HEADERS }
        groupBy={[{ key: 'category' }]}
        itemsPerPage={ -1 }
      />
    ))

    // Dairy, Pastry, Cookie, Candy = 4 groups, no item rows by default
    expect(screen.getAllByCSS('.v-data-table-group-header-row')).toHaveLength(4)
    expect(screen.queryAllByCSS('tbody tr:not(.v-data-table-group-header-row)')).toHaveLength(0)
  })

  it('opens the groups whose ids appear in the opened prop', () => {
    render(() => (
      <VDataTable
        items={ DESSERT_ITEMS }
        headers={ DESSERT_HEADERS }
        groupBy={[{ key: 'category' }]}
        opened={['root_category_Dairy', 'root_category_Pastry']}
        itemsPerPage={ -1 }
      />
    ))

    // Dairy=2 + Pastry=2 = 4 item rows
    expect(screen.queryAllByCSS('tbody tr:not(.v-data-table-group-header-row)')).toHaveLength(4)
  })

  it('emits update:opened with the new id when a group is toggled open', async () => {
    const opened = ref<string[]>([])

    render(() => (
      <VDataTable
        items={ DESSERT_ITEMS }
        headers={ DESSERT_HEADERS }
        groupBy={[{ key: 'category' }]}
        v-model:opened={ opened.value }
        itemsPerPage={ -1 }
      />
    ))

    await userEvent.click(screen.getAllByCSS('.v-data-table-group-header-row .v-btn')[0])

    await expect.poll(() => opened.value).toStrictEqual(['root_category_Dairy'])
  })

  it('emits update:opened without the id when an open group is toggled closed', async () => {
    const opened = ref(['root_category_Dairy', 'root_category_Pastry'])

    render(() => (
      <VDataTable
        items={ DESSERT_ITEMS }
        headers={ DESSERT_HEADERS }
        groupBy={[{ key: 'category' }]}
        v-model:opened={ opened.value }
        itemsPerPage={ -1 }
      />
    ))

    await userEvent.click(screen.getAllByCSS('.v-data-table-group-header-row .v-btn')[0])

    await expect.poll(() => opened.value).toStrictEqual(['root_category_Pastry'])
  })

  it('reflects external opened changes reactively (v-model sync)', async () => {
    const opened = ref<string[]>([])

    render(() => (
      <VDataTable
        items={ DESSERT_ITEMS }
        headers={ DESSERT_HEADERS }
        groupBy={[{ key: 'category' }]}
        v-model:opened={ opened.value }
        itemsPerPage={ -1 }
      />
    ))

    expect(screen.queryAllByCSS('tbody tr:not(.v-data-table-group-header-row)')).toHaveLength(0)

    opened.value = ['root_category_Dairy']
    await expect.poll(() => screen.queryAllByCSS('tbody tr:not(.v-data-table-group-header-row)')).toHaveLength(2)

    opened.value = []
    await expect.poll(() => screen.queryAllByCSS('tbody tr:not(.v-data-table-group-header-row)')).toHaveLength(0)
  })

  it('opens all groups when openAll is true', () => {
    render(() => (
      <VDataTable
        items={ DESSERT_ITEMS }
        headers={ DESSERT_HEADERS }
        groupBy={[{ key: 'category' }]}
        openAll
        itemsPerPage={ -1 }
      />
    ))

    // All 6 items should be visible
    expect(screen.queryAllByCSS('tbody tr:not(.v-data-table-group-header-row)')).toHaveLength(6)
  })

  it('allows toggling individual groups closed after openAll is set', async () => {
    const opened = ref<string[]>([])

    render(() => (
      <VDataTable
        items={ DESSERT_ITEMS }
        headers={ DESSERT_HEADERS }
        groupBy={[{ key: 'category' }]}
        v-model:opened={ opened.value }
        openAll
        itemsPerPage={ -1 }
      />
    ))

    expect(screen.queryAllByCSS('tbody tr:not(.v-data-table-group-header-row)')).toHaveLength(6)

    // Close the Dairy group (2 items)
    await userEvent.click(screen.getAllByCSS('.v-data-table-group-header-row .v-btn')[0])

    await expect.poll(() => screen.queryAllByCSS('tbody tr:not(.v-data-table-group-header-row)')).toHaveLength(4)
  })

  it('works with nested group-by', () => {
    const items = [
      { name: 'A', category: 'Cat1', sub: 'X' },
      { name: 'B', category: 'Cat1', sub: 'Y' },
      { name: 'C', category: 'Cat2', sub: 'X' },
    ]

    render(() => (
      <VDataTable
        items={ items }
        headers={[
          { title: 'Name', key: 'name' },
          { title: 'Category', key: 'category' },
          { title: 'Sub', key: 'sub' },
        ]}
        groupBy={[{ key: 'category' }, { key: 'sub' }]}
        opened={['root_category_Cat1']}
        itemsPerPage={ -1 }
      />
    ))

    // Cat1 (open) → inner headers for X and Y, Cat2 (closed) = 4 group headers
    expect(screen.getAllByCSS('.v-data-table-group-header-row')).toHaveLength(4)

    // Inner groups are closed, so no item rows
    expect(screen.queryAllByCSS('tbody tr:not(.v-data-table-group-header-row)')).toHaveLength(0)
  })

  it('reopens all groups when openAll is toggled off then back on', async () => {
    const openAll = ref(true)
    const opened = ref<string[]>([])

    render(() => (
      <VDataTable
        items={ DESSERT_ITEMS }
        headers={ DESSERT_HEADERS }
        groupBy={[{ key: 'category' }]}
        v-model:opened={ opened.value }
        openAll={ openAll.value }
        itemsPerPage={ -1 }
      />
    ))

    // All 6 items visible; close Dairy
    await userEvent.click(screen.getAllByCSS('.v-data-table-group-header-row .v-btn')[0])
    await expect.poll(() => screen.queryAllByCSS('tbody tr:not(.v-data-table-group-header-row)')).toHaveLength(4)

    // Toggle openAll off then on — Dairy must reopen.
    // nextTick lets Vue flush the first transition before the second is applied,
    // so the allIds watcher sees two distinct deltas instead of a no-op batch.
    openAll.value = false
    await nextTick()
    openAll.value = true
    await expect.poll(() => screen.queryAllByCSS('tbody tr:not(.v-data-table-group-header-row)')).toHaveLength(6)
  })

  it('auto-opens new groups that appear while openAll is true', async () => {
    const items = ref([...DESSERT_ITEMS])
    const opened = ref<string[]>([])

    render(() => (
      <VDataTable
        items={ items.value }
        headers={ DESSERT_HEADERS }
        groupBy={[{ key: 'category' }]}
        v-model:opened={ opened.value }
        openAll
        itemsPerPage={ -1 }
      />
    ))

    await expect.poll(() => screen.queryAllByCSS('tbody tr:not(.v-data-table-group-header-row)')).toHaveLength(6)

    items.value = [...DESSERT_ITEMS, { name: 'Lollipop', calories: 392, category: 'Candy2' }]

    await expect.poll(() => screen.queryAllByCSS('tbody tr:not(.v-data-table-group-header-row)')).toHaveLength(7)
    await expect.poll(() => opened.value).toContain('root_category_Candy2')
  })

  it('removes a dropped group from opened and emits update:opened', async () => {
    const items = ref([...DESSERT_ITEMS])
    const opened = ref<string[]>([])

    render(() => (
      <VDataTable
        items={ items.value }
        headers={ DESSERT_HEADERS }
        groupBy={[{ key: 'category' }]}
        v-model:opened={ opened.value }
        openAll
        itemsPerPage={ -1 }
      />
    ))

    await expect.poll(() => opened.value).toContain('root_category_Dairy')

    items.value = DESSERT_ITEMS.filter(i => i.category !== 'Dairy')

    await expect.poll(() => opened.value).not.toContain('root_category_Dairy')
    await expect.poll(() => screen.queryAllByCSS('.v-data-table-group-header-row')).toHaveLength(3)
  })

  it('uses custom groupKey function to generate group IDs', async () => {
    const opened = ref<string[]>([])

    render(() => (
      <VDataTable
        items={ DESSERT_ITEMS }
        headers={ DESSERT_HEADERS }
        groupBy={[{ key: 'category' }]}
        v-model:opened={ opened.value }
        groupKey={ ({ key, value }) => `${key}:${value}` }
        itemsPerPage={ -1 }
      />
    ))

    await userEvent.click(screen.getAllByCSS('.v-data-table-group-header-row .v-btn')[0])

    await expect.poll(() => opened.value).toStrictEqual(['category:Dairy'])
  })
})
