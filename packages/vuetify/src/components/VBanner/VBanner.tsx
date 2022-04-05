// Styles
import './VBanner.sass'

// Components
import { VExpandTransition } from '@/components/transitions'
import { VAvatar } from '@/components/VAvatar'
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
import { genericComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { MakeSlots } from '@/util'
import { useProxiedModel } from '@/composables/proxiedModel'

export const VBanner = genericComponent<new () => {
  $slots: MakeSlots<{
    actions: [{ dismiss: () => void }]
  }>
}>()({
  name: 'VBanner',

  props: {
    avatar: String,
    color: String,
    icon: String,
    lines: String as PropType<'one' | 'two' | 'three'>,
    sticky: Boolean,
    text: String,
    modelValue: {
      type: Boolean,
      default: true,
    },

    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
  },

  emits: {
    'update:modelValue': (val: boolean) => true,
  },

  setup (props, { slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { themeClasses } = provideTheme(props)
    const { borderClasses } = useBorder(props)
    const { densityClasses } = useDensity(props)
    const { dimensionStyles } = useDimension(props)
    const { mobile } = useDisplay()
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props)
    const { roundedClasses } = useRounded(props)

    useRender(() => {
      const hasAvatar = !!(props.avatar || props.icon || slots.avatar || slots.icon)
      const hasText = !!(props.text || slots.default)
      const hasContent = hasAvatar || hasText || slots.default

      return (
        <VExpandTransition>
          <props.tag
            class={[
              'v-banner',
              {
                'v-banner--mobile': mobile.value,
                'v-banner--sticky': props.sticky,
                [`v-banner--${props.lines}-line`]: true,
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
            v-show={ isActive.value }
          >
            { hasContent && (
              <div class="v-banner__content">
                { hasAvatar && (
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
                    <div class="v-banner__avatar">
                      { slots.avatar ? slots.avatar() : slots.icon ? slots.icon() : (<VAvatar />) }
                    </div>
                  </VDefaultsProvider>
                ) }

                { hasText && (
                  <div class="v-banner__text">
                    { slots.default ? slots.default() : props.text }
                  </div>
                ) }
              </div>
            ) }

            { slots.actions && (
              <VDefaultsProvider
                defaults={{
                  VBtn: {
                    color: props.color,
                    density: props.density,
                    variant: 'text',
                  },
                }}
              >
                <div class="v-banner__actions">
                  { slots.actions?.({ dismiss: () => isActive.value = false }) }
                </div>
              </VDefaultsProvider>
            ) }
          </props.tag>
        </VExpandTransition>
      )
    })
  },
})

export type VBanner = InstanceType<typeof VBanner>
