// Types
import type { InjectionKey } from 'vue'
import type { GroupItemProvide } from '@/composables/group'

export const VExpansionPanelSymbol: InjectionKey<GroupItemProvide> = Symbol.for('vuetify:v-expansion-panel')
