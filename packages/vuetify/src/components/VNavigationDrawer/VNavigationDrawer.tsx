// Styles
import './VNavigationDrawer.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { useDisplay } from '@/composables/display'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useTheme } from '@/composables/theme'

// Utilities
import { computed, defineComponent, onBeforeMount, ref, toRef, watch } from 'vue'
import { convertToUnit } from '@/util/helpers'
import { makeProps } from '@/util/makeProps'

export default defineComponent({
  name: 'VNavigationDrawer',

  props: makeProps({
    disableResizeWatcher: Boolean,
    expandOnHover: Boolean,
    modelValue: {
      type: Boolean,
      default: null,
    },
    permanent: Boolean,
    rail: Boolean,
    railWidth: {
      type: [Number, String],
      default: 72,
    },
    src: String,
    temporary: Boolean,
    width: {
      type: [Number, String],
      default: 256,
    },
    ...makeBorderProps(),
    ...makeElevationProps(),
    ...makeLayoutItemProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps({ tag: 'nav' }),
  }),

  setup (props, { slots }) {
    const { themeClasses } = useTheme()
    const { borderClasses } = useBorder(props, 'v-navigation-drawer')
    const { elevationClasses } = useElevation(props)
    const { mobile } = useDisplay()
    const { positionClasses, positionStyles } = usePosition(props, 'v-navigation-drawer')
    const { roundedClasses } = useRounded(props, 'v-navigation-drawer')

    const isActive = useProxiedModel(props, 'modelValue')
    const isHovering = ref(false)
    const size = computed(() => Number(props.rail ? props.railWidth : props.width))
    const width = computed(() => {
      return (props.rail && props.expandOnHover && isHovering.value)
        ? props.width
        : size.value
    })
    const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary))
    const layoutStyles = useLayoutItem(
      props.name,
      toRef(props, 'priority'),
      computed(() => props.right ? 'right' : 'left'),
      computed(() => !isTemporary.value && isActive.value ? size.value : 0),
    )

    if (!props.disableResizeWatcher) {
      watch(mobile, val => !props.permanent && (isActive.value = !val))
    }

    watch(props, val => {
      if (val.permanent) isActive.value = true
    })

    onBeforeMount(() => {
      if (props.modelValue != null) return

      isActive.value = !mobile.value
    })

    return () => {
      const hasImg = (slots.img || props.src)
      const translate = (
        (!props.permanent && !isActive.value ? 105 : 0) *
        (!props.right && !props.bottom ? -1 : 1)
      )

      return (
        <props.tag
          onMouseenter={ () => (isHovering.value = true) }
          onMouseleave={ () => (isHovering.value = false) }
          class={[
            'v-navigation-drawer',
            {
              'v-navigation-drawer--bottom': props.bottom,
              'v-navigation-drawer--end': props.right,
              'v-navigation-drawer--expand-on-hover': props.expandOnHover,
              'v-navigation-drawer--is-hovering': isHovering.value,
              'v-navigation-drawer--rail': props.rail,
              'v-navigation-drawer--start': props.left || !props.right,
              'v-navigation-drawer--temporary': isTemporary.value,
            },
            themeClasses.value,
            borderClasses.value,
            elevationClasses.value,
            positionClasses.value,
            roundedClasses.value,
          ]}
          style={[
            layoutStyles.value,
            positionStyles.value,
            {
              transform: `translate${props.bottom ? 'Y' : 'X'}(${convertToUnit(translate, '%')})`,
              width: convertToUnit(width.value),
            },
          ]}
        >
          { hasImg && (
            <div class="v-navigation-drawer__img">
              { slots.img
                ? slots.img?.({ src: props.src })
                : (<img src={ props.src } alt="" />)
              }
            </div>
          )}

          { slots.prepend && (
            <div class="v-navigation-drawer__prepend">
              { slots.prepend?.() }
            </div>
          )}

          <div class="v-navigation-drawer__content">
            { slots.default?.() }
          </div>

          { slots.append && (
            <div class="v-navigation-drawer__append">
              { slots.append?.() }
            </div>
          )}
        </props.tag>
      )
    }
  },
})
