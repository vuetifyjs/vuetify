// Styles
import './VBanner.sass'

// Components
import { VAvatar } from '@/components/VAvatar'
import { VBannerActions } from './VBannerActions'
import { VBannerText } from './VBannerText'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLocationProps, useLocation } from '@/composables/location'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { provideDefaults } from '@/composables/defaults'
import { useDisplay } from '@/composables/display'
import { IconValue } from '@/composables/icons'

// Utilities
import { genericComponent, useRender } from '@/util'
import { toRef } from 'vue'

// Types
import type { MakeSlots } from '@/util'
import type { PropType } from 'vue'

export type VBannerSlots = MakeSlots<{
  default: []
  prepend: []
  text: []
  actions: []
}>

export const VBanner = genericComponent<VBannerSlots>()({
  name: 'VBanner',

  props: {
    avatar: String,
    color: String,
    icon: IconValue,
    lines: String as PropType<'one' | 'two' | 'three'>,
    stacked: Boolean,
    sticky: Boolean,
    text: String,

    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeLocationProps(),
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
    const { locationStyles } = useLocation(props)
    const { positionClasses } = usePosition(props)
    const { roundedClasses } = useRounded(props)

    const { themeClasses } = provideTheme(props)

    const color = toRef(props, 'color')
    const density = toRef(props, 'density')

    provideDefaults({ VBannerActions: { color, density } })

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
            locationStyles.value,
          ]}
          role="banner"
        >
          { hasPrepend && (
            <VDefaultsProvider
              key="prepend"
              defaults={{
                VAvatar: {
                  color: color.value,
                  density: density.value,
                  icon: props.icon,
                  image: props.avatar,
                },
              }}
            >
              <div class="v-banner__prepend">
                { slots.prepend
                  ? slots.prepend()
                  : (props.avatar || props.icon) && (<VAvatar />)
                }
              </div>
            </VDefaultsProvider>
          )}

          <div class="v-banner__content">
            { hasText && (
              <VBannerText key="text">
                { slots.text ? slots.text() : props.text }
              </VBannerText>
            )}

            { slots.default?.() }
          </div>

          { slots.actions && (
            <VBannerActions>
              { slots.actions() }
            </VBannerActions>
          )}
        </props.tag>
      )
    })
  },
})

export type VBanner = InstanceType<typeof VBanner>
