// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVListItemSubtitleProps = propsFactory({
  opacity: [Number, String],

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'VListItemSubtitle')

export const VListItemSubtitle = genericComponent()({
  name: 'VListItemSubtitle',

  props: makeVListItemSubtitleProps(),

  setup (props, { slots }) {
    useRender(() => (
      <props.tag
        class={[
          'v-list-item-subtitle',
          props.class,
        ]}
        style={[
          { '--v-list-item-subtitle-opacity': props.opacity },
          props.style,
        ]}
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VListItemSubtitle = InstanceType<typeof VListItemSubtitle>
