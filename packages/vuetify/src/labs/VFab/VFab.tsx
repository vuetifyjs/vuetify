// Styles
import './VFab.sass'

// Components
import { makeVBtnProps, VBtn } from '@/components/VBtn/VBtn'

// Composables
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useResizeObserver } from '@/composables/resizeObserver'
import { useToggleScope } from '@/composables/toggleScope'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Utilities
import { computed, ref, shallowRef, toRef, watchEffect } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { ComputedRef, PropType } from 'vue'
import type { Position } from '@/composables/layout'

const locations = ['start', 'end', 'left', 'right', 'top', 'bottom'] as const

export const makeVFabProps = propsFactory({
  app: Boolean,
  appear: Boolean,
  extended: Boolean,
  location: {
    type: String as PropType<typeof locations[number]>,
    default: 'bottom end',
  },
  offset: Boolean,
  modelValue: {
    type: Boolean,
    default: true,
  },

  ...omit(makeVBtnProps({ active: true }), ['location']),
  ...makeLayoutItemProps(),
  ...makeTransitionProps({ transition: 'fab-transition' }),
}, 'VFab')

export const VFab = genericComponent()({
  name: 'VFab',

  props: makeVFabProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const height = shallowRef(56)
    const layoutItemStyles = ref()

    const { resizeRef } = useResizeObserver(entries => {
      if (!entries.length) return
      height.value = entries[0].target.clientHeight
    })

    const hasPosition = computed(() => props.app || props.absolute)

    const position = computed(() => {
      if (!hasPosition.value) return false

      return props.location.split(' ').shift()
    }) as ComputedRef<Position>

    const orientation = computed(() => {
      if (!hasPosition.value) return false

      return props.location.split(' ')[1] ?? 'end'
    })

    useToggleScope(() => props.app, () => {
      const layout = useLayoutItem({
        id: props.name,
        order: computed(() => parseInt(props.order, 10)),
        position,
        layoutSize: height,
        elementSize: computed(() => height.value + 32),
        active: computed(() => props.app && model.value),
        absolute: toRef(props, 'absolute'),
      })

      watchEffect(() => {
        layoutItemStyles.value = layout.layoutItemStyles.value
      })
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
              'v-fab--absolute': props.absolute,
              'v-fab--app': !!props.app,
              'v-fab--extended': props.extended,
              'v-fab--offset': props.offset,
              [`v-fab--${position.value}`]: hasPosition.value,
              [`v-fab--${orientation.value}`]: hasPosition.value,
            },
            props.class,
          ]}
          style={[
            props.app ? {
              ...layoutItemStyles.value,
            } : {
              height: 'inherit',
              width: undefined,
            },
            props.style,
          ]}
        >
          <div class="v-fab__container">
            <MaybeTransition
              appear={ props.appear }
              transition={ props.transition }
            >
              <VBtn
                v-show={ props.active }
                ref={ resizeRef }
                { ...btnProps }
                active={ undefined }
                location={ undefined }
                v-slots={ slots }
              />
            </MaybeTransition>
          </div>
        </div>
      )
    })

    return {}
  },
})

export type VFab = InstanceType<typeof VFab>
