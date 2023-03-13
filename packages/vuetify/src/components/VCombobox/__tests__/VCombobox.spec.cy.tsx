/// <reference types="../../../../types/cypress" />

import { VForm } from '@/components'
import { VCombobox } from '../VCombobox'
import { ref } from 'vue'

describe('VCombobox', () => {
  describe('closableChips', () => {
    it('should close only first chip', () => {
      const items = [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ]

      const selectedItems = [
        'Item 1',
        'Item 2',
        'Item 3',
      ]

      cy.mount(() => (
        <VCombobox items={ items } modelValue={ selectedItems } multiple closableChips chips />
      ))
        .get('.v-chip__close')
        .eq(0)
        .click()
        .get('input')
        .get('.v-chip')
        .should('have.length', 2)
    })
  })

  describe('complex objects', () => {
    it('single', () => {
      const items = [
        { title: 'Item 1', value: 'item1' },
        { title: 'Item 2', value: 'item2' },
        { title: 'Item 3', value: 'item3' },
        { title: 'Item 4', value: 'item4' },
      ]
      const model = ref()
      const search = ref()
      const updateModel = cy.stub().as('model').callsFake(val => model.value = val)
      const updateSearch = cy.stub().as('search').callsFake(val => search.value = val)

      cy.mount(() => (
        <VCombobox
          modelValue={ model.value }
          search={ search.value }
          onUpdate:modelValue={ updateModel }
          onUpdate:search={ updateSearch }
          items={ items }
        />
      ))
        .get('input')
        .click()
        .get('.v-list-item')
        .eq(0)
        .click({ waitForAnimations: false })
        .should(() => {
          expect(model.value).to.deep.equal(items[0])
          expect(search.value).to.deep.equal(items[0].title)
        })
        .get('input')
        .should('have.value', items[0].title)
        .blur()
        .get('.v-combobox__selection')
        .should('contain', items[0].title)

        .get('input')
        .click()
        .clear()
        .type('Item 2')
        .should(() => {
          expect(model.value).to.equal('Item 2')
          expect(search.value).to.equal('Item 2')
        })
        .should('have.value', 'Item 2')
        .blur()
        .get('.v-combobox__selection')
        .should('contain', 'Item 2')

        .get('input')
        .click()
        .clear()
        .type('item3')
        .should(() => {
          expect(model.value).to.equal('item3')
          expect(search.value).to.equal('item3')
        })
        .should('have.value', 'item3')
        .blur()
        .get('.v-combobox__selection')
        .should('contain', 'item3')
    })

    it('multiple', () => {
      const items = [
        { title: 'Item 1', value: 'item1' },
        { title: 'Item 2', value: 'item2' },
        { title: 'Item 3', value: 'item3' },
        { title: 'Item 4', value: 'item4' },
      ]
      const model = ref<(string | typeof items[number])[]>([])
      const search = ref()
      const updateModel = cy.stub().as('model').callsFake(val => model.value = val)
      const updateSearch = cy.stub().as('search').callsFake(val => search.value = val)

      cy.mount(() => (
        <VCombobox
          modelValue={ model.value }
          search={ search.value }
          onUpdate:modelValue={ updateModel }
          onUpdate:search={ updateSearch }
          multiple
          items={ items }
        />
      ))
        .get('.v-field input')
        .click()
        .get('.v-list-item')
        .eq(0)
        .click({ waitForAnimations: false })
        .then(() => {
          expect(model.value).to.deep.equal([items[0]])
          expect(search.value).to.be.undefined
        })
        .get('.v-field input')
        .should('have.value', '')
        .get('.v-combobox__selection')
        .should('contain', items[0].title)

        .get('.v-field input')
        .click()
        .type('Item 2')
        .blur()
        .should(() => {
          expect(model.value).to.deep.equal([items[0], 'Item 2'])
          expect(search.value).to.equal('')
        })
        .should('have.value', '')
        .get('.v-combobox__selection')
        .should('contain', 'Item 2')

        .get('.v-field input')
        .click()
        .type('item3')
        .blur()
        .should(() => {
          expect(model.value).to.deep.equal([items[0], 'Item 2', 'item3'])
          expect(search.value).to.equal('')
        })
        .should('have.value', '')
        .get('.v-combobox__selection')
        .should('contain', 'item3')
    })
  })

  describe('search', () => {
    it('should filter items', () => {
      const items = [
        'Item 1',
        'Item 1a',
        'Item 2',
        'Item 2a',
      ]

      cy.mount(() => (
        <VCombobox items={ items } />
      ))
        .get('input')
        .type('Item')
        .get('.v-list-item')
        .should('have.length', 4)
        .get('input')
        .clear()
        .type('Item 1')
        .get('.v-list-item')
        .should('have.length', 2)
        .get('input')
        .clear()
        .type('Item 3')
        .should('have.length', 1)
    })

    it('should filter items when using multiple', () => {
      const items = [
        'Item 1',
        'Item 1a',
        'Item 2',
        'Item 2a',
      ]

      cy.mount(() => (
        <VCombobox items={ items } multiple />
      ))
        .get('input')
        .type('Item')
        .get('.v-list-item')
        .should('have.length', 4)
        .get('input:first-child')
        .clear()
        .type('Item 1')
        .get('.v-list-item')
        .should('have.length', 2)
        .get('input:first-child')
        .clear()
        .type('Item 3')
        .should('have.length', 1)
    })

    it('should filter with custom item shape', () => {
      const items = [
        {
          id: 1,
          name: 'Test1',
        },
        {
          id: 2,
          name: 'Antonsen PK',
        },
      ]

      cy.mount(() => (
        <VCombobox
          items={ items }
          item-value="id"
          item-title="name"
        />
      ))
        .get('input')
        .type('test')
        .get('.v-list-item')
        .should('have.length', 1)
        .eq(0)
        .should('have.text', 'Test1')
        .get('input')
        .clear()
        .type('antonsen')
        .get('.v-list-item')
        .should('have.length', 1)
        .eq(0)
        .should('have.text', 'Antonsen PK')
    })
  })

  describe('prefilled data', () => {
    it('should work with array of strings when using multiple', () => {
      const items = ref(['California', 'Colorado', 'Florida'])

      const selectedItems = ref(['California', 'Colorado'])

      cy.mount(() => (
        <VCombobox v-model={ selectedItems.value } items={ items.value } multiple chips closableChips />
      ))

      cy.get('.v-combobox input').click()

      cy.get('.v-list-item--active').should('have.length', 2)
      cy.get('input').get('.v-chip').should('have.length', 2)

      cy.get('.v-chip__close')
        .eq(0)
        .click()
        .get('input')
        .get('.v-chip')
        .should('have.length', 1)
        .should(() => expect(selectedItems.value).to.deep.equal(['Colorado']))
    })

    it('should work with objects when using multiple', () => {
      const items = ref([
        {
          title: 'Item 1',
          value: 'item1',
        },
        {
          title: 'Item 2',
          value: 'item2',
        },
        {
          title: 'Item 3',
          value: 'item3',
        },
      ])

      const selectedItems = ref(
        [
          {
            title: 'Item 1',
            value: 'item1',
          },
          {
            title: 'Item 2',
            value: 'item2',
          },
        ]
      )

      cy.mount(() => (
        <VCombobox
          v-model={ selectedItems.value }
          items={ items.value }
          multiple
          chips
          closableChips
          returnObject
        />
      ))

      cy.get('.v-combobox input').click()

      cy.get('.v-list-item--active').should('have.length', 2)
      cy.get('input').get('.v-chip').should('have.length', 2)

      cy.get('.v-chip__close')
        .eq(0)
        .click()
        .get('input')
        .get('.v-chip')
        .should('have.length', 1)
        .should(() => expect(selectedItems.value).to.deep.equal([{
          title: 'Item 2',
          value: 'item2',
        }]))
    })
  })

  describe('readonly', () => {
    it('should not be clickable when in readonly', () => {
      const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

      const selectedItems = 'Item 1'

      cy.mount(() => (
        <VCombobox
          items={ items }
          modelValue={ selectedItems }
          readonly
        />
      ))

      cy.get('.v-combobox')
        .click()
        .get('.v-list-item').should('have.length', 0)
        .get('.v-select--active-menu').should('have.length', 0)

      cy
        .get('.v-combobox input')
        .focus()
        .type('{downarrow}', { force: true })
        .get('.v-list-item').should('have.length', 0)
        .get('.v-select--active-menu').should('have.length', 0)
    })

    it('should not be clickable when in readonly form', () => {
      const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

      const selectedItems = 'Item 1'

      cy.mount(() => (
        <VForm readonly>
          <VCombobox
            items={ items }
            modelValue={ selectedItems }
            readonly
          />
        </VForm>
      ))

      cy.get('.v-combobox')
        .click()
        .get('.v-list-item').should('have.length', 0)
        .get('.v-select--active-menu').should('have.length', 0)

      cy
        .get('.v-combobox input')
        .focus()
        .type('{downarrow}', { force: true })
        .get('.v-list-item').should('have.length', 0)
        .get('.v-select--active-menu').should('have.length', 0)
    })
  })

  describe('hide-selected', () => {
    it('should hide selected item(s)', () => {
      const items = [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ]

      const selectedItems = [
        'Item 1',
        'Item 2',
      ]

      cy.mount(() => (
        <VCombobox items={ items } modelValue={ selectedItems } multiple hideSelected />
      ))

      cy.get('.v-combobox input').click()

      cy.get('.v-overlay__content .v-list-item').should('have.length', 2)
      cy.get('.v-overlay__content .v-list-item .v-list-item-title').eq(0).should('have.text', 'Item 3')
      cy.get('.v-overlay__content .v-list-item .v-list-item-title').eq(1).should('have.text', 'Item 4')
    })
  })
})
