import type { VNodeProps } from 'vue'

export type PublicComponent<T> = { $props: VNodeProps & T }

export const publicComponent = <Props>(component: unknown) => component as PublicComponent<Props>
