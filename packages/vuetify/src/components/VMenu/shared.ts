// Types
import type { InjectionKey } from 'vue'

interface MenuProvide {
  register (): void
  unregister (): void
  closeParents (): void
}

export const VMenuSymbol: InjectionKey<MenuProvide> = Symbol.for('vuetify:v-menu')
