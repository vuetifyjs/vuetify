// Styles
import './VNavigationDrawer.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { useDisplay } from '@/composables/display'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeThemeProps, useTheme } from '@/composables/theme'

// Utilities
import { computed, defineComponent, onBeforeMount, ref, toRef, watch } from 'vue'
import { makeProps } from '@/util/makeProps'

// Types
import type { PropType } from 'vue'

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
    image: String,
    temporary: Boolean,
    width: {
      type: [Number, String],
      default: 256,
    },
    position: {
      type: String as PropType<'left' | 'right' | 'bottom'>,
      default: 'left',
      validator: (value: any) => ['left', 'right', 'bottom'].includes(value),
    },
    ...makeBorderProps(),
    ...makeElevationProps(),
    ...makeLayoutItemProps(),
    ...makeRoundedProps(),
    ...makeTagProps({ tag: 'nav' }),
    ...makeThemeProps(),
  }),

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)
    const { borderClasses } = useBorder(props, 'v-navigation-drawer')
    const { elevationClasses } = useElevation(props)
    const { mobile } = useDisplay()
    const { roundedClasses } = useRounded(props, 'v-navigation-drawer')

    const isActive = useProxiedModel(props, 'modelValue')
    const isHovering = ref(false)
    const width = computed(() => {
      return (props.rail && props.expandOnHover && isHovering.value)
        ? props.width
        : Number(props.rail ? props.railWidth : props.width)
    })
    const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary))
    const layoutStyles = useLayoutItem(
      props.name,
      toRef(props, 'priority'),
      toRef(props, 'position'),
      computed(() => isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value),
      width,
      isActive,
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
      const hasImage = (slots.image || props.image)

      return (
        <props.tag
          onMouseenter={ () => (isHovering.value = true) }
          onMouseleave={ () => (isHovering.value = false) }
          class={[
            'v-navigation-drawer',
            {
              'v-navigation-drawer--bottom': props.position === 'bottom',
              'v-navigation-drawer--end': props.position === 'right',
              'v-navigation-drawer--expand-on-hover': props.expandOnHover,
              'v-navigation-drawer--is-hovering': isHovering.value,
              'v-navigation-drawer--rail': props.rail,
              'v-navigation-drawer--start': props.position === 'left',
              'v-navigation-drawer--temporary': isTemporary.value,
              'v-navigation-drawer--absolute': props.absolute,
            },
            themeClasses.value,
            borderClasses.value,
            elevationClasses.value,
            roundedClasses.value,
          ]}
          style={[
            layoutStyles.value,
          ]}
        >
          { hasImage && (
            <div class="v-navigation-drawer__img">
              { slots.image
                ? slots.image?.({ image: props.image })
                : (<img src={ props.image } alt="" />)
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
