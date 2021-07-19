import type { InjectionKey, Ref } from 'vue'

interface BreadcrumbsContext {
  color: Ref<string | undefined>
  disabled: Ref<boolean>
}

export const VBreadcrumbsSymbol: InjectionKey<BreadcrumbsContext> = Symbol.for('vuetify:breadcrumbs')
