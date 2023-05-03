/// <reference types="../../../../types/cypress" />

import { Application } from '../../../../cypress/templates'
import { VDataTable } from '..'
import { ref } from 'vue'

const DESSERT_HEADERS = [
  { title: 'Dessert (100g serving)', key: 'name' },
  { title: 'Calories', key: 'calories' },
  { title: 'Fat (g)', key: 'fat' },
  { title: 'Carbs (g)', key: 'carbs' },
  { title: 'Protein (g)', key: 'protein' },
  { title: 'Iron (%)', key: 'iron' },
]

const DESSERT_ITEMS = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1%',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1%',
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7%',
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8%',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16%',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0%',
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2%',
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45%',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: '22%',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6%',
  },
]

describe('VDataTable', () => {
  it('should reset page when searching', () => {
    cy.mount(({ search }: { search: string }) => (
      <Application>
        <VDataTable items={ DESSERT_ITEMS } headers={ DESSERT_HEADERS } search={ search } items-per-page={ 5 } />
      </Application>
    ))

    cy.get('.v-btn[aria-label="Next page"]')
      .click()
    cy.setProps({ search: 'a' })
    cy.emitted(VDataTable, 'update:page')
      .should('deep.equal', [[2], [1]])
  })

  // https://github.com/vuetifyjs/vuetify/issues/16999
  it('should search in nested keys', () => {
    const nestedItems = [
      {
        foo: {
          bar: 'hello',
        },
      },
      {
        foo: {
          bar: 'world',
        },
      },
    ]

    const headers = [
      {
        key: 'foo.bar',
        title: 'Column',
      },
    ]

    cy.mount(props => (
      <Application>
        <VDataTable items={ nestedItems } headers={ headers } { ...props } />
      </Application>
    ))

    cy.get('tbody tr')
      .should('have.length', 2)
      .invoke('text')
      .should('equal', 'helloworld')
      .setProps({
        search: 'hello',
      })
      .get('tbody tr')
      .should('have.length', 1)
      .invoke('text')
      .should('equal', 'hello')
  })

  it('should not emit click:row event when clicking select or expand', () => {
    const onClick = cy.stub()
    cy.mount(() => (
      <Application>
        <VDataTable showSelect showExpand items={ DESSERT_ITEMS } headers={ DESSERT_HEADERS } onClick:row={ onClick } />
      </Application>
    ))

    cy.get('tbody tr')
      .eq(2)
      .find('.v-checkbox-btn')
      .click()

    cy.get('tbody tr')
      .eq(3)
      .find('.v-btn')
      .click()
      .then(() => {
        expect(onClick).not.to.be.called
      })

    cy.get('tbody tr')
      .eq(1)
      .click()
      .then(() => {
        expect(onClick).to.be.calledOnce
      })
  })

  it('should show no-data-text if there are no items', () => {
    cy.mount(() => (
      <Application>
        <VDataTable items={[]} headers={ DESSERT_HEADERS } />
      </Application>
    ))

    cy.get('.v-data-table tbody tr').should('have.text', 'No data available')
  })

  // https://github.com/vuetifyjs/vuetify/issues/17226
  it('should change page if we are trying to display a page beyond current page count', () => {
    const items = ref(DESSERT_ITEMS.slice())
    cy.mount(() => (
      <Application>
        <VDataTable items={ items.value } headers={ DESSERT_HEADERS } itemsPerPage={ 5 }></VDataTable>
      </Application>
    ))

    cy.get('[aria-label="Next page"]')
      .click()
      .then(() => {
        items.value = DESSERT_ITEMS.slice(0, 5)
      })
      .emitted(VDataTable, 'update:page')
      .should('deep.equal', [[2], [1]])
  })
})
