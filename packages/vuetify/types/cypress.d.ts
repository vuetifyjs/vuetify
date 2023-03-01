import 'cypress-file-upload'
import 'cypress-real-events'
import type { mount as cyMount } from 'cypress/vue'
import type { SnapshotOptions } from '@percy/core'
import type { MountingOptions, VueWrapper } from '@vue/test-utils'
import type { ComponentPublicInstance, FunctionalComponent } from 'vue'
import type { VuetifyOptions } from '@/framework'

type Swipe = number[] | string

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
      vue (): Chainable<{
        wrapper: VueWrapper<ComponentPublicInstance>
        component: VueWrapper<ComponentPublicInstance>['vm']
      }>
      swipe (...path: Swipe[]): Chainable<void>
      emitted (selector: string, event: string): Chainable<unknown[]>
    }
  }
}

declare module 'cypress/vue' {
  export function mount (component: JSX.Element, options?: MountingOptions<any> | null): Cypress.Chainable
}
