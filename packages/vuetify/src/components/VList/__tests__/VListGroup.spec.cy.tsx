/// <reference types="../../../../types/cypress" />

import { CenteredGrid } from '@/../cypress/templates'
import { VListGroup } from '../VListGroup'
import { VListItem } from '../VListItem'
import { VList } from '../VList'

// Utilities
import { ref } from 'vue'

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
    const wrapper = mountFunction((
      <CenteredGrid width="200px">
        <h2 class="mt-8">ListGroup</h2>

        <VList opened={['group']}>
          <VListGroup value="group">
            {{
              activator: props => <VListItem { ...props } title="Group" />,
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
    ))

    wrapper.get('.v-list-item-title').contains('Group')
  })

  it('should not remove opened when unmounted', () => {
    const visible = ref(true)
    const opened = ref(['Users'])
    const wrapper = mountFunction((
      <CenteredGrid width="200px">
        <h2 class="mt-8">ListGroup</h2>

        <VList opened={ opened.value }>
          {
            visible.value && (
              <VListGroup value="Users">
                {{
                  default: () => (
                    <>
                      <VListItem title="Foo" />
                      <VListItem title="Bar" />
                    </>
                  ),
                }}
              </VListGroup>
            )
          }
        </VList>
      </CenteredGrid>
    ))

    wrapper.get('.v-list .v-list-group').should('exist')
      .get('.v-list-group__items').should('be.visible')
      .then(() => {
        visible.value = false
      })
      .get('.v-list.v-list-group').should('not.exist')
      .then(() => {
        visible.value = true
      })
      .get('.v-list-group').should('exist')
      .get('.v-list-group__items').should('be.visible')
  })
})
