// Composables
import { createHeaders } from '../composables/headers'
import { transformItems as _transformItems } from '../composables/items'
import { sortItems as _sortItems, provideSort } from '../composables/sort'

// Utilities
import { mount } from '@vue/test-utils'
import { shallowRef } from 'vue'

// Types
import type { MultiSortProps, SortItem } from '../composables/sort'
import type { DataTableCompareFunction, DataTableHeader, DataTableItem, InternalDataTableHeader } from '@/components/VDataTable/types'

function transformItems (items: any[], headers?: DataTableHeader[]) {
  let _items: DataTableItem[]
  mount({
    setup () {
      const { columns } = createHeaders({ items, headers })
      _items = _transformItems({} as any, items, columns.value)
      return () => {}
    },
  })
  return _items!
}

function sortItems (items: any[], sortBy: SortItem[], sortFunctions?: Record<string, DataTableCompareFunction>) {
  return _sortItems(items, sortBy, 'en', {
    sortFunctions,
    transform: item => item.columns,
  })
}

function createSorting (options: {
  initialSortOrder?: 'asc' | 'desc'
  sortBy?: SortItem[]
  multiSort?: boolean | MultiSortProps
  mustSort?: boolean
} = {}) {
  const initialSortOrder = shallowRef(options.initialSortOrder ?? 'asc')
  const sortBy = shallowRef<readonly SortItem[]>(options.sortBy ?? [])
  const page = shallowRef(2)
  let toggleSort: ReturnType<typeof provideSort>['toggleSort']

  mount({
    setup () {
      toggleSort = provideSort({
        initialSortOrder,
        sortBy,
        multiSort: shallowRef(options.multiSort ?? false),
        mustSort: shallowRef(options.mustSort ?? false),
        page,
      }).toggleSort
      return () => null
    },
  })

  return { initialSortOrder, sortBy, page, toggleSort: toggleSort! }
}

describe('VDataTable - sort state', () => {
  it.each(['asc', 'desc'] as const)('should cycle from the column initial order %s', initialOrder => {
    const secondaryOrder = initialOrder === 'asc' ? 'desc' : 'asc'
    const { sortBy, page, toggleSort } = createSorting({ initialSortOrder: secondaryOrder })
    const column: InternalDataTableHeader = {
      key: 'severity', value: 'severity', sortable: true, initialSortOrder: initialOrder,
    }

    expect(sortBy.value).toEqual([])

    for (const order of [initialOrder, secondaryOrder, undefined, initialOrder]) {
      toggleSort(column)
      expect(sortBy.value).toEqual(order ? [{ key: 'severity', order }] : [])
      expect(page.value).toBe(1)
    }
  })

  it.each(['asc', 'desc'] as const)('should fall back to the table initial order %s', initialSortOrder => {
    const { sortBy, toggleSort } = createSorting({ initialSortOrder })
    const column: InternalDataTableHeader = { key: 'severity', value: 'severity', sortable: true }
    const secondaryOrder = initialSortOrder === 'asc' ? 'desc' : 'asc'

    for (const order of [initialSortOrder, secondaryOrder, undefined]) {
      toggleSort(column)
      expect(sortBy.value).toEqual(order ? [{ key: 'severity', order }] : [])
    }
  })

  it.each(['mustSort', 'mandatory'] as const)('should return to the column initial order with %s', mode => {
    const { sortBy, toggleSort } = createSorting({ mustSort: mode === 'mustSort' })
    const column: InternalDataTableHeader = {
      key: 'severity', value: 'severity', sortable: true, initialSortOrder: 'desc',
    }

    for (const order of ['desc', 'asc', 'desc']) {
      toggleSort(column, undefined, mode === 'mandatory')
      expect(sortBy.value).toEqual([{ key: 'severity', order }])
    }
  })

  it('should allow removing a column when must-sort has another sorted column', () => {
    const { sortBy, toggleSort } = createSorting({
      mustSort: true,
      multiSort: true,
      sortBy: [{ key: 'name', order: 'asc' }],
    })
    const column: InternalDataTableHeader = {
      key: 'severity', value: 'severity', sortable: true, initialSortOrder: 'desc',
    }

    toggleSort(column)
    expect(sortBy.value).toEqual([{ key: 'name', order: 'asc' }, { key: 'severity', order: 'desc' }])
    toggleSort(column)
    expect(sortBy.value).toEqual([{ key: 'name', order: 'asc' }, { key: 'severity', order: 'asc' }])
    toggleSort(column)
    expect(sortBy.value).toEqual([{ key: 'name', order: 'asc' }])
  })

  it.each([
    ['append', false, ['name', 'severity']],
    ['prepend', false, ['severity', 'name']],
    ['append', true, ['severity', 'name']],
    ['prepend', true, ['name', 'severity']],
  ] as const)('should preserve multi-sort priority with %s and shift=%s', (mode, shiftKey, keys) => {
    const { sortBy, toggleSort } = createSorting({
      multiSort: { key: 'ctrl', mode, modifier: 'shift' },
      sortBy: [{ key: 'name', order: 'asc' }],
    })
    const column: InternalDataTableHeader = {
      key: 'severity', value: 'severity', sortable: true, initialSortOrder: 'desc',
    }

    toggleSort(column, new KeyboardEvent('keydown', { ctrlKey: true, shiftKey }))
    expect(sortBy.value.map(item => item.key)).toEqual(keys)
    expect(sortBy.value.find(item => item.key === 'severity')?.order).toBe('desc')

    toggleSort(column, new KeyboardEvent('keydown', { ctrlKey: true }))
    toggleSort(column, new KeyboardEvent('keydown', { ctrlKey: true }))
    toggleSort(column)
    expect(sortBy.value).toEqual([{ key: 'severity', order: 'desc' }])
  })

  it('should preserve an explicit sort-by order and use updated table defaults', () => {
    const { initialSortOrder, sortBy, toggleSort } = createSorting({
      sortBy: [{ key: 'severity', order: 'asc' }],
    })
    const column: InternalDataTableHeader = {
      key: 'severity', value: 'severity', sortable: true, initialSortOrder: 'desc',
    }

    expect(sortBy.value).toEqual([{ key: 'severity', order: 'asc' }])
    toggleSort(column)
    expect(sortBy.value).toEqual([])

    initialSortOrder.value = 'desc'
    toggleSort({ key: 'name', value: 'name', sortable: true })
    expect(sortBy.value).toEqual([{ key: 'name', order: 'desc' }])
  })
})

