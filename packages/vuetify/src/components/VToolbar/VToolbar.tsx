// Styles
import './VToolbar.sass'

// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VExpandTransition } from '@/components/transitions'
import { VImg } from '@/components/VImg'
import { VToolbarTitle } from './VToolbarTitle'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { provideDefaults } from '@/composables/defaults'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { computed, ref, toRef } from 'vue'
import { convertToUnit, genericComponent, pick, propsFactory, useRender } from '@/util'

// Types
import type { ExtractPropTypes, PropType } from 'vue'
import type { MakeSlots } from '@/util'

const allowedDensities = [null, 'prominent', 'default', 'comfortable', 'compact'] as const

export type Density = null | 'prominent' | 'default' | 'comfortable' | 'compact'

export const makeVToolbarProps = propsFactory({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String as PropType<Density>,
    default: 'default',
    validator: (v: any) => allowedDensities.includes(v),
  },
  extended: Boolean,
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
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps({ tag: 'header' }),
  ...makeThemeProps(),
}, 'v-toolbar')

export type VToolbarSlots = MakeSlots<{
  default: []
  image: []
  prepend: []
  append: []
  title: []
  extension: []
}>

export const VToolbar = genericComponent<VToolbarSlots>()({
  name: 'VToolbar',

  props: makeVToolbarProps(),

  setup (props, { slots }) {
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { borderClasses } = useBorder(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)
    const { themeClasses } = provideTheme(props)

    const isExtended = ref(!!(props.extended || slots.extension?.()))
    const contentHeight = computed(() => parseInt((
      Number(props.height) +
      (props.density === 'prominent' ? Number(props.height) : 0) -
      (props.density === 'comfortable' ? 8 : 0) -
      (props.density === 'compact' ? 16 : 0)
    ), 10))
    const extensionHeight = computed(() => isExtended.value
      ? parseInt((
        Number(props.extensionHeight) +
        (props.density === 'prominent' ? Number(props.extensionHeight) : 0) -
        (props.density === 'comfortable' ? 4 : 0) -
        (props.density === 'compact' ? 8 : 0)
      ), 10)
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
      isExtended.value = !!(props.extended || extension)

      return (
        <props.tag
          class={[
            'v-toolbar',
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
          ]}
          style={[
            backgroundColorStyles.value,
          ]}
        >
          { hasImage && (
            <div key="image" class="v-toolbar__image">
              <VDefaultsProvider
                defaults={{
                  VImg: {
                    cover: true,
                    src: props.image,
                  },
                }}
              >
                { slots.image ? slots.image?.() : (<VImg />) }
              </VDefaultsProvider>
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

export function filterToolbarProps (props: ExtractPropTypes<ReturnType<typeof makeVToolbarProps>>) {
  return pick(props, Object.keys(VToolbar?.props ?? {}) as any)
}
