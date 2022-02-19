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
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { computed, onBeforeMount, ref, toRef, Transition, watch } from 'vue'
import { convertToUnit, defineComponent } from '@/util'

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
    touchless: Boolean,
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

  setup (props, { attrs, slots }) {
    const { themeClasses } = provideTheme(props)
    const { borderClasses } = useBorder(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { elevationClasses } = useElevation(props)
    const { mobile } = useDisplay()
    const { roundedClasses } = useRounded(props)

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

    const { isDragging, dragProgress, dragStyles } = useTouch({
      isActive,
      isTemporary,
      width,
      touchless: toRef(props, 'touchless'),
      position: toRef(props, 'position'),
    })

    const layoutSize = computed(() => {
      const size = isTemporary.value ? 0
        : props.rail && props.expandOnHover ? Number(props.railWidth)
        : width.value

      return isDragging.value ? size * dragProgress.value : size
    })
    const { layoutItemStyles, layoutRect, layoutItemScrimStyles } = useLayoutItem({
      id: props.name,
      priority: computed(() => parseInt(props.priority, 10)),
      position: toRef(props, 'position'),
      layoutSize,
      elementSize: width,
      active: computed(() => isActive.value || isDragging.value),
      disableTransitions: computed(() => isDragging.value),
      absolute: toRef(props, 'absolute'),
    })

    const scrimStyles = computed(() => ({
      ...isDragging.value ? {
        opacity: dragProgress.value * 0.2,
        transition: 'none',
      } : undefined,
      ...layoutRect.value ? {
        left: convertToUnit(layoutRect.value.left),
        right: convertToUnit(layoutRect.value.right),
        top: convertToUnit(layoutRect.value.top),
        bottom: convertToUnit(layoutRect.value.bottom),
      } : undefined,
      ...layoutItemScrimStyles.value,
    }))

    return () => {
      const hasImage = (slots.image || props.image)

      return (
        <>
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
                'v-navigation-drawer--active': isActive.value,
              },
              themeClasses.value,
              backgroundColorClasses.value,
              borderClasses.value,
              elevationClasses.value,
              roundedClasses.value,
            ]}
            style={[
              backgroundColorStyles.value,
              layoutItemStyles.value,
              dragStyles.value,
            ]}
            { ...attrs }
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

          <Transition name="fade-transition">
            { isTemporary.value && (isDragging.value || isActive.value) && (
              <div
                class="v-navigation-drawer__scrim"
                style={ scrimStyles.value }
                onClick={ () => isActive.value = false }
              />
            )}
          </Transition>
        </>
      )
    }
  },
})

export type VNavigationDrawer = InstanceType<typeof VNavigationDrawer>