describe('VDataTable - sorting', () => {
  it('should sort items by single column', () => {
    const items = transformItems([
      { string: 'foo', number: 1 },
      { string: 'bar', number: 2 },
      { string: 'baz', number: 4 },
      { string: 'fizzbuzz', number: 3 },
    ])

    expect(
      sortItems(items, [{ key: 'string', order: 'asc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: 2 },
      { string: 'baz', number: 4 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'foo', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'string', order: 'desc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'foo', number: 1 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'baz', number: 4 },
      { string: 'bar', number: 2 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'asc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'foo', number: 1 },
      { string: 'bar', number: 2 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'baz', number: 4 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'desc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'baz', number: 4 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'bar', number: 2 },
      { string: 'foo', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'asc' }], { number: (a, b) => b - a })
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'baz', number: 4 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'bar', number: 2 },
      { string: 'foo', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'desc' }], { number: (a, b) => b - a })
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'foo', number: 1 },
      { string: 'bar', number: 2 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'baz', number: 4 },
    ])
  })

  it('should sort items with deep structure', () => {
    const items = transformItems([
      { foo: { bar: { baz: 3 } } },
      { foo: { bar: { baz: 1 } } },
      { foo: { bar: { baz: 2 } } },
    ], [{ key: 'foo.bar.baz' }])

    expect(
      sortItems(items, [{ key: 'foo.bar.baz', order: 'asc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { foo: { bar: { baz: 1 } } },
      { foo: { bar: { baz: 2 } } },
      { foo: { bar: { baz: 3 } } },
    ])
  })

  it('should sort items by multiple columns', () => {
    const items = transformItems([
      { string: 'foo', number: 1 },
      { string: 'bar', number: 3 },
      { string: 'baz', number: 2 },
      { string: 'baz', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'string', order: 'asc' }, { key: 'number', order: 'asc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: 3 },
      { string: 'baz', number: 1 },
      { string: 'baz', number: 2 },
      { string: 'foo', number: 1 },
    ])

    // { string: 'foo', number: 1 },
    // { string: 'bar', number: 3 },
    // { string: 'baz', number: 2 },
    // { string: 'baz', number: 1 },

    // { string: 'bar', number: 3 },
    // { string: 'baz', number: 2 },
    // { string: 'baz', number: 1 },
    // { string: 'foo', number: 1 },

    expect(
      sortItems(items, [{ key: 'string', order: 'desc' }, { key: 'number', order: 'asc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'foo', number: 1 },
      { string: 'baz', number: 1 },
      { string: 'baz', number: 2 },
      { string: 'bar', number: 3 },
    ])

    expect(
      sortItems(items, [{ key: 'string', order: 'asc' }, { key: 'number', order: 'desc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: 3 },
      { string: 'baz', number: 2 },
      { string: 'baz', number: 1 },
      { string: 'foo', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'string', order: 'desc' }, { key: 'number', order: 'desc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'foo', number: 1 },
      { string: 'baz', number: 2 },
      { string: 'baz', number: 1 },
      { string: 'bar', number: 3 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'asc' }, { key: 'string', order: 'asc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'baz', number: 1 },
      { string: 'foo', number: 1 },
      { string: 'baz', number: 2 },
      { string: 'bar', number: 3 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'desc' }, { key: 'string', order: 'asc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: 3 },
      { string: 'baz', number: 2 },
      { string: 'baz', number: 1 },
      { string: 'foo', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'asc' }, { key: 'string', order: 'desc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'foo', number: 1 },
      { string: 'baz', number: 1 },
      { string: 'baz', number: 2 },
      { string: 'bar', number: 3 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'desc' }, { key: 'string', order: 'desc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: 3 },
      { string: 'baz', number: 2 },
      { string: 'foo', number: 1 },
      { string: 'baz', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'string', order: 'asc' }, { key: 'number', order: 'asc' }], { number: (a, b) => b - a })
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: 3 },
      { string: 'baz', number: 2 },
      { string: 'baz', number: 1 },
      { string: 'foo', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'asc' }, { key: 'string', order: 'asc' }], { number: (a, b) => b - a })
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: 3 },
      { string: 'baz', number: 2 },
      { string: 'baz', number: 1 },
      { string: 'foo', number: 1 },
    ])
  })

  it('should sort items with nullable column', () => {
    const items = transformItems([
      { string: 'foo', number: 1 },
      { string: 'bar', number: null },
      { string: 'baz', number: 4 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'foobar', number: 5 },
      { string: 'barbaz', number: undefined },
      { string: 'foobarbuzz', number: '' },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'asc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: null },
      { string: 'barbaz', number: undefined },
      { string: 'foobarbuzz', number: '' },
      { string: 'foo', number: 1 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'baz', number: 4 },
      { string: 'foobar', number: 5 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'desc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'foobar', number: 5 },
      { string: 'baz', number: 4 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'foo', number: 1 },
      { string: 'bar', number: null },
      { string: 'barbaz', number: undefined },
      { string: 'foobarbuzz', number: '' },
    ])
  })
})
