/// <reference types="../../../../types/cypress" />

import { CenteredGrid } from '@/../cypress/templates'
import { VListGroup } from '../VListGroup'
import { VListItem } from '../VListItem'
import { VList } from '../VList'

function ListGroup (lazy: boolean, open: boolean): JSX.Element {
  return (
    <CenteredGrid width="200px">
      <h2 class="mt-8">ListGroup</h2>

      <VList opened={ open ? ['group'] : [] }>
        <VListGroup value="group" lazy={ lazy }>
          {{
            activator: ({ props }) => <VListItem { ...props } title="Group" />,
            default: () => (
              <>
                <VListItem title="Child 1" />
                <VListItem title="Child 2" />
              </>
            ),
          }}
        </VListGroup>
      </VList>
    </CenteredGrid>
  )
}

describe('VListGroup', () => {
  function mountFunction (content: JSX.Element) {
    return cy.mount(() => content)
  }

  it('supports header slot', () => {
    const wrapper = mountFunction((
      <CenteredGrid width="200px">
        <h2 class="mt-8">ListGroup</h2>

        <VList>
          <VListGroup>
            {{ activator: props => <VListItem { ...props } title="Group" /> }}
          </VListGroup>
        </VList>
      </CenteredGrid>
    ))

    wrapper.get('.v-list-item-title').contains('Group')
  })

  it('supports children', () => {
    const wrapper = mountFunction(ListGroup(false, true))
    wrapper.get('.v-list-item-title').contains('Group')
  })

  describe('lazy', () => {
    it('open on click', () => {
      const wrapper = mountFunction(ListGroup(true, false))

      const group = wrapper.get('.v-list-group')
      group.get('.v-list-group__items .v-list-item').should('have.length', 0)
      group.get('.v-list-item').click()
      group.get('.v-list-group__items .v-list-item').should('have.length', 2)
    })

    it('already opened children', () => {
      const wrapper = mountFunction(ListGroup(true, true))

      wrapper.get('.v-list-group__items .v-list-item').should('have.length', 2)
    })
  })
})
