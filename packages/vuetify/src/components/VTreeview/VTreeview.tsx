// import './VTreeview.sass'

// Components
import { VTreeviewChildren } from './VTreeviewChildren'

// Composables
import { makeNestedProps, useNested } from '@/composables/nested/nested'
import { makeTagProps } from '@/composables/tag'
import { makeDensityProps, useDensity } from '@/composables/density'
import { provideDefaults } from '@/composables/defaults'
import { makeRoundedProps } from '@/composables/rounded'
import { makeFilterProps, useFilter } from '@/composables/filter'

// Utilities
import { computed, provide, ref, toRef, watch } from 'vue'
import { defineComponent, useRender } from '@/util'
import { VTreeviewSymbol } from './shared'

// Types
import type { PropType } from 'vue'
import type { InternalTreeviewItem, TreeviewItem } from './shared'

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

export const VTreeview = defineComponent({
  name: 'VTreeview',

  props: {
    items: Array as PropType<TreeviewItem[]>,
    selectOnClick: Boolean,
    openOnClick: Boolean,
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
    falseIcon: String,
    trueIcon: String,
    indeterminateIcon: String,
    selectedColor: String,
    search: String,
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
    const search = toRef(props, 'search')
    const { filteredItems } = useFilter(props, computed(() => flatten(items.value)), search)
    const visibleIds = computed(() => {
      const ids = filteredItems.value.flatMap(({ item }) => {
        return [...getPath(item.props.value), ...getChildren(item.props.value)]
      })
      return new Set(ids)
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
