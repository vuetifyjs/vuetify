/// <reference types="../../../../types/cypress" />

// Components
import { VBreadcrumbs } from '..'
import { Application } from '../../../../cypress/templates'
import { VBreadcrumbsDivider } from '../VBreadcrumbsDivider'
import { VBreadcrumbsItem } from '../VBreadcrumbsItem'

// Utilities
import { createRouter, createWebHistory } from 'vue-router'

describe('VBreadcrumbs', () => {
  it('should use item slot', () => {
    cy.mount(() => (
      <Application>
        <VBreadcrumbs items={['hello', 'world']}>
          {{
            title: ({ item }: any) => `${item}!`,
          }}
        </VBreadcrumbs>
      </Application>
    ))

    cy.get('.v-breadcrumbs-item').should('have.length', 2).eq(0).should('have.text', 'hello!')
  })

  it('should use divider slot', () => {
    cy.mount(() => (
      <Application>
        <VBreadcrumbs items={['hello', 'world']}>
          {{
            divider: () => '-',
          }}
        </VBreadcrumbs>
      </Application>
    ))

    cy.get('.v-breadcrumbs-divider').should('have.length', 1).eq(0).should('have.text', '-')
  })

  it('should render icon', () => {
    cy.mount(() => (
      <Application>
        <VBreadcrumbs items={['hello', 'world']} icon="mdi-home"></VBreadcrumbs>
      </Application>
    ))

    cy.get('.v-icon').should('exist').should('have.class', 'mdi-home').should('have.length', 1)
  })

  it('should use bg-color', () => {
    cy.mount(() => (
      <Application>
        <VBreadcrumbs items={['hello', 'world']} bgColor="primary"></VBreadcrumbs>
      </Application>
    ))

    cy.get('.v-breadcrumbs').should('have.class', 'bg-primary')
  })

  it('should use color', () => {
    cy.mount(() => (
      <Application>
        <VBreadcrumbs items={['hello', 'world']} color="primary"></VBreadcrumbs>
      </Application>
    ))

    cy.get('.v-breadcrumbs-item').should('have.class', 'text-primary')
  })

  it('should render link if href is set', () => {
    cy.mount(() => (
      <Application>
        <VBreadcrumbs items={[{ title: 'hello', href: '/hello' }, { title: 'world', href: '/world' }]}></VBreadcrumbs>
      </Application>
    ))

    cy.get('a.v-breadcrumbs-item').should('exist').should('have.attr', 'href')
  })

  it('should use router if to is set', () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          component: { template: 'Home' },
        },
        {
          path: '/about',
          component: { template: 'About' },
        },
      ],
    })

    cy.mount(() => (
      <Application>
        <VBreadcrumbs items={[{ title: 'about', to: '/about' }, { title: 'something', to: '/something' }]}></VBreadcrumbs>
      </Application>
    ), {
      global: {
        plugins: [router],
      },
    })

    cy.get('.v-breadcrumbs').should('exist')

    cy.get('.v-breadcrumbs-item').should('exist').eq(0).click()
    cy.then(() => {
      expect(router.currentRoute.value.path).to.equal('/about')
    })
  })

  it('should apply active color', () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          component: { template: 'Home' },
        },
        {
          path: '/world',
          component: { template: 'World' },
        },
      ],
    })

    cy.mount(() => (
      <Application>
        <VBreadcrumbs active-color="primary">
          <VBreadcrumbsItem active text="hello"></VBreadcrumbsItem>
          <VBreadcrumbsDivider>/</VBreadcrumbsDivider>
          <VBreadcrumbsItem text="world" to="/world"></VBreadcrumbsItem>
        </VBreadcrumbs>
      </Application>
    ), {
      global: {
        plugins: [router],
      },
    })

    cy.get('.v-breadcrumbs-item').eq(0).should('have.class', 'text-primary')

    cy.get('.v-breadcrumbs').then(() => {
      router.push('/world')
    })

    cy.get('.v-breadcrumbs-item').eq(1).should('have.class', 'text-primary')
  })

  it('should disabled last item by default if using items prop', () => {
    cy.mount(() => (
      <Application>
        <VBreadcrumbs items={['foo', 'bar']}></VBreadcrumbs>
      </Application>
    ))

    cy.get('.v-breadcrumbs-item').last().should('have.class', 'v-breadcrumbs-item--disabled')
  })

  it('should be possible to override last item disabled by default', () => {
    cy.mount(() => (
      <Application>
        <VBreadcrumbs items={['foo', { title: 'bar', disabled: false }]}></VBreadcrumbs>
      </Application>
    ))

    cy.get('.v-breadcrumbs-item').last().should('not.have.class', 'v-breadcrumbs-item--disabled')
  })

  it('should provide default divider', () => {
    cy.mount(() => (
      <Application>
        <VBreadcrumbs>
          <VBreadcrumbsItem title="foo"></VBreadcrumbsItem>
          <VBreadcrumbsDivider></VBreadcrumbsDivider>
          <VBreadcrumbsItem title="bar"></VBreadcrumbsItem>
          <VBreadcrumbsDivider divider="-"></VBreadcrumbsDivider>
          <VBreadcrumbsItem title="fizz"></VBreadcrumbsItem>
        </VBreadcrumbs>
      </Application>
    ))

    cy.get('.v-breadcrumbs-divider').first().should('have.text', '/')
    cy.get('.v-breadcrumbs-divider').last().should('have.text', '-')
  })
})
