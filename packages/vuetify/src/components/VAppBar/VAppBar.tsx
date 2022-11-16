// Styles
import './VAppBar.sass'

// Components
import { filterToolbarProps, makeVToolbarProps, VToolbar } from '@/components/VToolbar/VToolbar'

// Composables
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeScrollProps, useScroll } from '@/composables/scroll'

// Utilities
import { computed, ref, toRef } from 'vue'
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
    // TODO: Implement scrolling techniques
    // collapseOnScroll: Boolean
    // elevateOnScroll: Boolean
    // shrinkOnScroll: Boolean
    // fadeImageOnScroll: Boolean
    modelValue: {
      type: Boolean,
      default: true,
    },
    location: {
      type: String as PropType<'top' | 'bottom'>,
      default: 'top',
      validator: (value: any) => ['top', 'bottom'].includes(value),
    },
    hideOnScroll: {
      type: Boolean,
      default: false,
    },
    invertedScroll: {
      type: Boolean,
      default: false,
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
    const modelValue = useProxiedModel(props, 'modelValue')
    const height = computed(() => {
      const height: number = vToolbarRef.value?.contentHeight ?? 0
      const extensionHeight: number = vToolbarRef.value?.extensionHeight ?? 0

      return (height + extensionHeight)
    })

    const scroll = useScroll(props, {
      canScroll: computed(() => props.hideOnScroll),
    })

    const belowThreshold = computed(() => {
      return scroll.currentScroll.value > scroll.computedScrollThreshold.value
    })

    const isActive = computed(() => {
      return modelValue.value && (!props.hideOnScroll || belowThreshold.value === props.invertedScroll)
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
          ref={vToolbarRef}
          class={[
            'v-app-bar',
            {
              'v-app-bar--bottom': props.location === 'bottom',
            },
          ]}
          style={{
            ...layoutItemStyles.value,
            height: undefined,
          }}
          {...toolbarProps}
          v-slots={slots}
        />
      )
    })

    return {}
  },
})

export type VAppBar = InstanceType<typeof VAppBar>
