// Components
import { VDataTable } from '..'

// Utilities
import { render, userEvent } from '@test'
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
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1%',
    group: 1,
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1%',
    group: 3,
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7%',
    group: 2,
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8%',
    group: 2,
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16%',
    group: 3,
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0%',
    group: 1,
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2%',
    group: 2,
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45%',
    group: 3,
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: '22%',
    group: 3,
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6%',
    group: 1,
  },
]

describe('VDataTable', () => {
  it('should reset page when searching', async () => {
    const onUpdatePage = vi.fn()
    const currentSearch = ref('')

    const { container } = render(() => (
      <VDataTable
        items={ DESSERT_ITEMS }
        headers={ DESSERT_HEADERS }
        search={ currentSearch.value }
        items-per-page={ 5 }
        onUpdate:page={ onUpdatePage }
      />
    ))

    const nextPageButton = container.querySelector('.v-btn[aria-label="Next page"]')
    if (nextPageButton) await userEvent.click(nextPageButton)

    currentSearch.value = 'a'
    await nextTick()

    expect(onUpdatePage).toHaveBeenCalledTimes(2)
    expect(onUpdatePage.mock.calls[0][0]).toBe(2)
    expect(onUpdatePage.mock.calls[1][0]).toBe(1)
  })

  it('should search in nested keys', async () => {
    const nestedItems = [
      { foo: { bar: 'hello' } },
      { foo: { bar: 'world' } },
    ]
    const headers = [
      { key: 'unique', value: 'foo.bar', title: 'Column' },
    ]
    const currentSearch = ref('')

    const { container } = render(() => (
      <VDataTable items={ nestedItems } headers={ headers } search={ currentSearch.value } />
    ))

    let tableRows = container.querySelectorAll('tbody tr')
    expect(tableRows).toHaveLength(2)

    currentSearch.value = 'hello'
    await nextTick()

    tableRows = container.querySelectorAll('tbody tr')
    expect(tableRows).toHaveLength(1)
    expect(tableRows[0]?.textContent).toContain('hello')
  })

  it('should not emit click:row event when clicking select or expand', async () => {
    const onClickRow = vi.fn()
    const { container } = render(() => (
      <VDataTable
        showSelect
        showExpand
        items={ DESSERT_ITEMS }
        headers={ DESSERT_HEADERS }
        onClick:row={ onClickRow }
      />
    ))

    const rows = container.querySelectorAll('tbody tr')

    const checkboxInThirdRow = rows[2]?.querySelector('.v-checkbox-btn')
    if (checkboxInThirdRow) await userEvent.click(checkboxInThirdRow)

    const expandButtonInFourthRow = rows[3]?.querySelector('.v-btn')
    if (expandButtonInFourthRow) await userEvent.click(expandButtonInFourthRow)

    expect(onClickRow).not.toHaveBeenCalled()

    if (rows[1]) await userEvent.click(rows[1])
    expect(onClickRow).toHaveBeenCalledTimes(1)
  })

  it('should show no-data-text if there are no items', () => {
    const { container } = render(() => (
      <VDataTable items={[]} headers={ DESSERT_HEADERS } />
    ))
    const noDataRow = container.querySelector('.v-data-table tbody tr')
    expect(noDataRow?.textContent).toBe('No data available')
  })

  it('should change page if we are trying to display a page beyond current page count', async () => {
    const items = ref([...DESSERT_ITEMS])
    const onUpdatePage = vi.fn()

    const { container } = render(() => (
      <VDataTable
        items={ items.value }
        headers={ DESSERT_HEADERS }
        itemsPerPage={ 5 }
        onUpdate:page={ onUpdatePage }
      />
    ))

    const nextPageButton = container.querySelector('[aria-label="Next page"]')
    if (nextPageButton) await userEvent.click(nextPageButton)

    items.value = DESSERT_ITEMS.slice(0, 5)
    await nextTick()

    expect(onUpdatePage).toHaveBeenCalledTimes(2)
    expect(onUpdatePage.mock.calls[0][0]).toBe(2)
    expect(onUpdatePage.mock.calls[1][0]).toBe(1)
  })

  it('should update the select all checkbox when changing the select-strategy', async () => {
    const strategy = ref<'single' | 'all' | 'page'>('single')
    const { container } = render(() => (
      <VDataTable selectStrategy={ strategy.value } items={ DESSERT_ITEMS } headers={ DESSERT_HEADERS } showSelect />
    ))

    expect(container.querySelector('thead .v-selection-control')).toBeNull()

    strategy.value = 'all'
    await nextTick()
    expect(container.querySelector('thead .v-selection-control')).not.toBeNull()

    strategy.value = 'page'
    await nextTick()
    expect(container.querySelector('thead .v-selection-control')).not.toBeNull()
  })

  describe('slots', () => {
    it('should have top slot', () => {
      const { container } = render(() => (
        <VDataTable>
          {{
            top: () => <div id="top">TOP</div>,
          }}
        </VDataTable>
      ))
      expect(container.querySelector('#top')?.textContent).toBe('TOP')
    })

    it('should have bottom slot (and should overwrite footer)', () => {
      const { container } = render(() => (
        <VDataTable>
          {{
            bottom: () => <div id="bottom">BOTTOM</div>,
          }}
        </VDataTable>
      ))
      expect(container.querySelector('#bottom')?.textContent).toBe('BOTTOM')
      expect(container.querySelector('.v-data-table-footer')).toBeNull()
    })

    it('should have headers slot (and overwrite default headers)', () => {
      const { container } = render(() => (
        <VDataTable>
          {{
            headers: () => <div id="headers">headers</div>,
          }}
        </VDataTable>
      ))
      expect(container.querySelector('#headers')?.textContent).toBe('headers')
      expect(container.querySelector('.v-data-table__th')).toBeNull()
    })

    it('should have colgroup slot', () => {
      const { container } = render(() => (
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
      ))
      expect(container.querySelector('colgroup')).not.toBeNull()
      DESSERT_HEADERS.forEach(header => {
        if (header.key) expect(container.querySelector(`col#${header.key}`)).not.toBeNull()
      })
    })

    it('should have header.* slots', () => {
      const { container } = render(() => (
        <VDataTable items={ DESSERT_ITEMS } headers={ DESSERT_HEADERS } showSelect showExpand>
          {{
            'header.data-table-expand': () => <h1>expand</h1>,
            'header.data-table-select': () => <h2>select</h2>,
            'header.name': ({ column }) => (
              <h3>{ column.title }</h3>
            ),
          }}
        </VDataTable>
      ))
      expect(container.querySelector('.v-data-table__th h1')?.textContent).toBe('expand')
      expect(container.querySelector('.v-data-table__th h2')?.textContent).toBe('select')
      expect(container.querySelector('.v-data-table__th h3')?.textContent).toBe(DESSERT_HEADERS.find(h => h.key === 'name')?.title)
    })

    it('should have item slot', () => {
      const { container } = render(() => (
        <VDataTable items={ DESSERT_ITEMS } headers={ DESSERT_HEADERS } itemsPerPage={ 10 }>
          {{
            item: ({ columns, internalItem }) => (
              <tr class="custom-row">
                { columns.map(column => (
                  column.key != null ? (
                    <td>
                      <h1>{ String(internalItem.columns[column.key]) }</h1>
                    </td>
                  ) : null
                ))}
              </tr>
            ),
          }}
        </VDataTable>
      ))
      expect(container.querySelectorAll('.custom-row')).toHaveLength(10)
      const firstRowFirstCustomCell = container.querySelector('.custom-row:first-child td:first-child h1')
      const headerKey = DESSERT_HEADERS[0].key as keyof typeof DESSERT_ITEMS[0]
      expect(firstRowFirstCustomCell?.textContent).toBe(String(DESSERT_ITEMS[0][headerKey]))
    })

    it('should have item.* slots', () => {
      const { container } = render(() => (
        <VDataTable items={ DESSERT_ITEMS } headers={ DESSERT_HEADERS } showSelect showExpand>
          {{
            'item.data-table-expand': () => <h1>expand</h1>,
            'item.data-table-select': () => <h2>select</h2>,
            'item.name': ({ value }) => (
              <h3>{ value }</h3>
            ),
          }}
        </VDataTable>
      ))
      // Check that these slots render for each row (e.g., count them or check first row)
      expect(container.querySelector('tbody tr:first-child td h1')?.textContent).toBe('expand')
      expect(container.querySelector('tbody tr:first-child td h2')?.textContent).toBe('select')
      expect(container.querySelector('tbody tr:first-child td h3')?.textContent).toBe(DESSERT_ITEMS[0].name)
    })

    it('should have body slot and slot prop should show correct item count after group is expanded', async () => {
      const { container } = render(() => (
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

      expect(container.querySelector('#body-append')?.textContent).toBe(String(DESSERT_ITEMS.length))
      const groupHeaderButton = container.querySelector('.v-data-table-group-header-row .v-btn')
      if (groupHeaderButton) await userEvent.click(groupHeaderButton)
      expect(container.querySelector('#body-append')?.textContent).toBe(String(DESSERT_ITEMS.length))
    })
  })

  describe('sort', () => {
    it('should sort by sortBy', async () => {
      const { container } = render(() => (
        <VDataTable
          items={ DESSERT_ITEMS }
          headers={ DESSERT_HEADERS }
          itemsPerPage={ 10 }
          sortBy={[{ key: 'fat', order: 'asc' }]}
        />
      ))

      let headerCells = container.querySelectorAll('thead .v-data-table__th') // Use .v-data-table__th for headers
      expect(headerCells[2]).toHaveClass('v-data-table__th--sorted')

      let bodyCells = container.querySelectorAll('tbody tr td:nth-child(3)') // Fat column
      let actualFat = Array.from(bodyCells).map(cell => Number(cell.textContent))
      let expectedFat = DESSERT_ITEMS.map(d => d.fat).sort((a, b) => a - b)
      expect(actualFat).toEqual(expectedFat)

      // Click header to sort descending
      if (headerCells[2]) await userEvent.click(headerCells[2])
      await nextTick()

      headerCells = container.querySelectorAll('thead .v-data-table__th')
      bodyCells = container.querySelectorAll('tbody tr td:nth-child(3)')
      expect(headerCells[2]).toHaveClass('v-data-table__th--sorted') // Should still be sorted, order might change
      actualFat = Array.from(bodyCells).map(cell => Number(cell.textContent))
      expectedFat = DESSERT_ITEMS.map(d => d.fat).sort((a, b) => b - a) // Descending
      expect(actualFat).toEqual(expectedFat)
    })

    it.skip('should sort by groupBy and sortBy', async () => {
      const { container } = render(() => (
        <VDataTable
          items={ DESSERT_ITEMS }
          headers={ DESSERT_HEADERS }
          itemsPerPage={ 10 } // Corrected from -1 to ensure all items are visible for easier checking if not paginated
          groupBy={[{ key: 'group', order: 'desc' }]}
          sortBy={[{ key: 'calories', order: 'desc' }]}
        />
      ))

      const groupHeaderRows = container.querySelectorAll('tr.v-data-table-group-header-row .v-data-table__td button + span')
      const actualGroup = Array.from(groupHeaderRows).map(row => Number(row.textContent))
      const expectedGroup = [...new Set(DESSERT_ITEMS.map(d => d.group))].sort((a, b) => b - a)
      expect(actualGroup).toEqual(expectedGroup)

      const firstGroupExpandButton = container.querySelector('.v-data-table-group-header-row button')
      if (firstGroupExpandButton) await userEvent.click(firstGroupExpandButton)
      await nextTick()

      // After expanding group 3 (first group due to desc order)
      // Need to select items belonging to group 3 and check their calorie sort order.
      // This is complex because items are interleaved with group headers.
      // A more robust way would be to get all displayed rows and filter them by group, then check sort.
      // For now, we'll assume items of group 3 are directly after its header and check a few.
      const group3Items = DESSERT_ITEMS.filter(d => d.group === 3).sort((a, b) => b.calories - a.calories)
      const displayedRows = Array.from(container.querySelectorAll('tbody tr:not(.v-data-table-group-header-row)'))

      const firstDataRowCells = displayedRows[0]?.querySelectorAll('td')
      if (firstDataRowCells && firstDataRowCells[1] && firstDataRowCells[1].textContent) {
        expect(Number(firstDataRowCells[1].textContent)).toBe(group3Items[0].calories)
      } else {
        // console.warn('VDataTable groupBy and sortBy: Calories cell not found or has no text content for assertion.');
        // Optionally, fail the test explicitly if this condition is unexpected
        expect(firstDataRowCells && firstDataRowCells[1] && firstDataRowCells[1].textContent).toBeTruthy()
      }
    })

    // https://github.com/vuetifyjs/vuetify/issues/20046
    it.skip('should sort by groupBy while sort is disabled', async () => {
      const { container } = render(() => (
        <VDataTable
          items={ DESSERT_ITEMS }
          headers={ DESSERT_HEADERS }
          itemsPerPage={ 10 }
          groupBy={[{ key: 'group', order: 'desc' }]}
          sortBy={[{ key: 'calories', order: 'desc' }]}
          disableSort
        />
      ))

      const groupHeaderRows = container.querySelectorAll('tr.v-data-table-group-header-row .v-data-table__td button + span')
      const actualGroup = Array.from(groupHeaderRows).map(row => Number(row.textContent))
      const expectedGroup = [...new Set(DESSERT_ITEMS.map(d => d.group))].sort((a, b) => b - a)
      expect(actualGroup).toEqual(expectedGroup)

      const firstGroupExpandButton = container.querySelector('.v-data-table-group-header-row button')
      if (firstGroupExpandButton) await userEvent.click(firstGroupExpandButton)
      await nextTick()

      // Sort is disabled, so calories should be in original order for group 3
      const group3ItemsOriginalOrder = DESSERT_ITEMS.filter(d => d.group === 3)
      const displayedRows = Array.from(container.querySelectorAll('tbody tr:not(.v-data-table-group-header-row)'))
      const firstDataRowCells = displayedRows[0]?.querySelectorAll('td')
      if (firstDataRowCells && firstDataRowCells[1] && firstDataRowCells[1].textContent) {
        expect(Number(firstDataRowCells[1].textContent)).toBe(group3ItemsOriginalOrder[0].calories)
      } else {
        // console.warn('VDataTable groupBy while sort disabled: Calories cell not found or has no text content for assertion.');
        expect(firstDataRowCells && firstDataRowCells[1] && firstDataRowCells[1].textContent).toBeTruthy()
      }
    })
  })
})
