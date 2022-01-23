// Components
import { VExpandTransition } from '@/components/transitions'

// Composables
import { useList } from './list'
import { makeTagProps } from '@/composables/tag'
import { useNestedGroup } from '@/composables/nested/nested'

// Utilities
import { computed } from 'vue'
import { genericComponent } from '@/util'

// Types
import type { InternalListItem } from './VList'
import type { MakeSlots } from '@/util'

export type ListGroupHeaderSlot = {
  onClick: (e: Event) => void
  appendIcon: string
  class: string
}

export const VListGroup = genericComponent<new <T extends InternalListItem>() => {
  $props: {
    items?: T[]
  }
  $slots: MakeSlots<{
    header: [ListGroupHeaderSlot]
    items: []
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
      value: `${props.value}_header`,
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
          <VExpandTransition>
            <div class="v-list-group__items" v-show={isOpen.value}>
              { slots.items?.() }
            </div>
          </VExpandTransition>
        </props.tag>
      )
    }
  },
})
