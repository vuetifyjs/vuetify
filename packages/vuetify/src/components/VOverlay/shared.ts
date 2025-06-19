// Types
import type { InjectionKey } from 'vue'

interface BaseProvide {
  closeParents (e?: MouseEvent): void
  closeConditional (e?: MouseEvent): void
}

interface DialogProvide extends BaseProvide {}

interface MenuProvide extends DialogProvide {
  register (): void
  unregister (): void
}

export const VMenuSymbol: InjectionKey<MenuProvide> = Symbol.for('vuetify:v-menu')
export const VDialogSymbol: InjectionKey<DialogProvide> = Symbol.for('vuetify:v-dialog')
