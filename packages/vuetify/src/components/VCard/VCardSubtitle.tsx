// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVCardSubtitleProps = propsFactory({
  opacity: [Number, String],

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'VCardSubtitle')

export const VCardSubtitle = genericComponent()({
  name: 'VCardSubtitle',

  props: makeVCardSubtitleProps(),

  setup (props, { slots }) {
    useRender(() => (
      <props.tag
        class={[
          'v-card-subtitle',
          props.class,
        ]}
        style={[
          { '--v-card-subtitle-opacity': props.opacity },
          props.style,
        ]}
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VCardSubtitle = InstanceType<typeof VCardSubtitle>
