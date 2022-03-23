// Composables
import { makeTagProps } from '@/composables/tag'

// Utilities
import { defineComponent } from '@/util'

export const VListItemIcon = defineComponent({
  name: 'VListItemIcon',

  props: {
    start: Boolean,
    end: Boolean,

    ...makeTagProps(),
  },

  setup (props, { slots }) {
    return () => {
      return (
        <props.tag
          class={[
            'v-list-item-icon',
            {
              'v-list-item-icon--start': props.start,
              'v-list-item-icon--end': props.end,
            },
          ]}
          v-slots={ slots }
        />
      )
    }
  },
})
