/// <reference types="../../../../types/cypress" />

// Components
import { VSelect } from '../VSelect'
import { VForm } from '@/components/VForm'
import { VListItem } from '@/components/VList'

// Utilities
import { cloneVNode, ref } from 'vue'
import { generate } from '../../../../cypress/templates'
import { keyValues } from '@/util'

const variants = ['underlined', 'outlined', 'filled', 'solo', 'plain'] as const
const densities = ['default', 'comfortable', 'compact'] as const
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'] as const

const stories = Object.fromEntries(Object.entries({
  'Default input': <VSelect label="label" items={ items } />,
  Disabled: <VSelect label="label" items={ items } disabled />,
  Affixes: <VSelect label="label" items={ items } prefix="prefix" suffix="suffix" />,
  'Prepend/append': <VSelect label="label" items={ items } prependIcon="$vuetify" appendIcon="$vuetify" />,
  'Prepend/append inner': <VSelect label="label" items={ items } prependInnerIcon="$vuetify" appendInnerIcon="$vuetify" />,
  Placeholder: <VSelect label="label" items={ items } placeholder="placeholder" persistentPlaceholder />,
}).map(([k, v]) => [k, (
  <div class="d-flex flex-column flex-grow-1">
    { variants.map(variant => (
      densities.map(density => (
        <div class="d-flex" style="gap: 0.4rem">
          { cloneVNode(v, { variant, density }) }
          { cloneVNode(v, { variant, density, modelValue: ['California'] }) }
          { cloneVNode(v, { variant, density, chips: true, modelValue: ['California'] }) }
          <VSelect
            variant={ variant }
            density={ density }
            modelValue={['California']}
            { ...v.props }
          >{{
            selection: ({ item }) => {
              return item.title
            },
          }}
          </VSelect>
        </div>
      ))
    )).flat()}
  </div>
)]))

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
      <VSelect
        items={ items }
        modelValue={ selectedItems }
        item-title={ itemTitleFuncSpy }
        item-value="id"
      />
    ))

    cy.get('.v-select').click()

    cy.get('.v-list-item').eq(0).click({ waitForAnimations: false }).should(() => {
      expect(selectedItems.value).to.deep.equal(1)
    })

    cy.get('@itemTitleFunc')
      .should('have.been.calledWith', { id: 1, name: 'a' })

    cy.get('.v-select__selection-text').should('have.text', `Item: {"id":1,"name":"a"}`)
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

  it('should keep TextField focused while selecting items from open menu', () => {
    cy.mount(() => (
      <VSelect
        items={['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']}
      />
    ))

    cy.get('.v-select')
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
        <VSelect
          chips
          closable-chips
          items={['foo', 'bar']}
          label="Select"
          modelValue={['foo', 'bar']}
          multiple
        />
      ))
      .get('.v-select')
      .should('not.have.class', 'v-select--active-menu')
      .get('.v-chip__close').eq(1)
      .click()
      .get('.v-select')
      .should('not.have.class', 'v-select--active-menu')
      .get('.v-chip__close')
      .click()
      .get('.v-select')
      .should('not.have.class', 'v-select--active-menu')
      .click()
      .should('have.class', 'v-select--active-menu')
      .trigger('keydown', { key: keyValues.esc })
      .should('not.have.class', 'v-select--active-menu')
  })

  describe('Showcase', () => {
    generate({ stories })
  })
})
