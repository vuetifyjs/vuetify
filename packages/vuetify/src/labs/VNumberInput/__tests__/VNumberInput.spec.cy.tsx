/// <reference types="../../../../types/cypress" />

// Components
import { VNumberInput } from '../VNumberInput'

// Utilities
import { ref } from 'vue'

describe('VNumberInput', () => {
  describe('native number input quirks', () => {
    it('should not bypass min', () => {
      const numberInputValue = ref(1)
      cy.mount(() =>
        <VNumberInput min={ 5 } max={ 15 } v-model={ numberInputValue.value } ></VNumberInput>
      )
        .get('.v-number-input input').should('have.value', '5')
        .should(() => expect(numberInputValue.value).to.equal(5))
    })

    it('should not bypass max', () => {
      const numberInputValue = ref(20)
      cy.mount(() =>
        <VNumberInput min={ 5 } max={ 15 } v-model={ numberInputValue.value } ></VNumberInput>
      )
        .get('.v-number-input input').should('have.value', '15')
        .should(() => expect(numberInputValue.value).to.equal(15))
    })

    it('should support decimal step', () => {
      const numberInputValue = ref(0)
      cy.mount(() =>
        (
        <VNumberInput
          step={ 0.03 }
          v-model={ numberInputValue.value }
        ></VNumberInput>
        )
      )
        .get('button[name="increment-btn"]')
        .click()
        .get('.v-number-input input').should('have.value', '0.03')
        .then(() => expect(numberInputValue.value).to.equal(0.03))
        .get('button[name="increment-btn"]')
        .click()
        .get('.v-number-input input').should('have.value', '0.06')
        .then(() => expect(numberInputValue.value).to.equal(0.06))
        .get('button[name="decrement-btn"]')
        .click()
        .get('.v-number-input input').should('have.value', '0.03')
        .then(() => expect(numberInputValue.value).to.equal(0.03))
        .get('button[name="decrement-btn"]')
        .click()
        .get('.v-number-input input').should('have.value', '0')
        .then(() => expect(numberInputValue.value).to.equal(0))
    })
  })
})
