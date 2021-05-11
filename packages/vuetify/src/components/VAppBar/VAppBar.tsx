// Styles
import './VAppBar.sass'

// Components
import { VImg } from '@/components'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { useBackgroundColor } from '@/composables/color'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, defineComponent, ref, toRef } from 'vue'
import { convertToUnit } from '@/util'
import { makeProps } from '@/util/makeProps'

export default defineComponent({
  name: 'VAppBar',

  props: makeProps({
    // TODO: Implement scrolling techniques
    // hideOnScroll: Boolean
    // invertedScroll: Boolean
    // collapseOnScroll: Boolean
    // elevateOnScroll: Boolean
    // shrinkOnScroll: Boolean
    // fadeImageOnScroll: Boolean
    collapse: Boolean,
    color: String,
    flat: Boolean,
    height: {
      type: [Number, String],
      default: 64,
    },
    extensionHeight: {
      type: [Number, String],
      default: 48,
    },
    floating: Boolean,
    image: String,
    modelValue: {
      type: Boolean,
      default: true,
    },
    prominent: Boolean,
    prominentHeight: {
      type: [Number, String],
      default: 128,
    },
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeLayoutItemProps({ name: 'app-bar' }),
    ...makeTagProps({ tag: 'header' }),
  }),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const { borderClasses } = useBorder(props, 'v-app-bar')
    const { densityClasses } = useDensity(props, 'v-app-bar')
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props, 'v-app-bar')
    const { roundedClasses } = useRounded(props, 'v-app-bar')
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const extension = ref<HTMLElement | boolean>(!!slots.extension)
    const height = computed(() => (
      Number(props.prominent ? props.prominentHeight : props.height) +
      Number(extension.value ? props.extensionHeight : 0) -
      (props.density === 'comfortable' ? 8 : 0) -
      (props.density === 'compact' ? 16 : 0)
    ))
    const isActive = useProxiedModel(props, 'modelValue', props.modelValue)
    const layoutStyles = useLayoutItem(
      props.name,
      toRef(props, 'priority'),
      computed(() => props.bottom ? 'bottom' : 'top'),
      computed(() => isActive.value ? height.value : 0),
    )

    return () => {
      const hasImage = !!(slots.image || props.image)
      const translate = (!isActive.value ? -100 : 0) * (props.bottom ? -1 : 1)

      return (
        <props.tag
          class={[
            'v-app-bar',
            {
              'v-app-bar--bottom': props.bottom,
              'v-app-bar--collapsed': props.collapse,
              'v-app-bar--flat': props.flat,
              'v-app-bar--floating': props.floating,
              'v-app-bar--is-active': isActive.value,
              'v-app-bar--prominent': props.prominent,
            },
            backgroundColorClasses.value,
            borderClasses.value,
            densityClasses.value,
            elevationClasses.value,
            positionClasses.value,
            roundedClasses.value,
          ]}
          style={[
            backgroundColorStyles.value,
            layoutStyles.value,
            positionStyles.value,
            {
              height: convertToUnit(height.value),
              transform: `translateY(${convertToUnit(translate, '%')})`,
            },
          ]}
        >
          { hasImage && (
            <div class="v-app-bar__image">
              { slots.image
                ? slots.img?.({ src: props.image })
                : (<VImg src={ props.image } cover />)
              }
            </div>
          ) }

          <div class="v-app-bar__content">
            { slots.prepend && (
              <div class="v-app-bar__prepend">
                { slots.prepend() }
              </div>
            ) }

            { slots.default?.() }

            { slots.append && (
              <div class="v-app-bar__append">
                { slots.append() }
              </div>
            ) }
          </div>

          { slots.extension && (
            <div
              class="v-app-bar__extension"
              style={{ height: convertToUnit(props.extensionHeight) }}
              ref={ extension }
            >
              { slots.extension?.() }
            </div>
          ) }
        </props.tag>
      )
    }
  },
})
