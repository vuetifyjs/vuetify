// Composables
import { makeTagProps } from '@/composables/tag'
import { useTextColor } from '@/composables/color'

// Utilities
import { toRef } from 'vue'
import { defineComponent } from '@/util'

export const VListSubheader = defineComponent({
  name: 'VListSubheader',

  props: {
    color: String,
    inset: Boolean,
    sticky: Boolean,
    text: String,

    ...makeTagProps(),
  },

  setup (props, { slots }) {
    const { textColorClasses, textColorStyles } = useTextColor(toRef(props, 'color'))

    return () => {
      const hasText = !!(slots.default || props.text)

      return (
        <props.tag
          class={[
            'v-list-subheader',
            {
              'v-list-subheader--inset': props.inset,
              'v-list-subheader--sticky': props.sticky,
            },
            textColorClasses.value,
          ]}
          style={{ textColorStyles }}
        >
          { hasText && (
            <div class="v-list-subheader__text">
              { slots.default?.() ?? props.text }
            </div>
          ) }
        </props.tag>
      )
    }
  },
})
