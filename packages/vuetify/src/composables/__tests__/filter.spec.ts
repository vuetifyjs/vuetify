// Composables
import { defaultFilter, filterItems, useFilter } from '../filter'
import { transformItem, transformItems } from '../list-items'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { nextTick, ref } from 'vue'

describe('filter', () => {
  describe('defaultFilter', () => {
    it.each([
      [null, null, -1],
      ['foo', null, -1],
      ['foo', 'foo', 0],
      ['foo', 'f', 0],
      [null, 'foo', -1],
      ['foo', 'bar', -1],
      [1, '1', 0],
      ['1', 1, 0],
    ])('should compare %s to %s and return a match result', (text, query, expected) => {
      // @ts-expect-error
      expect(defaultFilter(text, query)).toBe(expected)
    })
  })

  describe('filterItems', () => {
    const items = Array.from({ length: 5 }, (v, k) => transformItem({} as any, {
      title: `Foo-${k}`,
      value: `fizz-${k}`,
    }))

    it.each([
      [['title'], 'foo', 5, [0, 1, 2, 3, 4]],
      [['title', 'value'], 'fizz', 5, [0, 1, 2, 3, 4]],
      [['title', 'value'], 'foo-0', 1, [0]],
    ])('should filter items by some with %s filterKeys with query %s', (filterKeys: string[], query, expectedLength, expectedMatches) => {
      const matches = filterItems(items, query, { filterKeys, filterMode: 'some' })
      expect(matches).toHaveLength(expectedLength)
      expect(matches.map(match => match.index)).toEqual(expectedMatches)
    })

    it.each([
      [['title'], 'foo', 5],
      [['title', 'value'], 'fizz', 0],
      [['title', 'value'], 'foo-0', 0],
      [['title', 'value'], '0', 1],
    ])('should filter items by every with %s filterKeys with query %s', (filterKeys: string[], query, expected) => {
      expect(filterItems(items, query, { filterKeys, filterMode: 'every' })).toHaveLength(expected)
    })

    it('should filter by mode using customKeyFilter', () => {
      const customKeyFilter = {
        title: (s: string, q: string) => s === q,
        value: (s: string) => s === '1',
      }
      const items = [
        {
          title: 'foo',
          subtitle: 'bar',
          value: '1',
          custom: '1',
        },
        {
          title: 'fizz',
          subtitle: 'buzz',
          value: '1',
          custom: 'bar',
        },
        {
          title: 'foobar',
          subtitle: 'fizzbuzz',
          value: '2',
          custom: 'bar',
        },
        {
          title: 'buzz',
          subtitle: 'buzz',
          value: '1',
          custom: 'buzz',
        },
      ] as any
      const filterKeys = ['title', 'value', 'subtitle', 'custom']

      expect(filterItems(items, 'foo', {
        filterKeys,
        customKeyFilter,
        filterMode: 'some',
      })).toHaveLength(3)

      expect(filterItems(items, 'fizz', {
        filterKeys,
        customKeyFilter,
        filterMode: 'union',
      })).toHaveLength(2)

      expect(filterItems(items, 'fizz', {
        filterKeys,
        customKeyFilter,
        filterMode: 'intersection',
      })).toHaveLength(0)

      expect(filterItems(items, 'buzz', {
        filterKeys,
        customKeyFilter,
        filterMode: 'every',
      })).toHaveLength(1)
    })
  })

  describe('useFilter', () => {
    const itemProps = {
      itemTitle: 'title',
      itemValue: 'value',
      itemChildren: 'children',
      itemProps: 'props',
      returnObject: false,
    }
    const items = Array.from({ length: 50 }, (v, k) => ({
      text: `item-${k}`,
      value: k,
    }))

    it.each([
      ['', items.length],
      [null, items.length],
      ['1', 14],
      [1, 14],
      ['0', 5],
      ['14', 1],
      ['foo', 0],
    ])('should return an array of filtered items from value %s', (text: any, expected: number) => {
      const { filteredItems } = useFilter({}, ref(transformItems(itemProps, items)), ref(text))

      expect(filteredItems.value).toHaveLength(expected)
    })

    it('should accept a custom filter function', async () => {
      function filterFn (text: string, query?: string, item?: any) {
        if (typeof query !== 'string') return true
        return item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      }
      const query = ref('zz')
      const props = { filterFn, filterKeys: ['title'] }
      const items = ref(transformItems(itemProps, [
        { title: 'foo' },
        { title: 'bar' },
        { title: 'fizz' },
        { title: 'buzz' },
      ]))
      const { filteredItems } = useFilter(props, items, query)

      expect(filteredItems.value.map(item => item.raw.title)).toEqual(['fizz', 'buzz'])

      query.value = 'foo'
      await nextTick()

      expect(filteredItems.value.map(item => item.raw.title)).toEqual(['foo'])

      items.value.push(transformItem(itemProps, { title: 'foobar' }))
      await nextTick()

      expect(filteredItems.value.map(item => item.raw.title)).toEqual(['foo', 'foobar'])
    })
  })
})
