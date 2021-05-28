import type { mount as cyMount } from '@cypress/vue'

declare global {
  namespace Cypress {
    export interface Chainable {
      mount: typeof cyMount
      getBySel(dataTestAttribute: string, args?: any): Chainable<Element>
    }
  }
}
