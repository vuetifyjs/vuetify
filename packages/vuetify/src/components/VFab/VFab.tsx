// Styles
import './VFab.sass'

// Components
import { makeVBtnProps, VBtn } from '@/components/VBtn/VBtn'

// Composables
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { makeLocationProps } from '@/composables/location'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useResizeObserver } from '@/composables/resizeObserver'
import { useToggleScope } from '@/composables/toggleScope'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Utilities
import { computed, ref, shallowRef, toRef, watchEffect } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { ComputedRef } from 'vue'
import type { Position } from '@/composables/layout'

export const makeVFabProps = propsFactory({
  app: Boolean,
  appear: Boolean,
  extended: Boolean,
  layout: Boolean,
  offset: Boolean,
  modelValue: {
    type: Boolean,
    default: true,
  },

  ...omit(makeVBtnProps({ active: true }), ['location']),
  ...makeLayoutItemProps(),
  ...makeLocationProps(),
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

      return props.location?.split(' ').shift() ?? 'bottom'
    }) as ComputedRef<Position>

    const orientation = computed(() => {
      if (!hasPosition.value) return false

      return props.location?.split(' ')[1] ?? 'end'
    })

    useToggleScope(() => props.app, () => {
      const layout = useLayoutItem({
        id: props.name,
        order: computed(() => parseInt(props.order, 10)),
        position,
        layoutSize: computed(() => props.layout ? height.value + 24 : 0),
        elementSize: computed(() => height.value + 24),
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
            props.app
              ? { ...layoutItemStyles.value }
              : {
                height: props.absolute
                  ? '100%'
                  : 'inherit',
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
