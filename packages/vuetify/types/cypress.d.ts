import 'cypress-file-upload'
import 'cypress-real-events'
import type { mount as cyMount } from '@cypress/vue'
import type { SnapshotOptions } from '@percy/core'
import type { MountingOptions, VueWrapper } from '@vue/test-utils'

type Swipe = number[] | string

declare global {
  namespace Cypress {
    export interface Chainable {
      mount: typeof cyMount & ((component: JSX.Element, options?: MountingOptions<any>) => Cypress.Chainable)
      setProps (props: Record<string, unknown>): Cypress.Chainable
      getBySel (dataTestAttribute: string, args?: any): Chainable<Element>
      percySnapshot (
        name?: string,
        options?: SnapshotOptions
      ): Chainable
      vue (): Cypress.Chainable<VueWrapper<any>>
      swipe (...path: Swipe[]): Cypress.Chainable<void>
    }
  }
}
