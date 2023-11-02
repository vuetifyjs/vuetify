/// <reference types="../../../../types/cypress" />

// Components
import { VOtpInput } from '../VOtpInput'

// Utilities
import { keyValues } from '@/util'

describe('VOtpInput', () => {
  it('enters value and moves to next input', () => {
    cy.mount(() => (<VOtpInput />))
      .get('.v-otp-input input').eq(0)
      .type('1')
      .get('.v-otp-input input').eq(1)
      .should('be.focused')
      .type('2')
      .get('.v-otp-input input').eq(2)
      .should('be.focused')
      .type('3')
      .get('.v-otp-input input').eq(3)
      .should('be.focused')
      .type('4')
      .get('.v-otp-input input').eq(4)
      .should('be.focused')
      .type('5')
      .get('.v-otp-input input').eq(5)
      .should('be.focused')
      .type('6')
      .should('be.focused')
  })

  it('enters value and moves to next input when focused index is not next', () => {
    cy.mount(() => (<VOtpInput />))
      .get('.v-otp-input input').eq(0)
      .type('1')
      .get('.v-otp-input input').eq(1)
      .should('be.focused')
      .get('.v-otp-input input').eq(3)
      .type('2')
      .get('.v-otp-input input').eq(2)
      .should('be.focused')
  })

  it('removes value and stays on current input when using delete', () => {
    cy.mount(() => (<VOtpInput />))
      .get('.v-otp-input input').eq(0)
      .type('1234')
      .get('.v-otp-input input').eq(4)
      .should('be.focused')
      .trigger('keydown', { key: keyValues.left })
      .trigger('keydown', { key: keyValues.left })
      .get('.v-otp-input input').eq(2)
      .should('be.focused')
      .should('have.value', '3')
      .trigger('keydown', { key: keyValues.delete })
      .should('have.value', '4')
  })

  it('removes value and goes back when using backspace', () => {
    cy.mount(() => (<VOtpInput />))
      .get('.v-otp-input input').eq(0)
      .type('1234')
      .get('.v-otp-input input').eq(4)
      .should('be.focused')
      .trigger('keydown', { key: keyValues.backspace })
      .get('.v-otp-input input').eq(3)
      .should('be.focused')
      .should('have.value', 4)
      .trigger('keydown', { key: keyValues.backspace })
      .get('.v-otp-input input').eq(2)
      .should('be.focused')
      .should('have.value', 3)
  })
})
