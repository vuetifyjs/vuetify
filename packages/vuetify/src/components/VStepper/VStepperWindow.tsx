// Components
import { VStepperSymbol } from './shared'
import { makeVWindowProps, VWindow } from '@/components/VWindow/VWindow'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, inject } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

export const makeVStepperWindowProps = propsFactory({
  ...omit(makeVWindowProps(), ['continuous', 'nextIcon', 'prevIcon', 'showArrows', 'touch', 'mandatory']),
}, 'VStepperWindow')

export const VStepperWindow = genericComponent()({
  name: 'VStepperWindow',

  props: makeVStepperWindowProps(),

  emits: {
    'update:modelValue': (v: unknown) => true,
  },

  setup (props, { slots }) {
    const group = inject(VStepperSymbol, null)
    const _model = useProxiedModel(props, 'modelValue')

    const model = computed({
      get () {
        // Always return modelValue if defined
        // or if not within a VStepper group
        if (_model.value != null || !group) return _model.value

        // If inside of a VStepper, find the currently selected
        // item by id. Item value may be assigned by its index
        return group.items.value.find(item => group.selected.value.includes(item.id))?.value
      },
      set (val) {
        _model.value = val
      },
    })

    useRender(() => {
      const windowProps = VWindow.filterProps(props)

      return (
        <VWindow
          _as="VStepperWindow"
          { ...windowProps }
          v-model={ model.value }
          class={[
            'v-stepper-window',
            props.class,
          ]}
          style={ props.style }
          mandatory={ false }
          touch={ false }
          v-slots={ slots }
        />
      )
    })

    return {}
  },
})

export type VStepperWindow = InstanceType<typeof VStepperWindow>
