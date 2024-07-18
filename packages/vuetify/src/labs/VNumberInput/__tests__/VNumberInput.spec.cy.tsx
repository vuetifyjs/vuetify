/// <reference types="../../../../types/cypress" />

// Components
import { VNumberInput } from '../VNumberInput'
import { VForm } from '@/components/VForm'

// Utilities
import { ref } from 'vue'

describe('VNumberInput', () => {
  describe('readonly', () => {
    it('should prevent mutation when readonly applied', () => {
      const value = ref(1)

      cy.mount(() => (
        <>
          <VNumberInput
            class="standalone-input"
            v-model={ value.value }
            readonly
          />
        </>
      ))

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
    it('should prevent mutation when readonly applied to parent form', () => {
      const value = ref(1)

      cy.mount(() => (
        <>
          <VForm readonly>
            <VNumberInput
              class="input-in-form"
              v-model={ value.value }
            />
          </VForm>
        </>
      ))

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

  describe('parsing pasted values', () => {
    it('should parse valid numbers correctly', () => {
      const scenarios = [
        { text: '-0', expected: '0' },
        { text: '-00123', expected: '-123' },
        { text: '.250', expected: '0.25' },
        { text: '000.321', expected: '0.321' },
        { text: '100.000', expected: '100' },
      ]
      scenarios.forEach(({ text, expected }) => {
        cy.mount(() => <VNumberInput />)
        cy.window().its('navigator.clipboard').then((clip: Clipboard) => clip.writeText(text))
        cy.get('.v-number-input input').focus()
        cy.document().invoke('execCommand', 'paste')
        cy.get('.v-number-input input').blur().should('have.value', expected)
      })
    })

    it('should retrieve digits when pasted value contains some mixed characters', () => {
      const scenarios = [
        { text: ' 1,250.32\n', expected: '1250.32' },
        { text: '1\'024.00 meters', expected: '1024' },
        { text: '- 1123.', expected: '-1123' },
      ]
      scenarios.forEach(({ text, expected }) => {
        cy.mount(() => <VNumberInput />)
        cy.window().its('navigator.clipboard').then((clip: Clipboard) => clip.writeText(text))
        cy.get('.v-number-input input').focus()
        cy.document().invoke('execCommand', 'paste')
        cy.get('.v-number-input input').blur().should('have.value', expected)
      })
    })

    it('should use as much characters as possible to display value containing only received digits', () => {
      const scenarios = [
        { text: '0.000010', expected: '0.00001' },
        { text: '0.012340', expected: '0.01234' },
        { text: '099999990.000000010', expected: '99999990.00000001' },
        { text: '99999999999999999999999999999', expected: '999999999999999' },
        { text: '0.999999999999999999999999999', expected: '0.999999999999999' },
        { text: '3.9999999999999995', expected: '3.999999999999999' },
      ]
      scenarios.forEach(({ text, expected }) => {
        cy.mount(() => <VNumberInput />)
        cy.window().its('navigator.clipboard').then((clip: Clipboard) => clip.writeText(text))
        cy.get('.v-number-input input').focus()
        cy.document().invoke('execCommand', 'paste')
        cy.get('.v-number-input input').blur().should('have.value', expected)
      })
    })
  })

  describe('typing values', () => {
    it('should ignore invalid and duplicated characters', () => {
      const scenarios = [
        { text: '+1\'234.12 meters', expected: '1234.12' },
        { text: '-12 34 55', expected: '-123455' },
        { text: '1,123..50', expected: '1123.5' },
        { text: 'abc--', expected: '' },
        { text: '00.123.40', expected: '0.1234' },
      ]
      scenarios.forEach(({ text, expected }) => {
        cy.mount(() => <VNumberInput />)
        cy.get('.v-number-input input').focus().realType(text)
        cy.get('.v-number-input input').blur().should('have.value', expected)
      })
    })

    it('should enforce range by replacing text typed by user', () => {
      const scenarios = [
        { text: '9999', expected: '50' },
        { text: '-99', expected: '-25' },
      ]
      scenarios.forEach(({ text, expected }) => {
        cy.mount(() => <VNumberInput min={ -25 } max={ 50 } />)
        cy.get('.v-number-input input').focus().realType(text)
        cy.get('.v-number-input input').blur().should('have.value', expected)
      })
    })

    it('should not interrupt typing float numbers', () => {
      const scenarios = [
        { text: '0.12{backspace}{backspace}89', expected: '0.89' },
        { text: '-.{backspace}25.{backspace}0.50{backspace}{backspace}99', expected: '-250.99' },
      ]
      scenarios.forEach(({ text, expected }) => {
        cy.mount(() => <VNumberInput />)
        cy.get('.v-number-input input').focus().realType(text)
        cy.get('.v-number-input input').blur().should('have.value', expected)
      })
    })
  })
})
