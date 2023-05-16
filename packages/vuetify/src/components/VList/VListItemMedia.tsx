// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVListItemMediaProps = propsFactory({
  start: Boolean,
  end: Boolean,

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'v-list-item-media')

export const VListItemMedia = genericComponent()({
  name: 'VListItemMedia',

  props: makeVListItemMediaProps(),

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
            props.class,
          ]}
          style={ props.style }
          v-slots={ slots }
        />
      )
    })

    return {}
  },
})

export type VListItemMedia = InstanceType<typeof VListItemMedia>
