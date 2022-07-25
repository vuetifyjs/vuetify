/// <reference types="../../../../types/cypress" />

import { VTooltip } from '..'
import { generate } from '@/../cypress/templates'
import { VBtn } from '@/components/VBtn'

const props = {}

const stories = {
  Default: <VTooltip />,
}
// Tests
describe('VTooltip', () => {
  generate({ stories, props, component: VTooltip })

  // #issue 15475
  it('should be activated when activator is on focus and open-on-focus is true', () => {
    cy.mount(() => (
      <VBtn>
        open on focus
        <VTooltip
          activator="parent"
          location="top"
          open-on-focus
        >Tooltip</VTooltip>
      </VBtn>
    ))

    cy.get('.v-btn').focus()

    cy.get('.v-overlay__content').should('be.visible')

    // This arbitrary time periods just aims to verify when UI is in stable state.
    // As there seems to be no way for cypress to wait for an explicit
    // vuetify/vue internal event finish (isTop watcher logic in this case)
    // eslint-disable-next-line
    cy.wait(500)

    // Verify tooltip should be still visible
    cy.get('.v-overlay__content').should('be.visible')
  })
})
