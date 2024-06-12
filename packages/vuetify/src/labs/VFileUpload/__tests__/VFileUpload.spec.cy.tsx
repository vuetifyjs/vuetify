/// <reference types="../../../../types/cypress" />

import { VFileUpload } from '..'

// Utilities
import { ref } from 'vue'

describe('VFileUpload', () => {
  it('should displays correct default', () => {
    cy.mount(() => <VFileUpload />)
      .get('.v-sheet').should('exist')
      .get('.v-file-upload-divider').should('exist')
      .get('.v-sheet .v-btn').should('exist')
      .get('.v-file-upload-items').should('not.exist')
  })

  it('should displays correct density is comfortable', () => {
    cy.mount(() => <VFileUpload density="comfortable" />)
      .get('.v-sheet').should('exist')
      .get('.v-file-upload-divider').should('not.exist')
      .get('.v-sheet .v-btn').should('not.exist')
      .get('.v-file-upload-items').should('not.exist')
  })

  it('should update correct modelValue', () => {
    const model = ref()
    const change = cy.spy().as('change')
    cy.mount(() => <VFileUpload v-model={ model.value } autoUpload={ false } onChange={ change } />)
      .get('input[type="file"]').attachFile(['example.json'])
      .then(() => {
        expect(model.value).to.be.not.null
        expect(change).to.be.calledOnce
      })
      .get('.v-list-item').should('have.length', 1)
      .get('.v-list-item .v-list-item__content .v-list-item-title').eq(0).should('have.text', 'example.json')
  })

  it('should update correct modelValue with drop', () => {
    const model = ref()
    const change = cy.spy().as('change')
    cy.mount(() => <VFileUpload v-model={ model.value } autoUpload={ false } onChange={ change } />)
      .get('input[type="file"]').attachFile(['example.json'], { subjectType: 'drag-n-drop' })
      .then(() => {
        expect(model.value).to.be.not.null
        expect(change).to.be.calledOnce
      })
      .get('.v-list-item').should('have.length', 1)
      .get('.v-list-item .v-list-item__content .v-list-item-title').eq(0).should('have.text', 'example.json')
  })

  it('should be able to remove fileItem', () => {
    const model = ref()
    cy.mount(() => <VFileUpload v-model={ model.value } autoUpload={ false } clearable />)
      .get('input[type="file"]').attachFile(['example.json', 'text.txt'])
      .then(() => {
        expect(model.value).to.be.not.null
      })
      .get('.v-list-item').should('have.length', 1)
      .get('.v-list-item__append .v-btn').click()
      .get('.v-list-item').should('have.length', 0)
  })

  it('should update correct modelValue with multiple', () => {
    const model = ref([])
    const change = cy.spy().as('change')
    cy.mount(() => <VFileUpload v-model={ model.value } autoUpload={ false } onChange={ change } multiple />)
      .get('input[type="file"]').attachFile(['example.json', 'text.txt'])
      .then(() => {
        expect(model.value).to.be.not.null
        expect(change).to.be.calledOnce
      })
      .get('.v-list-item').should('have.length', 2)
      .get('.v-list-item .v-list-item__content .v-list-item-title').eq(0).should('have.text', 'example.json')
      .get('.v-list-item .v-list-item__content .v-list-item-title').eq(1).should('have.text', 'text.txt')
  })

  it('should update correct modelValue with multiple and drop', () => {
    const model = ref([])
    const change = cy.spy().as('change')
    cy.mount(() => <VFileUpload v-model={ model.value } autoUpload={ false } onChange={ change } multiple />)
      .get('input[type="file"]').attachFile(['example.json', 'text.txt'], { subjectType: 'drag-n-drop' })
      .then(() => {
        expect(model.value).to.be.not.null
        expect(change).to.be.calledOnce
      })
      .get('.v-list-item').should('have.length', 2)
      .get('.v-list-item .v-list-item__content .v-list-item-title').eq(0).should('have.text', 'example.json')
      .get('.v-list-item .v-list-item__content .v-list-item-title').eq(1).should('have.text', 'text.txt')
  })

  it('should upload single file', () => {
    const model = ref()
    const change = cy.spy().as('change')
    cy.mount(() => <VFileUpload v-model={ model.value } onChange={ change } />)
      .get('.v-list-item .v-progress-linear').should('not.exist')
      .get('input[type="file"]').attachFile(['example.json'])
      .get('.v-list-item').should('have.length', 1)
      .get('.v-list-item .v-list-item__content .v-list-item-title').eq(0).should('have.text', 'example.json')
      .get('.v-list-item .v-progress-linear').should('exist')
      .get('.v-list-item .v-progress-linear').should('have.attr', 'aria-valuenow', '100')
      .then(() => {
        expect(model.value).to.be.not.null
        expect(change).to.be.called
      })
  })

  it('should upload multiple files', () => {
    const model = ref([])
    const change = cy.spy().as('change')
    cy.mount(() => <VFileUpload v-model={ model.value } multiple onChange={ change } />)
      .get('.v-list-item .v-progress-linear').should('not.exist')
      .get('input[type="file"]').attachFile(['example.json', 'text.txt'])
      .get('.v-list-item').should('have.length', 2)
      .get('.v-list-item .v-list-item__content .v-list-item-title').eq(0).should('have.text', 'example.json')
      .get('.v-list-item .v-list-item__content .v-list-item-title').eq(1).should('have.text', 'text.txt')
      .get('.v-list-item .v-progress-linear').eq(0).should('exist')
      .get('.v-list-item .v-progress-linear').eq(1).should('exist')
      .get('.v-list-item .v-progress-linear').eq(0).should('have.attr', 'aria-valuenow', '100')
      .get('.v-list-item .v-progress-linear').eq(1).should('have.attr', 'aria-valuenow', '100')
      .then(() => {
        expect(model.value).to.be.not.null
        expect(change).to.be.called
      })
  })

  // it('should delete file while upload', () => {
  // })
})
