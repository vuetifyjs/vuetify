// Composables
import { useItems } from '../items'

// Utilities
import { describe, expect, it } from '@jest/globals'

// Types
import type { ItemProps } from '../items'

describe('items.ts', () => {
  const defaults = {
    itemTitle: 'title',
    itemValue: 'value',
    itemChildren: 'children',
    itemProps: () => ({}),
  }

  it.each([
    [{ items: [] }, []],
    [{ items: ['Foo'] }, [{ title: 'Foo', value: 'Foo' }]],
    [{ items: [{ title: 'Foo' }] }, [{ title: 'Foo', value: 'Foo' }]],
    [{ items: [{ text: 'Foo' }], itemTitle: 'text' }, [{ title: 'Foo', value: 'Foo' }]],
    [{ items: [{ title: 'Foo', id: 1 }], itemValue: 'id' }, [{ title: 'Foo', value: 1 }]],
    [{ items: [{ title: 'Foo', children: ['Fizz'] }] }, [
      { title: 'Foo', value: 'Foo', children: [{ title: 'Fizz', value: 'Fizz' }] },
    ]],
    [{ items: [{ title: 'Foo', labels: ['Fizz'] }], itemChildren: 'labels' }, [
      { title: 'Foo', value: 'Foo', children: [{ title: 'Fizz', value: 'Fizz' }] },
    ]],
    [{ items: ['Foo'], itemProps: () => ({ status: true }) }, [{ title: 'Foo', value: 'Foo', status: true }]],
  ])('should have proper styles', (props: ItemProps, expected) => {
    const { items } = useItems({ ...defaults, ...props })

    expect(items.value).toEqual(expected)
  })
})
