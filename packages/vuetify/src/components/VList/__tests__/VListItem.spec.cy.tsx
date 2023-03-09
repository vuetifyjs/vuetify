/// <reference types="../../../../types/cypress" />

import { ref } from 'vue'
import { CenteredGrid } from '@/../cypress/templates'
import { VListItem } from '../'

describe('VListItem', () => {
  function mountFunction (content: JSX.Element) {
    return cy.mount(() => content)
  }

  it('supports header text props, title and subtitle', () => {
    const wrapper = mountFunction((
      <CenteredGrid width="200px">
        <h2 class="mt-8">ListItem Header Text</h2>

        <VListItem title="foo" subtitle="bar" />
      </CenteredGrid>
    ))

    wrapper.get('.v-list-item-title').contains('foo')
    wrapper.get('.v-list-item-subtitle').contains('bar')
  })

  // https://github.com/vuetifyjs/vuetify/issues/13893
  it('should use active-color for active item', () => {
    cy.mount({
      setup () {
        const model = ref<boolean>(false)
        const onClick = () => model.value = !model.value

        return () => (
          <CenteredGrid width="200px">
            <VListItem title="foo" subtitle="bar" active-color="success" active={ model.value } onClick={ onClick } />
            <VListItem title="foo" subtitle="bar" active-color="success" active={ !model.value } onClick={ onClick } />
          </CenteredGrid>
        )
      },
    }).get('.v-list-item').eq(0).click().should('have.class', 'text-success')
  })
})
