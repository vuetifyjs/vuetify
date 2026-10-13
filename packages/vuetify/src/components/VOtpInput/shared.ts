// Types
import type { InjectionKey, Ref } from 'vue'
import type { OtpSlotData } from './useOtpInput'

export interface VOtpInputContext {
  otpSlots: Readonly<Ref<OtpSlotData[]>>
  isFocused: Ref<boolean>
  focusAll: Ref<boolean>
  divider: Ref<string | undefined>
  merged: Ref<boolean>
  focusAt: (index: number) => void
}

export const VOtpInputSymbol: InjectionKey<VOtpInputContext> = Symbol.for('vuetify:v-otp-input')
