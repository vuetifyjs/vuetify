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
// import { useDisplay } from '@/composables/display'
// import { useProxiedModel } from '@/composables/proxiedModel'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { makeProps } from '@/util/makeProps'
import { computed, defineComponent, toRef } from 'vue'

export default defineComponent({
  name: 'VAppBar',

  props: makeProps({
    color: String,
    flat: Boolean,
    modelValue: Boolean,
    prominent: Boolean,
    src: String,
    temporary: Boolean,
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeLayoutItemProps({
      name: 'app-bar',
      size: 64,
    }),
    ...makeTagProps({ tag: 'header' }),
  }),

  setup (props, { slots }) {
    const { borderClasses } = useBorder(props, 'v-app-bar')
    const { densityClasses } = useDensity(props, 'v-app-bar')
    const { elevationClasses } = useElevation(props)
    // const { mobile } = useDisplay()
    const { positionClasses, positionStyles } = usePosition(props, 'v-app-bar')
    const { roundedClasses } = useRounded(props, 'v-app-bar')
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    // const isActive = useProxiedModel(props, 'modelValue')
    const layoutStyles = useLayoutItem(
      props.name,
      toRef(props, 'priority'),
      computed(() => 'top'),
      computed(() => props.size || ''),
    )

    return () => {
      const hasImg = !!(slots.img || props.src)

      return (
        <props.tag
          class={[
            'v-app-bar',
            {
              'v-app-bar--border': !!props.border,
              'v-app-bar--flat': props.flat,
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
          ]}
        >
          { hasImg && (
            <div class="v-app-bar__img">
              { slots.img
                ? slots.img?.({ src: props.src })
                : (<img src={ props.src } alt="" />)
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
