// Styles
import './VNavigationDrawer.sass'

// Composables
import { useTouch } from './touch'
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { useDisplay } from '@/composables/display'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { computed, onBeforeMount, ref, toRef, watch } from 'vue'
import { defineComponent } from '@/util'

// Types
import type { PropType } from 'vue'

export const VNavigationDrawer = defineComponent({
  name: 'VNavigationDrawer',

  props: {
    color: String,
    disableResizeWatcher: Boolean,
    expandOnHover: Boolean,
    floating: Boolean,
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
  },

  emits: {
    'update:modelValue': (val: boolean) => true,
  },

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)
    const { borderClasses } = useBorder(props, 'v-navigation-drawer')
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { elevationClasses } = useElevation(props)
    const { mobile } = useDisplay()
    const { roundedClasses } = useRounded(props, 'v-navigation-drawer')

    const isActive = useProxiedModel(props, 'modelValue')
    const isHovering = ref(false)
    const width = computed(() => {
      return (props.rail && props.expandOnHover && isHovering.value)
        ? Number(props.width)
        : Number(props.rail ? props.railWidth : props.width)
    })
    const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary))

    if (!props.disableResizeWatcher) {
      watch(mobile, val => !props.permanent && (isActive.value = !val))
    }

    watch(props, val => {
      if (val.permanent) isActive.value = true
    })

    onBeforeMount(() => {
      if (props.modelValue != null) return

      isActive.value = props.permanent || !mobile.value
    })

    const rootEl = ref<HTMLElement>()

    const { dragging, dragProgress, dragStyles } = useTouch({ isActive, isTemporary, width })

    const layoutSize = computed(() => {
      const size = isTemporary.value ? 0
        : props.rail && props.expandOnHover ? Number(props.railWidth)
        : width.value

      return dragging.value ? size * dragProgress.value : size
    })
    const layoutStyles = useLayoutItem(
      props.name,
      toRef(props, 'priority'),
      toRef(props, 'position'),
      layoutSize,
      width,
      computed(() => isActive.value || dragging.value),
      computed(() => dragging.value)
    )

    return () => {
      const hasImage = (slots.image || props.image)

      return (
        <props.tag
          ref={ rootEl }
          onMouseenter={ () => (isHovering.value = true) }
          onMouseleave={ () => (isHovering.value = false) }
          class={[
            'v-navigation-drawer',
            {
              'v-navigation-drawer--bottom': props.position === 'bottom',
              'v-navigation-drawer--end': props.position === 'right',
              'v-navigation-drawer--expand-on-hover': props.expandOnHover,
              'v-navigation-drawer--floating': props.floating,
              'v-navigation-drawer--is-hovering': isHovering.value,
              'v-navigation-drawer--rail': props.rail,
              'v-navigation-drawer--start': props.position === 'left',
              'v-navigation-drawer--temporary': isTemporary.value,
              'v-navigation-drawer--absolute': props.absolute,
            },
            themeClasses.value,
            backgroundColorClasses.value,
            borderClasses.value,
            elevationClasses.value,
            roundedClasses.value,
          ]}
          style={[
            backgroundColorStyles.value,
            layoutStyles.value,
            dragStyles.value,
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

export type VNavigationDrawer = InstanceType<typeof VNavigationDrawer>
