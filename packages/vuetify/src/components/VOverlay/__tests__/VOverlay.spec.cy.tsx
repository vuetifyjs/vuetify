/// <reference types="../../../../types/cypress" />

import { ref } from 'vue'
import VOverlay from '../VOverlay'

describe('VOverlay', () => {
  it('without activator', () => {
    const model = ref(false)
    cy.mount(() => (
      <VOverlay v-model={ model.value }>
        <div data-test="content">Content</div>
      </VOverlay>
    ))
      .get('[data-test="content"]').should('not.exist')
      // .setProps({ modelValue: true })
      .then(() => {
        model.value = true
      })
      .get('[data-test="content"]').should('be.visible')
      .get('body').click()
      .get('[data-test="content"]').should('not.exist')
      .then(() => {
        expect(model.value).to.be.false
      })
  })
})
