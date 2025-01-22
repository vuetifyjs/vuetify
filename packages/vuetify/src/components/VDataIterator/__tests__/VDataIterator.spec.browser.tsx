// Utilities
import { render, screen } from '@test'
import { VDataIterator } from '../VDataIterator'

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

describe('VDataIterator', () => {
  it('should render items in the default slot', async () => {
    render(() => (
      <VDataIterator items={ DESSERT_ITEMS } itemsPerPage={ 5 }>
        { ({ groupedItems }) => {
          return groupedItems.map(item => {
            const dataItem = item as {
              raw: { name: string, calories: number }
            }
            return (
              <li>
                { dataItem.raw.name } - { dataItem.raw.calories } calories
              </li>
            )
          })
        }}
      </VDataIterator>
    ))

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(5)
    expect.element(listItems[0]).toContain('Frozen Yogurt - 159 calories')
    expect.element(listItems[4]).toContain('Gingerbread - 356 calories')
  })
})
