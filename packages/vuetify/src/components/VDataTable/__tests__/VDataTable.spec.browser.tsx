// Components
import { VDataTable } from '../VDataTable'

// Utilities
import { generate, render, screen, userEvent } from '@test'
import { nextTick, ref } from 'vue'

const DESSERT_HEADERS = [
  { title: 'Dessert (100g serving)', key: 'name' },
  { title: 'Calories', key: 'calories' },
  { title: 'Fat (g)', key: 'fat' },
  { title: 'Carbs (g)', key: 'carbs' },
  { title: 'Protein (g)', key: 'protein' },
  { title: 'Iron (%)', key: 'iron' },
  { title: 'Group', key: 'group' },
]

const DESSERT_ITEMS = [
  { name: 'Frozen Yogurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, iron: '1%', group: 1 },
  { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, iron: '1%', group: 3 },
  { name: 'Eclair', calories: 262, fat: 16.0, carbs: 23, protein: 6.0, iron: '7%', group: 2 },
  { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, iron: '8%', group: 2 },
  { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, iron: '16%', group: 3 },
  { name: 'Jelly bean', calories: 375, fat: 0.0, carbs: 94, protein: 0.0, iron: '0%', group: 1 },
  { name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0, iron: '2%', group: 2 },
  { name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5, iron: '45%', group: 3 },
  { name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, iron: '22%', group: 3 },
  { name: 'KitKat', calories: 518, fat: 26.0, carbs: 65, protein: 7, iron: '6%', group: 1 },
]

const stories = {
  'With empty text': <VDataTable items={[]} headers={ DESSERT_HEADERS } />,
  'With top & bottom slots': (
    <VDataTable>
      {{
        top: () => <div id="top">TOP</div>,
        bottom: () => <div id="bottom">BOTTOM</div>,
      }}
    </VDataTable>
  ),
  'With headers slot': (
    <VDataTable>
      {{ headers: () => <div id="headers">headers</div> }}
    </VDataTable>
  ),
  'With colgroup slot': (
    <VDataTable items={ DESSERT_ITEMS } headers={ DESSERT_HEADERS }>
      {{
        colgroup: ({ columns }) => (
          <colgroup>
            { columns.map(column => (
              <col id={ column.key! }></col>
            ))}
          </colgroup>
        ),
      }}
    </VDataTable>
  ),
  'With item slot': (
    <VDataTable items={ DESSERT_ITEMS } headers={ DESSERT_HEADERS } itemsPerPage={ 10 }>
      {{
        item: ({ columns, internalItem }) => (
          <tr class="custom-row">
            { columns.map(column => (column.key ? (<td>{ internalItem.columns[column.key] }</td>) : null)) }
          </tr>
        ),
      }}
    </VDataTable>
  ),
  'With header.* slots': (
    <VDataTable items={ DESSERT_ITEMS } headers={ DESSERT_HEADERS } showSelect showExpand>
      {{
        'header.data-table-expand': () => <h1>expand</h1>,
        'header.data-table-select': () => <h2>select</h2>,
        'header.name': ({ column }) => <h3>{ column.title }</h3>,
      }}
    </VDataTable>
  ),
  'With item.* slots': (
    <VDataTable items={ DESSERT_ITEMS } headers={ DESSERT_HEADERS } showSelect showExpand>
      {{
        'item.data-table-expand': () => <h1>expand</h1>,
        'item.data-table-select': () => <h2>select</h2>,
        'item.name': ({ value }) => <h3>{ value }</h3>,
      }}
    </VDataTable>
  ),
}

describe('VDataTable', () => {
  it('should reset page when searching', async () => {
    const search = ref()
    const updatePage = vi.fn()
    render(() => (
      <VDataTable
        headers={ DESSERT_HEADERS }
        items={ DESSERT_ITEMS }
        itemsPerPage={ 5 }
        search={ search.value }
        onUpdate:page={ updatePage }
      />
    ))

    await userEvent.click(screen.getByCSS('.v-btn[aria-label="Next page"]'))

    search.value = 'a'

    await nextTick()

    expect(updatePage).toHaveBeenCalledTimes(2)
    expect(updatePage).toHaveBeenNthCalledWith(1, 2)
    expect(updatePage).toHaveBeenNthCalledWith(2, 1)
  })

  // https://github.com/vuetifyjs/vuetify/issues/16999
  it('should search in nested keys', async () => {
    const nestedItems = [
      { foo: { bar: 'hello' } },
      { foo: { bar: 'world' } },
    ]

    const headers = [
      { key: 'unique', value: 'foo.bar', title: 'Column' },
    ]

    const search = ref()

    render(() => (
      <VDataTable
        headers={ headers }
        items={ nestedItems }
        search={ search.value }
      />
    ))

    let bodyRows = screen.getAllByCSS('tbody tr')
    expect(bodyRows).toHaveLength(2)
    expect(bodyRows.map(x => x.textContent)).toEqual(['hello', 'world'])

    search.value = 'hello'
    await nextTick()

    bodyRows = screen.getAllByCSS('tbody tr')
    expect(bodyRows).toHaveLength(1)
    expect(bodyRows.map(x => x.textContent)).toEqual(['hello'])
  })

  it('should not emit click:row event when clicking select or expand', async () => {
    const onClick = vi.fn()
    render(() => (
      <VDataTable
        headers={ DESSERT_HEADERS }
        items={ DESSERT_ITEMS }
        showSelect
        showExpand
        onClick:row={ onClick }
      />
    ))

    await userEvent.click(screen.getAllByCSS('tbody tr .v-checkbox-btn')[2])
    await userEvent.click(screen.getAllByCSS('tbody tr .v-btn')[3])

    expect(onClick).not.toHaveBeenCalled()

    await userEvent.click(screen.getAllByCSS('tbody tr')[1])

    expect(onClick).toHaveBeenCalledOnce()
  })

  // https://github.com/vuetifyjs/vuetify/issues/17226
  it('should change page if we are trying to display a page beyond current page count', async () => {
    const items = ref(DESSERT_ITEMS.slice())
    const updatePage = vi.fn()
    render(() => (
      <VDataTable
        headers={ DESSERT_HEADERS }
        items={ items.value }
        itemsPerPage={ 5 }
        onUpdate:page={ updatePage }
      />
    ))

    await userEvent.click(screen.getByCSS('.v-btn[aria-label="Next page"]'))

    items.value = DESSERT_ITEMS.slice(0, 5)

    await nextTick()

    expect(updatePage).toHaveBeenCalledTimes(2)
    expect(updatePage).toHaveBeenNthCalledWith(1, 2)
    expect(updatePage).toHaveBeenNthCalledWith(2, 1)
  })

  // https://github.com/vuetifyjs/vuetify/issues/19069
  it('should update the select all checkbox when changing the select-strategy', async () => {
    const strategy = ref<'single' | 'all' | 'page'>('single')
    render(() => (
      <VDataTable
        headers={ DESSERT_HEADERS }
        items={ DESSERT_ITEMS }
        selectStrategy={ strategy.value }
        showSelect
      />
    ))

    expect(screen.queryAllByCSS('thead .v-selection-control')).toHaveLength(0)

    strategy.value = 'all'
    await nextTick()

    expect(screen.queryAllByCSS('thead .v-selection-control')).toHaveLength(1)

    strategy.value = 'page'
    await nextTick()

    expect(screen.queryAllByCSS('thead .v-selection-control')).toHaveLength(1)
  })

  it('with body.append should show correct item count after group is expanded', async () => {
    render(() => (
      <VDataTable
        items={ DESSERT_ITEMS }
        headers={ DESSERT_HEADERS }
        itemsPerPage={ -1 }
        groupBy={[{ key: 'group', order: 'desc' }]}
      >
        {{
          'body.append': ({ items }) => <div id="body-append">{ items.length }</div>,
        }}
      </VDataTable>
    ))

    expect(screen.getByCSS('#body-append')).toHaveTextContent(DESSERT_ITEMS.length)

    await userEvent.click(screen.getByCSS('tr:nth-child(1) > .v-data-table__td > .v-btn'))

    expect(screen.getByCSS('#body-append')).toHaveTextContent(DESSERT_ITEMS.length)
  })

  describe('sort', () => {
    it('should sort by sortBy', async () => {
      render(() => (
        <VDataTable
          items={ DESSERT_ITEMS }
          headers={ DESSERT_HEADERS }
          itemsPerPage={ 10 }
          sortBy={[{ key: 'fat', order: 'asc' }]}
        />
      ))

      expect(screen.getAllByCSS('thead .v-data-table__td')[2]).toHaveClass('v-data-table__th--sorted')

      let actualFat = screen.getAllByCSS('tbody td:nth-child(3)')
        .map(row => Number(row.textContent))

      let expectedFat = DESSERT_ITEMS.map(d => d.fat).toSorted((a, b) => a - b)
      expect(actualFat).to.deep.equal(expectedFat)

      await userEvent.click(screen.getAllByCSS('thead .v-data-table__td')[2])

      expect(screen.getAllByCSS('thead .v-data-table__td')[2]).toHaveClass('v-data-table__th--sorted')

      actualFat = screen.getAllByCSS('tbody td:nth-child(3)')
        .map(row => Number(row.textContent))

      expectedFat = DESSERT_ITEMS.map(d => d.fat).toSorted((a, b) => b - a)
      expect(actualFat).to.deep.equal(expectedFat)
    })

    it('should sort by groupBy and sortBy', async () => {
      render(() => (
        <VDataTable
          items={ DESSERT_ITEMS }
          headers={ DESSERT_HEADERS }
          itemsPerPage={ 10 }
          groupBy={[{ key: 'group', order: 'desc' }]}
          sortBy={[{ key: 'calories', order: 'desc' }]}
        />
      ))

      const actualGroup = screen.getAllByCSS('tr.v-data-table-group-header-row .v-data-table__td button + span')
        .map(row => Number(row.textContent))

      const expectedGroup = [...new Set(DESSERT_ITEMS.map(d => d.group))].sort((a, b) => b - a)
      expect(actualGroup).to.deep.equal(expectedGroup)

      await userEvent.click(screen.getAllByCSS('.v-data-table-group-header-row button')[0])

      const actualCalories = screen.getAllByCSS('.v-data-table__tr td:nth-child(3)')
        .map(row => Number(row.textContent))

      const expectedCalories = DESSERT_ITEMS.filter(d => d.group === 3).map(d => d.calories).sort((a, b) => b - a)
      expect(actualCalories).to.deep.equal(expectedCalories)
    })

    // https://github.com/vuetifyjs/vuetify/issues/20046
    it('should sort by groupBy while sort is disabled', async () => {
      render(() => (
        <VDataTable
          items={ DESSERT_ITEMS }
          headers={ DESSERT_HEADERS }
          itemsPerPage={ 10 }
          groupBy={[{ key: 'group', order: 'desc' }]}
          sortBy={[{ key: 'calories', order: 'desc' }]}
          disableSort
        />
      ))

      const actualGroup = screen.getAllByCSS('tr.v-data-table-group-header-row .v-data-table__td button + span')
        .map(row => Number(row.textContent))

      const expectedGroup = [...new Set(DESSERT_ITEMS.map(d => d.group))].sort((a, b) => b - a)
      expect(actualGroup).to.deep.equal(expectedGroup)

      await userEvent.click(screen.getAllByCSS('.v-data-table-group-header-row button')[0])

      const actualCalories = screen.getAllByCSS('.v-data-table__tr td:nth-child(3)')
        .map(row => Number(row.textContent))

      const expectedCalories = DESSERT_ITEMS.filter(d => d.group === 3).map(d => d.calories)
      expect(actualCalories).to.deep.equal(expectedCalories)
    })
  })

  describe('Showcase', () => {
    generate({ stories })
  })
})
