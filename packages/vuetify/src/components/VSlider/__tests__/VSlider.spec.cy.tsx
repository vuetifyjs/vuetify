/// <reference types="../../../../types/cypress" />

// Components
import { VSlider } from '..'
import { Application, CenteredGrid } from '@/../cypress/templates'
import { VApp } from '@/components/VApp'

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
      .emitted(VSlider, 'update:modelValue')
      .should('have.length', 1)
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

    cy.get('.v-slider-thumb')
      .swipe([100, 15], [200, 15])
      .emitted(VSlider, 'update:modelValue')
      .should('have.length.gt', 0)
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

      .realPress('ArrowRight')
      .realPress('ArrowLeft')

      .realPress(['Control', 'ArrowRight'])
      .realPress(['Control', 'ArrowLeft'])

      .realPress(['Shift', 'ArrowRight'])
      .realPress(['Shift', 'ArrowLeft'])

      .realPress('PageUp')
      .realPress('PageDown')

      .realPress('End')
      .realPress('Home')

      .emitted(VSlider, 'update:modelValue')
      .should('deep.equal', [
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

  it('should show thumb-label when focused', () => {
    cy.mount(() => (
      <VApp>
        <CenteredGrid width="300px">
          <VSlider thumbLabel />
        </CenteredGrid>
      </VApp>
    ))

    cy.get('.v-slider-thumb').focus()
      .get('.v-slider-thumb__label').should('be.visible')
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
      .realPress('ArrowRight')
      .emitted(VSlider, 'update:modelValue')
      .should('deep.equal', [
        [2],
      ])
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
      .get('.v-slider').eq(1).find('.v-slider-track__tick-label').invoke('text').should('equal', 'abc')
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

  it('should render icons with actions', () => {
    const onClickPrepend = cy.spy().as('onClickPrepend')
    const onClickAppend = cy.spy().as('onClickAppend')

    cy.mount(() => (
      <VApp>
        <CenteredGrid width="300px">
          <VSlider
            prependIcon="mdi-magnify-minus-outline"
            appendIcon="mdi-magnify-plus-outline"
            onClick:prepend={ onClickPrepend }
            onClick:append={ onClickAppend }
          />
        </CenteredGrid>
      </VApp>
    ))

    cy.get('.mdi-magnify-minus-outline').click()
    cy.get('.mdi-magnify-plus-outline').click()

    cy.get('@onClickPrepend').should('have.been.calledOnce')
    cy.get('@onClickAppend').should('have.been.calledOnce')
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

  it('should emit start and end events', () => {
    // eslint-disable-next-line sonarjs/no-identical-functions
    cy.mount(() => (
      <VApp>
        <CenteredGrid width="300px">
          <VSlider />
        </CenteredGrid>
      </VApp>
    ))

    cy.get('.v-slider-thumb').swipe([100, 15], [200, 15])

    cy.vue().then(wrapper => {
      const slider = wrapper.getComponent(VSlider)
      const start = slider.emitted('start')
      expect(start).to.have.length(1)
      const end = slider.emitted('end')
      expect(end).to.have.length(1)
    })
  })

  // https://github.com/vuetifyjs/vuetify/issues/16634
  it('should respect the decimals from both step and min', () => {
    cy.mount(() => (
      <Application>
        <CenteredGrid width="360px">
          <VSlider
            modelValue={ 1.001 }
            step={ 1.001 }
            min={ 1.0001 }
            max={ 10 }
            thumb-label
          />
        </CenteredGrid>
      </Application>
    ))

    cy.get('.v-slider-thumb')
      .trigger('mouseover')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', 35, 0, { force: true }) // move to second step
      .trigger('mousemove', 190, 0, { force: true }) // move to fifth step
      .trigger('mousemove', 360, 0, { force: true }) // move to the final step
      .trigger('mouseup')

    cy.emitted(VSlider, 'update:modelValue')
      .should('deep.equal', [
        [2.0011],
        [6.0051],
        [10],
      ])
  })
})
