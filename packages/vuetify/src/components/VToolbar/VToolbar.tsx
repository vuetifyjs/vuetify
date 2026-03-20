// Styles
import './VToolbar.sass'

// Components
import { VToolbarTitle } from './VToolbarTitle'
import { VExpandTransition } from '@/components/transitions'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VImg } from '@/components/VImg'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { useRtl } from '@/composables/locale'
import { makeLocationProps, useLocation } from '@/composables/location'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, shallowRef } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

const allowedDensities = [null, 'prominent', 'default', 'comfortable', 'compact'] as const

export type Density = null | 'prominent' | 'default' | 'comfortable' | 'compact'

export const makeVToolbarProps = propsFactory({
  absolute: Boolean,
  collapse: Boolean,
  collapsePosition: {
    type: String as PropType<'start' | 'end'>,
    default: 'start',
  },
  color: String,
  density: {
    type: String as PropType<Density>,
    default: 'default',
    validator: (v: any) => allowedDensities.includes(v),
  },
  extended: {
    type: Boolean,
    default: null,
  },
  extensionHeight: {
    type: [Number, String],
    default: 48,
  },
  flat: Boolean,
  floating: Boolean,
  height: {
    type: [Number, String],
    default: 64,
  },
  image: String,
  title: String,

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makeRoundedProps(),
  ...makeTagProps({ tag: 'header' }),
  ...makeThemeProps(),
}, 'VToolbar')

export function calculateHeight (height: number | string, density: Density, forExtensionHeight: boolean) {
  return parseInt((
    Number(height) +
    (density === 'prominent' ? Number(height) : 0) -
    (density === 'comfortable' ? forExtensionHeight ? 4 : 8 : 0) -
    (density === 'compact' ? forExtensionHeight ? 8 : 16 : 0)
  ), 10)
}

export type VToolbarSlots = {
  default: never
  image: never
  prepend: never
  append: never
  title: never
  extension: never
}

export const VToolbar = genericComponent<VToolbarSlots>()({
  name: 'VToolbar',

  props: makeVToolbarProps(),

  setup (props, { slots }) {
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => props.color)
    const { borderClasses } = useBorder(props)
    const { elevationClasses } = useElevation(props)
    const { locationStyles } = useLocation(props)
    const { roundedClasses } = useRounded(props)
    const { themeClasses } = provideTheme(props)
    const { rtlClasses } = useRtl()

    const isExtended = shallowRef(props.extended === null ? !!(slots.extension?.()) : props.extended)
    const contentHeight = computed(() => calculateHeight(
      props.height,
      props.density,
      false,
    ))
    const extensionHeight = computed(() => isExtended.value
      ? calculateHeight(props.extensionHeight, props.density, true)
      : 0
    )

    provideDefaults({
      VBtn: {
        variant: 'text',
      },
    })

    useRender(() => {
      const hasTitle = !!(props.title || slots.title)
      const hasImage = !!(slots.image || props.image)

      const extension = slots.extension?.()
      isExtended.value = props.extended === null ? !!extension : props.extended

      return (
        <props.tag
          class={[
            'v-toolbar',
            `v-toolbar--collapse-${props.collapsePosition}`,
            {
              'v-toolbar--absolute': props.absolute,
              'v-toolbar--collapse': props.collapse,
              'v-toolbar--flat': props.flat,
              'v-toolbar--floating': props.floating,
              [`v-toolbar--density-${props.density}`]: true,
            },
            backgroundColorClasses.value,
            borderClasses.value,
            elevationClasses.value,
            roundedClasses.value,
            themeClasses.value,
            rtlClasses.value,
            props.class,
          ]}
          style={[
            backgroundColorStyles.value,
            locationStyles.value,
            props.style,
          ]}
        >
          { hasImage && (
            <div key="image" class="v-toolbar__image">
              { !slots.image ? (
                <VImg
                  key="image-img"
                  cover
                  src={ props.image }
                />
              ) : (
                <VDefaultsProvider
                  key="image-defaults"
                  disabled={ !props.image }
                  defaults={{
                    VImg: {
                      cover: true,
                      src: props.image,
                    },
                  }}
                  v-slots:default={ slots.image }
                />
              )}
            </div>
          )}

          <VDefaultsProvider
            defaults={{
              VTabs: {
                height: convertToUnit(contentHeight.value),
              },
            }}
          >
            <div
              class="v-toolbar__content"
              style={{ height: convertToUnit(contentHeight.value) }}
            >
              { slots.prepend && (
                <div class="v-toolbar__prepend">
                  { slots.prepend?.() }
                </div>
              )}

              { hasTitle && (
                <VToolbarTitle key="title" text={ props.title }>
                  {{ text: slots.title }}
                </VToolbarTitle>
              )}

              { slots.default?.() }

              { slots.append && (
                <div class="v-toolbar__append">
                  { slots.append?.() }
                </div>
              )}
            </div>
          </VDefaultsProvider>

          <VDefaultsProvider
            defaults={{
              VTabs: {
                height: convertToUnit(extensionHeight.value),
              },
            }}
          >
            <VExpandTransition>
              { isExtended.value && (
                <div
                  class="v-toolbar__extension"
                  style={{ height: convertToUnit(extensionHeight.value) }}
                >
                  { extension }
                </div>
              )}
            </VExpandTransition>
          </VDefaultsProvider>
        </props.tag>
      )
    })

    return {
      contentHeight,
      extensionHeight,
    }
  },
})

export type VToolbar = InstanceType<typeof VToolbar>
