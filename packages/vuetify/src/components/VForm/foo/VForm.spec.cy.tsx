/// <reference types="../../../../types/cypress" />

import { VTextField } from '@/components'
import { VBtn } from '@/components/VBtn'
import { ref } from 'vue'
import { VForm } from '../VForm'

describe('VForm', () => {
  it.only('should reset inputs', () => {
    const form = ref(null)
    const input = ref('')

    cy.mount(() => (
      <VForm action="/action" ref={ form }>
        <VTextField v-model={ input.value } rules={ [v => !!v || 'Field required'] } />
        <VBtn type="submit">Submit</VBtn>
      </VForm>
    ))

    cy.get('.v-form').then(() => {
      input.value = 'foo'
    })
  })

  it('should not submit form if validation fails', () => {
    cy.mount(() => (
      <VForm action="/action">
        <VTextField rules={ [v => !!v || 'Field required'] } />
        <VBtn type="submit">Submit</VBtn>
      </VForm>
    ))

    cy.get('.v-btn').click().url().should('not.contain', '/action')
    cy.get('.v-text-field').should('have.class', 'v-input--error').find('.v-messages').should('have.text', 'Field required')
  })

  // TODO: This test has to be the last one,
  // because subsequent tests in the same file
  // will break due to the page change
  it('should submit form if validation passes', () => {
    cy.mount(() => (
      <VForm action="/action">
        <VTextField modelValue="foo" rules={ [v => !!v || 'Field required'] } />
        <VBtn type="submit">Submit</VBtn>
      </VForm>
    ))

    cy.get('.v-btn').click().url().should('contain', '/action')
  })
})
