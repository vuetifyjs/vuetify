// Styles
import './VAppBar.sass'

// Components
import { filterToolbarProps, makeVToolbarProps, VToolbar } from '@/components/VToolbar/VToolbar'

// Composables
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { computed, toRef } from 'vue'
import { defineComponent } from '@/util'

// Types
import type { PropType } from 'vue'

export const VAppBar = defineComponent({
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
    position: {
      type: String as PropType<'top' | 'bottom'>,
      default: 'top',
      validator: (value: any) => ['top', 'bottom'].includes(value),
    },

    ...makeVToolbarProps(),
    ...makeLayoutItemProps(),
  },

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { resizeRef, contentRect } = useResizeObserver()
    const { layoutItemStyles } = useLayoutItem({
      id: props.name,
      priority: computed(() => parseInt(props.priority, 10)),
      position: toRef(props, 'position'),
      layoutSize: computed(() => contentRect.value?.height ?? 0),
      elementSize: computed(() => contentRect.value?.height ?? 0),
      active: isActive,
      absolute: toRef(props, 'absolute'),
    })

    return () => {
      const [toolbarProps] = filterToolbarProps(props)

      return (
        <VToolbar
          ref={ (vm: any) => resizeRef.value = vm?.$el }
          class={[
            'v-app-bar',
            {
              'v-app-bar--bottom': props.position === 'bottom',
            },
          ]}
          style={ layoutItemStyles.value }
          { ...toolbarProps }
          v-slots={ slots }
        />
      )
    }
  },
})

export type VAppBar = InstanceType<typeof VAppBar>
