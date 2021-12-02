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
    title: String,
    sticky: Boolean,

    ...makeTagProps(),
  },

  setup (props, { slots }) {
    const { textColorClasses, textColorStyles } = useTextColor(toRef(props, 'color'))

    return () => (
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
        <div class="v-list-subheader__text">
          { slots.default?.() ?? props.title }
        </div>
      </props.tag>
    )
  },
})
