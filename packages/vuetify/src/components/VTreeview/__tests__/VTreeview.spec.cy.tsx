/// <reference types="../../../../types/cypress" />

import { ref } from 'vue'
import { VTreeview } from '../'

describe('VTreeview', () => {
  const singleRootTwoChildren = [
    { value: 0, title: 'Root', $children: [{ value: 1, title: 'Child' }, { value: 2, title: 'Child 2' }] },
  ]

  const threeLevels = [
    {
      value: 0,
      title: 'Root',
      $children: [{ value: 1, title: 'Child', $children: [{ value: 2, title: 'Grandchild' }] }, { value: 3, title: 'Child' }],
    },
  ]

  it('should select all items when clicking root', () => {
    cy.mount(() => (
      <VTreeview items={ threeLevels } showSelect />
    ))

    cy.get('.v-treeview-item').eq(0).find('.v-selection-control').click()

    cy.vue().then(wrapper => {
      const emits = wrapper.findComponent(VTreeview).emitted('update:selected')
      expect(emits).to.deep.equal([
        [
          [0, 1, 3, 2],
        ],
      ])
    })
  })

  it('should respect selected prop', () => {
    cy.mount(({ selected }: any) => (
      <VTreeview items={ threeLevels } showSelect selected={ selected } />
    ))

    cy.get('.v-selection-control input').should('not.be.checked')

    cy.setProps({
      selected: [0],
    })

    cy.get('.v-selection-control input').should('be.checked')
  })

  it('should open all children with open-on-mount prop', () => {
    cy.mount(() => (
      <VTreeview items={ threeLevels } openOnMount="all" />
    ))

    cy.get('.v-treeview-group__items').should('have.class', 'v-treeview-group__items--open')
  })

  it('should not show expand button if no children', () => {
    cy.mount(() => (
      <VTreeview items={ singleRootTwoChildren } openOnMount="all" />
    ))

    cy.get('.v-treeview-item').eq(0).find('.v-treeview-item__expand').should('exist')
    cy.get('.v-treeview-item').eq(1).find('.v-treeview-item__expand').should('not.exist')
    cy.get('.v-treeview-item').eq(2).find('.v-treeview-item__expand').should('not.exist')
  })

  it('should be able to load items dynamically', () => {
    const items = ref<any[]>([
      {
        value: 0,
        title: 'Root',
        $children: [],
      },
    ])

    function handleOpen () {
      const item = items.value[0]

      item.loading = true

      setTimeout(() => {
        item.$children = [
          {
            value: 1,
            title: 'Child',
          },
        ]

        item.loading = false
      }, 250)
    }

    cy.mount(() => (
      <VTreeview items={ items.value } onClick:open={ handleOpen } />
    ))

    cy.get('.v-treeview-item__expand').click()

    cy.get('.v-treeview-item').should('have.length', 2).eq(1).invoke('text').then(text => {
      expect(text).to.equal('Child')
    })
  })
})
