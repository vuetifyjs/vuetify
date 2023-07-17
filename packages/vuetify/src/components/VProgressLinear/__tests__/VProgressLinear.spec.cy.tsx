/// <reference types="../../../../types/cypress" />

// Components
import { VProgressLinear } from '../VProgressLinear'
import { CenteredGrid } from '@/../cypress/templates'
import { VLocaleProvider } from '@/components/VLocaleProvider'

// Utilities
import { defineComponent, ref } from 'vue'

describe('VProgressLinear', () => {
  it('supports modelValue prop', () => {
    cy.mount(() => (
      <CenteredGrid width="100px">
        <VProgressLinear modelValue={ 25 } />
      </CenteredGrid>
    ))
      .get('.v-progress-linear__determinate')
      .should('have.css', 'width', '25px')
      .should('have.css', 'left', '0px')
  })

  it('supports RTL mode', () => {
    cy.mount(() => (
      <CenteredGrid width="100px">
        <VLocaleProvider rtl>
          <VProgressLinear modelValue={ 25 } />
        </VLocaleProvider>
      </CenteredGrid>
    ))
      .get('.v-progress-linear__determinate')
      .should('have.css', 'width', '25px')
      .should('have.css', 'right', '0px')
  })

  it('supports reverse prop', () => {
    cy.mount(() => (
      <CenteredGrid width="100px">
        <VProgressLinear modelValue={ 25 } reverse />
      </CenteredGrid>
    ))
      .get('.v-progress-linear__determinate')
      .should('have.css', 'width', '25px')
      .should('have.css', 'right', '0px')
  })

  it('supports reverse prop and RTL mode together', () => {
    cy.mount(() => (
      <CenteredGrid width="100px">
        <VLocaleProvider rtl>
          <VProgressLinear modelValue={ 25 } reverse />
        </VLocaleProvider>
      </CenteredGrid>
    ))
      .get('.v-progress-linear__determinate')
      .should('have.css', 'width', '25px')
      .should('have.css', 'left', '0px')
  })

  it('supports color props', () => {
    cy.mount(() => (
      <CenteredGrid width="100px">
        <VProgressLinear modelValue={ 25 } color="secondary" bgColor="error" />
      </CenteredGrid>
    ))
      .get('.v-progress-linear__determinate')
      .should('have.class', 'bg-secondary')
      .get('.v-progress-linear__background')
      .should('have.class', 'bg-error')
  })

  it('supports indeterminate prop', () => {
    cy.mount(() => (
      <CenteredGrid width="100px">
        <VProgressLinear modelValue={ 25 } indeterminate />
      </CenteredGrid>
    ))
      .get('.v-progress-linear__indeterminate')
      .should('exist')
  })

  it('supports bufferValue prop', () => {
    cy.mount(() => (
      <CenteredGrid width="100px">
        <VProgressLinear modelValue={ 25 } stream bufferValue={ 50 } />
      </CenteredGrid>
    ))
      .get('.v-progress-linear__background')
      .should('have.css', 'width', '50px')
  })

  it('supports height prop', () => {
    cy.mount(() => (
      <CenteredGrid width="100px">
        <VProgressLinear modelValue={ 25 } height={ 50 } />
      </CenteredGrid>
    ))
      .get('.v-progress-linear')
      .should('have.css', 'height', '50px')
  })

  it('supports active prop', () => {
    cy.mount(() => (
      <CenteredGrid width="100px">
        <VProgressLinear modelValue={ 25 } active={ false } />
      </CenteredGrid>
    ))
      .get('.v-progress-linear')
      .should('have.css', 'height', '0px')
  })

  it('supports clickable prop', () => {
    cy.mount(defineComponent(() => {
      const model = ref(0)
      return () => (
        <CenteredGrid width="100px">
          <VProgressLinear v-model={ model.value } clickable />
        </CenteredGrid>
      )
    }))
      .get('.v-progress-linear')
      .click('center')
      .get('.v-progress-linear__determinate')
      .should('have.css', 'width', '50px')
  })

  it('supports default slot', () => {
    cy.mount(() => (
      <CenteredGrid width="100px">
        <VProgressLinear modelValue={ 25 } height={ 20 }>
          {{
            default: (props: any) => <div>{ props.value }%</div>,
          }}
        </VProgressLinear>
      </CenteredGrid>
    ))
      .get('.v-progress-linear__content')
      .should('exist')
      .should('have.text', '25%')
  })
})
