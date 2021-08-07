import type { mount as cyMount } from '@cypress/vue'
import 'cypress-file-upload'

declare global {
  namespace Cypress {
    export interface Chainable {
      mount: typeof cyMount
      getBySel(dataTestAttribute: string, args?: any): Chainable<Element>
    }
  }
}
