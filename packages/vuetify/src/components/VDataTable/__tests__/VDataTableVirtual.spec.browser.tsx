// Utilities
import { render, screen, userEvent, wait } from '@test'
import { ref } from 'vue'
import { VDataTableVirtual } from '..'

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

const VIRTUAL_ITEMS = Array.from({ length: 50 }, (_, i) => ({ id: String(i), name: `Item ${i}` }))
const VIRTUAL_HEADERS = [{ title: 'Name', key: 'name' }]

describe('VDataTableVirtual', () => {
  it('should render only visible items', async () => {
    const items = [...new Array(10)].reduce(curr => {
      curr.push(...DESSERT_ITEMS)
      return curr
    }, [])

    render(() => (
      <VDataTableVirtual items={ items } headers={ DESSERT_HEADERS } height={ 500 } />
    ))

    const rows = screen.getAllByRole('row')
    expect(rows.length).toBeLessThan(items.length)
    await expect.element(rows[0]).not.toHaveStyle({ height: '0px' })
    await expect.element(rows[rows.length - 1]).toHaveStyle({ height: '0px' })
  })

  it('should reserve expanded-row height after scrolling out of view', async () => {
    const expanded = ref<string[]>([])

    render(() => (
      <VDataTableVirtual
        items={ VIRTUAL_ITEMS }
        headers={ VIRTUAL_HEADERS }
        itemValue="id"
        height={ 300 }
        itemHeight={ 48 }
        showExpand
        expanded={ expanded.value }
        onUpdate:expanded={ v => (expanded.value = v) }
      >
        {{
          'expanded-row': () => (
            <tr><td colspan={ 2 } style="height: 200px">details</td></tr>
          ),
        }}
      </VDataTableVirtual>
    ))

    const wrapper = document.querySelector('.v-table__wrapper') as HTMLElement
    await wait(150)
    const collapsedHeight = wrapper.scrollHeight

    expanded.value = ['0']
    await wait(250)
    expect(wrapper.scrollHeight).toBeGreaterThan(collapsedHeight + 150)

    wrapper.scrollTop = wrapper.scrollHeight
    await wait(250)
    expect(wrapper.scrollHeight).toBeGreaterThan(collapsedHeight + 150)
  })

  it('should release expanded-row height on collapse', async () => {
    render(() => (
      <VDataTableVirtual
        items={ VIRTUAL_ITEMS }
        headers={ VIRTUAL_HEADERS }
        itemValue="id"
        height={ 300 }
        itemHeight={ 48 }
        showExpand
      >
        {{
          'expanded-row': () => (
            <tr><td colspan={ 2 } style="height: 200px">details</td></tr>
          ),
        }}
      </VDataTableVirtual>
    ))

    const wrapper = document.querySelector('.v-table__wrapper') as HTMLElement
    await wait(150)
    const collapsedHeight = wrapper.scrollHeight

    const toggle = (await screen.findAllByCSS('.v-btn--icon'))[0]
    await userEvent.click(toggle)
    await wait(250)
    expect(wrapper.scrollHeight).toBeGreaterThan(collapsedHeight + 150)

    await userEvent.click(toggle)
    await wait(250)
    expect(wrapper.scrollHeight).toBeLessThan(collapsedHeight + 150)
  })

  it('should measure expanded slot without inflating collapsed rows', async () => {
    render(() => (
      <VDataTableVirtual
        items={ VIRTUAL_ITEMS }
        headers={ VIRTUAL_HEADERS }
        itemValue="id"
        height={ 300 }
        itemHeight={ 48 }
        showExpand
        expandTransition={ false }
      >
        {{
          expanded: () => <div style="height: 200px">details</div>,
        }}
      </VDataTableVirtual>
    ))

    const wrapper = document.querySelector('.v-table__wrapper') as HTMLElement
    await wait(150)
    const collapsedHeight = wrapper.scrollHeight
    expect(collapsedHeight).toBeLessThan(50 * 48 + 200)

    const toggle = (await screen.findAllByCSS('.v-btn--icon'))[0]
    await userEvent.click(toggle)
    await wait(250)
    expect(wrapper.scrollHeight).toBeGreaterThan(collapsedHeight + 150)

    wrapper.scrollTop = wrapper.scrollHeight
    await wait(250)
    expect(wrapper.scrollHeight).toBeGreaterThan(collapsedHeight + 150)
  })
})
