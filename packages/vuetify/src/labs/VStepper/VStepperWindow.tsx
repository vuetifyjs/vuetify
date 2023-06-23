// Components
import { makeVWindowProps, VWindow } from '@/components/VWindow/VWindow'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVStepperWindowProps = propsFactory({
  ...makeVWindowProps(),
}, 'VStepperWindow')

export const VStepperWindow = genericComponent()({
  name: 'VStepperWindow',

  props: makeVStepperWindowProps(),

  emits: {
    'update:modelValue': (v: unknown) => true,
  },

  setup (props, { slots }) {
    const model = useProxiedModel(props, 'modelValue')

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
  },
})

export type VStepperWindow = InstanceType<typeof VStepperWindow>
