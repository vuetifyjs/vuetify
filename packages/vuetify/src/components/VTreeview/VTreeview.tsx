// Components
import { makeVTreeviewChildrenProps, VTreeviewChildren } from './VTreeviewChildren'
import { makeVListProps, useListItems, VList } from '@/components/VList/VList'
import { VListItem } from '@/components/VList/VListItem'

// Composables
import { useLocale, useRtl } from '@/composables'
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

function asTreeitem (target: EventTarget | null): HTMLElement | null {
  return target instanceof HTMLElement && target.getAttribute('role') === 'treeitem'
    ? target
    : null
}

function isExpandable (el: HTMLElement) {
  return el.hasAttribute('aria-expanded')
}

function isExpanded (el: HTMLElement) {
  return el.getAttribute('aria-expanded') === 'true'
}

function toggleNode (el: HTMLElement) {
  el.querySelector<HTMLElement>('.v-treeview-item__toggle')?.click()
}

function focusFirstChild (el: HTMLElement) {
  const group = el.parentElement?.querySelector<HTMLElement>(':scope > .v-list-group__items')
  group?.querySelector<HTMLElement>('[role="treeitem"]')?.focus()
}

function focusParent (el: HTMLElement) {
  const group = el.closest('.v-list-group__items')
  group?.parentElement?.querySelector<HTMLElement>(':scope > [role="treeitem"]')?.focus()
}

function siblingNodes (el: HTMLElement): HTMLElement[] {
  const container = el.closest('.v-list-group__items') ?? el.closest('[role="tree"]')
  if (!container) return []
  return [...container.querySelectorAll<HTMLElement>(
    ':scope > [role="treeitem"], :scope > .v-list-group > [role="treeitem"]'
  )]
}

export const makeVTreeviewProps = propsFactory({
  openAll: Boolean,
  indentLines: [Boolean, String] as PropType<boolean | IndentLinesVariant>,
  indentLinesColor: String,
  indentLinesOpacity: [String, Number],
  search: String,
  hideNoData: Boolean,
  noDataText: {
    type: String,
    default: '$vuetify.noDataText',
  },

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

export const VTreeview = genericComponent<new <T, O, A, S, M>(
  props: {
    items?: T[]
    opened?: O
    activated?: A
    selected?: S
    modelValue?: M
    'onUpdate:opened'?: (value: O) => void
    'onUpdate:activated'?: (value: A) => void
    'onUpdate:selected'?: (value: S) => void
    'onUpdate:modelValue'?: (value: M) => void
  },
  slots: VTreeviewChildrenSlots<T> & {
    'no-data': never
  }
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
    const { t } = useLocale()
    const { isRtl } = useRtl()
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

    // VList owns ArrowUp/Down/Home/End and VListItem owns Enter/Space, so the tree
    // only adds the keys they ignore: ArrowLeft/Right and `*`.
    function onTreeKeydown (e: KeyboardEvent) {
      const item = asTreeitem(e.target)
      if (!item) return

      const expandKey = isRtl.value ? 'ArrowLeft' : 'ArrowRight'
      const collapseKey = isRtl.value ? 'ArrowRight' : 'ArrowLeft'

      if (e.key === expandKey) {
        e.preventDefault()
        if (isExpandable(item) && !isExpanded(item)) {
          toggleNode(item)
        } else if (isExpanded(item)) {
          focusFirstChild(item)
        }
      } else if (e.key === collapseKey) {
        e.preventDefault()
        if (isExpandable(item) && isExpanded(item)) {
          toggleNode(item)
        } else {
          focusParent(item)
        }
      } else if (e.key === '*') {
        e.preventDefault()
        for (const sibling of siblingNodes(item)) {
          if (isExpandable(sibling) && !isExpanded(sibling)) {
            toggleNode(sibling)
          }
        }
      }
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
          class={[
            'v-treeview',
            {
              'v-treeview--fluid': props.fluid,
            },
            props.class,
          ]}
          role="tree"
          openStrategy="multiple"
          onKeydown={ onTreeKeydown }
          style={[
            {
              '--v-treeview-indent-line-color': props.indentLinesColor,
              '--v-treeview-indent-line-opacity': props.indentLinesOpacity,
            },
            props.style,
          ]}
          opened={ opened.value }
          v-model:activated={ activated.value }
          v-model:selected={ selected.value }
        >
          { visibleIds.value?.size === 0 && !props.hideNoData && (
            slots['no-data']?.() ?? (<VListItem key="no-data" title={ t(props.noDataText) } />)
          )}
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
