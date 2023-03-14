/// <reference types="../../../../types/cypress" />

import { VTextarea } from '..'
import { ref } from 'vue'
import { VDefaultsProvider } from '@/components'

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
      .should(el => expect(el.outerHeight()).to.equal(80))
  })

  it('should respect max-rows', () => {
    cy.viewport(500, 500)
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

  describe('global configuration', () => {
    it('should only apply \'v-textarea\' class to root element and also apply global config class/style', () => {
      cy.mount(() => (
        <VDefaultsProvider defaults={ {
          global: {
            class: 'v-global-class',
            style: {
              opacity: 0.5,
            },
          },
        } }
        >

          <VTextarea />
        </VDefaultsProvider>
      ))

      cy.get('.v-textarea')
        .should('have.length', 1)
        // assert it's the root element
        .should('have.class', 'v-input')
        .should('have.class', 'v-global-class')
        .should('have.css', 'opacity', '0.5')
    })
  })
})
