/* eslint-disable sonarjs/no-identical-functions */
/// <reference types="../../../../types/cypress" />

import { ref } from 'vue'
import { Application } from '../../../../cypress/templates'
import { VForm } from '../'
import { VBtn } from '@/components/VBtn'
import { VTextField } from '@/components/VTextField'
import type { SubmitEventPromise } from '@/composables'

describe('VForm', () => {
  it('should emit when inputs are updated', () => {
    cy.mount(() => (
      <Application>
        <VForm>
          <VTextField label="Name" rules={[v => v.length > 10 || 'Name should be longer than 10 characters']}></VTextField>
        </VForm>
      </Application>
    ))

    cy.get('.v-text-field').type('Something')

    cy.vue().then(({ wrapper }) => {
      const emits = wrapper.findComponent<VForm>('.v-form').emitted('update:modelValue')

      expect(emits).to.deep.equal([
        [false],
      ])
    })

    cy.get('.v-text-field').type(' and something else')

    cy.vue().then(({ wrapper }) => {
      const emits = wrapper.findComponent<VForm>('.v-form').emitted('update:modelValue')

      expect(emits).to.deep.equal([
        [false],
        [true],
      ])
    })
  })

  it('should only emit true if all inputs are explicitly valid', () => {
    cy.mount(() => (
      <Application>
        <VForm>
          <VTextField label="Name" rules={[v => v.length < 10 || 'Name should be longer than 10 characters']}></VTextField>
          <VTextField label="Email" rules={[v => v.length < 10 || 'E-mail should be longer than 10 characters']}></VTextField>
        </VForm>
      </Application>
    ))

    cy.get('.v-text-field').eq(0).type('Valid')

    cy.vue().then(({ wrapper }) => {
      const emits = wrapper.findComponent<VForm>('.v-form').emitted('update:modelValue')

      expect(emits).to.be.undefined
    })

    cy.get('.v-text-field').eq(1).type('Valid')

    cy.vue().then(({ wrapper }) => {
      const emits = wrapper.findComponent<VForm>('.v-form').emitted('update:modelValue')

      expect(emits).to.deep.equal([
        [true],
      ])
    })
  })

  it('should expose validate function', () => {
    const form = ref()
    cy.mount(() => (
      <Application>
        <VForm ref={ form }>
          <VTextField label="Name" rules={[v => !!v || 'Name required']}></VTextField>
        </VForm>
      </Application>
    ))

    cy.get('.v-form').then(async () => {
      const { valid } = await form.value.validate()
      expect(valid).to.equal(false)
    })

    cy.get('.v-text-field').should('have.class', 'v-input--error')
  })

  it('should expose reset function', () => {
    const form = ref()
    cy.mount(() => (
      <Application>
        <VForm ref={ form }>
          <VTextField label="Name" rules={[v => v.length > 10 || 'Name should be longer than 10 characters']}></VTextField>
        </VForm>
      </Application>
    ))

    cy.get('.v-text-field').type('Something').should('have.class', 'v-input--error')

    cy.vue().then(({ wrapper }) => {
      const emits = wrapper.findComponent<VForm>('.v-form').emitted('update:modelValue')

      expect(emits).to.deep.equal([[false]])
    })

    cy.get('.v-form').then(() => {
      form.value.reset()
    })

    cy.get('.v-text-field').should('have.not.class', 'v-input--error').find('input').should('have.value', '')

    cy.vue().then(({ wrapper }) => {
      const emits = wrapper.findComponent<VForm>('.v-form').emitted('update:modelValue')

      expect(emits).to.deep.equal([[false], [null]])
    })
  })

  it('should expose resetValidation function', () => {
    const form = ref()
    cy.mount(() => (
      <Application>
        <VForm ref={ form }>
          <VTextField label="Name" rules={[v => v.length > 10 || 'Name should be longer than 10 characters']}></VTextField>
        </VForm>
      </Application>
    ))

    cy.get('.v-text-field').type('Something').should('have.class', 'v-input--error')

    cy.vue().then(({ wrapper }) => {
      const emits = wrapper.findComponent<VForm>('.v-form').emitted('update:modelValue')

      expect(emits).to.deep.equal([[false]])
    })

    cy.get('.v-form').then(() => {
      form.value.resetValidation()
    })

    cy.get('.v-text-field').should('have.not.class', 'v-input--error').find('input').should('have.value', 'Something')

    cy.vue().then(({ wrapper }) => {
      const emits = wrapper.findComponent<VForm>('.v-form').emitted('update:modelValue')

      expect(emits).to.deep.equal([[false], [null]])
    })
  })

  it('should not submit form if validation fails', () => {
    cy.mount(() => (
      <VForm action="/action">
        <VTextField rules={[v => !!v || 'Field required']} />
        <VBtn type="submit">Submit</VBtn>
      </VForm>
    ))

    cy.get('.v-btn').click().url().should('not.contain', '/action')
    cy.get('.v-text-field').should('have.class', 'v-input--error').find('.v-messages').should('have.text', 'Field required')
  })

  it('should emit a SubmitEventPromise', () => {
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
    cy.vue().then(async ({ wrapper }) => {
      const emits = wrapper.findComponent<VForm>('.v-form').emitted<[SubmitEventPromise]>('submit')

      expect(await emits![0][0]).to.deep.equal({ valid: true, errors: [] })
    })
  })

  it('should expose errors reactively', () => {
    const form = ref()

    cy.mount(() => (
      <Application>
        <VForm ref={ form }>
          <VTextField rules={[v => v.length < 4 || 'Error']} />
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

  // TODO: This test has to be the last one,
  // because subsequent tests in the same file
  // will break due to the page change
  it.only('should submit form if validation passes', () => {
    cy.mount(() => (
      <VForm action="/__cypress/src/action">
        <VTextField modelValue="foo" rules={[v => !!v || 'Field required']} />
        <VBtn type="submit">Submit</VBtn>
      </VForm>
    ))

    cy.get('.v-btn').click().url().should('contain', '/action')
  })
})
