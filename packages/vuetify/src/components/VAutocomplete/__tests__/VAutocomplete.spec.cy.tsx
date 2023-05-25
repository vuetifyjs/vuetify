/// <reference types="../../../../types/cypress" />

// Components
import { VAutocomplete } from '../VAutocomplete'
import { VForm } from '@/components/VForm'

// Utilities
import { cloneVNode, ref } from 'vue'
import { generate } from '../../../../cypress/templates'
import { keyValues } from '@/util'

const variants = ['underlined', 'outlined', 'filled', 'solo', 'plain'] as const
const densities = ['default', 'comfortable', 'compact'] as const
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'] as const

const stories = Object.fromEntries(Object.entries({
  'Default input': <VAutocomplete label="label" />,
  Disabled: <VAutocomplete label="label" items={ items } disabled />,
  Affixes: <VAutocomplete label="label" items={ items } prefix="prefix" suffix="suffix" />,
  'Prepend/append': <VAutocomplete label="label" items={ items } prependIcon="$vuetify" appendIcon="$vuetify" />,
  'Prepend/append inner': <VAutocomplete label="label" items={ items } prependInnerIcon="$vuetify" appendInnerIcon="$vuetify" />,
  Placeholder: <VAutocomplete label="label" items={ items } placeholder="placeholder" persistentPlaceholder />,
}).map(([k, v]) => [k, (
  <div class="d-flex flex-column flex-grow-1">
    { variants.map(variant => (
      densities.map(density => (
        <div class="d-flex" style="gap: 0.4rem">
          { cloneVNode(v, { variant, density }) }
          { cloneVNode(v, { variant, density, modelValue: ['California'] }) }
          { cloneVNode(v, { variant, density, chips: true, modelValue: ['California'] }) }
          <VAutocomplete
            variant={ variant }
            density={ density }
            modelValue={['California']}
            { ...v.props }
          >{{
            selection: ({ item }) => {
              return item.title
            },
          }}
          </VAutocomplete>
        </div>
      ))
    )).flat()}
  </div>
)]))

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

  it('should be empty when delete the selected option', () => {
    const items = ref([
      { title: 'Item 1', value: 'Item 1' },
      { title: 'Item 2', value: 'Item 2' },
    ])

    const selectedItems = ref(null)

    cy.mount(() => (
      <VAutocomplete
        v-model={ selectedItems.value }
        items={ items.value }
        returnObject
      />
    ))

    cy.get('.v-autocomplete').click()
    cy.get('.v-list-item').should('have.length', 2)
    cy.get('.v-list-item').contains('Item 1').click()

    cy.get('.v-field__input').clear()
    cy.get('body').click('bottomLeft')
    cy.get('.v-field__input').should('not.include.text', 'Item 1')
  })

  // https://github.com/vuetifyjs/vuetify/issues/16210
  it('should return item object as the argument of item-title function', () => {
    const items = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ]

    const selectedItems = ref(null)

    function itemTitleFunc (item: any) {
      return 'Item: ' + JSON.stringify(item)
    }

    const itemTitleFuncSpy = cy.spy(itemTitleFunc).as('itemTitleFunc')

    cy.mount(() => (
      <VAutocomplete
        items={ items }
        modelValue={ selectedItems }
        item-title={ itemTitleFuncSpy }
        item-value="id"
      />
    ))

    cy.get('.v-autocomplete').click()

    cy.get('.v-list-item').eq(0).click({ waitForAnimations: false }).should(() => {
      expect(selectedItems.value).to.deep.equal(1)
    })

    cy.get('@itemTitleFunc')
      .should('have.been.calledWith', { id: 1, name: 'a' })

    cy.get('.v-autocomplete__selection-text').should('have.text', `Item: {"id":1,"name":"a"}`)
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

  it('should keep TextField focused while selecting items from open menu', () => {
    cy.mount(() => (
      <VAutocomplete
        multiple
        items={['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']}
      />
    ))

    cy.get('.v-autocomplete')
      .click()

    cy.get('.v-list')
      .trigger('keydown', { key: keyValues.down, waitForAnimations: false })
      .trigger('keydown', { key: keyValues.down, waitForAnimations: false })
      .trigger('keydown', { key: keyValues.down, waitForAnimations: false })

    cy.get('.v-field').should('have.class', 'v-field--focused')
  })

  it('should not open menu when closing a chip', () => {
    cy
      .mount(() => (
        <VAutocomplete
          chips
          closable-chips
          items={['foo', 'bar']}
          label="Autocomplete"
          modelValue={['foo', 'bar']}
          multiple
        />
      ))
      .get('.v-autocomplete')
      .should('not.have.class', 'v-autocomplete--active-menu')
      .get('.v-chip__close').eq(1)
      .click()
      .get('.v-autocomplete')
      .should('not.have.class', 'v-autocomplete--active-menu')
      .get('.v-chip__close')
      .click()
      .get('.v-autocomplete')
      .should('not.have.class', 'v-autocomplete--active-menu')
      .click()
      .should('have.class', 'v-autocomplete--active-menu')
      .trigger('keydown', { key: keyValues.esc })
      .should('not.have.class', 'v-autocomplete--active-menu')
  })

  it('should auto-select-first item when pressing enter', () => {
    cy
      .mount(() => (
        <VAutocomplete
          items={['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']}
          multiple
          autoSelectFirst
        />
      ))
      .get('.v-autocomplete')
      .click()
      .get('.v-list-item')
      .should('have.length', 6)
      .get('.v-autocomplete input')
      .type('Cal')
      .get('.v-list-item').eq(0)
      .should('have.class', 'v-list-item--active')
      .get('.v-autocomplete input')
      .trigger('keydown', { key: keyValues.enter, waitForAnimations: false })
      .get('.v-list-item')
      .should('have.length', 6)
  })

  describe('Showcase', () => {
    generate({ stories })
  })
})
