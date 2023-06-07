/// <reference types="../../../../types/cypress" />

import { VTextarea } from '..'

// Utilities
import { ref } from 'vue'

describe('VTextarea', () => {
  it('should auto-grow', () => {
    cy.viewport(500, 500)
    const model = ref('Lorem ipsum dolor sit amet consectetur adipisicing elit. ')
    cy.mount(() => <VTextarea auto-grow rows="1" v-model={ model.value } />)
      .get('textarea').first()
      .should(el => expect(el.outerHeight()).to.equal(56))
      .click()
      .type('Eos q')
      .should(el => expect(el.outerHeight()).to.equal(56))
      .type('u')
      .should(el => expect(el.outerHeight()).to.equal(82))
  })

  it('should respect max-rows', () => {
    cy.viewport(500, 500)
    const model = ref('Lorem ipsum dolor sit amet consectetur adipisicing elit. ')
    cy.mount(() => <VTextarea auto-grow rows="1" max-rows="2" v-model={ model.value } />)
      .get('textarea').first()
      .should(el => expect(el.outerHeight()).to.equal(56))
      .click()
      .type('Lorem ipsum dolor sit amet consectetur adipisicing elit. ')
      .should(el => expect(el.outerHeight()).to.equal(82))
      .type('Lorem ipsum dolor sit amet consectetur adipisicing elit. ')
      .should(el => expect(el.outerHeight()).to.equal(82))
  })
})
