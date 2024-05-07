/// <reference types="../../../../types/cypress" />

import { VConfirmEdit } from '..'

// Utilities
import { ref } from 'vue'

// Tests
describe('VConfirmEdit', () => {
  it('mirrors external updates', () => {
    const externalModel = ref('foo')

    cy.mount(() => (
      <VConfirmEdit modelValue={ externalModel.value }>
        { ({ model }) => (
          <p>{ model.value }</p>
        )}
      </VConfirmEdit>
    )).get('p')
      .should('have.text', 'foo')
      .then(() => {
        externalModel.value = 'bar'
      })
      .get('p')
      .should('have.text', 'bar')
  })

  it(`doesn't mutate the original value`, () => {
    const externalModel = ref(['foo'])

    cy.mount(
      <VConfirmEdit v-model={ externalModel.value } modelValue={ externalModel.value }>
        { ({ model }) => (
          <>
            <p>{ model.value.join(',') }</p>
            <button data-test="push" onClick={ () => model.value.push('bar') }>Push</button>
          </>
        )}
      </VConfirmEdit>
    ).get('p')
      .should('have.text', 'foo')
      .get('[data-test="push"]').click()
      .get('p')
      .should('have.text', 'foo,bar')
      .then(() => {
        expect(externalModel.value).to.deep.equal(['foo'])
      })
    cy.contains('.v-btn', 'OK').click()
    cy.get('p')
      .should('have.text', 'foo,bar')
      .then(() => {
        expect(externalModel.value).to.deep.equal(['foo', 'bar'])
      })
  })

  it('hides actions if used from the slot', () => {
    cy.mount(
      <VConfirmEdit></VConfirmEdit>
    ).get('.v-btn').should('have.length', 2)

    cy.mount(
      <VConfirmEdit>
        { ({ model }) => {
          void model
        }}
      </VConfirmEdit>
    ).get('.v-btn').should('have.length', 2)

    cy.mount(
      <VConfirmEdit>
        { ({ actions }) => {
          void actions
        }}
      </VConfirmEdit>
    ).get('.v-btn').should('have.length', 0)

    cy.mount(
      <VConfirmEdit>
        { ({ actions }) => actions }
      </VConfirmEdit>
    ).get('.v-btn').should('have.length', 2)
  })
})
