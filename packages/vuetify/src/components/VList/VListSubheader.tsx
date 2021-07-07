// Composables
import { makeTagProps } from '@/composables/tag'
import { useTextColor } from '@/composables/color'

// Utilities
import { toRef } from 'vue'
import { defineComponent } from '@/util'

export default defineComponent({
  name: 'VListSubheader',

  props: {
    color: String,
    inset: Boolean,

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
          },
          textColorClasses.value,
        ]}
        style={{ textColorStyles }}
      >
        { slots.default && (
          <div class="v-list-subheader__text">
            { slots.default() }
          </div>
        ) }
      </props.tag>
    )
  },
})
