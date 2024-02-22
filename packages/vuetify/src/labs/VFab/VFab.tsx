// Styles
import './VFab.sass'

// Components
import { makeVBtnProps, VBtn } from '@/components/VBtn/VBtn'

// Composables
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { computed, ref, shallowRef, toRef } from 'vue'
import { genericComponent, propsFactory, useRender, omit } from '@/util'

// Types
import type { ComputedRef, PropType } from 'vue'
import type { Position } from '@/composables/layout'

const locations = ['start', 'end', 'left', 'right', 'top', 'bottom'] as const

export const makeVFabProps = propsFactory({
  app: Boolean,
  extended: Boolean,
  location: {
    type: String as PropType<typeof locations[number]>,
    default: 'bottom end',
    validator: (value: any) => locations.includes(value),
  },
  modelValue: {
    type: Boolean,
    default: true,
  },

  ...omit(makeVBtnProps(), ['location']),
  ...makeLayoutItemProps(),
}, 'VFab')

export const VFab = genericComponent()({
  name: 'VFab',

  props: makeVFabProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const height = shallowRef(56)
    const { resizeRef } = useResizeObserver(entries => {
      if (!entries.length) return
      height.value = entries[0].target.clientHeight
    })
    const position = computed(() => {
      if (!props.app || !props.location) return false

      return props.location.split(' ').shift()
    }) as ComputedRef<Position>
    const orientation = computed(() => {
      if (!props.app || !props.location) return false

      return props.location.split(' ')[1] ?? 'end'
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
              [`v-fab--${orientation.value}`]: !!props.app,
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
            location={ undefined }
            v-slots={ slots }
          />
        </div>
      )
    })

    return {}
  },
})

export type VFab = InstanceType<typeof VFab>
