/// <reference types="../../../../types/cypress" />

import { ref } from 'vue'
import { VDataTableServer } from '..'

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

describe('VDataTableServer', () => {
  it('should render table', () => {
    const itemsLength = 2

    cy.mount(() => (
      <VDataTableServer
        headers={ DESSERT_HEADERS }
        items={ DESSERT_ITEMS.slice(0, itemsLength) }
        items-length={ itemsLength }
      ></VDataTableServer>
    ))

    cy.get('.v-data-table thead th').should('have.length', DESSERT_HEADERS.length)
    cy.get('.v-data-table tbody tr').should('have.length', itemsLength)
  })

  it('should only trigger update event once on mount', () => {
    const items = ref<any[]>([])
    const options = ref({
      itemsLength: 0,
      page: 1,
      itemsPerPage: 2,
    })

    function load (opts: { page: number, itemsPerPage: number }) {
      setTimeout(() => {
        const start = (opts.page - 1) * opts.itemsPerPage
        const end = start + opts.itemsPerPage
        items.value = DESSERT_ITEMS.slice(start, end)
      }, 10)
    }

    cy.mount(() => (
      <VDataTableServer
        headers={ DESSERT_HEADERS }
        items={ items.value }
        { ...options.value }
        onUpdate:options={ load }
      ></VDataTableServer>
    ))

    cy.get('.v-data-table tbody tr')
      .vue()
      .then(({ wrapper }) => {
        const table = wrapper.findComponent(VDataTableServer)
        const emits = table.emitted('update:options')
        expect(emits).to.have.length(1)
      })
  })
})
