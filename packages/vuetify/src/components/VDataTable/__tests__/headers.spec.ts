// Utilities
import { createHeaders } from '../composables/headers'

describe('VDataTable headers', () => {
  it('flattens 2d headers', () => {
    const { headers, columns } = createHeaders({
      items: [],
      headers: [
        { key: 'foo' },
        { key: 'bar', children: [{ key: 'fizz' }, { key: 'buzz' }] },
        { key: 'baz' },
      ],
    })
    expect(headers.value).toMatchObject([
      [{ key: 'foo', rowspan: 2 }, { key: 'bar', colspan: 2 }, { key: 'baz', rowspan: 2 }],
      [{ key: 'fizz' }, { key: 'buzz' }],
    ] as any)
    expect(columns.value).toMatchObject([{ key: 'foo' }, { key: 'fizz' }, { key: 'buzz' }, { key: 'baz' }])
    expect('provide() can only be used inside setup()').toHaveBeenTipped()
  })

  it('orders sibling columns correctly', () => {
    const { headers, columns } = createHeaders({
      items: [],
      headers: [
        {
          key: 'left',
          children: [
            {
              key: 'left_child',
              children: [
                {
                  key: 'foo',
                },
                {
                  key: 'bar',
                },
              ],
            },
          ],
        },
        {
          key: 'right',
          children: [
            {
              key: 'fizz',
            },
            {
              key: 'buzz',
            },
          ],
        },
      ],
    })

    expect(headers.value).toMatchObject([
      [{ key: 'left', colspan: 2 }, { key: 'right', rowspan: 2, colspan: 2 }],
      [{ key: 'left_child', colspan: 2 }],
      [{ key: 'foo' }, { key: 'bar' }, { key: 'fizz' }, { key: 'buzz' }],
    ] as any)
    expect(columns.value).toMatchObject([{ key: 'foo' }, { key: 'bar' }, { key: 'fizz' }, { key: 'buzz' }])
    expect('provide() can only be used inside setup()').toHaveBeenTipped()
  })

  it('keeps the rows of 100 or more headers with children', () => {
    const { headers } = createHeaders({
      items: [],
      headers: Array.from({ length: 100 }, (_, i) => ({
        key: `group${i}`,
        children: [{ key: `child${i}` }],
      })),
    })

    expect(headers.value).toHaveLength(2)
    expect(headers.value[0].map(header => header.key)).toEqual(
      Array.from({ length: 100 }, (_, i) => `group${i}`)
    )
    expect(headers.value[1].map(header => header.key)).toEqual(
      Array.from({ length: 100 }, (_, i) => `child${i}`)
    )
    expect('provide() can only be used inside setup()').toHaveBeenTipped()
  })

  it('keeps the rows of nested headers past 90 columns', () => {
    const { headers } = createHeaders({
      items: [],
      headers: Array.from({ length: 95 }, (_, i) => ({
        key: `group${i}`,
        children: [{ key: `sub${i}`, children: [{ key: `leaf${i}` }] }],
      })),
    })

    expect(headers.value).toHaveLength(3)
    expect(headers.value[2].map(header => header.key)).toEqual(
      Array.from({ length: 95 }, (_, i) => `leaf${i}`)
    )
    expect('provide() can only be used inside setup()').toHaveBeenTipped()
  })
})
