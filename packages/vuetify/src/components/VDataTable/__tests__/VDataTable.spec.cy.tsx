/// <reference types="../../../../types/cypress" />

// Components
import { VDataTable } from '..'
import { Application } from '../../../../cypress/templates'

// Utilities
import { ref } from 'vue'

const DESSERT_HEADERS = [
  { title: 'Dessert (100g serving)', key: 'name' },
  { title: 'Calories', key: 'calories' },
  { title: 'Fat (g)', key: 'fat' },
  { title: 'Carbs (g)', key: 'carbs' },
  { title: 'Protein (g)', key: 'protein' },
  { title: 'Iron (%)', key: 'iron' },
  { title: 'Group', key: 'group' },
]

const DESSERT_ITEMS = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1%',
    group: 1,
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1%',
    group: 3,
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7%',
    group: 2,
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8%',
    group: 2,
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16%',
    group: 3,
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0%',
    group: 1,
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2%',
    group: 2,
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45%',
    group: 3,
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: '22%',
    group: 3,
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6%',
    group: 1,
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
        key: 'unique',
        value: 'foo.bar',
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

  // https://github.com/vuetifyjs/vuetify/issues/19069
  it('should update the select all checkbox when changing the select-strategy', () => {
    const strategy = ref('single')
    cy.mount(() => (
      <Application>
        <VDataTable select-strategy={ strategy.value } items={ DESSERT_ITEMS } headers={ DESSERT_HEADERS } showSelect />
      </Application>
    )).get('thead .v-selection-control').should('not.exist')
      .then(() => strategy.value = 'all')
      .get('thead .v-selection-control').should('exist')
      .then(() => strategy.value = 'page')
      .get('thead .v-selection-control').should('exist')
  })

  describe('slots', () => {
    it('should have top slot', () => {
      cy.mount(() => (
        <Application>
          <VDataTable>
            {{
              top: _ => <div id="top">TOP</div>,
            }}
          </VDataTable>
        </Application>
      ))

      cy.get('.v-data-table').find('#top').should('have.text', 'TOP')
    })

    it('should have bottom slot (and should overwrite footer)', () => {
      cy.mount(() => (
        <Application>
          <VDataTable>
            {{
              bottom: _ => <div id="bottom">BOTTOM</div>,
            }}
          </VDataTable>
        </Application>
      ))

      cy.get('.v-data-table').find('#bottom').should('have.text', 'BOTTOM')
      cy.get('.v-data-table-footer').should('not.exist')
    })

    it('should have headers slot (and overwrite default headers)', () => {
      cy.mount(() => (
        <Application>
          <VDataTable>
            {{
              headers: _ => <div id="headers">headers</div>,
            }}
          </VDataTable>
        </Application>
      ))

      cy.get('.v-data-table').find('#headers').should('have.text', 'headers')
      cy.get('.v-data-table__th').should('not.exist')
    })

    it('should have colgroup slot', () => {
      cy.mount(() => (
        <Application>
          <VDataTable items={ DESSERT_ITEMS } headers={ DESSERT_HEADERS }>
            {{
              colgroup: ({ columns }) => (
                <colgroup>
                  { columns.map(column => (
                    <col id={ column.key! }></col>
                  ))}
                </colgroup>
              ),
            }}
          </VDataTable>
        </Application>
      ))

      cy.get('colgroup').should('exist')
    })

    it('should have header.* slots', () => {
      cy.mount(() => (
        <Application>
          <VDataTable items={ DESSERT_ITEMS } headers={ DESSERT_HEADERS } showSelect showExpand>
            {{
              'header.data-table-expand': () => <h1>expand</h1>,
              'header.data-table-select': () => <h2>select</h2>,
              'header.name': ({ column }) => (
                <h3>{ column.title }</h3>
              ),
            }}
          </VDataTable>
        </Application>
      ))

      cy.get('.v-data-table__th').find('h1').should('exist')
      cy.get('.v-data-table__th').find('h2').should('exist')
      cy.get('.v-data-table__th').find('h3').should('exist')
    })

    it('should have item slot', () => {
      cy.mount(() => (
        <Application>
          <VDataTable items={ DESSERT_ITEMS } headers={ DESSERT_HEADERS } itemsPerPage={ 10 }>
            {{
              item: ({ columns, internalItem }) => (
                <tr class="custom-row">
                  { columns.map(column => (
                    column.key != null ? (
                      <td>
                        <h1>{ internalItem.columns[column.key] }</h1>
                      </td>
                    ) : null
                  ))}
                </tr>
              ),
            }}
          </VDataTable>
        </Application>
      ))

      cy.get('.custom-row').should('have.length', 10)
    })

    it('should have item.* slots', () => {
      cy.mount(() => (
        <Application>
          <VDataTable items={ DESSERT_ITEMS } headers={ DESSERT_HEADERS } showSelect showExpand>
            {{
              'item.data-table-expand': () => <h1>expand</h1>,
              'item.data-table-select': () => <h2>select</h2>,
              'item.name': ({ value }) => (
                <h3>{ value }</h3>
              ),
            }}
          </VDataTable>
        </Application>
      ))

      cy.get('.v-data-table').find('h1').should('exist')
      cy.get('.v-data-table').find('h2').should('exist')
      cy.get('.v-data-table').find('h3').should('exist')
    })

    it('should have body slot and slot prop should show correct item count after group is expanded', () => {
      cy.mount(() => (
        <Application>
          <VDataTable
            items={ DESSERT_ITEMS }
            headers={ DESSERT_HEADERS }
            itemsPerPage={ -1 }
            groupBy={[{ key: 'group', order: 'desc' }]}
          >
            {{
              'body.append': ({ items }) => <div id="body-append">{ items.length }</div>,
            }}
          </VDataTable>
        </Application>
      ))

      cy.get('.v-data-table').find('div#body-append').should('have.text', DESSERT_ITEMS.length)
      cy.get(':nth-child(1) > .v-data-table__td > .v-btn').click()
      cy.get('.v-data-table').find('div#body-append').should('have.text', DESSERT_ITEMS.length)
    })
  })

  describe('sort', () => {
    it('should sort by sortBy', () => {
      cy.mount(() => (
        <Application>
          <VDataTable
          items={ DESSERT_ITEMS }
          headers={ DESSERT_HEADERS }
          itemsPerPage={ 10 }
          sortBy={[{ key: 'fat', order: 'asc' }]}
          />
        </Application>
      ))
      cy.get('thead .v-data-table__td').eq(2).should('have.class', 'v-data-table__th--sorted')
        .get('tbody td:nth-child(3)').then(rows => {
          const actualFat = Array.from(rows).map(row => {
            return Number(row.textContent)
          })
          const expectedFat = DESSERT_ITEMS.map(d => d.fat).sort((a, b) => a - b)
          expect(actualFat).to.deep.equal(expectedFat)
        })
      cy.get('thead .v-data-table__td').eq(2).click()
        .get('thead .v-data-table__td').eq(2).should('have.class', 'v-data-table__th--sorted')
        .get('tbody td:nth-child(3)').then(rows => {
          const actualFat = Array.from(rows).map(row => {
            return Number(row.textContent)
          })
          const expectedFat = DESSERT_ITEMS.map(d => d.fat).sort((a, b) => b - a)
          expect(actualFat).to.deep.equal(expectedFat)
        })
    })

    it('should sort by groupBy and sortBy', () => {
      cy.mount(() => (
        <Application>
          <VDataTable
          items={ DESSERT_ITEMS }
          headers={ DESSERT_HEADERS }
          itemsPerPage={ 10 }
          groupBy={[{ key: 'group', order: 'desc' }]}
          sortBy={[{ key: 'calories', order: 'desc' }]}
          />
        </Application>
      )).get('tr.v-data-table-group-header-row .v-data-table__td button + span').then(rows => {
        const actualGroup = Array.from(rows).map(row => {
          return Number(row.textContent)
        })
        const expectedGroup = [...new Set(DESSERT_ITEMS.map(d => d.group))].sort((a, b) => b - a)
        expect(actualGroup).to.deep.equal(expectedGroup)
      }).get('.v-data-table-group-header-row button').eq(0).click()
        .get('.v-data-table__tr td:nth-child(3)').then(rows => {
          const actualCalories = Array.from(rows).map(row => {
            return Number(row.textContent)
          })
          const expectedCalories = DESSERT_ITEMS.filter(d => d.group === 3).map(d => d.calories).sort((a, b) => b - a)
          expect(actualCalories).to.deep.equal(expectedCalories)
        })
    })

    // https://github.com/vuetifyjs/vuetify/issues/20046
    it('should sort by groupBy while sort is disabled', () => {
      cy.mount(() => (
        <Application>
          <VDataTable
          items={ DESSERT_ITEMS }
          headers={ DESSERT_HEADERS }
          itemsPerPage={ 10 }
          groupBy={[{ key: 'group', order: 'desc' }]}
          sortBy={[{ key: 'calories', order: 'desc' }]}
          disableSort
          />
        </Application>
      )).get('tr.v-data-table-group-header-row .v-data-table__td button + span').then(rows => {
        const actualGroup = Array.from(rows).map(row => {
          return Number(row.textContent)
        })
        const expectedGroup = [...new Set(DESSERT_ITEMS.map(d => d.group))].sort((a, b) => b - a)
        expect(actualGroup).to.deep.equal(expectedGroup)
      }).get('.v-data-table-group-header-row button').eq(0).click()
        .get('.v-data-table__tr td:nth-child(3)').then(rows => {
          const actualCalories = Array.from(rows).map(row => {
            return Number(row.textContent)
          })
          const expectedCalories = DESSERT_ITEMS.filter(d => d.group === 3).map(d => d.calories)
          expect(actualCalories).to.deep.equal(expectedCalories)
        })
    })
  })
})
