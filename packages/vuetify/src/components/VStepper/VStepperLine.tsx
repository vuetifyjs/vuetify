// Styles
import './VStepperLine.sass'

// Utilities
import { inject } from 'vue'
import { defineComponent } from '@/util'
import { VStepperProvideSymbol } from './VStepper'

export const VStepperLine = defineComponent({
  name: 'VStepperLine',

  props: {
    empty: Boolean,
  },

  setup (props) {
    const stepper = inject(VStepperProvideSymbol)

    if (!stepper) throw new Error('foo')

    return () => (
      <div
        class={[
          'v-stepper-line',
          `v-stepper-line--${stepper.direction.value}`,
        ]}
      >
        { !props.empty && <div /> }
      </div>
    )
  },
})
