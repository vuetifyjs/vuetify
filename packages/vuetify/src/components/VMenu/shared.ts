import type { InjectionKey } from 'vue'

interface MenuProvide {
  closeParents (): void
}

export const VMenuSymbol: InjectionKey<MenuProvide> = Symbol.for('vuetify:v-menu')
