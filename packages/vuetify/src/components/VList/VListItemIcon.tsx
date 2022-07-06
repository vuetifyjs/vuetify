// Components
import { makeVIconProps, VIcon } from '@/components/VIcon/VIcon'

// Utilities
import { defineComponent, useRender } from '@/util'

export const VListItemIcon = defineComponent({
  name: 'VListItemIcon',

  props: makeVIconProps(),

  setup (props, { slots }) {
    useRender(() => (
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
    ))

    return {}
  },
})
