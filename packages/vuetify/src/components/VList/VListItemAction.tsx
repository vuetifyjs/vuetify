// Composables
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, useRender } from '@/util'

export const VListItemAction = genericComponent()({
  name: 'VListItemAction',

  props: {
    start: Boolean,
    end: Boolean,

    ...makeTagProps(),
  },

  setup (props, { slots }) {
    useRender(() => (
      <props.tag
        class={[
          'v-list-item-action',
          {
            'v-list-item-action--start': props.start,
            'v-list-item-action--end': props.end,
          },
        ]}
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VListItemAction = InstanceType<typeof VListItemAction>
