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
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useDisplay } from '@/composables/display'

// Utilities
import { defineComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import { computed, toRef } from 'vue'
import { provideDefaults } from '@/composables/defaults'

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
    const { themeClasses } = provideTheme(props)
    const { borderClasses } = useBorder(props)
    const { densityClasses } = useDensity(props)
    const { dimensionStyles } = useDimension(props)
    const { mobile } = useDisplay()
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props)
    const { roundedClasses } = useRounded(props)
    const lineClasses = computed(() => props.lines ? `v-banner--${props.lines}-line` : undefined)

    provideDefaults({
      VBannerActions: {
        color: toRef(props, 'color'),
        density: toRef(props, 'density'),
      },
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
            },
            borderClasses.value,
            densityClasses.value,
            elevationClasses.value,
            lineClasses.value,
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
            <VDefaultsProvider
              defaults={{
                VAvatar: {
                  color: props.color,
                  density: props.density,
                  icon: props.icon,
                  image: props.avatar,
                },
              }}
            >
              <div class="v-banner__prepend">
                { slots.prepend ? slots.prepend() : (<VAvatar />) }
              </div>
            </VDefaultsProvider>
          ) }

          { hasText && (
            <VBannerText>
              { slots.text ? slots.text() : props.text }
            </VBannerText>
          ) }

          { slots.default?.() }

          { slots.actions && (
            <VBannerActions v-slots={{ default: slots.actions }} />
          ) }
        </props.tag>
      )
    })
  },
})

export type VBanner = InstanceType<typeof VBanner>
