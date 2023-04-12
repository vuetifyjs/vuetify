/// <reference types="../../../../types/cypress" />

import { VSwitch } from '../VSwitch'
import { generate, gridOn } from '@/../cypress/templates'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

const contextColor = 'rgb(0, 0, 255)'
const color = 'rgb(255, 0, 0)'
const stories = {
  'Explicit color': gridOn([undefined], [true, false], (_, active) => (
    <div style={{ color: contextColor }}>
      <VSwitch modelValue={ active } color={ color } />
    </div>
  )),
  'Inherited color': gridOn([undefined], [true, false], (_, active) => (
    <div style={{ color: contextColor }}>
      <VSwitch modelValue={ active } />
    </div>
  )),
  'No color': gridOn([undefined], [true, false], (_, active) => (
    <VSwitch modelValue={ active } />
  )),
}

describe('VSwitch', () => {
  describe('Showcase', () => {
    generate({ stories, props: {}, component: VSwitch })
  })

  describe('global configuration', () => {
    it('should only apply \'v-switch\' class to root element and also apply global config class/style', () => {
      cy.mount(() => (
        <VDefaultsProvider defaults={{
          global: {
            class: 'v-global-class',
            style: {
              opacity: 0.5,
            },
          },
        }}
        >

          <VSwitch />
        </VDefaultsProvider>
      ))

      cy.get('.v-switch')
        .should('have.length', 1)
        // assert it's the root element
        .should('have.class', 'v-input')
        .should('have.class', 'v-global-class')
        .should('have.css', 'opacity', '0.5')
    })
  })
})
