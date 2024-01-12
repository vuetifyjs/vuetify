import { createHeaders } from '../composables/headers'

// Utilities
import { describe, expect, it } from '@jest/globals'

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
})
