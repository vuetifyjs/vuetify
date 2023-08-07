// Types
import type { InjectionKey } from 'vue'
import type { GroupProvide } from '@/composables/group'

export const VTabsSymbol: InjectionKey<GroupProvide> = Symbol.for('vuetify:v-tabs')
