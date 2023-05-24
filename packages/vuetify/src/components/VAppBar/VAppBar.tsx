// Styles
import './VAppBar.sass'

// Components
import { makeVToolbarProps, VToolbar } from '@/components/VToolbar/VToolbar'

// Composables
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeScrollProps, useScroll } from '@/composables/scroll'
import { useSsrBoot } from '@/composables/ssrBoot'
import { useToggleScope } from '@/composables/toggleScope'

// Utilities
import { computed, ref, shallowRef, toRef, watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VToolbarSlots } from '@/components/VToolbar/VToolbar'

export const makeVAppBarProps = propsFactory({
  scrollBehavior: String,
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
}, 'v-app-bar')

export const VAppBar = genericComponent<VToolbarSlots>()({
  name: 'VAppBar',

  props: makeVAppBarProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const vToolbarRef = ref<VToolbar>()
    const isActive = useProxiedModel(props, 'modelValue')
    const scrollBehavior = computed(() => {
      const behavior = new Set(props.scrollBehavior?.split(' ') ?? [])
      return {
        hide: behavior.has('hide'),
        // fullyHide: behavior.has('fully-hide'),
        inverted: behavior.has('inverted'),
        collapse: behavior.has('collapse'),
        elevate: behavior.has('elevate'),
        fadeImage: behavior.has('fade-image'),
        // shrink: behavior.has('shrink'),
      }
    })
    const canScroll = computed(() => {
      const behavior = scrollBehavior.value
      return (
        behavior.hide ||
        // behavior.fullyHide ||
        behavior.inverted ||
        behavior.collapse ||
        behavior.elevate ||
        behavior.fadeImage ||
        // behavior.shrink ||
        !isActive.value
      )
    })
    const {
      currentScroll,
      scrollThreshold,
      isScrollingUp,
      scrollRatio,
    } = useScroll(props, { canScroll })

    const isCollapsed = computed(() => props.collapse || (
      scrollBehavior.value.collapse &&
      (scrollBehavior.value.inverted ? scrollRatio.value > 0 : scrollRatio.value === 0)
    ))
    const isFlat = computed(() => props.flat || (
      scrollBehavior.value.elevate &&
      (scrollBehavior.value.inverted ? currentScroll.value > 0 : currentScroll.value === 0)
    ))
    const opacity = computed(() => (
      scrollBehavior.value.fadeImage
        ? (scrollBehavior.value.inverted ? 1 - scrollRatio.value : scrollRatio.value)
        : undefined
    ))
    const height = computed(() => {
      if (scrollBehavior.value.hide && scrollBehavior.value.inverted) return 0

      const height = vToolbarRef.value?.contentHeight ?? 0
      const extensionHeight = vToolbarRef.value?.extensionHeight ?? 0

      return (height + extensionHeight)
    })
    function setActive () {
      if (scrollBehavior.value.hide) {
        if (scrollBehavior.value.inverted) {
          isActive.value = currentScroll.value > scrollThreshold.value
        } else {
          isActive.value = isScrollingUp.value || (currentScroll.value < scrollThreshold.value)
        }
      } else {
        isActive.value = true
      }
    }

    useToggleScope(() => !!props.scrollBehavior, () => {
      watch(currentScroll, setActive, { immediate: true })
      watch(scrollBehavior, setActive)
    })

    const { ssrBootStyles } = useSsrBoot()
    const { layoutItemStyles } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: toRef(props, 'location'),
      layoutSize: height,
      elementSize: shallowRef(undefined),
      active: isActive,
      absolute: toRef(props, 'absolute'),
    })

    useRender(() => {
      const [toolbarProps] = VToolbar.filterProps(props)

      return (
        <VToolbar
          ref={ vToolbarRef }
          class={[
            'v-app-bar',
            {
              'v-app-bar--bottom': props.location === 'bottom',
            },
            props.class,
          ]}
          style={[
            {
              ...layoutItemStyles.value,
              '--v-toolbar-image-opacity': opacity.value,
              height: undefined,
              ...ssrBootStyles.value,
            },
            props.style,
          ]}
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
