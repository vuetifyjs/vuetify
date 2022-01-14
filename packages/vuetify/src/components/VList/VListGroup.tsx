// Components
import { VExpandTransition } from '@/components/transitions'
import { VListChildren } from './VListChildren'

// Composables
import { createList, useList } from './list'
import { makeTagProps } from '@/composables/tag'
import { useNestedGroup } from '@/composables/nested/nested'

// Utilities
import { computed } from 'vue'
import { defineComponent, genericComponent } from '@/util'

// Types
import type { InternalListItem } from './VList'
import type { MakeSlots } from '@/util'
import type { Prop } from 'vue'

export type ListGroupHeaderSlot = {
  onClick: (e: Event) => void
  appendIcon: string
  class: string
}

const VListGroupItems = defineComponent({
  name: 'VListGroupItems',

  props: {
    open: Boolean,
    items: Array as Prop<InternalListItem[]>,
  },

  setup (props, { slots }) {
    createList()

    return () => {
      return (
        <VExpandTransition>
          <div class="v-list-group__items" v-show={props.open}>
            <VListChildren items={props.items} v-slots={slots} />
          </div>
        </VExpandTransition>
      )
    }
  },
})

export const VListGroup = genericComponent<new <T extends InternalListItem>() => {
  $props: {
    items?: T[]
  }
  $slots: MakeSlots<{
    header: [ListGroupHeaderSlot]
    item: [T]
    default: []
  }>
}>()({
  name: 'VListGroup',

  props: {
    value: null,
    collapseIcon: {
      type: String,
      default: '$collapse',
    },
    expandIcon: {
      type: String,
      default: '$expand',
    },
    items: Array as Prop<InternalListItem[]>,

    ...makeTagProps(),
  },

  setup (props, { slots }) {
    const { isOpen, open } = useNestedGroup(props)
    const list = useList()

    const onClick = (e: Event) => {
      open(!isOpen.value, e)
    }

    const headerProps = computed(() => ({
      onClick,
      appendIcon: isOpen.value ? props.collapseIcon : props.expandIcon,
      class: 'v-list-group__header',
    }))

    return () => {
      return (
        <props.tag
          class={[
            'v-list-group',
            {
              'v-list-group--prepend': list?.hasPrepend.value,
            },
          ]}
        >
          { slots.header?.(headerProps.value) }
          <VListGroupItems items={props.items} open={isOpen.value} v-slots={slots} />
        </props.tag>
      )
    }
  },
})
