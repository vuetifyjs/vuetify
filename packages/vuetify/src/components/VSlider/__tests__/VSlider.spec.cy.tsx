/// <reference types="../../../../types/cypress" />

import { VApp } from '@/components/VApp'
import { CenteredGrid } from '@/../cypress/templates'
import { VSlider } from '..'

describe('VSlider', () => {
  it('should react to clicking on track', () => {
    cy.mount(() => (
      <VApp>
        <CenteredGrid width="300px">
          <VSlider />
        </CenteredGrid>
      </VApp>
    ))

    cy.get('.v-slider').click(100, 15)

    cy.vue().then(({ wrapper }) => {
      const slider = wrapper.getComponent(VSlider)
      const emits = slider.emitted('update:modelValue')
      expect(emits).to.have.length(1)
    })
  })

  it('should allow user to drag thumb', () => {
    // eslint-disable-next-line sonarjs/no-identical-functions
    cy.mount(() => (
      <VApp>
        <CenteredGrid width="300px">
          <VSlider />
        </CenteredGrid>
      </VApp>
    ))

    cy.get('.v-slider-thumb').swipe([100, 15], [200, 15])

    // eslint-disable-next-line sonarjs/no-identical-functions
    cy.vue().then(({ wrapper }) => {
      const slider = wrapper.getComponent(VSlider)
      const emits = slider.emitted('update:modelValue')

      expect(emits).length.to.be.gt(0)
    })
  })

  it('should allow user to interact using keyboard', () => {
    cy.mount(() => (
      <VApp>
        <CenteredGrid width="300px">
          <VSlider max={ 20 } step={ 1 } />
        </CenteredGrid>
      </VApp>
    ))

    cy.realPress('Tab')

    cy.realPress('ArrowRight')
    cy.realPress('ArrowLeft')

    cy.realPress(['Control', 'ArrowRight'])
    cy.realPress(['Control', 'ArrowLeft'])

    cy.realPress(['Shift', 'ArrowRight'])
    cy.realPress(['Shift', 'ArrowLeft'])

    cy.realPress('PageUp')
    cy.realPress('PageDown')

    cy.realPress('End')
    cy.realPress('Home')

    cy.vue().then(({ wrapper }) => {
      const slider = wrapper.getComponent(VSlider)
      const emits = slider.emitted('update:modelValue')
      expect(emits).to.deep.equal([
        [1],
        [0],
        [2],
        [0],
        [3],
        [0],
        [10],
        [0],
        [20],
        [0],
      ])
    })
  })

  it('should show thumb-label when focused', () => {
    cy.mount(() => (
      <VApp>
        <CenteredGrid width="300px">
          <VSlider thumbLabel />
        </CenteredGrid>
      </VApp>
    ))

    cy.get('.v-slider-thumb').focus()

    cy.get('.v-slider-thumb__label').should('be.visible')
  })

  it('should always show thumb-label', () => {
    cy.mount(() => (
      <VApp>
        <CenteredGrid width="300px">
          <VSlider thumbLabel="always" />
        </CenteredGrid>
      </VApp>
    ))

    cy.get('.v-slider-thumb__label').should('be.visible')
  })

  it('should respect step prop', () => {
    cy.mount(() => (
      <VApp>
        <CenteredGrid width="300px">
          <VSlider step={ 2 } min={ 0 } max={ 10 } />
        </CenteredGrid>
      </VApp>
    ))

    cy.realPress('Tab')
    cy.realPress('ArrowRight')

    cy.vue().then(({ wrapper }) => {
      const slider = wrapper.getComponent(VSlider)
      const emits = slider.emitted('update:modelValue')
      expect(emits).to.deep.equal([
        [2],
      ])
    })
  })

  it('should show custom ticks', () => {
    cy.mount(() => (
      <VApp>
        <CenteredGrid width="300px">
          <VSlider ticks={[0, 2, 8, 10]} min={ 0 } max={ 10 } step={ 1 } showTicks="always" />

          <VSlider ticks={{ 0: 'a', 5: 'b', 10: 'c' }} min={ 0 } max={ 10 } step={ 1 } showTicks="always" />
        </CenteredGrid>
      </VApp>
    ))

    cy.get('.v-slider').eq(0).find('.v-slider-track__tick-label').invoke('text').should('equal', '02810')
    cy.get('.v-slider').eq(1).find('.v-slider-track__tick-label').invoke('text').should('equal', 'abc')
  })

  it('should render icons', () => {
    cy.mount(() => (
      <VApp>
        <CenteredGrid width="300px">
          <VSlider prependIcon="mdi-home" appendIcon="mdi-home" />
        </CenteredGrid>
      </VApp>
    ))

    cy.get('.mdi-home').should('have.length', 2)
  })

  it('should render vertical slider', () => {
    cy.mount(() => (
      <VApp>
        <CenteredGrid width="300px">
          <VSlider direction="vertical" />
        </CenteredGrid>
      </VApp>
    ))
  })

  it('should show messages', () => {
    cy.mount(() => (
      <VApp>
        <CenteredGrid width="300px">
          <VSlider messages="This is a message" />
        </CenteredGrid>
      </VApp>
    ))

    cy.get('.v-messages__message').should('be.visible')
  })

  it('should not react to user input if disabled', () => {
    cy.mount(() => (
      <VApp>
        <CenteredGrid width="300px">
          <VSlider disabled />
        </CenteredGrid>
      </VApp>
    ))
  })
})
