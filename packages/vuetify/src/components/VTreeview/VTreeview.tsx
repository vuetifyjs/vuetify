// import './VTreeview.sass'

// Components
import { VTreeviewChildren } from './VTreeviewChildren'
import { VExpandTransition } from '../transitions'

// Composables
import { makeNestedProps, useNested } from '@/composables/nested/nested'
import { makeTagProps } from '@/composables/tag'
import { makeDensityProps, useDensity } from '@/composables/density'
import { provideDefaults } from '@/composables/defaults'
import { makeRoundedProps } from '@/composables/rounded'
import { makeFilterProps, useFilter } from '@/composables/filter'
import { makeTransitionProps } from '@/composables/transition'
import { makeItemsProps } from '@/composables/items'

// Utilities
import { computed, onMounted, provide, ref, toRef, watch } from 'vue'
import { genericComponent, getPropertyFromItem, pick, useRender } from '@/util'
import { VTreeviewSymbol } from './shared'

// Types
import type { PropType } from 'vue'
import type { SlotsToProps } from '@/util'
import type { TreeviewGroupActivatorSlot } from './VTreeviewGroup'
import type { ItemProps } from '@/composables/items'
import type { InternalListItem } from '../VList/VList'

function transformItem (props: ItemProps, item: any): InternalListItem {
  const title = typeof item === 'string' ? item : getPropertyFromItem(item, props.itemTitle)
  const value = getPropertyFromItem(item, props.itemValue, title)
  const children = getPropertyFromItem(item, props.itemChildren)
  const itemProps = props.itemProps === true
    ? pick(item, ['children'])[1]
    : getPropertyFromItem(item, props.itemProps)

  const _props = {
    title,
    value,
    ...itemProps,
  }

  return {
    title: _props.title,
    value: _props.value,
    props: _props,
    children: children ? transformItems(props, children) : undefined,
    raw: item,
  }
}

function transformItems (props: ItemProps, items: (string | object)[]) {
  const array: InternalListItem[] = []

  for (const item of items) {
    array.push(transformItem(props, item))
  }

  return array
}

function flatten (items: InternalListItem[], flat: InternalListItem[] = []) {
  for (const item of items) {
    flat.push(item)

    if (item.children) flatten(item.children, flat)
  }

  return flat
}

export const VTreeview = genericComponent<new <T>() => {
  $props: {
    items: T[]
  } & SlotsToProps<{
    default: []
    activator: [TreeviewGroupActivatorSlot]
    item: [T]
  }>
}>()({
  name: 'VTreeview',

  props: {
    selectOnClick: Boolean,
    openOnClick: Boolean,
    openOnMount: {
      type: String as PropType<'all' | 'root' | undefined>,
      validator: (v: any) => !v || ['all', 'root'].includes(v),
    },
    hover: {
      type: Boolean,
      default: true,
    },
    showSelect: Boolean,
    ...makeNestedProps({
      selectedClass: 'v-treeview-item--active',
    }),
    ...makeTagProps(),
    ...makeDensityProps(),
    ...makeRoundedProps(),
    ...makeFilterProps({
      filterKeys: ['props.value', 'props.title'],
    }),
    ...makeTransitionProps({
      transition: { component: VExpandTransition },
    }),
    ...makeItemsProps(),
    falseIcon: String,
    trueIcon: String,
    indeterminateIcon: String,
    selectedColor: String,
    search: String,
    showLines: Boolean,
  },

  emits: {
    'update:selected': (val: unknown[]) => true,
    'update:opened': (val: unknown[]) => true,
    'click:open': (value: { id: string, value: unknown }) => true,
    'click:select': (value: { id: string, value: unknown }) => true,
    'click:prepend': (data: { event: MouseEvent, isOpen: boolean, open: (value: boolean, e?: Event) => void }) => true,
    'click:dblclick': (data: { event: MouseEvent, isOpen: boolean, open: (value: boolean, e?: Event) => void }) => true,
    'click:contextmenu': (data: { event: MouseEvent, isOpen: boolean, open: (value: boolean, e?: Event) => void }) => true,
  },

  setup (props, { slots, emit }) {
    const { open, select, getPath, getChildren, children, parents, opened } = useNested(props)

    const items = computed(() => transformItems(props, props.items))
    const flatItems = computed(() => flatten(items.value))

    onMounted(() => {
      if (props.openOnMount === 'root') {
        parents.value.forEach(parent => {
          if (!parents.value.has(parent)) {
            open(parent, true)
          }
        })
      } else if (props.openOnMount === 'all') {
        parents.value.forEach(parent => {
          open(parent, true)
        })
      }
    })

    const search = toRef(props, 'search')
    const { filteredItems } = useFilter(props, flatItems, search)
    const visibleIds = computed(() => {
      if (!search.value) {
        return null
      }

      return new Set(filteredItems.value.flatMap(({ item }) => {
        return [...getPath(item.props.value), ...getChildren(item.props.value)]
      }))
    })

    let previousOpened: Set<unknown> | null = null
    watch(search, (value, oldValue) => {
      if (!visibleIds.value) return

      // Save current open state so we can
      // restore it when no longer searching
      if (value && !oldValue) {
        previousOpened = opened.value
      } else if (!value && previousOpened) {
        opened.value = previousOpened
        previousOpened = null
      }

      // If we have a saved state (i.e. we are searching)
      // then open all items with children
      if (previousOpened) {
        for (const id of visibleIds.value) {
          if (children.value.has(id)) {
            open(id, true)
          }
        }
      }
    })

    provide(VTreeviewSymbol, { visibleIds })

    provideDefaults(ref({
      VTreeviewItem: {
        openOnClick: toRef(props, 'openOnClick'),
        selectOnClick: toRef(props, 'selectOnClick'),
        hover: toRef(props, 'hover'),
        showSelect: toRef(props, 'showSelect'),
        falseIcon: toRef(props, 'falseIcon'),
        trueIcon: toRef(props, 'trueIcon'),
        indeterminateIcon: toRef(props, 'indeterminateIcon'),
        selectedColor: toRef(props, 'selectedColor'),
        rounded: toRef(props, 'rounded'),
      },
      VTreeviewGroup: {
        showLines: toRef(props, 'showLines'),
        transition: toRef(props, 'transition'),
      },
    }))

    const { densityClasses } = useDensity(props, 'v-treeview')

    useRender(() => (
      <props.tag
        class={[
          'v-treeview',
          densityClasses.value,
        ]}
      >
        { slots.default?.() ?? (
          <VTreeviewChildren items={ items.value } v-slots={ slots } />
        ) }
      </props.tag>
    ))

    return {
      open,
      select,
    }
  },
})
