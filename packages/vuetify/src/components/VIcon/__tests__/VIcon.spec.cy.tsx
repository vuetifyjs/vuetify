/// <reference types="../../../../types/cypress" />

// Components
import { VClassIcon } from '..'
import { VIcon } from '../VIcon'

// Utilities
import { defineComponent } from 'vue'

describe('VIcon', () => {
  describe('icon prop', () => {
    it('should render icon from default set', () => {
      cy.mount(() => (
        <VIcon icon="mdi-home" />
      ))

      cy.get('.v-icon').should('have.class', 'mdi')
      cy.get('.v-icon').should('have.class', 'mdi-home')
    })

    it('should render aliased icon', () => {
      cy.mount(() => (
        <VIcon icon="$close" />
      ))

      cy.get('.v-icon').should('have.class', 'mdi')
      cy.get('.v-icon').should('have.class', 'mdi-close')
    })

    it('should render icon from alternative set', () => {
      cy.mount(() => (
        <VIcon icon="foo:bar" />
      ), null, {
        icons: {
          defaultSet: 'mdi',
          sets: {
            foo: {
              component: props => <VClassIcon { ...props } />,
            },
          },
        },
      })

      cy.get('.v-icon').should('have.class', 'bar')
    })
  })

  describe('default slot', () => {
    it('should render icon from default set', () => {
      cy.mount(() => (
        <VIcon>mdi-home</VIcon>
      ))

      cy.get('.v-icon').should('have.class', 'mdi')
      cy.get('.v-icon').should('have.class', 'mdi-home')
    })

    it('should render aliased icon', () => {
      cy.mount(() => (
        <VIcon>$close</VIcon>
      ))

      cy.get('.v-icon').should('have.class', 'mdi')
      cy.get('.v-icon').should('have.class', 'mdi-close')
    })

    it('should render icon from alternative set', () => {
      cy.mount(() => (
        <VIcon>
          foo:bar
        </VIcon>
      ), null, {
        icons: {
          defaultSet: 'mdi',
          sets: {
            foo: {
              component: props => <VClassIcon { ...props } />,
            },
          },
        },
      })

      cy.get('.v-icon').should('have.class', 'bar')
    })

    it('should render default slot if no icon value found', () => {
      const Foo = defineComponent({
        setup () {
          return () => (
            <svg style="width: 100%; height: 100%;" class="foo">
              <path d="M7,10L12,15L17,10H7Z"></path>
            </svg>
          )
        },
      })

      cy.mount(() => (
        <VIcon>
          <Foo>bar</Foo>
        </VIcon>
      ))

      cy.get('.v-icon > svg.foo').should('exist')
    })
  })

  it('should render svg icon', () => {
    cy.mount(() => (
      <VIcon icon="svg:M7,10L12,15L17,10H7Z" />
    ))

    cy.get('.v-icon svg').should('exist')
    cy.get('.v-icon path').should('have.attr', 'd', 'M7,10L12,15L17,10H7Z')
  })

  it('should render class icon', () => {
    cy.mount(() => (
      <VIcon icon="class:foo" />
    ))

    cy.get('.v-icon').should('have.class', 'foo')
  })
})
