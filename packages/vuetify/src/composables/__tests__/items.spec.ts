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
    [{ items: ['Foo'] }, [{ title: 'Foo', value: 'Foo', header: null, divider: false }]],
    [{ items: [{ title: 'Foo' }] }, [{ title: 'Foo', value: 'Foo', header: null, divider: false }]],
    [{ items: [{ text: 'Foo' }], itemTitle: 'text' }, [{ title: 'Foo', value: 'Foo', header: null, divider: false }]],
    [{ items: [{ title: 'Foo', id: 1 }], itemValue: 'id' }, [{ title: 'Foo', value: 1, header: null, divider: false }]],
    [{ items: [{ title: 'Foo', children: ['Fizz'] }] }, [
      {
        title: 'Foo',
        value: 'Foo',
        header: null,
        divider: false,
        children: [
          { title: 'Fizz', value: 'Fizz', header: null, divider: false },
        ],
      },
    ]],
    [{ items: [{ title: 'Foo', labels: ['Fizz'] }], itemChildren: 'labels' }, [
      {
        title: 'Foo',
        value: 'Foo',
        header: null,
        divider: false,
        children: [
          { title: 'Fizz', value: 'Fizz', header: null, divider: false },
        ],
      },
    ]],
    [{ items: ['Foo'], itemProps: () => ({ status: true }) }, [
      { title: 'Foo', value: 'Foo', header: null, divider: false, status: true },
    ]],
    [{ items: [{ header: 'Foo Header' }] }, [{ title: null, value: null, header: 'Foo Header', divider: false }]],
    [{ items: [{ divider: true }] }, [{ title: null, value: null, header: null, divider: true }]],
  ])('should have proper styles', (props: ItemProps, expected) => {
    const { items } = useItems({ ...defaults, ...props })

    expect(items.value).toEqual(expected)
  })
})
