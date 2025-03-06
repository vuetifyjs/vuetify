/// <reference types="../../../../types/cypress" />

import { VDatePicker } from '..'
import { Application } from '@/../cypress/templates'

// Utilities
import { ref } from 'vue'

describe('VDatePicker', () => {
  it('selects a range of dates', () => {
    const model = ref<unknown[]>([])
    cy.mount(() => (
      <Application>
        <VDatePicker v-model={ model.value } multiple="range" />
      </Application>
    ))

    cy.get('.v-date-picker-month__day').contains(10).click()
    cy.get('.v-date-picker-month__day').contains(20).click()
      .then(() => {
        expect(model.value).to.have.length(11)
      })
  })

  it('selects a range of dates across month boundary', () => {
    const model = ref<unknown[]>([])
    cy.mount(() => (
      <Application>
        <VDatePicker v-model={ model.value } multiple="range" />
      </Application>
    ))

    cy.get('.v-date-picker-controls__month-btn').click()
    cy.get('.v-date-picker-months__content').contains('Jan').click()
    cy.get('.v-date-picker-month__day').contains(7).click()
    cy.get('.v-date-picker-controls__month-btn').click()
    cy.get('.v-date-picker-months__content').contains('Feb').click()
    cy.get('.v-date-picker-month__day').contains(7).click()
      .then(() => {
        expect(model.value).to.have.length(32)
      })
  })
})
