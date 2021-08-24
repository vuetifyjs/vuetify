import 'cypress-file-upload'
import type { mount as cyMount } from '@cypress/vue'
import type { SnapshotOptions } from '@percy/core'

declare global {
  namespace Cypress {
    export interface Chainable {
      mount: typeof cyMount
      setProps (props: Record<string, unknown>): Cypress.Chainable
      getBySel (dataTestAttribute: string, args?: any): Chainable<Element>
      percySnapshot (
        name?: string,
        options?: SnapshotOptions
      ): Chainable
    }
  }
}
