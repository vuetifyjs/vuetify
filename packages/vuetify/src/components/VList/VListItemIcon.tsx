// Components
import { makeVIconProps, VIcon } from '@/components/VIcon/VIcon'

// Utilities
import { defineComponent } from '@/util'

export const VListItemIcon = defineComponent({
  name: 'VListItemIcon',

  props: makeVIconProps(),

  setup (props, { slots }) {
    return () => (
      <VIcon
        class={[
          'v-list-item-icon',
          {
            'v-list-item-icon--start': props.start,
            'v-list-item-icon--end': props.end,
          },
        ]}
        { ...props }
        v-slots={ slots }
      />
    )
  },
})
