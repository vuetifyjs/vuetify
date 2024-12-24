// Utilities
import { flushPromises, mount } from '@vue/test-utils'
import { VDataIterator } from '../VDataIterator'
import { createVuetify } from '@/framework'

const DESSERT_ITEMS = [
  { name: 'Frozen Yogurt', calories: 159 },
  { name: 'Ice cream sandwich', calories: 237 },
  { name: 'Eclair', calories: 262 },
  { name: 'Cupcake', calories: 305 },
  { name: 'Gingerbread', calories: 356 },
  { name: 'Jelly bean', calories: 375 },
  { name: 'Lollipop', calories: 392 },
  { name: 'Honeycomb', calories: 408 },
  { name: 'Donut', calories: 452 },
  { name: 'KitKat', calories: 518 },
]

const vuetify = createVuetify()

describe('VDataIterator', () => {
  it('should render items in the default slot', async () => {
    const wrapper = mount(VDataIterator, {
      props: {
        items: DESSERT_ITEMS,
        itemsPerPage: 5,
      },
      slots: {
        default: ({ groupedItems }) => {
          return groupedItems.map(item => {
            const dataItem = item as { raw: { name: string, calories: number } }
            return (
              <li>{ dataItem.raw.name } - { dataItem.raw.calories } calories</li>
            )
          })
        },
        header: () => null,
        footer: () => null,
        loader: () => null,
        'no-data': () => null,
      },
      global: {
        plugins: [vuetify],
      },
    })

    await flushPromises()

    const listItems = wrapper.findAll('li')
    expect(listItems).toHaveLength(5)
    expect(listItems[0].text()).toBe('Frozen Yogurt - 159 calories')
    expect(listItems[4].text()).toBe('Gingerbread - 356 calories')
  })
})
