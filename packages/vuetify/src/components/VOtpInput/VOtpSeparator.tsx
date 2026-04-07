// Utilities
import { computed, inject } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import { VOtpInputSymbol } from './VOtpInput'

export const makeVOtpSeparatorProps = propsFactory({
  divider: String,
}, 'VOtpSeparator')

export const VOtpSeparator = genericComponent()({
  name: 'VOtpSeparator',

  props: makeVOtpSeparatorProps(),

  setup (props, { slots }) {
    const otpInput = inject(VOtpInputSymbol)

    const dividerText = computed(() => props.divider ?? otpInput?.divider.value)

    useRender(() => {
      if (slots.default) {
        return (
          <div class="v-otp-input__divider">
            { slots.default() }
          </div>
        )
      }

      return <span class="v-otp-input__divider">{ dividerText.value }</span>
    })
  },
})

export type VOtpSeparator = InstanceType<typeof VOtpSeparator>
