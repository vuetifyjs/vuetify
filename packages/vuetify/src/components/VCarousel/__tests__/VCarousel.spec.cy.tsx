/// <reference types="../../../../types/cypress" />

import { VCarouselItem, VDefaultsProvider } from '@/components'
import { VCarousel } from '../VCarousel'

describe('VCarousel', () => {
  describe('global configuration', () => {
    it('should only apply \'v-autocomplete\' class to root element and also apply global config class/style', () => {
      cy.mount(() => (
        <VDefaultsProvider defaults={ {
          global: {
            class: 'v-global-class',
            style: {
              opacity: 0.5,
            },
          },
          VCarousel: {
            class: 'v-carousel-alt',
            style: {
              margin: '1px',
            },
          },
          VWindow: {
            class: 'v-window-alt',
            style: {
              'z-index': '999999',
            },
          },
          VCarouselItem: {
            class: 'v-carousel-item-alt',
            style: {
              padding: '999px',
            },
          },
          VWindowItem: {
            class: 'v-window-item-alt',
            style: {
              'z-index': '999999',
            },
          },
        } }
        >

          <VCarousel>
            <VCarouselItem></VCarouselItem>
          </VCarousel>
        </VDefaultsProvider>
      ))

      // VCarousel
      cy.get('.v-carousel')
        .should('have.length', 1)
        // assert it's the root element
        .should('have.class', 'v-window')
        .should('have.class', 'v-carousel-alt') // VCarousel class takes highest priority
        .should('have.css', 'margin', '1px') // VCarousel style takes highest priority
        .should('have.css', 'z-index', 'auto') // Ignore VWindow global style

      cy.get('.v-carousel.v-global-class').should('not.exist') // Ignore global class
      cy.get('.v-carousel.v-window-alt').should('not.exist') // Ignore VWindow global style

      // VCarouselItem
      cy.get('.v-carousel-item')
        .should('have.length', 1)
        // assert it's the root element
        .should('have.class', 'v-window-item')
        .should('have.class', 'v-carousel-item-alt') // VCarouselItem class takes highest priority
        .should('have.css', 'padding', '999px') // VCarouselItem style takes highest priority
        .should('have.css', 'z-index', 'auto') // Ignore VWindowItem global style

      cy.get('.v-carousel-item.v-global-class').should('not.exist') // Ignore global class
      cy.get('.v-carousel-item.v-window-item-alt').should('not.exist') // Ignore VWindowItem global style
    })
  })
})
