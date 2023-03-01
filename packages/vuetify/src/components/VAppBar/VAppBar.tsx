// Styles
import './VAppBar.sass'

// Components
import { filterToolbarProps, makeVToolbarProps, VToolbar } from '@/components/VToolbar/VToolbar'

// Composables
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useSsrBoot } from '@/composables/ssrBoot'

// Utilities
import { computed, ref, toRef } from 'vue'
import { genericComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VToolbarSlots } from '@/components/VToolbar/VToolbar'

export const VAppBar = genericComponent<VToolbarSlots>()({
  name: 'VAppBar',

  props: {
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
    location: {
      type: String as PropType<'top' | 'bottom'>,
      default: 'top',
      validator: (value: any) => ['top', 'bottom'].includes(value),
    },

    ...makeVToolbarProps(),
    ...makeLayoutItemProps(),

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
    const height = computed(() => {
      const height: number = vToolbarRef.value?.contentHeight ?? 0
      const extensionHeight: number = vToolbarRef.value?.extensionHeight ?? 0

      return (height + extensionHeight)
    })
    const { ssrBootStyles } = useSsrBoot()
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
            ...ssrBootStyles.value,
          }}
          { ...toolbarProps }
          v-slots={ slots }
        />
      )
    })

    return {}
  },
})

export type VAppBar = InstanceType<typeof VAppBar>
