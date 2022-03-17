// Styles
import './VAppBar.sass'

// Components
import { filterToolbarProps, makeVToolbarProps, VToolbar } from '@/components/VToolbar/VToolbar'

// Composables
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref, toRef } from 'vue'
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
    const height = computed(() => vToolbarRef.value?.contentHeight)
    const { layoutItemStyles } = useLayoutItem({
      id: props.name,
      priority: computed(() => parseInt(props.priority, 10)),
      position: toRef(props, 'position'),
      layoutSize: height,
      elementSize: height,
      active: isActive,
      absolute: toRef(props, 'absolute'),
    })

    return () => {
      const [toolbarProps] = filterToolbarProps(props)

      return (
        <VToolbar
          ref={ vToolbarRef }
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
