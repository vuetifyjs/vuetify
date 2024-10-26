// Types
import type { InjectionKey } from 'vue'
import type { GroupProvide } from '@/composables/group'

export const VStepperSymbol: InjectionKey<GroupProvide> = Symbol.for('vuetify:v-stepper')
