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
        { text: 'text 1024 text', expected: '1024' },
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
        { text: '0.000000010', expected: '0.00000001' },
        { text: '0.000000012340', expected: '0.00000001234' },
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
        { text: '+=1234... abc e12', expected: '1234.12' },
        { text: '-12:34:55', expected: '-123455' },
        { text: '1,123..50', expected: '1123.5' },
        { text: 'abc--', expected: '' },
        { text: '  000.00.123.40', expected: '0.001234' },
      ]
      scenarios.forEach(({ text, expected }) => {
        cy.mount(() => <VNumberInput />)
        cy.get('.v-number-input input').focus().realType(text)
        cy.get('.v-number-input input').blur().should('have.value', expected)
      })
    })

    it('should block new digits when underlying number cannot be represented with the same characters', () => {
      const scenarios = [
        { text: '0.000000010', expected: '0.00000001' },
        { text: '099999990.000000010', expected: '99999990.00000001' },
        { text: '99999999999999999999999999999', expected: '999999999999999' },
        { text: '0.999999999999999999999999999', expected: '0.999999999999999' },
        { text: '3.9999999999999995', expected: '3.999999999999999' },
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
  })
})
