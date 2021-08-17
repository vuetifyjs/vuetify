// Utilities
import { defaultFilter, useFilter } from '../filter'
import { describe, expect, it } from '@jest/globals'
import { ref } from 'vue'

describe('filter.ts', () => {
  describe('defaultFilter', () => {
    it.each([
      [null, null, true],
      ['foo', null, true],
      ['foo', 'foo', true],
      ['foo', 'f', true],
      [null, 'foo', false],
      ['foo', 'bar', false],
      [1, '1', false],
      ['1', 1, true],
    ])('should compare %s to %s and return a boolean', (text: any, query: any, expected: boolean) => {
      expect(defaultFilter(text, query)).toBe(expected)
    })
  })

  describe('useFilter', () => {
    const items = ref(Array.from({ length: 50 }, (v, k) => `item-${k}`))

    it.each([
      ['', items.value.length],
      [null, items.value.length],
      ['1', 14],
      [1, 14],
      ['0', 5],
      ['14', 1],
      ['foo', 0],
    ])('should return a array of filtered items from value %s', (text: any, expected: number) => {
      const { filtered } = useFilter({}, items, ref(text))

      expect(filtered.value).toHaveLength(expected)
    })

    it('should accept a custom filter function', () => {
      function filterFn (item: Dictionary<string>, query?: string) {
        if (typeof query !== 'string') return true

        return item.text.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      }
      const query = ref('zz')
      const items = ref([
        { text: 'foo' },
        { text: 'bar' },
        { text: 'fizz' },
        { text: 'buzz' },
      ])
      const { filtered } = useFilter({ filterFn }, items, query)

      expect(filtered.value).toHaveLength(2)

      query.value = 'foo'

      expect(filtered.value).toHaveLength(1)

      items.value.push({ text: 'foobar' })

      expect(filtered.value).toHaveLength(2)
    })
  })
})
