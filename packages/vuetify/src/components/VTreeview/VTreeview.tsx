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

// Utilities
import { computed, onMounted, provide, ref, toRef, watch } from 'vue'
import { genericComponent, useRender } from '@/util'
import { VTreeviewSymbol } from './shared'

// Types
import type { PropType } from 'vue'
import type { MakeSlots } from '@/util'
import type { InternalTreeviewItem, TreeviewItem } from './shared'
import type { TreeviewGroupActivatorSlot } from './VTreeviewGroup'

const parseItems = (items?: TreeviewItem[]): InternalTreeviewItem[] => {
  if (!items) return []

  return items.map(item => {
    const { $children, ...props } = item

    const children = $children ? parseItems($children) : undefined

    return { item, props, children }
  })
}

function flatten (items: InternalTreeviewItem[], flat: InternalTreeviewItem[] = []) {
  for (const item of items) {
    flat.push(item)

    if (item.children) flatten(item.children, flat)
  }

  return flat
}

export const VTreeview = genericComponent<new <T extends TreeviewItem>() => {
  $props: {
    items?: T[]
  }
  $slots: MakeSlots<{
    default: []
    activator: [TreeviewGroupActivatorSlot]
    item: [T]
  }>
}>()({
  name: 'VTreeview',

  props: {
    items: Array as PropType<TreeviewItem[]>,
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
      selectedClass: 'v-treeview--selected',
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
    falseIcon: String,
    trueIcon: String,
    indeterminateIcon: String,
    selectedColor: String,
    search: String,
    showLines: Boolean,
  },

  emits: {
    'update:selected': (val: string[]) => true,
    'update:opened': (val: string[]) => true,
    'click:open': (value: { id: string, value: unknown }) => true,
    'click:select': (value: { id: string, value: unknown }) => true,
  },

  setup (props, { slots, emit }) {
    const { open, select, getPath, getChildren, children, opened } = useNested(props)

    const items = computed(() => parseItems(props.items))
    const flatItems = computed(() => flatten(items.value))

    onMounted(() => {
      if (props.openOnMount === 'root') {
        items.value.forEach(item => open(item.props.value, true))
      } else if (props.openOnMount === 'all') {
        const parents = flatItems.value.reduce((ids, item) => {
          return children.value.has(item.props.value) ? [...ids, item.props.value] : ids
        }, [] as any[])
        parents.forEach(parent => open(parent, true))
      }
    })

    const search = toRef(props, 'search')
    const { filteredItems } = useFilter(props, flatItems, search)
    const visibleIds = computed(() => {
      if (!search.value) {
        return new Set(flatItems.value.map(item => item.props.value))
      }

      return new Set(filteredItems.value.flatMap(({ item }) => {
        return [...getPath(item.props.value), ...getChildren(item.props.value)]
      }))
    })

    let previousOpened: Set<string> | null = null
    watch(search, (value, oldValue) => {
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
