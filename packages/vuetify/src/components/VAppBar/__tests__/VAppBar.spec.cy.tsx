/// <reference types="../../../../types/cypress" />

// Components
import { VAppBar } from '..'
import { VLayout } from '@/components/VLayout'
import { VMain } from '@/components/VMain'

// Constants
const SCROLL_OPTIONS = { ensureScrollable: true, duration: 50 }

describe('VAppBar', () => {
  it('should allow custom height', () => {
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

  it('should support density', () => {
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

  it('should support scroll behavior', () => {
    cy
      .mount(({ scrollBehavior }: any) => (
        <VLayout>
          <VAppBar scrollBehavior={ scrollBehavior } />

          <VMain style="min-height: 200vh;">
            Content
          </VMain>
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
      .setProps({ scrollBehavior: 'inverted' })
      .get('.v-app-bar').should('be.visible')
      .window().scrollTo(0, 500, SCROLL_OPTIONS)
      .get('.v-app-bar').should('not.be.visible')
      .window().scrollTo(0, 250, SCROLL_OPTIONS)
      .get('.v-app-bar').should('not.be.visible')
      .window().scrollTo(0, 0, SCROLL_OPTIONS)
      .get('.v-app-bar').should('be.visible')
      .setProps({ scrollBehavior: 'collapse' })
      .get('.v-app-bar').should('be.visible')
      .get('.v-app-bar').should('have.not.class', 'v-toolbar--collapse')
      .window().scrollTo(0, 500, SCROLL_OPTIONS)
      .get('.v-app-bar').should('have.class', 'v-toolbar--collapse')
      .window().scrollTo(0, 0, SCROLL_OPTIONS)
      .setProps({ scrollBehavior: 'elevate' })
      .get('.v-app-bar').should('have.class', 'v-toolbar--flat')
      .window().scrollTo(0, 500, SCROLL_OPTIONS)
      .get('.v-app-bar').should('have.not.class', 'v-toolbar--flat')
      .window().scrollTo(0, 0, SCROLL_OPTIONS)
      .setProps({ scrollBehavior: 'hide inverted' })
      .get('.v-app-bar').should('not.be.visible')
      .window().scrollTo(0, 500, SCROLL_OPTIONS)
      .get('.v-app-bar').should('be.visible')
      .window().scrollTo(0, 0, SCROLL_OPTIONS)
      .get('.v-app-bar').should('not.be.visible')
  })
})
