/// <reference types="../../../../types/cypress" />

// Components
import { VCombobox } from '../VCombobox'
import { VForm } from '@/components/VForm'

// Utilities
import { cloneVNode, ref } from 'vue'
import { generate } from '../../../../cypress/templates'
import { keyValues } from '@/util'

const variants = ['underlined', 'outlined', 'filled', 'solo', 'plain'] as const
const densities = ['default', 'comfortable', 'compact'] as const
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'] as const

const stories = Object.fromEntries(Object.entries({
  'Default input': <VCombobox />,
  Disabled: <VCombobox items={ items } disabled />,
  Affixes: <VCombobox items={ items } prefix="prefix" suffix="suffix" />,
  'Prepend/append': <VCombobox items={ items } prependIcon="$vuetify" appendIcon="$vuetify" />,
  'Prepend/append inner': <VCombobox items={ items } prependInnerIcon="$vuetify" appendInnerIcon="$vuetify" />,
  Placeholder: <VCombobox items={ items } placeholder="placeholder" persistentPlaceholder />,
}).map(([k, v]) => [k, (
  <div class="d-flex flex-column flex-grow-1">
    { variants.map(variant => (
      densities.map(density => (
        <div class="d-flex align-start" style="gap: 0.4rem; height: 100px;">
          { cloneVNode(v, { variant, density, label: `${variant} ${density}` }) }
          { cloneVNode(v, { variant, density, label: `with value`, modelValue: ['California'] }) }
          { cloneVNode(v, { variant, density, label: `chips`, chips: true, modelValue: ['California'] }) }
          <VCombobox
            variant={ variant }
            density={ density }
            modelValue={['California']}
            label="selection slot"
            { ...v.props }
          >{{
            selection: ({ item }) => {
              return item.title
            },
          }}
          </VCombobox>
        </div>
      ))
    )).flat()}
  </div>
)]))

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
        .get('.v-chip__close').eq(0)
        .click()
      cy.get('input').should('exist')
      cy.get('.v-chip')
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
      cy.get('.v-list-item').eq(0)
        .click({ waitForAnimations: false })
      cy.should(() => {
        expect(model.value).to.deep.equal(items[0])
        expect(search.value).to.deep.equal(items[0].title)
      })
      cy.get('input')
        .should('have.value', items[0].title)
        .blur()
      cy.get('.v-combobox__selection')
        .should('contain', items[0].title)

      cy.get('input').click()
      cy.get('input').clear()
      cy.get('input').type('Item 2')
      cy.should(() => {
        expect(model.value).to.equal('Item 2')
        expect(search.value).to.equal('Item 2')
      })
      cy.get('input')
        .should('have.value', 'Item 2')
        .blur()
      cy.get('.v-combobox__selection')
        .should('contain', 'Item 2')

      cy.get('input').click()
      cy.get('input').clear()
      cy.get('input').type('item3')
      cy.should(() => {
        expect(model.value).to.equal('item3')
        expect(search.value).to.equal('item3')
      })
      cy.get('input')
        .should('have.value', 'item3')
        .blur()
      cy.get('.v-combobox__selection')
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
      cy.get('.v-list-item').eq(0)
        .click({ waitForAnimations: false })
      cy.then(() => {
        expect(model.value).to.deep.equal([items[0]])
        expect(search.value).to.be.undefined
      })
      cy.get('.v-field input').as('input')
        .should('have.value', '')
      cy.get('.v-combobox__selection')
        .should('contain', items[0].title)

      cy.get('@input').click()
      cy.get('@input').type('Item 2')
      cy.get('@input').blur()
      cy.should(() => {
        expect(model.value).to.deep.equal([items[0], 'Item 2'])
        expect(search.value).to.equal('')
      })
      cy.get('@input').should('have.value', '')
      cy.get('.v-combobox__selection')
        .should('contain', 'Item 2')

      cy.get('@input').click()
      cy.get('@input').type('item3')
      cy.get('@input').blur()
      cy.should(() => {
        expect(model.value).to.deep.equal([items[0], 'Item 2', 'item3'])
        expect(search.value).to.equal('')
      })
      cy.get('@input').should('have.value', '')
      cy.get('.v-combobox__selection')
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
      cy.get('.v-list-item')
        .should('have.length', 4)
      cy.get('input').clear()
      cy.get('input').type('Item 1')
      cy.get('.v-list-item')
        .should('have.length', 2)
      cy.get('input').clear()
      cy.get('input').type('Item 3')
      cy.get('.v-list-item').should('have.length', 0)
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
      cy.get('.v-list-item')
        .should('have.length', 4)
      cy.get('input:first-child').as('input')
        .clear()
      cy.get('@input').type('Item 1')
      cy.get('.v-list-item')
        .should('have.length', 2)
      cy.get('@input').clear()
      cy.get('@input').type('Item 3')
      cy.get('.v-list-item')
        .should('have.length', 0)
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
      cy.get('.v-list-item')
        .should('have.length', 1)
        .eq(0)
        .should('have.text', 'Test1')
      cy.get('input').clear()
      cy.get('input').type('antonsen')
      cy.get('.v-list-item')
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
      cy.get('input').should('exist')
      cy.get('.v-chip')
        .should('have.length', 1)
      cy.should(() => expect(selectedItems.value).to.deep.equal(['Colorado']))
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
      cy.get('input').should('exist')
      cy.get('.v-chip')
        .should('have.length', 1)
      cy.should(() => expect(selectedItems.value).to.deep.equal([{
        title: 'Item 2',
        value: 'item2',
      }]))
    })

    it('should work with objects when using multiple and item-value', () => {
      const items = ref([
        {
          text: 'Item 1',
          id: 'item1',
        },
        {
          text: 'Item 2',
          id: 'item2',
        },
        {
          text: 'Item 3',
          id: 'item3',
        },
      ])

      const selectedItems = ref(
        [
          {
            text: 'Item 1',
            id: 'item1',
          },
          {
            text: 'Item 2',
            id: 'item2',
          },
        ]
      )

      cy.mount(() => (
        <VCombobox
          v-model={ selectedItems.value }
          items={ items.value }
          multiple
          item-title="text"
          item-value="value"
          return-object
        />
      ))

      cy.get('.v-combobox input').click()

      cy.get('.v-list-item--active').should('have.length', 2)
      cy.get('.v-field__input').should('include.text', 'Item 1')
      cy.get('.v-field__input').should('include.text', 'Item 2')

      cy.get('.v-list-item--active input')
        .eq(0)
        .click()
        .get('.v-field__input')
        .should(() => expect(selectedItems.value).to.deep.equal([{
          text: 'Item 2',
          id: 'item2',
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
      cy.get('.v-list-item').should('have.length', 0)
        .get('.v-select--active-menu').should('have.length', 0)

      cy.get('.v-combobox input').as('input')
        .focus()
      cy.get('@input').type('{downarrow}', { force: true })
      cy.get('.v-list-item').should('have.length', 0)
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
      cy.get('.v-list-item').should('have.length', 0)
        .get('.v-select--active-menu').should('have.length', 0)

      cy.get('.v-combobox input').as('input')
        .focus()
      cy.get('@input').type('{downarrow}', { force: true })
      cy.get('.v-list-item').should('have.length', 0)
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

  // https://github.com/vuetifyjs/vuetify/issues/17120
  it('should display 0 when selected', () => {
    const items = [0, 1, 2, 3, 4]

    const selectedItems = ref(undefined)

    cy.mount(() => (
      <VCombobox
        items={ items }
        v-model={ selectedItems.value }
      />
    ))
      .get('.v-field input')
      .click()

    cy.get('.v-list-item').eq(0)
      .click({ waitForAnimations: false })

    cy.get('.v-combobox input')
      .should('have.value', '0')
  })

  it('should conditionally show placeholder', () => {
    cy.mount(props => (
      <VCombobox placeholder="Placeholder" { ...props } />
    ))
      .get('.v-combobox input')
      .should('have.attr', 'placeholder', 'Placeholder')
      .setProps({ label: 'Label' })
      .get('.v-combobox input')
      .should('not.be.visible')
      .get('.v-combobox input')
      .focus()
      .should('have.attr', 'placeholder', 'Placeholder')
      .should('be.visible')
      .blur()
      .setProps({ persistentPlaceholder: true })
      .get('.v-combobox input')
      .should('have.attr', 'placeholder', 'Placeholder')
      .should('be.visible')
      .setProps({ modelValue: 'Foobar' })
      .get('.v-combobox input')
      .should('not.have.attr', 'placeholder')
      .setProps({ multiple: true, modelValue: ['Foobar'] })
      .get('.v-combobox input')
      .should('not.have.attr', 'placeholder')
  })

  it('should keep TextField focused while selecting items from open menu', () => {
    cy.mount(() => (
      <VCombobox
        multiple
        items={['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']}
      />
    ))

    cy.get('.v-combobox')
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
        <VCombobox
          chips
          closable-chips
          items={['foo', 'bar']}
          label="Select"
          modelValue={['foo', 'bar']}
          multiple
        />
      ))
      .get('.v-combobox')
      .should('not.have.class', 'v-combobox--active-menu')
      .get('.v-chip__close').eq(1)
      .click()
      .get('.v-combobox')
      .should('not.have.class', 'v-combobox--active-menu')
      .get('.v-chip__close')
      .click()
      .get('.v-combobox')
      .should('not.have.class', 'v-combobox--active-menu')
      .click()
      .should('have.class', 'v-combobox--active-menu')
      .trigger('keydown', { key: keyValues.esc })
      .should('not.have.class', 'v-combobox--active-menu')
  })

  it('should auto-select-first item when pressing enter', () => {
    cy
      .mount(() => (
        <VCombobox
          items={['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']}
          multiple
          autoSelectFirst
        />
      ))
      .get('.v-combobox')
      .click()
      .get('.v-list-item')
      .should('have.length', 6)
      .get('.v-combobox input')
      .type('Cal')
      .get('.v-list-item').eq(0)
      .should('have.class', 'v-list-item--active')
      .get('.v-combobox input')
      .trigger('keydown', { key: keyValues.enter, waitForAnimations: false })
      .get('.v-list-item')
      .should('have.length', 6)
  })

  it(`doesn't add duplicate values`, () => {
    cy
      .mount(() => (
        <VCombobox multiple />
      ))
      .get('.v-combobox input')
      .click()
      .type('foo{enter}')
      .type('bar{enter}')
      .get('.v-combobox__selection')
      .should('have.length', 2)
      .get('.v-combobox input')
      .type('foo{enter}')
      .get('.v-combobox__selection')
      .should('have.length', 2)
  })

  // https://github.com/vuetifyjs/vuetify/issues/18796
  it('should allow deleting selection via closable-chips', () => {
    const selectedItem = ref('California')

    cy.mount(() => (
      <VCombobox
        chips
        v-model={ selectedItem.value }
        closable-chips
        items={['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']}
      />
    ))
      .get('.v-chip__close')
      .click()
      .then(_ => {
        expect(selectedItem.value).to.equal(null)
      })
  })

  // https://github.com/vuetifyjs/vuetify/issues/18556
  it('should show menu if focused and items are added', () => {
    cy
      .mount(props => (<VCombobox { ...props } />))
      .get('.v-combobox input')
      .focus()
      .get('.v-overlay')
      .should('not.exist')
      .setProps({ items: ['Foo', 'Bar'] })
      .get('.v-overlay')
      .should('exist')
  })

  // https://github.com/vuetifyjs/vuetify/issues/19346
  it('should not show menu when focused and existing non-empty items are changed', () => {
    cy
      .mount((props: any) => (<VCombobox items={ props.items } />))
      .setProps({ items: ['Foo', 'Bar'] })
      .get('.v-combobox')
      .click()
      .get('.v-overlay')
      .should('exist')
      .get('.v-list-item').eq(0).click({ waitForAnimations: false })
      .setProps({ items: ['Foo', 'Bar', 'test'] })
      .get('.v-overlay')
      .should('not.exist')
  })

  // https://github.com/vuetifyjs/vuetify/issues/17573
  // When using selection slot or chips, input displayed next to chip/selection slot should be always empty
  it('should always have empty input value when it is unfocused and when using selection slot or chips', () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
    const selectedItem = ref('Item 1')

    cy
      .mount(() => (
        <VCombobox
          items={ items }
          chips
          v-model={ selectedItem.value }
        />
      ))
      .get('.v-combobox').click()
      .get('.v-combobox input').should('have.value', '')
      // Blur input with a custom search input value
      .type('test')
      .blur()
      .should('have.value', '')
      .should(() => {
        expect(selectedItem.value).to.equal('test')
      })
      // Press enter key with a custom search input value
      .get('.v-combobox').click()
      .get('.v-combobox input').should('have.value', '')
      .type('test 2')
      .trigger('keydown', { key: keyValues.enter, waitForAnimations: false })
      .should('have.value', '')
      .should(() => {
        expect(selectedItem.value).to.equal('test 2')
      })
      // Search existing item and click to select
      .get('.v-combobox').click()
      .get('.v-combobox input').type('Item 1')
      .get('.v-list-item').eq(0).click({ waitForAnimations: false })
      .get('.v-combobox input').should('have.value', '')
      .should(() => {
        expect(selectedItem.value).to.equal('Item 1')
      })
  })

  // https://github.com/vuetifyjs/vuetify/issues/19319
  it('should respect return-object when blurring', () => {
    const items = [
      { title: 'Item 1', value: 'item1' },
      { title: 'Item 2', value: 'item2' },
      { title: 'Item 3', value: 'item3' },
      { title: 'Item 4', value: 'item4' },
    ]
    const model = ref()
    const search = ref()

    cy.mount(() => (
      <VCombobox
        search={ search.value }
        v-model={ model.value }
        items={ items }
      />
    ))
      .get('.v-combobox').click()
      .get('.v-list-item').eq(0).click({ waitForAnimations: false })
      .should(() => {
        expect(model.value).to.deep.equal({ title: 'Item 1', value: 'item1' })
      })
      .get('.v-combobox input').blur()
      .should(() => {
        expect(model.value).to.deep.equal({ title: 'Item 1', value: 'item1' })
      })
  })

  describe('Showcase', () => {
    generate({ stories })
  })
})
