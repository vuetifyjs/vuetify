// Styles
import './VBanner.sass'

// Components
import { VAvatar } from '@/components/VAvatar'
import { VBannerActions } from './VBannerActions'
import { VBannerText } from './VBannerText'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { IconValue } from '@/composables/icons'
import { makeComponentProps } from '@/composables/component'
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

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'
import { toRef } from 'vue'

// Types
import type { PropType } from 'vue'

export type VBannerSlots = {
  default: []
  prepend: []
  text: []
  actions: []
}

export const makeVBannerProps = propsFactory({
  avatar: String,
  color: String,
  icon: IconValue,
  lines: String as PropType<'one' | 'two' | 'three'>,
  stacked: Boolean,
  sticky: Boolean,
  text: String,

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'v-banner')

export const VBanner = genericComponent<VBannerSlots>()({
  name: 'VBanner',

  props: makeVBannerProps(),

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
      const hasPrependMedia = !!(props.avatar || props.icon)
      const hasPrepend = !!(hasPrependMedia || slots.prepend)

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
            props.class,
          ]}
          style={[
            dimensionStyles.value,
            locationStyles.value,
            props.style,
          ]}
          role="banner"
        >
          { hasPrepend && (
            <div key="prepend" class="v-banner__prepend">
              { !slots.prepend ? (
                <VAvatar
                  key="prepend-avatar"
                  color={ color.value }
                  density={ density.value }
                  icon={ props.icon }
                  image={ props.avatar }
                />
              ) : (
                <VDefaultsProvider
                  key="prepend-defaults"
                  disabled={ !hasPrependMedia }
                  defaults={{
                    VAvatar: {
                      color: color.value,
                      density: density.value,
                      icon: props.icon,
                      image: props.avatar,
                    },
                  }}
                  v-slots:default={ slots.prepend }
                />
              )}
            </div>
          )}

          <div class="v-banner__content">
            { hasText && (
              <VBannerText key="text">
                { slots.text?.() ?? props.text }
              </VBannerText>
            )}

            { slots.default?.() }
          </div>

          { slots.actions && (
            <VBannerActions key="actions" v-slots:default={ slots.actions } />
          )}
        </props.tag>
      )
    })
  },
})

export type VBanner = InstanceType<typeof VBanner>
