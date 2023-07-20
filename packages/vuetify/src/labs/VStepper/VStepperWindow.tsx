// Components
import { makeVWindowProps, VWindow } from '@/components/VWindow/VWindow'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, inject } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { InjectionKey } from 'vue'
import type { GroupProvide } from '@/composables/group'

export const VStepperSymbol: InjectionKey<GroupProvide> = Symbol.for('vuetify:v-stepper')

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
    const group = inject(VStepperSymbol, null)
    const _model = useProxiedModel(props, 'modelValue')

    const model = computed({
      get () {
        return _model.value ?? group?.selected.value
      },
      set (val) {
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
