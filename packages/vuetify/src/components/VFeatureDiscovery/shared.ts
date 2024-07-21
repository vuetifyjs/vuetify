// Types
import type { InjectionKey } from 'vue'

interface FeatureDiscoveryProvide {
  register (): void
  unregister (): void
  closeParents (e?: MouseEvent): void
}

export const VFeatureDiscoverySymbol: InjectionKey<FeatureDiscoveryProvide> = Symbol.for('vuetify:v-feature-discovery')
