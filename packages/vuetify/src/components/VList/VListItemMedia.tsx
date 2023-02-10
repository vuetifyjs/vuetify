// Composables
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, useRender } from '@/util'

export const VListItemMedia = genericComponent()({
  name: 'VListItemMedia',

  props: {
    start: Boolean,
    end: Boolean,

    ...makeTagProps(),
  },

  setup (props, { slots }) {
    useRender(() => {
      return (
        <props.tag
          class={[
            'v-list-item-media',
            {
              'v-list-item-media--start': props.start,
              'v-list-item-media--end': props.end,
            },
          ]}
          v-slots={ slots }
        />
      )
    })

    return {}
  },
})

export type VListItemMedia = InstanceType<typeof VListItemMedia>
