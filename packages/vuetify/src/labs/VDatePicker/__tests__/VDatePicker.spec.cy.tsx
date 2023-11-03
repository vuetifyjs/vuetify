/// <reference types="../../../../types/cypress" />

// Components
import { VDatePicker } from '../VDatePicker'

// Utilities
import { ref } from 'vue'
import { Application } from '../../../../cypress/templates'

describe('VDatePicker', () => {
  it('should update model directly when using hide-actions prop', () => {
    const model = ref(new Date(2023, 0, 1))
    cy.mount(() => (
      <Application>
        <VDatePicker v-model={ model.value } hideActions />
      </Application>
    ))
      .get('div[data-v-date="2023-01-02"]')
      .click()
      .vue()
      .then(wrapper => {
        const datePicker = wrapper.getComponent(VDatePicker)
        const emitted = datePicker.emitted('update:modelValue')
        expect(emitted).to.have.length(1)
      })
  })

  it('should not update model until clicking ok', () => {
    const model = ref(new Date(2023, 0, 1))
    cy.mount(() => (
      <Application>
        <VDatePicker v-model={ model.value } />
      </Application>
    ))
      .get('div[data-v-date="2023-01-02"]')
      .click()
      .vue()
      .then(wrapper => {
        const datePicker = wrapper.getComponent(VDatePicker)
        const emitted = datePicker.emitted('update:modelValue')
        expect(emitted).to.be.undefined
      })
      .get('.v-picker__actions')
      .contains('OK')
      .click()
      .vue()
      .then(wrapper => {
        const datePicker = wrapper.getComponent(VDatePicker)
        const emitted = datePicker.emitted('update:modelValue')
        expect(emitted).to.have.length(1)
      })
  })
})
