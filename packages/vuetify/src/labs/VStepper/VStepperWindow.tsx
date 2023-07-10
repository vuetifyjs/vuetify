// Components
import { makeVWindowProps, VWindow } from '@/components/VWindow/VWindow'

// Composables
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import { VStepperSymbol } from './VStepper'

export const makeVStepperWindowProps = propsFactory({
  ...makeGroupItemProps(),
  ...makeVWindowProps(),
}, 'VStepperWindow')

export const VStepperWindow = genericComponent()({
  name: 'VStepperWindow',

  props: makeVStepperWindowProps(),

  emits: {
    'group:selected': (val: { value: boolean }) => true,
    'update:modelValue': (v: unknown) => true,
  },

  setup (props, { slots }) {
    const group = useGroupItem(props, VStepperSymbol, false)
    const _model = useProxiedModel(props, 'modelValue')

    const model = computed({
      get () {
        return group?.group.selected.value ?? _model.value
      },
      set (val) {
        group?.group.select(val[0], true)
        _model.value = val
      },
    })

    useRender(() => {
      const [windowProps] = VWindow.filterProps(props)

      return (
        <VWindow
          { ...windowProps }
          class="v-stepper-window"
          v-model={ model.value }
          v-slots={ slots }
        />
      )
    })

    return {}
  },
})

export type VStepperWindow = InstanceType<typeof VStepperWindow>
