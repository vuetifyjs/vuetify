/// <reference types="../../../../types/cypress" />

import { CenteredGrid } from '@/../cypress/templates'
import VBtn from '../VBtn'

describe('VBtn', () => {
  it('supports the color property', () => {
    const colors = ['success', 'info', 'warning', 'error', 'invalid']
    const Buttons = colors.map(color => (
      <VBtn color={color} class="text-capitalize">
        { color } button
      </VBtn>
    ))
    cy.mount(() => (
      <CenteredGrid width="200px">
        <h2 class="mt-8">Buttons by Color</h2>
        { Buttons }
      </CenteredGrid>
    ))
      .get('button')
      .should('have.length', colors.length)
      .then(subjects => {
        Array.from(subjects).forEach((subject, idx) => {
          expect(subject).to.have.class('bg-' + colors[idx])
        })
      })
      .percySnapshot()
  })

  it('supports the rounded property', () => {
    const values = ['0', true, 'xl']

    cy.mount(() => (
      <CenteredGrid width="200px">
        { values.map(value => (
          <VBtn rounded={value}>rounded {value.toString()}</VBtn>
        )) }
      </CenteredGrid>
    )).percySnapshot()
  })

  it('should render <a> tag when using href property', () => {
    cy.mount(() => (
      <CenteredGrid width="200px">
        <VBtn href="http://www.google.com">href button</VBtn>
      </CenteredGrid>
    ))
      .get('a.v-btn')
      .should('have.attr', 'href')
      .should('not.be.empty')
      .and('contain', 'http://www.google.com')
  })

  it('supports tag property', () => {
    cy.mount(() => (
      <CenteredGrid width="200px">
        <VBtn tag="div">href button</VBtn>
      </CenteredGrid>
    ))
      .get('div.v-btn')
      .should('exist')
  })
})
