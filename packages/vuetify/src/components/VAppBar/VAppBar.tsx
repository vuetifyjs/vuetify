// Styles
import './VAppBar.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { makeProps } from '@/util/makeProps'
import { computed, defineComponent, toRef } from 'vue'
import { convertToUnit } from '@/util'

export default defineComponent({
  name: 'VAppBar',

  props: makeProps({
    color: String,
    flat: Boolean,
    // TODO: Implement scrolling techniques
    // hideOnScroll: Boolean
    // invertedScroll: Boolean
    // collapseOnScroll: Boolean
    // elevateOnScroll: Boolean
    // shrinkOnScroll: Boolean
    // fadeImageOnScroll: Boolean
    modelValue: {
      type: Boolean,
      default: true,
    },
    prominent: Boolean,
    image: String,
    temporary: Boolean,
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeLayoutItemProps({ name: 'app-bar' }),
    ...makeTagProps({ tag: 'header' }),
  }),

  setup (props, { slots }) {
    const { borderClasses } = useBorder(props, 'v-app-bar')
    const { densityClasses } = useDensity(props, 'v-app-bar')
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props, 'v-app-bar')
    const { roundedClasses } = useRounded(props, 'v-app-bar')
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const isActive = useProxiedModel(props, 'modelValue')
    const height = computed(() => (
      (props.prominent ? 128 : 64) -
      (props.density === 'comfortable' ? 8 : 0) -
      (props.density === 'compact' ? 16 : 0)
    ))
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
              'v-app-bar--flat': props.flat,
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
                : (<img src={ props.image } alt="" />)
              }
            </div>
          ) }

          { slots.prepend && (
            <div class="v-app-bar__prepend">
              { slots.prepend() }
            </div>
          ) }

          { slots.default && (
            <div class="v-app-bar__content">
              { slots.default() }
            </div>
          ) }

          { slots.append && (
            <div class="v-app-bar__append">
              { slots.append() }
            </div>
          ) }
        </props.tag>
      )
    }
  },
})
