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
import { useBackgroundColor } from '@/composables/color'
import { useVelocity } from '@/composables/touch'

// Utilities
import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref, toRef, watch } from 'vue'
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
    onMounted(() => {
      window.addEventListener('touchstart', onTouchstart, { passive: true })
      window.addEventListener('touchmove', onTouchmove, { passive: false })
      window.addEventListener('touchend', onTouchend, { passive: true })
    })

    onBeforeUnmount(() => {
      window.removeEventListener('touchstart', onTouchstart)
      window.removeEventListener('touchmove', onTouchmove)
      window.removeEventListener('touchend', onTouchend)
    })

    const { addMovement, endTouch, getVelocity } = useVelocity()
    const dragging = ref(false)
    const dragProgress = ref(0)
    const offset = ref(0)
    function onTouchstart (e: TouchEvent) {
      if (
        e.changedTouches[0].clientX < 100 ||
        (isActive.value && e.changedTouches[0].clientX < width.value) ||
        (isActive.value && isTemporary.value)
      ) {
        dragging.value = true
        offset.value = isActive.value ? e.changedTouches[0].clientX - width.value : e.changedTouches[0].clientX
        dragProgress.value = Math.min(1, (e.changedTouches[0].clientX - offset.value) / width.value)
        endTouch(e)
        addMovement(e)
      }
    }

    function onTouchmove (e: TouchEvent) {
      if (!dragging.value) return

      e.preventDefault()
      addMovement(e)

      const progress = (e.changedTouches[0].clientX - offset.value) / width.value
      dragProgress.value = Math.max(0, Math.min(1, progress))

      if (progress > 1) {
        offset.value = e.changedTouches[0].clientX - width.value
      }
    }

    function onTouchend (e: TouchEvent) {
      if (!dragging.value) return

      addMovement(e)

      dragging.value = false

      const velocity = getVelocity(e.changedTouches[0].identifier)
      if (velocity.polar.radius > 300 && ['left', 'right'].includes(velocity.direction)) {
        isActive.value = velocity.direction === 'right'
      } else {
        isActive.value = dragProgress.value > 0.5
      }
    }

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

    const dragStyles = computed(() => {
      return dragging.value ? {
        transform: `translateX(calc(-100% + ${dragProgress.value * width.value}px))`,
        // transition: 'none',
      } : undefined
    })

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
