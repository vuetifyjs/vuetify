// Components
import { VTreeviewChildren } from './VTreeviewChildren'
import { makeVListProps, useListItems, VList } from '@/components/VList/VList'

// Composables
import { provideDefaults } from '@/composables/defaults'
import { makeFilterProps, useFilter } from '@/composables/filter'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, provide, ref, toRef } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import { VTreeviewSymbol } from './shared'
import type { VListChildrenSlots } from '@/components/VList/VListChildren'
import type { ListItem } from '@/composables/list-items'
import type { GenericProps } from '@/util'

function flatten (items: ListItem[], flat: ListItem[] = []) {
  for (const item of items) {
    flat.push(item)
    if (item.children) flatten(item.children, flat)
  }
  return flat
}

export const makeVTreeviewProps = propsFactory({
  search: String,

  ...makeFilterProps({ filterKeys: ['title'] }),
  ...omit(makeVListProps({
    collapseIcon: '$treeviewCollapse',
    expandIcon: '$treeviewExpand',
    selectStrategy: 'independent' as const,
    openStrategy: 'multiple' as const,
    slim: true,
  }), ['nav']),
}, 'VTreeview')

export const VTreeview = genericComponent<new <T>(
  props: {
    items?: T[]
  },
  slots: VListChildrenSlots<T>
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VTreeview',

  props: makeVTreeviewProps(),

  emits: {
    'update:selected': (val: unknown[]) => true,
    'update:opened': (val: unknown[]) => true,
    'click:open': (value: { id: unknown, value: boolean, path: unknown[] }) => true,
    'click:select': (value: { id: unknown, value: boolean, path: unknown[] }) => true,
  },

  setup (props, { slots }) {
    const { items } = useListItems(props)
    const activeColor = toRef(props, 'activeColor')
    const baseColor = toRef(props, 'baseColor')
    const color = toRef(props, 'color')
    const opened = useProxiedModel(props, 'opened')
    const selected = useProxiedModel(props, 'selected')

    const vListRef = ref<VList>()

    const flatItems = computed(() => flatten(items.value))
    const search = toRef(props, 'search')
    const { filteredItems } = useFilter(props, flatItems, search)
    const visibleIds = computed(() => {
      if (!search.value) {
        return null
      }
      return new Set(filteredItems.value.flatMap(item => {
        return [...getPath(item.props.value), ...getChildren(item.props.value)]
      }))
    })

    function getPath (id: unknown) {
      const path: unknown[] = []
      let parent: unknown = id
      while (parent != null) {
        path.unshift(parent)
        parent = vListRef.value?.parents.get(parent)
      }
      return path
    }

    function getChildren (id: unknown) {
      const arr: unknown[] = []
      const queue = ((vListRef.value?.children.get(id) ?? []).slice())
      while (queue.length) {
        const child = queue.shift()
        if (!child) continue
        arr.push(child)
        queue.push(...((vListRef.value?.children.get(child) ?? []).slice()))
      }
      return arr
    }

    provide(VTreeviewSymbol, { visibleIds })

    provideDefaults({
      VTreeviewGroup: {
        activeColor,
        baseColor,
        color,
        collapseIcon: toRef(props, 'collapseIcon'),
        expandIcon: toRef(props, 'expandIcon'),
      },
      VTreeviewItem: {
        activeClass: toRef(props, 'activeClass'),
        activeColor,
        baseColor,
        color,
        density: toRef(props, 'density'),
        disabled: toRef(props, 'disabled'),
        lines: toRef(props, 'lines'),
        variant: toRef(props, 'variant'),
      },
    })

    useRender(() => {
      const listProps = VList.filterProps(props)

      return (
        <VList
          ref={ vListRef }
          { ...listProps }
          class={[
            'v-treeview',
            props.class,
          ]}
          style={ props.style }
          v-model:opened={ opened.value }
          v-model:selected={ selected.value }
        >
          <VTreeviewChildren
            items={ items.value }
            selectable={ props.selectable }
            v-slots={ slots }
          ></VTreeviewChildren>
        </VList>
      )
    })

    return {
      open,
    }
  },
})

export type VTreeview = InstanceType<typeof VTreeview>
