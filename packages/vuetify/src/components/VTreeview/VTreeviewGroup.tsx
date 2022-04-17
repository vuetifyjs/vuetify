// Components
// import { VExpandTransition } from '@/components/transitions'

// Composables
// import { useList } from './list'
import { makeTagProps } from '@/composables/tag'
import { useNestedGroupActivator, useNestedItem } from '@/composables/nested/nested'

// Utilities
import { computed, defineComponent, inject, ref, toRef } from 'vue'
import { genericComponent } from '@/util'
import { VTreeviewSymbol } from './shared'

// Types
import type { Ref } from 'vue'
import type { MakeSlots } from '@/util'
import type { InternalTreeviewItem } from './shared'

export type TreeviewGroupActivatorSlot = {
  props: {
    collapseIcon: string
    expandIcon: string
    class: string
    value: any
    hideExpand: boolean | undefined
  }
}

const VTreeviewGroupActivator = defineComponent({
  name: 'VTreeviewGroupActivator',

  setup (_, { slots }) {
    useNestedGroupActivator()

    return () => slots.default?.()
  },
})

export const VTreeviewGroup = genericComponent<new <T extends InternalTreeviewItem>() => {
  $props: {
    items?: T[]
  }
  $slots: MakeSlots<{
    activator: [TreeviewGroupActivatorSlot]
    default: []
  }>
}>()({
  name: 'VTreeviewGroup',

  props: {
    collapseIcon: {
      type: String,
      default: '$treeviewCollapse',
    },
    expandIcon: {
      type: String,
      default: '$treeviewExpand',
    },
    value: {
      type: null,
      default: undefined,
    },
    hideExpand: Boolean,
    openOnClick: Boolean,
    showLines: Boolean,

    ...makeTagProps(),
  },

  setup (props, { slots }) {
    const { isOpen, id } = useNestedItem(toRef(props, 'value'), true)
    const { visibleIds } = inject(VTreeviewSymbol, { visibleIds: ref(new Set()) })

    const activatorProps: Ref<TreeviewGroupActivatorSlot['props']> = computed(() => ({
      collapseIcon: props.collapseIcon,
      expandIcon: props.expandIcon,
      class: 'v-treeview-group__header',
      value: id.value,
      hideExpand: props.hideExpand,
    }))

    return () => {
      return (
        <props.tag
          class={[
            'v-treeview-group',
            {
              'v-treeview-group--filtered': !visibleIds.value.has(id.value),
            },
          ]}
        >
          <VTreeviewGroupActivator>
            { slots.activator?.({ props: activatorProps.value }) }
          </VTreeviewGroupActivator>
          <div class="v-treeview-group__items" v-show={ isOpen.value }>
            { props.showLines && (
              <div class="v-treeview-group__line"></div>
            ) }
            { slots.default?.() }
          </div>
        </props.tag>
      )
    }
  },
})
