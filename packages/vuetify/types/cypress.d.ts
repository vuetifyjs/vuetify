import type { mount as cyMount } from '@cypress/vue'

declare global {
  namespace Cypress {
    export interface Chainable {
      mount: typeof cyMount
      setProps: (props: Record<string, unknown>) => Cypress.Chainable
    }
  }
}
