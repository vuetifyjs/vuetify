// Composables
import { useNestedGroup } from '@/composables/nested'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { computed } from 'vue'
import { defineComponent } from '@/util'

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

    ...makeTagProps(),
  },

  setup (props, { slots }) {
    const { isOpen, open } = useNestedGroup(props)

    const onClick = (e: Event) => {
      open(!isOpen.value, e)
    }
    const appendIcon = computed(() => isOpen.value ? props.collapseIcon : props.expandIcon)

    return () => (
      <props.tag
        class={[
          'v-list-group',
        ]}
      >
        { slots.header?.({ onClick, appendIcon: appendIcon.value, class: 'v-list-group__header' }) }
        <div class="v-list-group__items" v-show={isOpen.value}>
          { slots.default?.() }
        </div>
      </props.tag>
    )
  },
})
