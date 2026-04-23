// Components
import { VField } from '@/components/VField/VField'

// Utilities
import { computed, inject } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import { VOtpInputSymbol } from './VOtpInput'

export const makeVOtpFieldProps = propsFactory({
  index: {
    type: Number,
    required: true,
  },
}, 'VOtpField')

export const VOtpField = genericComponent()({
  name: 'VOtpField',

  props: makeVOtpFieldProps(),

  setup (props) {
    const otpInput = inject(VOtpInputSymbol)

    if (!otpInput) {
      throw new Error('[Vuetify] VOtpField must be used inside VOtpInput')
    }

    const slot = computed(() => otpInput.otpSlots.value[props.index])

    const isHighlighted = computed(() =>
      otpInput.isFocused.value && otpInput.focusAll.value && !slot.value?.isActive
    )

    useRender(() => {
      if (!slot.value) return (<></>)

      return (
        <VField
          focused={ slot.value.isActive || isHighlighted.value }
          class={{ 'v-otp-input__field--highlighted': isHighlighted.value }}
          data-otp-index={ props.index }
          onClick={ () => otpInput.focusAt(props.index) }
        >
          {{
            loader: undefined,
            default: () => (
              <div class="v-otp-input__field">
                { slot.value.hasFakeCaret ? (
                  <span class="v-otp-input__caret" />
                ) : (
                  <span class={ !slot.value.char ? 'v-otp-input__placeholder' : undefined }>
                    { slot.value.char ?? slot.value.placeholderChar ?? '' }
                  </span>
                )}
              </div>
            ),
          }}
        </VField>
      )
    })
  },
})

export type VOtpField = InstanceType<typeof VOtpField>
