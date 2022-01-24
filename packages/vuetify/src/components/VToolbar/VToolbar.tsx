// @TODO update local import paths

// Styles
import './VToolbar.sass'

// Components
import { VImg, srcObject } from '../VImg/VImg'

// Composables
import { makeBorderProps, useBorder } from '../../composables/border'
import { makeDensityProps, useDensity } from '../../composables/density'
import { makeElevationProps, useElevation } from '../../composables/elevation'
import { makeLayoutItemProps, useLayoutItem } from '../../composables/layout'
import { makeRoundedProps, useRounded } from '../../composables/rounded'
import { makeTagProps } from '../../composables/tag'
import { useBackgroundColor } from '../../composables/color'
import { useProxiedModel } from '../../composables/proxiedModel'

// Types
import type { PropType } from 'vue'

// Utilities
import { computed, toRef } from 'vue'
import { convertToUnit, defineComponent } from '../../util'

export const VToolbar = defineComponent({
  name: 'VToolbar',

  props: {
    collapse: Boolean,
    color: String,
    extended: Boolean,
    extensionHeight: {
      type: [Number, String],
      default: 48
    },
    flat: Boolean,
    floating: Boolean,
    height: {
      type: [Number, String],
      default: 64,
    },
    modelValue: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String as PropType<'top' | 'bottom'>,
      default: 'top',
      validator: (value: any) => ['top', 'bottom'].includes(value),
    },
    prominent: Boolean,
    prominentHeight: {
      type: [Number, String],
      default: 128,
    },
    short: Boolean,
    src: {
      type: [String, Object] as PropType<string | srcObject>,
      default: '',
    },

    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeLayoutItemProps(),
    ...makeRoundedProps(),
    ...makeTagProps({ tag: 'header' }),
  },

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const { borderClasses } = useBorder(props)
    const { densityClasses } = useDensity(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const isExtended = !!slots.extension
    const contentHeight = computed(() => (
      Number(props.prominent ? props.prominentHeight : props.height) -
      (props.density === 'comfortable' ? 8 : 0) -
      (props.density === 'compact' ? 16 : 0)
    ))
    const height = computed(() => (
      contentHeight.value +
      Number(isExtended ? props.extensionHeight : 0)
    ))
    const isActive = useProxiedModel(props, 'modelValue', props.modelValue)
    const layoutStyles = useLayoutItem(
      props.name,
      computed(() => parseInt(props.priority, 10)),
      toRef(props, 'position'),
      height,
      height,
      isActive,
    )

    return () => {
      const hasImage = !!(slots.image || props.src)

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
              'v-toolbar--is-active': isActive.value,
              'v-toolbar--prominent': props.prominent,
            },
            backgroundColorClasses.value,
            borderClasses.value,
            densityClasses.value,
            elevationClasses.value,
            roundedClasses.value,
          ]}
          style={[
            backgroundColorStyles.value,
            layoutStyles.value,
          ]}
        >
          { hasImage && (
            <div class="v-toolbar__image">
              { slots.image
                ? slots.img?.({ src: props.src })
                : (<VImg src={ props.src } cover />)
              }
            </div>
          ) }

          <div
            class="v-toolbar__content"
            style={{ height: convertToUnit(contentHeight.value) }}
          >
            { slots.default?.() }
          </div>

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
