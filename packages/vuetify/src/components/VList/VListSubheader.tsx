// Composables
import { makeTagProps } from '@/composables/tag'
import { useTextColor } from '@/composables/color'

// Utilities
import { toRef } from 'vue'
import { genericComponent, useRender } from '@/util'

export const VListSubheader = genericComponent()({
  name: 'VListSubheader',

  props: {
    color: String,
    inset: Boolean,
    sticky: Boolean,
    title: String,

    ...makeTagProps(),
  },

  setup (props, { slots }) {
    const { textColorClasses, textColorStyles } = useTextColor(toRef(props, 'color'))

    useRender(() => {
      const hasText = !!(slots.default || props.title)

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
              { slots.default?.() ?? props.title }
            </div>
          )}
        </props.tag>
      )
    })

    return {}
  },
})

export type VListSubheader = InstanceType<typeof VListSubheader>
