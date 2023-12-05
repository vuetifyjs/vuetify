// Styles
import './VFab.sass'

// Components
import { makeVBtnProps, VBtn } from '@/components/VBtn/VBtn'

// Composables
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { makeLocationProps, useLocation } from '@/composables/location'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { computed, onMounted, ref, shallowRef, toRef, toRefs, watch, watchEffect } from 'vue'
import { useRtl } from '../entry-bundler'
import { convertToUnit, genericComponent, propsFactory, toPhysical, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

const locations = ['start', 'end', 'left', 'right', 'top', 'bottom'] as const

export const makeVFabProps = propsFactory({
  app: {
    type: String as PropType<typeof locations[number]>,
    validator: (value: any) => locations.includes(value),
  },
  extended: Boolean,
  modelValue: {
    type: Boolean,
    default: true,
  },

  ...makeVBtnProps(),
  ...makeLayoutItemProps(),

  location: {
    type: String as PropType<typeof locations[number]>,
    default: 'bottom',
    validator: (value: any) => locations.includes(value),
  },
}, 'VFab')

export const VFab = genericComponent()({
  name: 'VFab',

  props: makeVFabProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { isRtl } = useRtl()
    const height = shallowRef(56)
    const { resizeRef } = useResizeObserver(entries => {
      if (!entries.length) return
      height.value = entries[0].target.clientHeight
    })
    const position = computed(() => {
      return toPhysical(props.app, isRtl.value) as 'top' | 'right' | 'bottom' | 'left'
    })
    const { layoutItemStyles } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position,
      layoutSize: height,
      elementSize: computed(() => height.value + 8),
      active: computed(() => !!props.app && isActive.value),
      absolute: toRef(props, 'absolute'),
    })

    const vFabRef = ref()

    useRender(() => {
      const btnProps = VBtn.filterProps(props)

      return (
        <div
          ref={ vFabRef }
          class={[
            'v-fab',
            {
              'v-fab--app': !!props.app,
              'v-fab--extended': props.extended,
              [`v-fab--${props.app}`]: !!props.app,
            },
            props.class,
          ]}
          style={[
            props.app ? {
              ...layoutItemStyles.value,
            } : {
              height: undefined,
              width: undefined,
            },
            props.style,
          ]}
        >
          <VBtn
            ref={ resizeRef }
            { ...btnProps }
            class={[
              {
                [`v-btn--fab-${props.location}`]: !!props.location,
              },
            ]}
            location={ undefined }
            v-slots={ slots }
          />
        </div>
      )
    })

    return {}
  },
})
