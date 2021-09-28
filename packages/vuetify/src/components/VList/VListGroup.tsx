// Components
import { VExpandTransition } from '..'

// Composables
import { useNestedGroup } from '@/composables/nested/nested'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { computed } from 'vue'
import { defineComponent } from '@/util'
import { renderItems } from './utils'

// Types
import type { Prop } from 'vue'
import type { ListItem } from './utils'
import { createList, useDepth, useList } from './VList'

export type VListGroupHeaderSlotProps = {
  onClick: (e: Event) => void
  appendIcon: string
  class: string
}

const VListGroupItems = defineComponent({
  name: 'VListGroupItems',

  props: {
    open: Boolean,
    items: Array as Prop<ListItem[]>,
  },

  setup (props, { slots }) {
    createList()
    const depth = useDepth()

    return () => {
      return (
        <VExpandTransition>
          <div class="v-list-group__items" style={{ '--v-list-depth': depth }} v-show={props.open}>
            { renderItems(props, slots) }
          </div>
        </VExpandTransition>
      )
    }
  },
})

export default defineComponent({
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
    items: Array as Prop<ListItem[]>,

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
