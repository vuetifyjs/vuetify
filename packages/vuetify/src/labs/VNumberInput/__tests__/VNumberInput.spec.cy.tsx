/// <reference types="../../../../types/cypress" />

// Components
import { VNumberInput } from '../VNumberInput'
import { VForm } from '@/components/VForm'

// Utilities
import { ref } from 'vue'

describe('VNumberInput', () => {
  it('should prevent mutation when readonly', () => {
    const value1 = ref(1)
    const value2 = ref(1)

    cy.mount(() => (
      <>
        <VNumberInput
          class="standalone-input"
          v-model={ value1.value }
          readonly
        />
        <VForm readonly>
          <VNumberInput
            class="input-in-form"
            v-model={ value2.value }
          />
        </VForm>
      </>
    ))

    const selectors = ['.standalone-input', '.input-in-form']
    selectors.forEach((selector: string) => {
      cy.get(selector)
        .first()
        .within(() => {
          cy.get('.v-field input').as('input')
          cy.get('.v-number-input__control .v-btn:first-child').click({ force: true })
          cy.get('@input').should('have.value', '1')

          cy.get('.v-number-input__control .v-btn:last-child').click({ force: true })
          cy.get('@input').should('have.value', '1')

          cy.get('@input')
            .focus()
            .type('{uparrow}', { force: true })
            .should('have.value', '1')
            .type('{downarrow}', { force: true })
            .should('have.value', '1')
        })
    })
  })

  it('should keep original value when readonly or disabled', () => {
    const value1 = ref(120)
    const value2 = ref(-15)
    const value3 = ref(40.4)
    const value4 = ref(-8.6)

    cy.mount(() => (
      <>
      <VNumberInput
        class="readonly-input-1"
        v-model={ value1.value }
        min={ 0 }
max={ 50 }
        readonly
      />
      <VNumberInput
        class="readonly-input-2"
        v-model={ value2.value }
        min={ 0 }
max={ 50 }
        readonly
      />
        <VNumberInput
          class="disabled-input-1"
          v-model={ value3.value }
          min={ 0 }
max={ 10 }
          disabled
        />
        <VNumberInput
          class="disabled-input-2"
          v-model={ value4.value }
          min={ 0 }
max={ 10 }
          disabled
        />
      </>
    ))

    cy.get('.readonly-input-1 input').should('have.value', '120')
    cy.get('.readonly-input-2 input').should('have.value', '-15')
    cy.get('.disabled-input-1 input').should('have.value', '40.4')
    cy.get('.disabled-input-2 input').should('have.value', '-8.6')
  })

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
