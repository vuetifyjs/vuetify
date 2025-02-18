// Utilities
import { computed, shallowRef, watchEffect } from 'vue'
import { deepEqual, getPropertyFromItem, isPrimitive, omit, pick, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { InternalItem } from '@/composables/filter'
import type { Primitive, SelectItemKey } from '@/util'

export interface ListItem<T = any> extends InternalItem<T> {
  title: string
  props: {
    [key: string]: any
    title: string
    value: any
  }
  children?: ListItem<T>[]
}

export interface ItemProps {
  items: any[]
  itemTitle: SelectItemKey
  itemValue: SelectItemKey
  itemChildren: SelectItemKey
  itemProps: SelectItemKey
  returnObject: boolean
  valueComparator: typeof deepEqual | undefined
}

// Composables
export const makeItemsProps = propsFactory({
  items: {
    type: Array as PropType<ItemProps['items']>,
    default: () => ([]),
  },
  itemTitle: {
    type: [String, Array, Function] as PropType<SelectItemKey>,
    default: 'title',
  },
  itemValue: {
    type: [String, Array, Function] as PropType<SelectItemKey>,
    default: 'value',
  },
  itemChildren: {
    type: [Boolean, String, Array, Function] as PropType<SelectItemKey>,
    default: 'children',
  },
  itemProps: {
    type: [Boolean, String, Array, Function] as PropType<SelectItemKey>,
    default: 'props',
  },
  returnObject: Boolean,
  valueComparator: Function as PropType<typeof deepEqual>,
}, 'list-items')

export function transformItem (props: Omit<ItemProps, 'items'>, item: any): ListItem {
  const title = getPropertyFromItem(item, props.itemTitle, item)
  const value = getPropertyFromItem(item, props.itemValue, title)
  const children = getPropertyFromItem(item, props.itemChildren)
  const itemProps = props.itemProps === true
    ? typeof item === 'object' && item != null && !Array.isArray(item)
      ? 'children' in item
        ? omit(item, ['children'])
        : item
      : undefined
    : getPropertyFromItem(item, props.itemProps)

  const _props = {
    title,
    value,
    ...itemProps,
  }

  return {
    title: String(_props.title ?? ''),
    value: _props.value,
    props: _props,
    children: Array.isArray(children) ? transformItems(props, children) : undefined,
    raw: item,
  }
}

export function transformItems (props: Omit<ItemProps, 'items'>, items: ItemProps['items']) {
  const _props = pick(props, [
    'itemTitle',
    'itemValue',
    'itemChildren',
    'itemProps',
    'returnObject',
    'valueComparator',
  ])

  const array: ListItem[] = []
  for (const item of items) {
    array.push(transformItem(_props, item))
  }

  return array
}

export function useItems (props: ItemProps) {
  const items = computed(() => transformItems(props, props.items))
  const hasNullItem = computed(() => items.value.some(item => item.value === null))

  const itemsMap = shallowRef<Map<Primitive, ListItem[]>>(new Map())
  const keylessItems = shallowRef<ListItem[]>([])
  watchEffect(() => {
    const _items = items.value
    const map = new Map()
    const keyless = []
    for (let i = 0; i < _items.length; i++) {
      const item = _items[i]
      if (isPrimitive(item.value) || item.value === null) {
        let values = map.get(item.value)
        if (!values) {
          values = []
          map.set(item.value, values)
        }
        values.push(item)
      } else {
        keyless.push(item)
      }
    }
    itemsMap.value = map
    keylessItems.value = keyless
  })

  function transformIn (value: any[]): ListItem[] {
    // Cache unrefed values outside the loop,
    // proxy getters can be slow when you call them a billion times
    const _value = value
    const _items = itemsMap.value
    const _allItems = items.value
    const _keylessItems = keylessItems.value
    const _hasNullItem = hasNullItem.value
    const _returnObject = props.returnObject
    const hasValueComparator = !!props.valueComparator
    const valueComparator = props.valueComparator || deepEqual
    const _props = pick(props, [
      'itemTitle',
      'itemValue',
      'itemChildren',
      'itemProps',
      'returnObject',
      'valueComparator',
    ])

    const returnValue: ListItem[] = []
    main: for (const v of _value) {
      // When the model value is null, return an InternalItem
      // based on null only if null is one of the items
      if (!_hasNullItem && v === null) continue

      // String model value means value is a custom input value from combobox
      // Don't look up existing items if the model value is a string
      if (_returnObject && typeof v === 'string') {
        returnValue.push(transformItem(_props, v))
        continue
      }

      // Fast path, items with primitive values and no
      // custom valueComparator can use a constant-time
      // map lookup instead of searching the items array
      const fastItems = _items.get(v)

      // Slow path, always use valueComparator.
      // This is O(n^2) so we really don't want to
      // do it for more than a couple hundred items.
      if (hasValueComparator || !fastItems) {
        for (const item of (hasValueComparator ? _allItems : _keylessItems)) {
          if (valueComparator(v, item.value)) {
            returnValue.push(item)
            continue main
          }
        }
        // Not an existing item, construct it from the model (#4000)
        returnValue.push(transformItem(_props, v))
        continue
      }

      returnValue.push(...fastItems)
    }

    return returnValue
  }

  function transformOut (value: ListItem[]): any[] {
    return props.returnObject
      ? value.map(({ raw }) => raw)
      : value.map(({ value }) => value)
  }

  return { items, transformIn, transformOut }
}
