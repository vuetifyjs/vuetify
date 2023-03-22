/// <reference types="../../../../types/cypress" />

import { CenteredGrid } from '@/../cypress/templates'
import { VListItem } from '../'

describe('VListItem', () => {
  it('supports header text props, title and subtitle', () => {
    cy.mount(() => (
      <CenteredGrid width="200px">
        <h2 class="mt-8">ListItem Header Text</h2>

        <VListItem title="foo" subtitle="bar" />
      </CenteredGrid>
    ))

    cy.get('.v-list-item-title').contains('foo')
      .get('.v-list-item-subtitle').contains('bar')
  })

  // https://github.com/vuetifyjs/vuetify/issues/13893
  it('should use active-color for active item', () => {
    cy.mount(props => (
      <CenteredGrid width="200px">
        <VListItem title="foo" subtitle="bar" active-color="success" { ...props } />
      </CenteredGrid>
    ))

    cy.get('.v-list-item')
      .should('not.have.class', 'text-success')
      .setProps({ active: true })
      .get('.v-list-item')
      .should('have.class', 'text-success')
  })

  it('should render prepend and append slots', () => {
    cy.mount(props => (
      <CenteredGrid width="200px">
        <VListItem
          title="foo"
          subtitle="bar"
          prepend-icon="$success"
          { ...props }
        />
      </CenteredGrid>
    ))

    cy.get('.v-list-item__prepend').should('exist')
      .get('.v-list-item__append').should('not.exist')
      .setProps({ appendIcon: '$success', prependIcon: undefined })
      .get('.v-list-item__append').should('exist')
      .get('.v-list-item__prepend').should('not.exist')
  })
})
