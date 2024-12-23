// Utilities
import { render } from '@testing-library/vue'
import { VDataTableVirtual } from '..'
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
const vuetify = createVuetify()

describe('VDataTable', () => {
  it('should render only visible items', async () => {
    const items = [...new Array(10)].reduce(curr => {
      curr.push(...DESSERT_ITEMS)
      return curr
    }, [])

    const { container } = render(() => (
        <VDataTableVirtual items={ items } headers={ DESSERT_HEADERS } height={ 500 } />
    ), {
      global: {
        plugins: [vuetify],
      },
    })
    const rows = container.querySelectorAll('tbody tr')
    expect(rows.length).toBeLessThan(items.length)
    const firstRow = rows[1]
    const lastRow = rows[rows.length - 1]

    const firstRowHeight = window.getComputedStyle(firstRow).height
    const lastRowHeight = window.getComputedStyle(lastRow).height
    expect(firstRowHeight).not.toBe('0px')
    expect(lastRowHeight).toBe('0px')
  })
})
