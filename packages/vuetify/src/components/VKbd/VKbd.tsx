// Styles
import './VKbd.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVKbdProps = propsFactory({
  color: String,

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeRoundedProps(),
  ...makeTagProps({ tag: 'kbd' }),
  ...makeThemeProps(),
  ...makeElevationProps(),
}, 'VKbd')

export const VKbd = genericComponent()({
  name: 'VKbd',

  props: makeVKbdProps(),

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { borderClasses } = useBorder(props)
    const { roundedClasses } = useRounded(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => props.color)
    const { elevationClasses } = useElevation(props)

    useRender(() => (
      <props.tag
        class={[
          'v-kbd',
          themeClasses.value,
          backgroundColorClasses.value,
          borderClasses.value,
          elevationClasses.value,
          roundedClasses.value,
          props.class,
        ]}
        style={[
          backgroundColorStyles.value,
          props.style,
        ]}
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VKbd = InstanceType<typeof VKbd>
