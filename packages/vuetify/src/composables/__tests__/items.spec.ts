// Composables
import { useItems } from '../items'

// Utilities
import { describe, expect, it } from '@jest/globals'

describe('items.ts', () => {
  const defaults = {
    itemTitle: 'title',
    itemValue: 'value',
    itemChildren: 'children',
    itemProps: () => ({}),
    returnObject: false,
  }

  it('should do nothing to empty array', () => {
    const { items } = useItems({ ...defaults, items: [] })

    expect(items.value).toEqual([])
  })

  it('should support string items', () => {
    const { items } = useItems({ ...defaults, items: ['Foo'] })
    expect(items.value).toEqual([
      {
        title: 'Foo',
        value: 'Foo',
        props: {
          title: 'Foo',
          value: 'Foo',
        },
        originalItem: 'Foo',
      },
    ])
  })

  it('should use title as value if value is missing', () => {
    const { items } = useItems({ ...defaults, items: [{ title: 'Foo' }] })
    expect(items.value).toEqual([
      {
        title: 'Foo',
        value: 'Foo',
        props: {
          title: 'Foo',
          value: 'Foo',
        },
        originalItem: { title: 'Foo' },
      },
    ])
  })

  it('should support custom itemTitle property', () => {
    const { items } = useItems({ ...defaults, itemTitle: 'text', items: [{ text: 'Foo' }] })
    expect(items.value).toEqual([
      {
        title: 'Foo',
        value: 'Foo',
        props: {
          title: 'Foo',
          value: 'Foo',
        },
        originalItem: { text: 'Foo' },
      },
    ])
  })

  it('should support custom itemValue property', () => {
    const { items } = useItems({ ...defaults, itemValue: 'id', items: [{ title: 'Foo', id: 1 }] })
    expect(items.value).toEqual([
      {
        title: 'Foo',
        value: 1,
        props: {
          title: 'Foo',
          value: 1,
        },
        originalItem: { title: 'Foo', id: 1 },
      },
    ])
  })

  it('should support nested items', () => {
    const originalItems = [
      {
        title: 'Foo',
        children: [
          {
            title: 'Bar',
          },
        ],
      },
    ]
    const { items } = useItems({ ...defaults, items: originalItems })
    expect(items.value).toEqual([
      {
        title: 'Foo',
        value: 'Foo',
        props: {
          title: 'Foo',
          value: 'Foo',
        },
        children: [
          {
            title: 'Bar',
            value: 'Bar',
            props: {
              title: 'Bar',
              value: 'Bar',
            },
            originalItem: originalItems[0].children[0],
          },
        ],
        originalItem: originalItems[0],
      },
    ])
  })

  it('should support custom itemChildren property', () => {
    const originalItems = [
      {
        title: 'Foo',
        labels: [
          {
            title: 'Bar',
          },
        ],
      },
    ]
    const { items } = useItems({ ...defaults, itemChildren: 'labels', items: originalItems })
    expect(items.value).toEqual([
      {
        title: 'Foo',
        value: 'Foo',
        props: {
          title: 'Foo',
          value: 'Foo',
        },
        children: [
          {
            title: 'Bar',
            value: 'Bar',
            props: {
              title: 'Bar',
              value: 'Bar',
            },
            originalItem: originalItems[0].labels[0],
          },
        ],
        originalItem: originalItems[0],
      },
    ])
  })

  it('should include itemProps', () => {
    const originalItems = [
      {
        title: 'Foo',
        prop: 1,
      },
      {
        title: 'Bar',
        prop: 2,
      },
    ]
    const { items } = useItems({
      ...defaults,
      itemProps: item => ({ prop: item.prop, status: true }),
      items: originalItems,
    })

    expect(items.value).toEqual([
      {
        title: 'Foo',
        value: 'Foo',
        props: {
          title: 'Foo',
          value: 'Foo',
          prop: 1,
          status: true,
        },
        originalItem: originalItems[0],
      },
      {
        title: 'Bar',
        value: 'Bar',
        props: {
          title: 'Bar',
          value: 'Bar',
          prop: 2,
          status: true,
        },
        originalItem: originalItems[1],
      },
    ])
  })

  it('should return original objects when returnObject is true', () => {
    const { items, transformOut } = useItems({ ...defaults, returnObject: true, items: [{ title: 'Foo', value: 1, status: true }] })
    expect(transformOut(items.value)).toEqual([
      { title: 'Foo', value: 1, status: true },
    ])
  })

  it('should return value when returnObject is false', () => {
    const { items, transformOut } = useItems({ ...defaults, returnObject: false, items: [{ title: 'Foo', value: 1, status: true }] })
    expect(transformOut(items.value)).toEqual([
      1,
    ])
  })
})
