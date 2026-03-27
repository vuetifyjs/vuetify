// Components
import { VDataTable } from '..'

// Utilities
import { render, screen, userEvent } from '@test'
import { ref } from 'vue'

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
  it('groups are closed by default when no opened prop is given', () => {
    render(() => (
      <VDataTable
        items={ DESSERT_ITEMS }
        headers={ DESSERT_HEADERS }
        groupBy={[{ key: 'category' }]}
        itemsPerPage={ -1 }
      />
    ))

    expect(screen.getAllByCSS('.v-data-table-group-header-row')).toHaveLength(4)
    expect(screen.queryAllByCSS('tbody tr:not(.v-data-table-group-header-row)')).toHaveLength(0)
  })

  it('renders only group headers when groups are closed', () => {
    render(() => (
      <VDataTable
        items={ DESSERT_ITEMS }
        headers={ DESSERT_HEADERS }
        groupBy={[{ key: 'category' }]}
        opened={[]}
        itemsPerPage={ -1 }
      />
    ))

    // Dairy, Pastry, Cookie, Candy = 4 groups
    expect(screen.getAllByCSS('.v-data-table-group-header-row')).toHaveLength(4)
    expect(screen.queryAllByCSS('tbody tr:not(.v-data-table-group-header-row)')).toHaveLength(0)
  })

  it('opens a group when its id is included in the opened prop', () => {
    render(() => (
      <VDataTable
        items={ DESSERT_ITEMS }
        headers={ DESSERT_HEADERS }
        groupBy={[{ key: 'category' }]}
        opened={['root_category_Dairy']}
        itemsPerPage={ -1 }
      />
    ))

    // Dairy has 2 items
    expect(screen.queryAllByCSS('tbody tr:not(.v-data-table-group-header-row)')).toHaveLength(2)
  })

  it('opens multiple groups when multiple ids are given in opened prop', () => {
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

  it('opens all groups when openAllGroups is true', () => {
    render(() => (
      <VDataTable
        items={ DESSERT_ITEMS }
        headers={ DESSERT_HEADERS }
        groupBy={[{ key: 'category' }]}
        openAllGroups
        itemsPerPage={ -1 }
      />
    ))

    // All 6 items should be visible
    expect(screen.queryAllByCSS('tbody tr:not(.v-data-table-group-header-row)')).toHaveLength(6)
  })

  it('allows toggling individual groups closed after openAllGroups is set', async () => {
    const opened = ref<string[]>([])

    render(() => (
      <VDataTable
        items={ DESSERT_ITEMS }
        headers={ DESSERT_HEADERS }
        groupBy={[{ key: 'category' }]}
        v-model:opened={ opened.value }
        openAllGroups
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

  it('empty opened array closes all groups even if they were previously open', async () => {
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

    expect(screen.queryAllByCSS('tbody tr:not(.v-data-table-group-header-row)')).toHaveLength(4)

    opened.value = []
    await expect.poll(() => screen.queryAllByCSS('tbody tr:not(.v-data-table-group-header-row)')).toHaveLength(0)
  })
})
