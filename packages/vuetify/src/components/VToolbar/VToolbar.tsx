// Styles
import './VToolbar.sass'

// Components
import { VImg } from '@/components/VImg'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { provideDefaults } from '@/composables/defaults'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { computed, toRef } from 'vue'
import { convertToUnit, defineComponent } from '@/util'

// Types
import type { PropType } from 'vue'

export type Density = typeof allowedDensities[number]

const allowedDensities = [null, 'prominent', 'default', 'comfortable', 'compact'] as const

export const VToolbar = defineComponent({
  name: 'VToolbar',

  props: {
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
    position: {
      type: String as PropType<'top' | 'bottom'>,
      default: 'top',
      validator: (value: any) => ['top', 'bottom'].includes(value),
    },

    ...makeBorderProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeTagProps({ tag: 'header' }),
  },

  setup (props, { slots }) {
    const { borderClasses } = useBorder(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const contentHeight = computed(() => (
      Number(props.height) +
      (props.density === 'prominent' ? Number(props.height) : 0) -
      (props.density === 'comfortable' ? 8 : 0) -
      (props.density === 'compact' ? 16 : 0)
    ))

    provideDefaults({
      VBtn: {
        flat: true,
      },
    }, { scoped: true })

    return () => {
      const hasContent = !!(slots.prepend || slots.default || slots.append)
      const hasImage = !!(slots.image || props.image)
      const isExtended = !!(props.extended || slots.extension)

      return (
        <props.tag
          class={[
            'v-toolbar',
            {
              'v-toolbar--absolute': props.absolute,
              'v-toolbar--bottom': props.position === 'bottom',
              'v-toolbar--collapse': props.collapse,
              'v-toolbar--flat': props.flat,
              'v-toolbar--floating': props.floating,
              [`v-toolbar--density-${props.density}`]: true,
            },
            backgroundColorClasses.value,
            borderClasses.value,
            elevationClasses.value,
            roundedClasses.value,
          ]}
          style={[
            backgroundColorStyles.value,
          ]}
        >
          { hasImage && (
            <div class="v-toolbar__image">
              { slots.image
                ? slots.img?.({ src: props.image })
                : (<VImg src={ props.image } cover />)
              }
            </div>
          ) }

          { hasContent && (
            <div
              class="v-toolbar__content"
              style={{ height: convertToUnit(contentHeight.value) }}
            >
              { slots.prepend && (
                <div class="v-toolbar__prepend">
                  { slots.prepend?.() }
                </div>
              ) }

              { slots.default?.() }

              { slots.append && (
                <div class="v-toolbar__append">
                  { slots.append?.() }
                </div>
              ) }
            </div>
          ) }

          { isExtended && (
            <div
              class="v-toolbar__extension"
              style={{ height: convertToUnit(props.extensionHeight) }}
            >
              { slots.extension?.() }
            </div>
          ) }
        </props.tag>
      )
    }
  },
})

export type VToolbar = InstanceType<typeof VToolbar>
