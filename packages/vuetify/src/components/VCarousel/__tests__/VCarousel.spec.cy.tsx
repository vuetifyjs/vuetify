/// <reference types="../../../../types/cypress" />

import { VCarouselItem, VDefaultsProvider } from '@/components'
import { VCarousel } from '../VCarousel'

describe('VCarousel', () => {
  describe('global configuration', () => {
    it('should only apply \'v-carousel\' class to root element and also apply global config class/style', () => {
      cy
        .mount(() => (
          <VDefaultsProvider
            defaults={{
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
            }}
          >
            <VCarousel>
              <VCarouselItem></VCarouselItem>
            </VCarousel>
          </VDefaultsProvider>
        ))
        .get('.v-carousel')
        .should('have.class', 'v-global-class')
        .should('have.class', 'v-carousel-alt')
        .should('have.class', 'v-window-alt')
        .should('have.css', 'margin', '1px')
        .should('have.css', 'z-index', '999999')
        .get('.v-carousel-item')
        .should('have.class', 'v-global-class')
        .should('have.class', 'v-carousel-item-alt')
        .should('have.class', 'v-window-item-alt')
        .should('have.css', 'padding', '999px')
        .should('have.css', 'z-index', '999999')
    })
  })
})
