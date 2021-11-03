/// <reference types="../../../../types/cypress" />

import { CenteredGrid } from '@/../cypress/templates'
import { VListGroup } from '../VListGroup'
import { VListItem } from '../VListItem'
import { VList } from '../VList'

describe('VListGroup', () => {
  function mountFunction (content: JSX.Element) {
    return cy.mount(() => content)
  }

  it('supports header slot', () => {
    const wrapper = mountFunction((
      <CenteredGrid width="200px">
        <h2 class="mt-8">ListGroup</h2>

        <VList>
          <VListGroup
            v-slots={{
              header: props => <VListItem {...props} title="Group" />,
            }}
          />
        </VList>
      </CenteredGrid>
    ))

    wrapper.get('.v-list-item-title').contains('Group')
  })

  it('supports children', () => {
    const wrapper = mountFunction((
      <CenteredGrid width="200px">
        <h2 class="mt-8">ListGroup</h2>

        <VList opened={['group']}>
          <VListGroup
            value="group"
            v-slots={{
              header: props => <VListItem {...props} title="Group" />,
              default: () => (
                <>
                  <VListItem title="Child 1" />
                  <VListItem title="Child 2" />
                </>
              ),
            }}
          />
        </VList>
      </CenteredGrid>
    ))

    wrapper.get('.v-list-item-title').contains('Group')
  })
})
