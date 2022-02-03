/// <reference types="../../../../types/cypress" />

import { VTextarea } from '../VTextarea'
import { ref } from 'vue'

describe('VTextarea', () => {
  it('should auto-grow', () => {
    const model = ref('Lorem ipsum dolor sit amet consectetur adipisicing elit. ')
    cy.mount(() => <VTextarea auto-grow rows="1" v-model={ model.value } />)
      .get('textarea').first()
      .should(el => expect(el.outerHeight()).to.equal(56))
      .click()
      .type('Eos qu')
      .should(el => expect(el.outerHeight()).to.equal(56))
      .type('a')
      .should(el => expect(el.outerHeight()).to.equal(80))
  })

  it('should respect max-rows', () => {
    const model = ref('Lorem ipsum dolor sit amet consectetur adipisicing elit. ')
    cy.mount(() => <VTextarea auto-grow rows="1" max-rows="2" v-model={ model.value } />)
      .get('textarea').first()
      .should(el => expect(el.outerHeight()).to.equal(56))
      .click()
      .type('Lorem ipsum dolor sit amet consectetur adipisicing elit. ')
      .should(el => expect(el.outerHeight()).to.equal(80))
      .type('Lorem ipsum dolor sit amet consectetur adipisicing elit. ')
      .should(el => expect(el.outerHeight()).to.equal(80))
  })
})
