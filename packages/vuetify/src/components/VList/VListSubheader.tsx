// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, propsFactory, renderSlot, useRender } from '@/util'

export const makeVListSubheaderProps = propsFactory({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'VListSubheader')

export const VListSubheader = genericComponent()({
  name: 'VListSubheader',

  props: makeVListSubheaderProps(),

  setup (props, { slots }) {
    const { textColorClasses, textColorStyles } = useTextColor(() => props.color)

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
            props.class,
          ]}
          style={[
            { textColorStyles },
            props.style,
          ]}
        >
          { hasText ? (
            <div class="v-list-subheader__text">
              { renderSlot(slots.default, undefined, () => props.title) }
            </div>
          ) : undefined }
        </props.tag>
      )
    })

    return {}
  },
})

export type VListSubheader = InstanceType<typeof VListSubheader>
