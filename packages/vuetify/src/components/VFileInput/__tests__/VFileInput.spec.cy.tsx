/// <reference types="../../../../types/cypress" />

import { CenteredGrid } from '@/../cypress/templates'
import { ref } from 'vue'
import { VFileInput } from '../VFileInput'

const oneMBFile = new File([new ArrayBuffer(1021576)], '1MB file')
const twoMBFile = new File([new ArrayBuffer(2021152)], '2MB file')

describe('VFileInput', () => {
  it('should add file', () => {
    cy.mount(() => (
      <CenteredGrid width="400px">
        <VFileInput label="foo" counter />
      </CenteredGrid>
    ))
      .get('.v-file-input input')
      .attachFile('text.txt')
      .get('.v-file-input .v-field__input')
      .should('have.text', 'text.txt')
  })

  it('should show number of files', () => {
    cy.mount(() => (
      <CenteredGrid width="400px">
        <VFileInput label="foo" modelValue={[oneMBFile, twoMBFile]} multiple counter />
      </CenteredGrid>
    ))
      .get('.v-file-input .v-input__details')
      .should('have.text', '2 files')
  })

  it('should show size of files', () => {
    cy.mount(() => (
      <CenteredGrid width="400px">
        <VFileInput label="foo" modelValue={[oneMBFile, twoMBFile]} multiple show-size />
      </CenteredGrid>
    ))
      .get('.v-file-input .v-field__input')
      .should('have.text', '1MB file (1.0 MB), 2MB file (2.0 MB)')
  })

  it('should show total size of files in counter', () => {
    cy.mount(() => (
      <CenteredGrid width="400px">
        <VFileInput label="foo" modelValue={[oneMBFile, twoMBFile]} multiple counter show-size />
      </CenteredGrid>
    ))
      .get('.v-file-input .v-input__details')
      .should('have.text', '2 files (3.0 MB in total)')
  })

  it('should clear input', () => {
    const model = ref([oneMBFile, twoMBFile])
    cy.mount(() => (
      <CenteredGrid width="400px">
        <VFileInput label="foo" v-model={model.value} />
      </CenteredGrid>
    ))
      .get('.v-field__clearable > .v-icon')
      .click()
      .get('.v-input input')
      .should('have.value', '')
  })

  it('should support removing clearable icon', () => {
    cy.mount(() => (
      <CenteredGrid width="400px">
        <VFileInput label="foo" modelValue={[oneMBFile, twoMBFile]} clearable={false} />
      </CenteredGrid>
    ))
      .get('.v-field__append-inner > .v-btn')
      .should('not.exist')
  })

  it('should be disabled', () => {
    cy.mount(() => (
      <CenteredGrid width="400px">
        <VFileInput label="foo" modelValue={[oneMBFile, twoMBFile]} disabled />
      </CenteredGrid>
    ))
      .get('.v-file-input')
      .should('have.class', 'v-field--disabled')
      .get('.v-file-input input')
      .should('have.attr', 'disabled')
  })

  it('should support no prepend outer icon', () => {
    cy.mount(() => (
      <CenteredGrid width="400px">
        <VFileInput label="foo" modelValue={[oneMBFile, twoMBFile]} prependIcon="" />
      </CenteredGrid>
    ))
      .get('.v-file-input .v-input__prepend')
      .should('not.exist')
  })

  it('should support chips', () => {
    cy.mount(() => (
      <CenteredGrid width="400px">
        <VFileInput label="foo" modelValue={[oneMBFile, twoMBFile]} chips />
      </CenteredGrid>
    ))
      .get('.v-file-input .v-chip')
      .should('have.length', 2)
  })

  // https://github.com/vuetifyjs/vuetify/issues/8167
  it('should not emit change event when input is blurred', () => {
    const change = cy.spy().as('change')
    const update = cy.spy().as('update')
    cy.mount(() => (
      <VFileInput label="foo" />
    ), {
      props: {
        onChange: change,
        'onUpdate:modelValue': update,
      },
    })
      .get('.v-file-input input')
      .focus()
      .attachFile('text.txt')
      .blur()
      .then(() => {
        // expect(change).to.be.calledOnce // TODO: #14126
        expect(update).to.be.calledOnce
      })
  })

  it('should put extra attributes on input', () => {
    cy.mount(() => (
      <CenteredGrid width="400px">
        <VFileInput label="foo" accept="image/*" />
      </CenteredGrid>
    ))
      .get('.v-file-input input')
      .should('have.attr', 'accept', 'image/*')
  })
})
