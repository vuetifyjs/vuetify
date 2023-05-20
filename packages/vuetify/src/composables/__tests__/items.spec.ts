// Composables
import { useItems } from '../list-items'

// Utilities
import { describe, expect, it } from '@jest/globals'

describe('items', () => {
  const defaults = {
    itemTitle: 'title',
    itemValue: 'value',
    itemTestId: 'testId',
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
        testId: 'Foo',
        props: {
          title: 'Foo',
          value: 'Foo',
          testId: 'Foo',
        },
        raw: 'Foo',
      },
    ])
  })

  it('should use title as value if value is missing', () => {
    const { items } = useItems({ ...defaults, items: [{ title: 'Foo' }] })
    expect(items.value).toEqual([
      {
        title: 'Foo',
        value: 'Foo',
        testId: 'Foo',
        props: {
          title: 'Foo',
          value: 'Foo',
          testId: 'Foo',
        },
        raw: { title: 'Foo' },
      },
    ])
  })

  it('should use title as testId if testId is missing', () => {
    const { items } = useItems({ ...defaults, items: [{ title: 'Foo' }] })
    expect(items.value).toEqual([
      {
        title: 'Foo',
        value: 'Foo',
        testId: 'Foo',
        props: {
          title: 'Foo',
          value: 'Foo',
          testId: 'Foo',
        },
        raw: { title: 'Foo' },
      },
    ])
  })

  it('should support custom itemTitle property', () => {
    const { items } = useItems({ ...defaults, itemTitle: 'text', items: [{ text: 'Foo' }] })
    expect(items.value).toEqual([
      {
        title: 'Foo',
        value: 'Foo',
        testId: 'Foo',
        props: {
          title: 'Foo',
          value: 'Foo',
          testId: 'Foo',
        },
        raw: { text: 'Foo' },
      },
    ])
  })

  it('should support custom itemValue property', () => {
    const { items } = useItems({ ...defaults, itemValue: 'id', items: [{ title: 'Foo', id: 1 }] })
    expect(items.value).toEqual([
      {
        title: 'Foo',
        value: 1,
        testId: 'Foo',
        props: {
          title: 'Foo',
          value: 1,
          testId: 'Foo',
        },
        raw: { title: 'Foo', id: 1 },
      },
    ])
  })

  it('should support custom itemTestId property', () => {
    const { items } = useItems({ ...defaults, itemTestId: 'testSelector', items: [{ title: 'Foo', testSelector: 'foo' }] })
    expect(items.value).toEqual([
      {
        title: 'Foo',
        value: 'Foo',
        testId: 'foo',
        props: {
          title: 'Foo',
          value: 'Foo',
          testId: 'foo',
        },
        raw: { title: 'Foo', testSelector: 'foo' },
      },
    ])
  })

  it('should support nested items', () => {
    const rawItems = [
      {
        title: 'Foo',
        children: [
          {
            title: 'Bar',
          },
        ],
      },
    ]
    const { items } = useItems({ ...defaults, items: rawItems })
    expect(items.value).toEqual([
      {
        title: 'Foo',
        value: 'Foo',
        testId: 'Foo',
        props: {
          title: 'Foo',
          value: 'Foo',
          testId: 'Foo',
        },
        children: [
          {
            title: 'Bar',
            value: 'Bar',
            testId: 'Bar',
            props: {
              title: 'Bar',
              value: 'Bar',
              testId: 'Bar',
            },
            raw: rawItems[0].children[0],
          },
        ],
        raw: rawItems[0],
      },
    ])
  })

  it('should support custom itemChildren property', () => {
    const rawItems = [
      {
        title: 'Foo',
        labels: [
          {
            title: 'Bar',
          },
        ],
      },
    ]
    const { items } = useItems({ ...defaults, itemChildren: 'labels', items: rawItems })
    expect(items.value).toEqual([
      {
        title: 'Foo',
        value: 'Foo',
        testId: 'Foo',
        props: {
          title: 'Foo',
          value: 'Foo',
          testId: 'Foo',
        },
        children: [
          {
            title: 'Bar',
            value: 'Bar',
            testId: 'Bar',
            props: {
              title: 'Bar',
              value: 'Bar',
              testId: 'Bar',
            },
            raw: rawItems[0].labels[0],
          },
        ],
        raw: rawItems[0],
      },
    ])
  })

  it('should include itemProps', () => {
    const rawItems = [
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
      items: rawItems,
    })

    expect(items.value).toEqual([
      {
        title: 'Foo',
        value: 'Foo',
        testId: 'Foo',
        props: {
          title: 'Foo',
          value: 'Foo',
          testId: 'Foo',
          prop: 1,
          status: true,
        },
        raw: rawItems[0],
      },
      {
        title: 'Bar',
        value: 'Bar',
        testId: 'Bar',
        props: {
          title: 'Bar',
          value: 'Bar',
          testId: 'Bar',
          prop: 2,
          status: true,
        },
        raw: rawItems[1],
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
