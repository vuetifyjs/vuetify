/// <reference types="../../../../types/cypress" />

import { ref } from 'vue'
import { VCheckboxBtn } from '../'

describe('VCheckboxBtn', () => {
  it('should function without v-model', () => {
    cy.mount(() => (
      <VCheckboxBtn />
    ))

    cy.get('.v-checkbox-btn').click(20, 20)

    cy.get('input').should('be.checked')

    cy.get('.v-checkbox-btn').click(20, 20)

    cy.get('input').should('not.be.checked')
  })

  it('should function with v-model', () => {
    const model = ref(false)
    cy.mount(() => (
      <VCheckboxBtn v-model={ model.value } />
    ))

    cy.get('.v-checkbox-btn').click(20, 20)

    cy.get('input').should('be.checked').then(() => {
      expect(model.value).to.be.true
    })

    cy.get('.v-checkbox-btn').click(20, 20)

    cy.get('input').should('not.be.checked').then(() => {
      expect(model.value).to.be.false
    })
  })

  it('should display indeterminate status', () => {
    cy.mount(() => (
      <VCheckboxBtn modelValue={ false } indeterminate />
    ))

    cy.get('input').should('have.attr', 'aria-checked', 'mixed')
  })
})
