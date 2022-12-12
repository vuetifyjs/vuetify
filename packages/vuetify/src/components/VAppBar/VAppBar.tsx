// Styles
import './VAppBar.sass'

// Components
import { filterToolbarProps, makeVToolbarProps, VToolbar } from '@/components/VToolbar/VToolbar'

// Composables
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { makeScrollProps, useScroll } from '@/composables/scroll'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref, toRef, watch } from 'vue'
import { genericComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { SlotsToProps } from '@/util'
import type { VToolbarSlots } from '@/components/VToolbar/VToolbar'

export const VAppBar = genericComponent<new () => {
  $props: SlotsToProps<VToolbarSlots>
}>()({
  name: 'VAppBar',

  props: {
    hideOnScroll: Boolean,
    invertedScroll: Boolean,
    collapseOnScroll: Boolean,
    elevateOnScroll: Boolean,
    // shrinkOnScroll: Boolean,
    fadeImageOnScroll: Boolean,
    scrollOffScreen: Boolean,
    modelValue: {
      type: Boolean,
      default: true,
    },
    location: {
      type: String as PropType<'top' | 'bottom'>,
      default: 'top',
      validator: (value: any) => ['top', 'bottom'].includes(value),
    },

    ...makeVToolbarProps(),
    ...makeLayoutItemProps(),
    ...makeScrollProps(),

    height: {
      type: [Number, String],
      default: 64,
    },
  },

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const vToolbarRef = ref()
    const isActive = useProxiedModel(props, 'modelValue')
    const canScroll = computed(() => {
      return (
        props.invertedScroll ||
        props.elevateOnScroll ||
        props.hideOnScroll ||
        props.collapseOnScroll ||
        props.fadeImageOnScroll ||
        // props.shrinkOnScroll ||
        !isActive.value
      )
    })
    const {
      currentScroll,
      currentThreshold,
      computedScrollThreshold,
      isScrollingUp,
    } = useScroll(props, { canScroll })

    const isCollapsed = computed(() => props.collapse || (
      props.collapseOnScroll &&
      currentScroll.value > 0
    ))
    const isFlat = computed(() => props.flat || (
      props.elevateOnScroll &&
      currentScroll.value === 0
    ))
    const scrollRatio = computed(() => Math.max(
      ((currentThreshold.value - currentScroll.value) / currentThreshold.value) || 0,
      0
    ))
    const opacity = computed(() => props.fadeImageOnScroll ? scrollRatio.value : undefined)
    const height = computed(() => {
      if (props.invertedScroll) return 0

      const height: number = vToolbarRef.value?.contentHeight ?? 0
      const extensionHeight: number = vToolbarRef.value?.extensionHeight ?? 0

      return (height + extensionHeight)
    })

    watch(currentScroll, val => {
      if (props.invertedScroll) {
        isActive.value = val > computedScrollThreshold.value
      }

      if (props.hideOnScroll) {
        isActive.value = isScrollingUp.value || (val < computedScrollThreshold.value)
      }
    }, { immediate: true })

    watch(() => props.invertedScroll, val => {
      if (val && currentScroll.value === 0) isActive.value = false
      else if (!val) isActive.value = true
    })

    const { layoutItemStyles } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: toRef(props, 'location'),
      layoutSize: height,
      elementSize: height,
      active: isActive,
      absolute: toRef(props, 'absolute'),
    })

    useRender(() => {
      const [toolbarProps] = filterToolbarProps(props)

      return (
        <VToolbar
          ref={ vToolbarRef }
          class={[
            'v-app-bar',
            {
              'v-app-bar--bottom': props.location === 'bottom',
            },
          ]}
          style={{
            ...layoutItemStyles.value,
            height: undefined,
            '--v-toolbar-image-opacity': opacity.value,
          }}
          { ...toolbarProps }
          collapse={ isCollapsed.value }
          flat={ isFlat.value }
          v-slots={ slots }
        />
      )
    })

    return {}
  },
})

export type VAppBar = InstanceType<typeof VAppBar>
