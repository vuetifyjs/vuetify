/// <reference types="../../../../types/cypress" />

import { CenteredGrid } from '@/../cypress/templates'
import { VListItem } from '../..'

describe('VListItem', () => {
  function mountFunction (content: JSX.Element) {
    return cy.mount(() => content)
  }

  it('supports header text props, title and subtitle', () => {
    const wrapper = mountFunction((
      <CenteredGrid width="200px">
        <h2 class="mt-8">ListItem Header Text</h2>

        <VListItem title="foo" subtitle="bar" />
      </CenteredGrid>
    ))

    wrapper.get('.v-list-item-title').contains('foo')
    wrapper.get('.v-list-item-subtitle').contains('bar')
  })
})
