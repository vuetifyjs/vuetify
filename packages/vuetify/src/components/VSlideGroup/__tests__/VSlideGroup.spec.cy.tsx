/* eslint-disable sonarjs/no-identical-functions */
/// <reference types="../../../../types/cypress" />

// Components
import { VSlideGroup, VSlideGroupItem } from '../'
import { Application, CenteredGrid } from '../../../../cypress/templates'
import { VCard } from '@/components/VCard'

// Utilities
import { createRange } from '@/util'

describe('VSlideGroup', () => {
  it('should support default scoped slot with selection', () => {
    cy.mount(() => (
      <Application>
        <CenteredGrid width="400px">
          <VSlideGroup showArrows="always" selectedClass="bg-primary">
            { createRange(6).map(i => (
              <VSlideGroupItem key={ i } value={ i }>
                { props => (
                  <VCard
                    class={['ma-4', props.selectedClass]}
                    color="grey"
                    width="50"
                    height="100"
                    onClick={ props.toggle }
                  >{ i }</VCard>
                )}
              </VSlideGroupItem>
            ))}
          </VSlideGroup>
        </CenteredGrid>
      </Application>
    ))

    cy.get('.v-card').eq(0).click().should('have.class', 'bg-primary')

    cy.get('.v-card').eq(3).click().should('have.class', 'bg-primary')
  })

  it('should disable affixes when appropriate', () => {
    cy.mount(() => (
      <Application>
        <CenteredGrid width="400px">
          <VSlideGroup showArrows="always">
            { createRange(6).map(i => (
              <VSlideGroupItem key={ i }>
                <VCard class="ma-4" color="grey" width="50" height="100">{ i }</VCard>
              </VSlideGroupItem>
            ))}
          </VSlideGroup>
        </CenteredGrid>
      </Application>
    ))

    cy.get('.v-slide-group__prev').should('exist').should('have.css', 'pointer-events', 'none')

    cy.get('.v-slide-group__next').should('exist').click().should('have.css', 'pointer-events', 'none')

    cy.get('.v-slide-group__prev').should('exist').should('not.have.css', 'pointer-events', 'none').click()
  })

  it('should accept scoped prev/next slots', () => {
    cy.mount(() => (
      <Application>
        <CenteredGrid width="400px">
          <VSlideGroup showArrows="always">
            {{
              prev: props => <div { ...props }>prev</div>,
              next: props => <div { ...props }>next</div>,
              default: () => createRange(6).map(i => (
                <VSlideGroupItem key={ i }>
                  <VCard class="ma-4" color="grey" width="50" height="100">{ i }</VCard>
                </VSlideGroupItem>
              )),
            }}
          </VSlideGroup>
        </CenteredGrid>
      </Application>
    ))

    cy.get('.v-slide-group__next').should('exist').should('have.text', 'next').click()
    cy.get('.v-slide-group__prev').should('exist').should('have.text', 'prev').click()
  })

  it('should always showArrows', () => {
    cy.mount(() => (
      <Application>
        <CenteredGrid width="400px">
          <VSlideGroup showArrows="always">
            { createRange(6).map(i => (
              <VSlideGroupItem key={ i }>
                <VCard class="ma-4" color="grey" width="50" height="100">{ i }</VCard>
              </VSlideGroupItem>
            ))}
          </VSlideGroup>
        </CenteredGrid>
      </Application>
    ))

    cy.get('.v-slide-group__prev').should('exist')
    cy.get('.v-slide-group__next').should('exist')
  })

  it('should show arrows on desktop only', () => {
    cy.mount(() => (
      <Application>
        <CenteredGrid width="400px">
          <VSlideGroup showArrows="desktop">
            { createRange(6).map(i => (
              <VSlideGroupItem key={ i }>
                <VCard class="ma-4" color="grey" width="50" height="100">{ i }</VCard>
              </VSlideGroupItem>
            ))}
          </VSlideGroup>
        </CenteredGrid>
      </Application>
    ), null, {
      display: {
        mobileBreakpoint: 'sm',
      },
    })

    cy.viewport(500, 600)

    cy.get('.v-slide-group__prev').should('not.exist')
    cy.get('.v-slide-group__next').should('not.exist')

    cy.viewport(800, 600)

    cy.get('.v-slide-group__prev').should('exist')
    cy.get('.v-slide-group__next').should('exist')
  })

  it('should show arrows on mobile only', () => {
    cy.viewport(800, 600)

    cy.mount(() => (
      <Application>
        <CenteredGrid width="400px">
          <VSlideGroup showArrows="mobile">
            { createRange(3).map(i => (
              <VSlideGroupItem key={ i }>
                <VCard class="ma-4" color="grey" width="50" height="100">{ i }</VCard>
              </VSlideGroupItem>
            ))}
          </VSlideGroup>
        </CenteredGrid>
      </Application>
    ), null, {
      display: {
        mobileBreakpoint: 'sm',
      },
    })

    cy.get('.v-slide-group__prev').should('not.exist')
    cy.get('.v-slide-group__next').should('not.exist')

    cy.viewport(500, 400)

    cy.get('.v-slide-group__prev').should('exist')
    cy.get('.v-slide-group__next').should('exist')
  })

  it('should show arrows when overflowed', () => {
    cy.viewport(800, 200)

    cy.mount(() => (
      <Application>
        <VSlideGroup showArrows>
          { createRange(6).map(i => (
            <VSlideGroupItem key={ i }>
              <VCard class="ma-4" color="grey" width="50" height="100">{ i }</VCard>
            </VSlideGroupItem>
          ))}
        </VSlideGroup>
      </Application>
    ))

    cy.get('.v-slide-group__prev').should('not.exist')
      .get('.v-slide-group__next').should('not.exist')

    cy.viewport(400, 200)

    cy.get('.v-slide-group__prev').should('exist')
      .get('.v-slide-group__next').should('exist')
  })

  it('should scroll active item into view', () => {
    cy.mount(() => (
      <Application>
        <CenteredGrid width="400px">
          <VSlideGroup modelValue={ 7 } showArrows="always" selectedClass="bg-primary">
            { createRange(10).map(i => (
              <VSlideGroupItem key={ i } value={ i }>
                { props => <VCard color="grey" width="50" height="100" class={['ma-4', props.selectedClass]}>{ i }</VCard> }
              </VSlideGroupItem>
            ))}
          </VSlideGroup>
        </CenteredGrid>
      </Application>
    ))

    cy.get('.v-card').eq(7).should('exist').should('be.visible').should('have.class', 'bg-primary')
  })

  it('should support touch scroll', () => {
    cy.mount(() => (
      <Application>
        <CenteredGrid width="400px">
          <VSlideGroup selectedClass="bg-primary">
            { createRange(8).map(i => (
              <VSlideGroupItem key={ i } value={ i }>
                { props => <VCard color="grey" width="50" height="100" class={['ma-4', props.selectedClass, `item-${i}`]}>{ i }</VCard> }
              </VSlideGroupItem>
            ))}
          </VSlideGroup>
        </CenteredGrid>
      </Application>
    ))

    cy.get('.v-slide-group__content').should('exist').swipe([450, 50], [50, 50])

    cy.get('.item-1').should('not.be.visible')
    cy.get('.item-7').should('be.visible')
  })

  it('should support rtl', () => {
    cy.mount(() => (
      <Application rtl>
        <CenteredGrid width="400px">
          <VSlideGroup selectedClass="bg-primary" showArrows>
            { createRange(8).map(i => (
              <VSlideGroupItem key={ i } value={ i }>
                { props => <VCard color="grey" width="50" height="100" class={['ma-4', props.selectedClass, `item-${i}`]}>{ i }</VCard> }
              </VSlideGroupItem>
            ))}
          </VSlideGroup>
        </CenteredGrid>
      </Application>
    ))

    cy.get('.item-7').should('exist').should('not.be.visible')

    cy.get('.v-slide-group__prev--disabled').should('exist')
    cy.get('.v-slide-group__next--disabled').should('not.exist')

    cy.get('.v-slide-group__next').click().click()

    cy.get('.item-7').should('exist').should('be.visible')
  })
})
