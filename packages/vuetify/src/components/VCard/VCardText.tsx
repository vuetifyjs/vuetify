// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVCardTextProps = propsFactory({
  opacity: [Number, String],

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'VCardText')

export const VCardText = genericComponent()({
  name: 'VCardText',

  props: makeVCardTextProps(),

  setup (props, { slots }) {
    useRender(() => (
      <props.tag
        class={[
          'v-card-text',
          props.class,
        ]}
        style={[
          { '--v-card-text-opacity': props.opacity },
          props.style,
        ]}
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VCardText = InstanceType<typeof VCardText>
