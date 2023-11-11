// Utilities
import { computed } from 'vue'
import { deepEqual, getPropertyFromItem, omit, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { InternalItem } from '@/composables/filter'
import type { SelectItemKey } from '@/util'

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
  valueComparator: typeof deepEqual
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
  valueComparator: {
    type: Function as PropType<typeof deepEqual>,
    default: deepEqual,
  },
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
  const array: ListItem[] = []

  for (const item of items) {
    array.push(transformItem(props, item))
  }

  return array
}

export function useItems (props: ItemProps) {
  const items = computed(() => transformItems(props, props.items))
  const hasNullItem = computed(() => items.value.some(item => item.value === null))

  function transformIn (value: any[]): ListItem[] {
    if (!hasNullItem.value) {
      // When the model value is null, return an InternalItem
      // based on null only if null is one of the items
      value = value.filter(v => v !== null)
    }

    return value.map(v => {
      if (props.returnObject && typeof v === 'string') {
        // String model value means value is a custom input value from combobox
        // Don't look up existing items if the model value is a string
        return transformItem(props, v)
      }
      return items.value.find(item => props.valueComparator(v, item.value)) || transformItem(props, v)
    })
  }

  function transformOut (value: ListItem[]): any[] {
    return props.returnObject
      ? value.map(({ raw }) => raw)
      : value.map(({ value }) => value)
  }

  return { items, transformIn, transformOut }
}
