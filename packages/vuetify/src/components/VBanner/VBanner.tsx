// Styles
import './VBanner.sass'

// Components
import { VBannerActions } from './VBannerActions'
import { VBannerAvatar } from './VBannerAvatar'
import { VBannerIcon } from './VBannerIcon'
import { VBannerText } from './VBannerText'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { provideDefaults } from '@/composables/defaults'
import { useDisplay } from '@/composables/display'

// Utilities
import { defineComponent, useRender } from '@/util'
import { toRef } from 'vue'

// Types
import type { PropType } from 'vue'

export const VBanner = defineComponent({
  name: 'VBanner',

  props: {
    avatar: String,
    color: String,
    icon: String,
    lines: String as PropType<'one' | 'two' | 'three'>,
    stacked: Boolean,
    sticky: Boolean,
    text: String,

    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    const { borderClasses } = useBorder(props)
    const { densityClasses } = useDensity(props)
    const { mobile } = useDisplay()
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props)
    const { roundedClasses } = useRounded(props)

    const { themeClasses } = provideTheme(props)

    const color = toRef(props, 'color')
    const density = toRef(props, 'density')

    provideDefaults({
      VBannerActions: { color, density },
      VBannerAvatar: { density, image: toRef(props, 'avatar') },
      VBannerIcon: { color, density, icon: toRef(props, 'icon') },
    })

    useRender(() => {
      const hasText = !!(props.text || slots.text)
      const hasPrepend = !!(slots.prepend || props.avatar || props.icon)

      return (
        <props.tag
          class={[
            'v-banner',
            {
              'v-banner--stacked': props.stacked || mobile.value,
              'v-banner--sticky': props.sticky,
              [`v-banner--${props.lines}-line`]: !!props.lines,
            },
            borderClasses.value,
            densityClasses.value,
            elevationClasses.value,
            positionClasses.value,
            roundedClasses.value,
            themeClasses.value,
          ]}
          style={[
            dimensionStyles.value,
            positionStyles.value,
          ]}
          role="banner"
        >
          { hasPrepend && (
            <>
              { slots.prepend
                ? (
                  <div class="v-banner__prepend">
                    { slots.prepend() }
                  </div>
                )
                : props.avatar ? (<VBannerAvatar />)
                : props.icon ? (<VBannerIcon />)
                : undefined
              }
            </>
          ) }

          { hasText && (
            <VBannerText>
              { slots.text ? slots.text() : props.text }
            </VBannerText>
          ) }

          { slots.default?.() }

          { slots.actions && (
            <VBannerActions>
              { slots.actions() }
            </VBannerActions>
          ) }
        </props.tag>
      )
    })
  },
})

export type VBanner = InstanceType<typeof VBanner>
