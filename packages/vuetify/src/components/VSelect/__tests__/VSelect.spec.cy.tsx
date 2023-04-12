/// <reference types="../../../../types/cypress" />

import { VForm } from '@/components/VForm'
import { VListItem } from '@/components/VList'
import { ref } from 'vue'
import { VSelect } from '../VSelect'

describe('VSelect', () => {
  it('should render selection slot', () => {
    const items = [
      { title: 'a' },
      { title: 'b' },
      { title: 'c' },
    ]
    let model: { title: string }[] = [{ title: 'b' }]

    cy.mount(() => (
      <VSelect
        multiple
        returnObject
        items={ items }
        modelValue={ model }
        onUpdate:modelValue={ val => model = val }
      >
        {{
          selection: ({ item, index }) => {
            return item.raw.title.toUpperCase()
          },
        }}
      </VSelect>
    ))
      .get('.v-select__selection').eq(0).invoke('text').should('equal', 'B')
  })

  it('should render prepend-item slot', () => {
    cy.mount(() => (
      <VSelect menu items={['Item #1', 'Item #2']}>
        {{
          'prepend-item': () => (
            <VListItem title="Foo"></VListItem>
          ),
        }}
      </VSelect>
    ))
      .get('.v-list-item').eq(0).invoke('text').should('equal', 'Foo')
  })

  it('should render append-item slot', () => {
    cy.mount(() => (
      <VSelect menu items={['Item #1', 'Item #2']}>
        {{
          'append-item': () => (
            <VListItem title="Foo"></VListItem>
          ),
        }}
      </VSelect>
    ))
      .get('.v-list-item').last().invoke('text').should('equal', 'Foo')
  })

  it('should close only first chip', () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

    const selectedItems = ['Item 1', 'Item 2', 'Item 3']

    cy.mount(() => (
      <VSelect
        items={ items }
        modelValue={ selectedItems }
        chips
        closableChips
        multiple
      />
    ))
      .get('.v-chip__close')
      .eq(0)
      .click()
      .get('input')
      .get('.v-chip')
      .should('have.length', 2)
  })

  describe('prefilled data', () => {
    it('should work with array of strings when using multiple', () => {
      const items = ref(['California', 'Colorado', 'Florida'])

      const selectedItems = ref(['California', 'Colorado'])

      cy.mount(() => (
        <VSelect v-model={ selectedItems.value } items={ items.value } multiple chips closableChips />
      ))

      cy.get('.v-select').click()

      cy.get('.v-list-item--active').should('have.length', 2)
      cy.get('.v-list-item input').eq(2).click().should(() => {
        expect(selectedItems.value).to.deep.equal(['California', 'Colorado', 'Florida'])
      })

      cy
        .get('.v-chip__close')
        .eq(0)
        .click()
        .get('.v-chip')
        .should('have.length', 2)
        .should(() => expect(selectedItems.value).to.deep.equal(['Colorado', 'Florida']))
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
        <VSelect
          v-model={ selectedItems.value }
          items={ items.value }
          multiple
          chips
          closableChips
          returnObject
        />
      ))

      cy.get('.v-select').click()

      cy.get('.v-list-item--active').should('have.length', 2)
      cy.get('.v-list-item input').eq(2).click().should(() => {
        expect(selectedItems.value).to.deep.equal([
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
      })

      cy
        .get('.v-chip__close')
        .eq(0)
        .click()
        .get('.v-chip')
        .should('have.length', 2)
        .should(() => expect(selectedItems.value).to.deep.equal([
          {
            title: 'Item 2',
            value: 'item2',
          },
          {
            title: 'Item 3',
            value: 'item3',
          },
        ]))
    })
  })

  it('should not be clickable when in readonly', () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

    const selectedItems = 'Item 1'

    cy.mount(() => (
      <VSelect
        items={ items }
        modelValue={ selectedItems }
        readonly
      />
    ))

    cy.get('.v-select')
      .click()
      .get('.v-list-item').should('have.length', 0)
      .get('.v-select--active-menu').should('have.length', 0)

    cy
      .get('.v-select input')
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
        <VSelect
          items={ items }
          modelValue={ selectedItems }
          readonly
        />
      </VForm>
    ))

    cy.get('.v-select')
      .click()
      .get('.v-list-item').should('have.length', 0)
      .get('.v-select--active-menu').should('have.length', 0)

    cy
      .get('.v-select input')
      .focus()
      .type('{downarrow}', { force: true })
      .get('.v-list-item').should('have.length', 0)
      .get('.v-select--active-menu').should('have.length', 0)
  })

  it('should conditionally show placeholder', () => {
    cy.mount(props => (
      <VSelect placeholder="Placeholder" { ...props } />
    ))
      .get('.v-select input')
      .should('have.attr', 'placeholder', 'Placeholder')
      .setProps({ label: 'Label' })
      .get('.v-select input')
      .should('not.have.attr', 'placeholder')
      .get('.v-select input')
      .focus()
      .should('have.attr', 'placeholder', 'Placeholder')
      .blur()
      .setProps({ persistentPlaceholder: true })
      .get('.v-select input')
      .should('have.attr', 'placeholder', 'Placeholder')
      .setProps({ modelValue: 'Foobar' })
      .get('.v-select input')
      .should('not.have.attr', 'placeholder')
      .setProps({ multiple: true, modelValue: ['Foobar'] })
      .get('.v-select input')
      .should('not.have.attr', 'placeholder')
  })

  describe('hide-selected', () => {
    it('should hide selected item(s)', () => {
      const items = ref(['Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ])

      const selectedItems = ref([
        'Item 1',
        'Item 2',
      ])

      cy.mount(() => (
        <VSelect v-model={ selectedItems.value } items={ items.value } multiple hideSelected />
      ))

      cy.get('.v-select').click()

      cy.get('.v-overlay__content .v-list-item').should('have.length', 2)
      cy.get('.v-overlay__content .v-list-item .v-list-item-title').eq(0).should('have.text', 'Item 3')
      cy.get('.v-overlay__content .v-list-item .v-list-item-title').eq(1).should('have.text', 'Item 4')
    })
  })

  // https://github.com/vuetifyjs/vuetify/issues/16055
  it('should select item after typing its first few letters', () => {
    const items = ref(['aaa', 'foo', 'faa'])

    const selectedItems = ref(undefined)

    cy.mount(() => (
      <VSelect
        v-model={ selectedItems.value }
        items={ items.value }
      />
    ))

    cy.get('.v-select')
      .click()
      .get('.v-select input')
      .focus()
      .type('f', { force: true })
      .get('.v-list-item').should('have.length', 3)
      .then(_ => {
        expect(selectedItems.value).equal('foo')
      })
  })
})
