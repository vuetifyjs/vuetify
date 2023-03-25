/// <reference types="../../../../types/cypress" />

import { CenteredGrid } from '@/../cypress/templates'
import { VHover } from '../VHover'

describe('VHover', () => {
  it('should react on mouse events', () => {
    cy.mount(() => (
      <CenteredGrid width="200px" class="v-theme--light">
        <VHover>
          {{
            default: ({ isHovering, props }: any) => <div { ...props } class={['hover-element', isHovering && 'bg-primary']}>foobar</div>,
          }}
        </VHover>
      </CenteredGrid>
    ))
      .get('.hover-element')
      .trigger('mouseenter')
      .should('have.class', 'bg-primary')
      .trigger('mouseleave')
      .should('not.have.class', 'bg-primary')
  })

  it('should not react when disabled', () => {
    cy.mount(() => (
      <CenteredGrid width="200px" class="v-theme--light">
        <VHover disabled>
          {{
            default: ({ isHovering, props }: any) => <div { ...props } class={['hover-element', isHovering && 'bg-primary']}>foobar</div>,
          }}
        </VHover>
      </CenteredGrid>
    ))
      .get('.hover-element')
      .trigger('mouseenter')
      .should('not.have.class', 'bg-primary')
      .trigger('mouseleave')
      .should('not.have.class', 'bg-primary')
  })

  it('should respect delays', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.mount(() => (
      <CenteredGrid width="200px" class="v-theme--light">
        <VHover openDelay={ 100 } closeDelay={ 100 }>
          {{
            default: ({ isHovering, props }: any) => <div { ...props } class={['hover-element', isHovering && 'bg-primary']}>foobar</div>,
          }}
        </VHover>
      </CenteredGrid>
    ))
      .get('.hover-element')
      .trigger('mouseenter')
      .should('not.have.class', 'bg-primary')
      .wait(100)
      .should('have.class', 'bg-primary')
      .trigger('mouseleave')
      .should('have.class', 'bg-primary')
      .wait(100)
      .should('not.have.class', 'bg-primary')
  })
})
