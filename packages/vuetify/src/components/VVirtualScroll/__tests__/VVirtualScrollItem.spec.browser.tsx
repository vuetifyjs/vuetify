// Components
import { VVirtualScrollItem } from '../VVirtualScrollItem'
import { VListItem } from '@/components/VList'

// Utilities
import { render } from '@test'
import { ref } from 'vue'

describe('VVirtualScrollItem', () => {
  it('reports the padded height of a renderless list item', async () => {
    const height = ref(48)
    const onHeight = vi.fn()
    render(() => (
      <VVirtualScrollItem renderless onUpdate:height={ onHeight }>
        {{
          default: ({ itemRef }) => (
            <VListItem ref={ itemRef } title="Item" style={{ height: `${height.value}px` }} />
          ),
        }}
      </VVirtualScrollItem>
    ))

    await expect.poll(() => onHeight.mock.lastCall?.[0]).toBe(48)

    height.value = 64
    await expect.poll(() => onHeight.mock.lastCall?.[0]).toBe(64)
  })

  it('includes padding and borders in a wrapped item height', async () => {
    const onHeight = vi.fn()
    render(() => (
      <VVirtualScrollItem
        style={{ padding: '8px', border: '2px solid' }}
        onUpdate:height={ onHeight }
      >
        <div style={{ height: '24px' }} />
      </VVirtualScrollItem>
    ))

    await expect.poll(() => onHeight.mock.lastCall?.[0]).toBe(44)
  })
})
