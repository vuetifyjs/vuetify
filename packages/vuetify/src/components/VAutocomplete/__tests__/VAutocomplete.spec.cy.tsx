/// <reference types="../../../../types/cypress" />

import { VForm } from '@/components/VForm'
import { ref } from 'vue'
import { VAutocomplete } from '../VAutocomplete'

describe('VAutocomplete', () => {
  it('should close only first chip', () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

    const selectedItems = ['Item 1', 'Item 2', 'Item 3']

    cy.mount(() => (
      <VAutocomplete
        items={ items }
        modelValue={ selectedItems }
        chips
        closableChips
        multiple
      />
    ))

    cy.get('.v-chip__close').eq(0).click()
    cy.get('input').should('exist')
    cy.get('.v-chip').should('have.length', 2)
  })

  it('should have selected chip with array of strings', () => {
    const items = ref(['California', 'Colorado', 'Florida'])

    const selectedItems = ref(['California', 'Colorado'])

    cy.mount(() => (
      <VAutocomplete
        v-model={ selectedItems.value }
        items={ items.value }
        chips
        multiple
        closableChips
      />
    ))

    cy.get('.mdi-menu-down').click()

    cy.get('.v-list-item--active').should('have.length', 2)
    cy.get('.v-list-item--active input').eq(0).click()
    cy.then(() => {
      expect(selectedItems.value).to.deep.equal(['Colorado'])
    })

    cy.get('.v-list-item--active').should('have.length', 1)

    cy.get('.v-chip__close').eq(0).click()
    cy.get('.v-chip')
      .should('have.length', 0)
      .should(() => expect(selectedItems.value).to.be.empty)
  })

  it('should have selected chip with return-object', () => {
    const items = ref([
      {
        title: 'Item 1',
        value: 'item1',
      },
      {
        title: 'Item 2',
        value: 'item2',
      },
    ])

    const selectedItems = ref([
      {
        title: 'Item 1',
        value: 'item1',
      },
    ])

    cy.mount(() => (
      <VAutocomplete
        v-model={ selectedItems.value }
        items={ items.value }
        returnObject
        chips
        multiple
      />
    ))

    cy.get('.mdi-menu-down').click()

    cy.get('.v-list-item--active').should('have.length', 1)
    cy.get('.v-list-item--active input').click()
    cy.then(() => {
      expect(selectedItems.value).to.be.empty
    })
    cy.get('.v-list-item--active').should('have.length', 0)
  })

  it('should not be clickable when in readonly', () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

    const selectedItems = 'Item 1'

    cy.mount(() => (
      <VAutocomplete
        items={ items }
        modelValue={ selectedItems }
        readonly
      />
    ))

    cy.get('.v-autocomplete').click()
    cy.get('.v-list-item').should('have.length', 0)
    cy.get('.v-select--active-menu').should('have.length', 0)

    cy.get('.v-autocomplete input').as('input')
      .focus()
    cy.get('@input').type('{downarrow}', { force: true })
    cy.get('.v-list-item').should('have.length', 0)
    cy.get('.v-select--active-menu').should('have.length', 0)
  })

  it('should not be clickable when in readonly form', () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

    const selectedItems = 'Item 1'

    cy.mount(() => (
      <VForm readonly>
        <VAutocomplete
          items={ items }
          modelValue={ selectedItems }
          readonly
        />
      </VForm>
    ))

    cy.get('.v-autocomplete').click()
    cy.get('.v-list-item').should('have.length', 0)
    cy.get('.v-select--active-menu').should('have.length', 0)

    cy.get('.v-autocomplete input').as('input')
      .focus()
    cy.get('@input').type('{downarrow}', { force: true })
    cy.get('.v-list-item').should('have.length', 0)
    cy.get('.v-select--active-menu').should('have.length', 0)
  })

  describe('hide-selected', () => {
    it('should hide selected item(s)', () => {
      const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

      const selectedItems = ['Item 1', 'Item 2']

      cy.mount(() => (
        <VAutocomplete
          items={ items }
          modelValue={ selectedItems }
          hideSelected
          multiple
        />
      ))

      cy.get('.mdi-menu-down').click()

      cy.get('.v-overlay__content .v-list-item').should('have.length', 2)
      cy.get('.v-overlay__content .v-list-item .v-list-item-title').eq(0).should('have.text', 'Item 3')
      cy.get('.v-overlay__content .v-list-item .v-list-item-title').eq(1).should('have.text', 'Item 4')
    })
  })

  // https://github.com/vuetifyjs/vuetify/issues/16055
  it('should not replicate html select hotkeys in v-autocomplete', () => {
    const items = ref(['aaa', 'foo', 'faa'])

    const selectedItems = ref(undefined)

    cy.mount(() => (
      <VAutocomplete
        v-model={ selectedItems.value }
        items={ items.value }
      />
    ))

    cy.get('.v-autocomplete')
      .click()
      .get('.v-autocomplete input')
      .focus()
      .type('f', { force: true })
      .get('.v-list-item').should('have.length', 2)
      .then(_ => {
        expect(selectedItems.value).equal(undefined)
      })
  })

  it('should conditionally show placeholder', () => {
    cy.mount(props => (
      <VAutocomplete placeholder="Placeholder" { ...props } />
    ))
      .get('.v-autocomplete input')
      .should('have.attr', 'placeholder', 'Placeholder')
      .setProps({ label: 'Label' })
      .get('.v-autocomplete input')
      .should('not.be.visible')
      .get('.v-autocomplete input')
      .focus()
      .should('have.attr', 'placeholder', 'Placeholder')
      .should('be.visible')
      .blur()
      .setProps({ persistentPlaceholder: true })
      .get('.v-autocomplete input')
      .should('have.attr', 'placeholder', 'Placeholder')
      .should('be.visible')
      .setProps({ modelValue: 'Foobar' })
      .get('.v-autocomplete input')
      .should('not.have.attr', 'placeholder')
      .setProps({ multiple: true, modelValue: ['Foobar'] })
      .get('.v-autocomplete input')
      .should('not.have.attr', 'placeholder')
  })
})
