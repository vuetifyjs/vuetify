// Components
import { VDataTable } from '../VDataTable'

// Utilities
import { render, screen } from '@test'
import { createVNode, nextTick, ref } from 'vue'

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

describe('VDataTable', () => {
  // https://github.com/vuetifyjs/vuetify/issues/23123
  it('should keep column cells in place when toggling show-select', async () => {
    const showSelect = ref(false)
    render(() => (
      <VDataTable
        headers={ DESSERT_HEADERS }
        items={ DESSERT_ITEMS }
        showSelect={ showSelect.value }
      />
    ))

    const header = screen.getByCSS('thead tr th:first-child')
    const cell = screen.getByCSS('tbody tr:first-child td:first-child')

    showSelect.value = true
    await nextTick()

    expect(screen.getByCSS('thead tr th:nth-child(2)')).toBe(header)
    expect(screen.getByCSS('tbody tr:first-child td:nth-child(2)')).toBe(cell)
  })

  // https://github.com/vuetifyjs/vuetify/issues/23245
  it('should keep item column slots aligned when toggling a leading column', async () => {
    const allHeaders = [
      { title: 'Extra', key: 'extra' },
      { title: 'Name', key: 'name' },
      { title: 'Actions', key: 'actions' },
    ]
    const headers = ref(allHeaders)

    render(() => (
      <VDataTable headers={ headers.value } items={ [{ name: 'Item' }] }>
        {{
          'item.extra': () => <div class="extra-cell">Extra</div>,
          // normal JSX function would replace the class, createVNode simulates real-life better
          'item.name': ({ item }: any) => createVNode('div', { class: 'name-cell' }, item.name, 1),
          'item.actions': () => <div class="actions-cell">Action</div>,
        }}
      </VDataTable>
    ))

    headers.value = allHeaders.filter(h => h.key !== 'extra')
    await nextTick()
    headers.value = allHeaders
    await nextTick()

    const cells = screen.getAllByCSS('tbody tr:first-child td')
    expect(cells[0].firstElementChild!.className).toBe('extra-cell')
    expect(cells[1].firstElementChild!.className).toBe('name-cell')
    expect(cells[2].firstElementChild!.className).toBe('actions-cell')
  })
})
