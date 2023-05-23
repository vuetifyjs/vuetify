// Styles
import './VBtnGroup.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'

// Utilities
import { toRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVBtnGroupProps = propsFactory({
  divided: Boolean,

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps(),
}, 'v-btn-group')

export const VBtnGroup = genericComponent()({
  name: 'VBtnGroup',

  props: makeVBtnGroupProps(),

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { densityClasses } = useDensity(props)
    const { borderClasses } = useBorder(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)

    provideDefaults({
      VBtn: {
        height: 'auto',
        color: toRef(props, 'color'),
        density: toRef(props, 'density'),
        flat: true,
        variant: toRef(props, 'variant'),
      },
    })

    useRender(() => {
      return (
        <props.tag
          class={[
            'v-btn-group',
            {
              'v-btn-group--divided': props.divided,
            },
            themeClasses.value,
            borderClasses.value,
            densityClasses.value,
            elevationClasses.value,
            roundedClasses.value,
            props.class,
          ]}
          style={ props.style }
          v-slots={ slots }
        />
      )
    })
  },
})

export type VBtnGroup = InstanceType<typeof VBtnGroup>
