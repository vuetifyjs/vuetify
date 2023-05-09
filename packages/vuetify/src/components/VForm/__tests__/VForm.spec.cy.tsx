/* eslint-disable sonarjs/no-identical-functions */
/// <reference types="../../../../types/cypress" />

import { ref } from 'vue'
import { Application } from '../../../../cypress/templates'
import { VForm } from '../'
import { VBtn } from '@/components/VBtn'
import { VTextField } from '@/components/VTextField'
import type { SubmitEventPromise } from '@/composables'

describe('VForm', () => {
  it('emits when inputs are updated', () => {
    cy.mount(() => (
      <Application>
        <VForm>
          <VTextField label="Name" rules={[v => v?.length > 10 || 'Name should be longer than 10 characters']}></VTextField>
        </VForm>
      </Application>
    ))

    cy.get('.v-text-field').type('Something!!')
    cy.emitted(VForm, 'update:modelValue')
      .then(emits => {
        expect(emits).to.deep.equal([
          [true],
        ])
      })
      .get('.v-text-field').type('{backspace}{backspace}')
    cy.emitted(VForm, 'update:modelValue')
      .then(emits => {
        expect(emits).to.deep.equal([
          [true],
          [false],
        ])
      })
  })

  it('only emits true if all inputs are explicitly valid', () => {
    cy.mount(() => (
      <Application>
        <VForm>
          <VTextField label="Name" rules={[v => v?.length < 10 || 'Name should be longer than 10 characters']}></VTextField>
          <VTextField label="Email" rules={[v => v?.length < 10 || 'E-mail should be longer than 10 characters']}></VTextField>
        </VForm>
      </Application>
    ))

    cy.get('.v-text-field').eq(0).type('Valid')
    cy.emitted(VForm, 'update:modelValue')
      .then(emits => {
        expect(emits).to.be.undefined
      })
      .get('.v-text-field').eq(1).type('Valid')
    cy.emitted(VForm, 'update:modelValue')
      .then(emits => {
        expect(emits).to.deep.equal([
          [true],
        ])
      })
  })

  it('exposes validate function', () => {
    const form = ref()
    cy.mount(() => (
      <Application>
        <VForm ref={ form }>
          <VTextField label="Name" rules={[v => !!v || 'Name required']}></VTextField>
        </VForm>
      </Application>
    ))

    cy.get('.v-form')
      .then(async () => {
        const { valid } = await form.value.validate()
        expect(valid).to.equal(false)
      })
      .get('.v-text-field').should('have.class', 'v-input--error')
  })

  it('exposes reset function', () => {
    const form = ref()
    cy.mount(() => (
      <Application>
        <VForm ref={ form }>
          <VTextField label="Name" rules={[v => v?.length > 10 || 'Name should be longer than 10 characters']}></VTextField>
        </VForm>
      </Application>
    ))

    cy.get('.v-text-field')
      .type('Something')
      .should('have.class', 'v-input--error')
      .get('.v-form').then(() => {
        form.value.reset()
      })
      .get('.v-text-field')
      .should('have.not.class', 'v-input--error')
      .find('input')
      .should('have.value', '')
  })

  it('exposes resetValidation function', () => {
    const form = ref()
    cy.mount(() => (
      <Application>
        <VForm ref={ form }>
          <VTextField label="Name" rules={[v => v?.length > 10 || 'Name should be longer than 10 characters']}></VTextField>
        </VForm>
      </Application>
    ))

    cy.get('.v-text-field')
      .type('Something')
      .should('have.class', 'v-input--error')
      .emitted(VForm, 'update:modelValue')
      .then(emits => {
        expect(emits).to.be.undefined
      })
      .get('.v-form').then(() => {
        form.value.resetValidation()
      })
      .get('.v-text-field')
      .should('have.not.class', 'v-input--error')
      .find('input')
      .should('have.value', 'Something')
      .emitted(VForm, 'update:modelValue')
      .then(emits => {
        expect(emits).to.be.undefined
      })
  })

  it('does not submit form if validation fails', () => {
    cy.mount(() => (
      <VForm action="/action">
        <VTextField rules={[v => !!v || 'Field required']} />
        <VBtn type="submit">Submit</VBtn>
      </VForm>
    ))

    cy.get('.v-btn').click().url().should('not.contain', '/action')
      .get('.v-text-field').should('have.class', 'v-input--error').find('.v-messages').should('have.text', 'Field required')
  })

  it('emits a SubmitEventPromise', () => {
    cy.mount(() => (
      <Application>
        <VForm action="/action" onSubmit={ onSubmit }>
          <VTextField modelValue="foo" rules={[v => !!v || 'Field required']} />
          <VBtn type="submit">Submit</VBtn>
        </VForm>
      </Application>
    ))

    function onSubmit (e: SubmitEventPromise) {
      e.preventDefault()
    }

    cy.get('.v-btn').click().url().should('not.contain', '/action')
      .emitted(VForm, 'submit')
      .then(async emits => {
        const result = await emits[0][0]
        expect(result).to.deep.equal({ valid: true, errors: [] })
      })
  })

  it('exposes errors reactively', () => {
    const form = ref()

    cy.mount(() => (
      <Application>
        <VForm ref={ form }>
          <VTextField rules={[v => v?.length < 4 || 'Error']} />
        </VForm>
      </Application>
    ))

    cy.get('.v-text-field')
      .type('Invalid')
      .then(() => {
        expect(form.value.errors).to.deep.equal([
          {
            id: 'input-0',
            errorMessages: ['Error'],
          },
        ])
      })
  })

  it('runs validation on mount', () => {
    const form = ref()

    cy.mount(() => (
      <Application>
        <VForm ref={ form }>
          <VTextField name="empty" rules={[v => v?.length < 5 || 'Error']} modelValue="" />
          <VTextField name="error" rules={[v => v?.length < 5 || 'Error']} modelValue="Hello" />
          <VTextField name="valid" rules={[v => v?.length < 5 || 'Error']} modelValue="Hell" />
        </VForm>
      </Application>
    ))

    cy.get('.v-messages__message')
      .should('have.length', 1)
      .and('have.text', 'Error')
      .then(() => {
        expect(form.value.errors).to.deep.equal([
          {
            id: 'empty',
            errorMessages: [],
          },
          {
            id: 'error',
            errorMessages: ['Error'],
          },
          {
            id: 'valid',
            errorMessages: [],
          },
        ])
      })
  })

  it('provides validate-on prop to child inputs', () => {
    const form = ref()

    cy.mount(() => (
      <Application>
        <VForm ref={ form } validateOn="lazy">
          <VTextField name="empty" rules={[v => v?.length > 5 || 'Error']} modelValue="" />
        </VForm>
      </Application>
    ))

    cy.then(() => {
      expect(form.value.isValid).to.be.false
    })
      .get('.v-text-field').should('not.have.class', 'v-input--error')
      .get('.v-text-field input')
      .type('Hello')
      .then(() => {
        expect(form.value.isValid).to.be.false
      })
      .get('.v-text-field').should('have.class', 'v-input--error')
  })

  it('validates inputs to true if there are no rules', () => {
    const model = ref(false)
    cy.mount(() => (
      <Application>
        <VForm v-model={ model.value }>
          <VTextField></VTextField>
          <VTextField rules={[]}></VTextField>
        </VForm>
      </Application>
    ))

    cy.then(() => {
      expect(model.value).to.be.true
    })
  })

  // TODO: This test has to be the last one,
  // because subsequent tests in the same file
  // will break due to the page change
  it('submit form if validation passes', () => {
    cy.mount(() => (
      <VForm action="/__cypress/src/action">
        <VTextField modelValue="foo" rules={[v => !!v || 'Field required']} />
        <VBtn type="submit">Submit</VBtn>
      </VForm>
    ))

    cy.get('.v-btn').click().url().should('contain', '/action')
  })
})
