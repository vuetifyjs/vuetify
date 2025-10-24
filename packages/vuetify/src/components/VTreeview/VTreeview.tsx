// Components
import { makeVTreeviewChildrenProps, VTreeviewChildren } from './VTreeviewChildren'
import { makeVListProps, useListItems, VList } from '@/components/VList/VList'

// Composables
import { provideDefaults } from '@/composables/defaults'
import { makeFilterProps, useFilter } from '@/composables/filter'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, provide, ref, toRaw, toRef } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import { VTreeviewSymbol } from './shared'
import type { VTreeviewChildrenSlots } from './VTreeviewChildren'
import type { InternalListItem } from '@/components/VList/VList'
import type { ListItem } from '@/composables/list-items'
import type { GenericProps, IndentLinesVariant } from '@/util'

function flatten (items: ListItem[], flat: ListItem[] = []) {
  for (const item of items) {
    flat.push(item)
    if (item.children) flatten(item.children, flat)
  }
  return flat
}

export const makeVTreeviewProps = propsFactory({
  openAll: Boolean,
  indentLines: [Boolean, String] as PropType<boolean | IndentLinesVariant>,
  search: String,

  ...makeFilterProps({ filterKeys: ['title'] }),
  ...omit(makeVTreeviewChildrenProps(), [
    'index',
    'path',
    'indentLinesVariant',
    'parentIndentLines',
    'isLastGroup',
  ]),
  ...omit(makeVListProps({
    collapseIcon: '$treeviewCollapse',
    expandIcon: '$treeviewExpand',
    slim: true,
  }), ['nav', 'openStrategy']),

  modelValue: Array,
}, 'VTreeview')

export const VTreeview = genericComponent<new <T>(
  props: {
    items?: T[]
  },
  slots: VTreeviewChildrenSlots<T>
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VTreeview',

  props: makeVTreeviewProps(),

  emits: {
    'update:opened': (val: unknown) => true,
    'update:activated': (val: unknown) => true,
    'update:selected': (val: unknown) => true,
    'update:modelValue': (val: unknown) => true,
    'click:open': (value: { id: unknown, value: boolean, path: unknown[] }) => true,
    'click:select': (value: { id: unknown, value: boolean, path: unknown[] }) => true,
  },

  setup (props, { slots, emit }) {
    const { items } = useListItems(props)
    const activeColor = toRef(() => props.activeColor)
    const baseColor = toRef(() => props.baseColor)
    const color = toRef(() => props.color)
    const activated = useProxiedModel(props, 'activated')
    const _selected = useProxiedModel(props, 'selected')

    const selected = computed({
      get: () => props.modelValue ?? _selected.value,
      set (val) {
        _selected.value = val
        emit('update:modelValue', val)
      },
    })

    const vListRef = ref<VList>()

    const opened = computed(() => props.openAll ? openAll(items.value) : props.opened)
    const flatItems = computed(() => flatten(items.value))
    const search = toRef(() => props.search)
    const { filteredItems } = useFilter(props, flatItems, search)
    const visibleIds = computed(() => {
      if (!search.value) return null
      const getPath = vListRef.value?.getPath
      if (!getPath) return null
      return new Set(filteredItems.value.flatMap(item => {
        const itemVal = props.returnObject ? item.raw : item.props.value
        return [
          ...getPath(itemVal),
          ...getChildren(itemVal),
        ].map(toRaw)
      }))
    })

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

    function openAll (items: InternalListItem<any>[]) {
      let ids: any[] = []

      for (const i of items) {
        if (!i.children) continue

        ids.push(props.returnObject ? toRaw(i.raw) : i.value)

        if (i.children) {
          ids = ids.concat(openAll(i.children))
        }
      }

      return ids
    }

    provide(VTreeviewSymbol, { visibleIds })

    provideDefaults({
      VTreeviewGroup: {
        activeColor,
        baseColor,
        color,
        collapseIcon: toRef(() => props.collapseIcon),
        expandIcon: toRef(() => props.expandIcon),
      },
      VTreeviewItem: {
        activeClass: toRef(() => props.activeClass),
        activeColor,
        baseColor,
        color,
        density: toRef(() => props.density),
        disabled: toRef(() => props.disabled),
        lines: toRef(() => props.lines),
        variant: toRef(() => props.variant),
      },
    })

    useRender(() => {
      const listProps = VList.filterProps(props)
      const treeviewChildrenProps = VTreeviewChildren.filterProps(props)
      const indentLinesVariant = typeof props.indentLines === 'boolean' ? 'default' : props.indentLines

      return (
        <VList
          ref={ vListRef }
          { ...listProps }
          tag="div"
          class={[
            'v-treeview',
            {
              'v-treeview--fluid': props.fluid,
            },
            props.class,
          ]}
          openStrategy="multiple"
          style={ props.style }
          opened={ opened.value }
          v-model:activated={ activated.value }
          v-model:selected={ selected.value }
        >
          <VTreeviewChildren
            { ...treeviewChildrenProps }
            density={ props.density }
            returnObject={ props.returnObject }
            items={ items.value }
            parentIndentLines={ props.indentLines ? [] : undefined }
            indentLinesVariant={ indentLinesVariant }
            v-slots={ slots }
          ></VTreeviewChildren>
        </VList>
      )
    })

    return { }
  },
})

export type VTreeview = InstanceType<typeof VTreeview>
