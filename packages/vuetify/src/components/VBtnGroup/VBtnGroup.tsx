import './VBtnGroup.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { useColor } from '@/composables/color'

// Utility
import { computed } from 'vue'
import { defineComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

const allowedVariants = ['text', 'contained'] as const

type Variant = typeof allowedVariants[number]

export const VBtnGroup = defineComponent({
  name: 'VBtnGroup',

  props: {
    color: String,
    divided: Boolean,
    variant: {
      type: String as PropType<Variant>,
      default: 'contained',
      validator: (v: any) => allowedVariants.includes(v),
    },

    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)
    const { densityClasses } = useDensity(props, 'v-btn-group')
    const { borderClasses } = useBorder(props, 'v-btn-group')
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props, 'v-btn-group')

    const { colorClasses, colorStyles } = useColor(computed(() => {
      return {
        [props.variant === 'contained' ? 'background' : 'text']: props.color,
      }
    }))

    useRender(() => (
      <props.tag
        class={[
          'v-btn-group',
          {
            [`v-btn-group--variant-${props.variant}`]: true,
            'v-btn-group--divided': props.divided,
          },
          themeClasses.value,
          borderClasses.value,
          colorClasses.value,
          densityClasses.value,
          elevationClasses.value,
          roundedClasses.value,
        ]}
        style={ colorStyles.value }
        v-slots={ slots }
      />
    ))
  },
})
