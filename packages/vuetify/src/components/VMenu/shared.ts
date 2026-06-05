// Types
import type { InjectionKey } from 'vue'

interface MenuProvide {
  openOnHover: boolean
  rootOpenedByHover: () => boolean
  register (uid: string, close: () => void): void
  unregister (uid: string): void
  closeParents (e?: MouseEvent): void
}

export const VMenuSymbol: InjectionKey<MenuProvide> = Symbol.for('vuetify:v-menu')
