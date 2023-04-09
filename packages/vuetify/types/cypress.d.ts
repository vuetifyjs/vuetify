import 'cypress-file-upload'
import 'cypress-real-events'
import type { mount as cyMount } from 'cypress/vue'
import type { SnapshotOptions } from '@percy/core'
import type { MountingOptions, VueWrapper } from '@vue/test-utils'
import type { AllowedComponentProps, ComponentPublicInstance, FunctionalComponent, VNodeProps } from 'vue'
import type { VuetifyOptions } from '@/framework'

type Swipe = number[] | string

type StripProps = keyof VNodeProps | keyof AllowedComponentProps | 'v-slots' | '$children' | `v-slot:${string}`
type Events<T> = T extends { $props: infer P extends object }
  ? {
    [K in Exclude<keyof P, StripProps> as K extends `on${infer N}`
      ? Uncapitalize<N>
      : never
    ]: P[K] extends (((...args: any[]) => any) | undefined)
      ? Parameters<NonNullable<P[K]>>[]
      : never
  }
  : never

declare global {
  namespace Cypress {
    export interface Chainable {
      mount: typeof cyMount & (
        (component: FunctionalComponent, options?: MountingOptions<any> | null, vuetifyOptions?: VuetifyOptions) => Chainable
      ) & (
        (component: JSX.Element, options?: MountingOptions<any> | null, vuetifyOptions?: VuetifyOptions) => Chainable
      )
      setProps (props: Record<string, unknown>): Chainable<VueWrapper<ComponentPublicInstance>>
      getBySel (dataTestAttribute: string, args?: any): Chainable<Element>
      percySnapshot (
        name?: string,
        options?: SnapshotOptions
      ): Chainable
      vue (): Chainable<VueWrapper<ComponentPublicInstance>>
      swipe (...path: Swipe[]): Chainable<void>
      emitted <T extends new (...args: any) => any, E extends Events<InstanceType<T>>, K extends keyof E> (
        selector: T,
        event?: K
      ): Chainable<E[K]>
    }
  }
}

declare module 'cypress/vue' {
  export function mount (component: JSX.Element, options?: MountingOptions<any> | null): Cypress.Chainable
}
