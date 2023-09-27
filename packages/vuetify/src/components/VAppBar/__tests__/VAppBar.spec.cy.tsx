/// <reference types="../../../../types/cypress" />

// Components
import { VAppBar } from '..'
import { VLayout } from '@/components/VLayout'
import { VMain } from '@/components/VMain'

// Utilities
import { ref } from 'vue'

// Constants
const SCROLL_OPTIONS = { ensureScrollable: true, duration: 50 }

describe('VAppBar', () => {
  it('allows custom height', () => {
    cy
      .mount(({ height }: any) => (
        <VLayout>
          <VAppBar height={ height } />
        </VLayout>
      ))
      .get('.v-app-bar').should('have.css', 'height', '64px')
      .setProps({ height: 128 })
      .get('.v-app-bar').should('have.css', 'height', '128px')
  })

  it('supports density', () => {
    cy
      .mount(({ density = 'default' }: any) => (
        <VLayout>
          <VAppBar density={ density } />
        </VLayout>
      ))
      .get('.v-app-bar').should('have.css', 'height', '64px')
      .setProps({ density: 'prominent' })
      .get('.v-app-bar').should('have.css', 'height', '128px')
      .setProps({ density: 'comfortable' })
      .get('.v-app-bar').should('have.css', 'height', '56px')
      .setProps({ density: 'compact' })
      .get('.v-app-bar').should('have.css', 'height', '48px')
  })

  it('is hidden on mount', () => {
    const model = ref(false)

    cy
      .mount(() => (
        <VLayout>
          <VAppBar v-model={ model.value } />
        </VLayout>
      ))
      .get('.v-app-bar')
      .should('not.be.visible')
      .then(() => (model.value = true))
      .get('.v-app-bar')
      .should('be.visible')
  })

  describe('scroll behavior', () => {
    it('hides', () => {
      cy.mount(({ scrollBehavior }: any) => (
        <VLayout>
          <VAppBar scrollBehavior={ scrollBehavior } />

          <VMain style="min-height: 200vh;" />
        </VLayout>
      ))
        .setProps({ scrollBehavior: 'hide' })
        .get('.v-app-bar').should('be.visible')
        .window().scrollTo(0, 500, SCROLL_OPTIONS)
        .get('.v-app-bar').should('not.be.visible')
        .window().scrollTo(0, 250, SCROLL_OPTIONS)
        .get('.v-app-bar').should('be.visible')
        .window().scrollTo(0, 0, SCROLL_OPTIONS)
        .get('.v-app-bar').should('be.visible')

        .setProps({ scrollBehavior: 'hide inverted' })
        .get('.v-app-bar').should('not.be.visible')
        .window().scrollTo(0, 500, SCROLL_OPTIONS)
        .get('.v-app-bar').should('be.visible')
        .window().scrollTo(0, 250, SCROLL_OPTIONS)
        .get('.v-app-bar').should('not.be.visible')
        .window().scrollTo(0, 0, SCROLL_OPTIONS)
        .get('.v-app-bar').should('not.be.visible')
    })

    it('collapses', () => {
      cy.mount(({ scrollBehavior }: any) => (
        <VLayout>
          <VAppBar scrollBehavior={ scrollBehavior } />

          <VMain style="min-height: 200vh;" />
        </VLayout>
      ))
        .setProps({ scrollBehavior: 'collapse' })
        .get('.v-app-bar').should('be.visible')
        .get('.v-app-bar').should('have.not.class', 'v-toolbar--collapse')
        .window().scrollTo(0, 500, SCROLL_OPTIONS)
        .get('.v-app-bar').should('have.class', 'v-toolbar--collapse')
        .window().scrollTo(0, 0, SCROLL_OPTIONS)

        .setProps({ scrollBehavior: 'collapse inverted' })
        .get('.v-app-bar').should('be.visible')
        .get('.v-app-bar').should('have.class', 'v-toolbar--collapse')
        .window().scrollTo(0, 500, SCROLL_OPTIONS)
        .get('.v-app-bar').should('not.have.class', 'v-toolbar--collapse')
        .window().scrollTo(0, 0, SCROLL_OPTIONS)
    })

    it('elevates', () => {
      cy.mount(({ scrollBehavior }: any) => (
        <VLayout>
          <VAppBar scrollBehavior={ scrollBehavior } />

          <VMain style="min-height: 200vh;" />
        </VLayout>
      ))
        .setProps({ scrollBehavior: 'elevate' })
        .get('.v-app-bar').should('have.class', 'v-toolbar--flat')
        .window().scrollTo(0, 500, SCROLL_OPTIONS)
        .get('.v-app-bar').should('not.have.class', 'v-toolbar--flat')
        .window().scrollTo(0, 0, SCROLL_OPTIONS)

        .setProps({ scrollBehavior: 'elevate inverted' })
        .get('.v-app-bar').should('not.have.class', 'v-toolbar--flat')
        .window().scrollTo(0, 500, SCROLL_OPTIONS)
        .get('.v-app-bar').should('have.class', 'v-toolbar--flat')
        .window().scrollTo(0, 0, SCROLL_OPTIONS)
    })

    it('fades image', () => {
      cy.mount(({ scrollBehavior, image }: any) => (
        <VLayout>
          <VAppBar
            image={ image }
            scrollBehavior={ scrollBehavior }
          />

          <VMain style="min-height: 200vh;" />
        </VLayout>
      ))
        .setProps({
          image: 'https://picsum.photos/1920/1080?random',
          scrollBehavior: 'fade-image',
        })
        .get('.v-toolbar__image').should('have.css', 'opacity', '1')
        .window().scrollTo(0, 150, SCROLL_OPTIONS)
        .get('.v-toolbar__image').should('have.css', 'opacity', '0.5')
        .window().scrollTo(0, 300, SCROLL_OPTIONS)
        .get('.v-toolbar__image').should('have.css', 'opacity', '0')
        .window().scrollTo(0, 60, SCROLL_OPTIONS)
        .get('.v-toolbar__image').should('have.css', 'opacity', '0.8')
        .window().scrollTo(0, 0, SCROLL_OPTIONS)
        .get('.v-toolbar__image').should('have.css', 'opacity', '1')

        .setProps({ scrollBehavior: 'fade-image inverted' })
        .get('.v-toolbar__image').should('have.css', 'opacity', '0')
        .window().scrollTo(0, 150, SCROLL_OPTIONS)
        .get('.v-toolbar__image').should('have.css', 'opacity', '0.5')
        .window().scrollTo(0, 300, SCROLL_OPTIONS)
        .get('.v-toolbar__image').should('have.css', 'opacity', '1')
        .window().scrollTo(0, 60, SCROLL_OPTIONS)
        .get('.v-toolbar__image').should('have.css', 'opacity', '0.2')
        .window().scrollTo(0, 0, SCROLL_OPTIONS)
        .get('.v-toolbar__image').should('have.css', 'opacity', '0')
    })
  })
})
