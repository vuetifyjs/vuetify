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

export type VListGroupHeaderSlotProps = {
  onClick: (e: Event) => void
  appendIcon: string
  class: string
}

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

    const onClick = (e: Event) => {
      open(!isOpen.value, e)
    }

    const headerProps = computed(() => ({
      onClick,
      appendIcon: isOpen.value ? props.collapseIcon : props.expandIcon,
      class: 'v-list-group__header',
    }))

    return () => (
      <props.tag
        class={[
          'v-list-group',
        ]}
      >
        { slots.header?.(headerProps.value) }
        <VExpandTransition>
          <div class="v-list-group__items" v-show={isOpen.value}>
            { renderItems(props, slots) }
          </div>
        </VExpandTransition>
      </props.tag>
    )
  },
})
