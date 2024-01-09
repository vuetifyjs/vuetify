/// <reference types="../../../../types/cypress" />

import { VItem, VItemGroup } from '../'
import { VCard } from '../../VCard'

describe('VItemGroup', () => {
  // https://github.com/vuetifyjs/vuetify/issues/14754
  it('should apply selected-class from both group and item', () => {
    cy.mount(() => (
      <VItemGroup selected-class="font-weight-bold" class="d-flex text-center justify-center">
        <VItem value="foo" selected-class="bg-blue">
          {{
            default: props => <VCard width="100" class={ props.selectedClass } onClick={ props.toggle }>Foo</VCard>,
          }}
        </VItem>
        <VItem value="bar" selected-class="bg-orange">
          {{
            default: props => <VCard width="100" class={ props.selectedClass } onClick={ props.toggle }>Bar</VCard>,
          }}
        </VItem>
      </VItemGroup>
    ))

    cy.get('.v-card').eq(0).click().should('have.class', 'bg-blue').should('have.class', 'font-weight-bold')
    cy.get('.v-card').eq(1).click().should('have.class', 'bg-orange').should('have.class', 'font-weight-bold')
  })
})
