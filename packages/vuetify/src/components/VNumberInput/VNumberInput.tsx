// Styles
import './VNumberInput.sass'

// Components
import { VBtn } from '../VBtn'
import { VDivider } from '../VDivider'
import { VField } from '@/components/VField'

// Utilities
import { genericComponent, useRender } from '@/util'

type VNumberInputSlots = {}

export const VNumberInput = genericComponent<VNumberInputSlots>()({
  name: 'VNumberInput',

  inheritAttrs: false,

  props: {},

  setup(props, ctx) {

     useRender(() => {
        return (
          <VField
            class={[
              'v-number-input',
            ]}
            variant="outlined"
          >
            {{
              default: ({
                props: { class: fieldClass, ...slotProps },
              }) => (
                <>
                  <input
                    type="number"
                    { ...slotProps }
                  />
                </>
              ),
              'append-inner': () => (
                <>
                  <VDivider vertical />
                  <VBtn icon="mdi-chevron-down" rounded="0" size="small" flat />
                  <VDivider vertical />
                  <VBtn icon="mdi-chevron-up" rounded="0" size="small" flat />
                </>
              )
            }}
          </VField>
        )
     }) 
  },
})

export type VNumberInput = InstanceType<typeof VNumberInput>
