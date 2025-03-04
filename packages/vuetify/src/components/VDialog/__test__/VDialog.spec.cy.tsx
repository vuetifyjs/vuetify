/// <reference types="../../../../types/cypress" />

// Components
import { VDialog } from '..'

// Utilities
import { ref } from 'vue'

// Tests
describe('VDialog', () => {
  it('should render correctly', () => {
    const model = ref(false)
    cy.mount(() => (
      <VDialog v-model={ model.value } data-test="dialog">
        <div data-test="content">Content</div>
      </VDialog>
    )).get('[data-test="dialog"]').should('not.exist')
      .then(() => { model.value = true })
      .get('[data-test="dialog"]').should('be.visible')
      .get('[data-test="content"]').should('be.visible')
      .get('body').click()
      .then(() => {
        expect(model.value).to.be.false
      })
      .get('[data-test="dialog"]').should('not.exist')
      .get('[data-test="content"]').should('not.exist')
  })

  it('should emit afterLeave', () => {
    const model = ref(true)
    const onAfterLeave = cy.spy().as('afterLeave')
    cy.mount(() => (
      <VDialog v-model={ model.value } onAfterLeave={ onAfterLeave }>
        <div data-test="content">Content</div>
      </VDialog>
    )).get('body').click()
      .get('@afterLeave').should('have.been.calledOnce')
  })
})
