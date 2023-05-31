/* eslint-disable sonarjs/no-identical-functions */
/// <reference types="../../../../types/cypress" />

// Components
import { VList, VListItem } from '..'
import { CenteredGrid } from '@/../cypress/templates'

// Utilities
import { createRouter, createWebHistory } from 'vue-router'

describe('VList', () => {
  function mountFunction (content: JSX.Element) {
    return cy.mount(() => content)
  }

  it('supports the density property', () => {
    const densities = ['default', 'comfortable', 'compact'] as const
    const ListItems = densities.map(density => (
      <VList density={ density }>
        <VListItem>
          density { density }
        </VListItem>
      </VList>
    ))
    const wrapper = mountFunction((
      <CenteredGrid width="200px">
        <h2 class="mt-8">ListItems by Density</h2>

        { ListItems }
      </CenteredGrid>
    ))

    wrapper.get('.v-list--density-default').should('exist')
    wrapper.get('.v-list--density-comfortable').should('exist')
    wrapper.get('.v-list--density-compact').should('exist')
  })

  it('supports the lines property', () => {
    const lines = ['one', 'two', 'three'] as const
    const ListItems = lines.map(number => (
      <VList lines={ number }>
        <VListItem>
          lines { number }
        </VListItem>
      </VList>
    ))
    const wrapper = mountFunction((
      <CenteredGrid width="200px">
        <h2 class="mt-8">ListItems by Density</h2>

        { ListItems }
      </CenteredGrid>
    ))

    wrapper.get('.v-list--one-line').should('exist')
    wrapper.get('.v-list--two-line').should('exist')
    wrapper.get('.v-list--three-line').should('exist')
  })

  it('supports items prop', () => {
    const items = [
      {
        title: 'Foo',
        subtitle: 'Bar',
        value: 'foo',
      },
      {
        title: 'Group',
        value: 'group',
        children: [
          {
            title: 'Child',
            subtitle: 'Subtitle',
            value: 'child',
          },
        ],
      },
    ]

    const wrapper = mountFunction((
      <CenteredGrid width="200px">
        <VList items={ items } opened={['group']} />
      </CenteredGrid>
    ))

    wrapper.get('.v-list-item').should('have.length', 3)
  })

  it('supports item slot', () => {
    const items = [
      {
        title: 'Foo',
        subtitle: 'Bar',
        value: 'foo',
      },
      {
        title: 'Group',
        value: 'group',
        children: [
          {
            title: 'Child',
            subtitle: 'Subtitle',
            value: 'child',
          },
        ],
      },
    ]

    const wrapper = mountFunction((
      <CenteredGrid width="400px">
        <VList items={ items } opened={['group']}>
          {{
            item: item => <VListItem { ...item } prependIcon="mdi-home" />,
          }}
        </VList>
      </CenteredGrid>
    ))

    wrapper.get('.v-icon.mdi-home').should('have.length', 2)
  })

  it('should set active item on route change', () => {
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
      <CenteredGrid width="400px">
        <VList>
          <VListItem to="/" title="Home" />
          <VListItem to="/about" title="About" />
        </VList>
      </CenteredGrid>
    ), {
      global: {
        plugins: [router],
      },
    })

    cy.get('.v-list').then(() => {
      router.push('/about')
    })

    cy.get('.v-list-item--active').should('exist').should('have.text', 'About')
  })

  it('should change route when clicking item with to prop', () => {
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
      <CenteredGrid width="400px">
        <VList>
          <VListItem to="/" title="Home" />
          <VListItem to="/about" title="About" />
        </VList>
      </CenteredGrid>
    ), {
      global: {
        plugins: [router],
      },
    })

    cy.get('.v-list-item').eq(1).trigger('click')

    cy.get('.v-list').then(() => {
      expect(router.currentRoute.value.path).to.equal('/about')
    })
  })

  it('should deselect v-list-item if route changes externally', () => {
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
        {
          path: '/other',
          component: { template: 'Other' },
        },
      ],
    })

    // eslint-disable-next-line sonarjs/no-identical-functions
    cy.mount(() => (
      <CenteredGrid width="400px">
        <VList>
          <VListItem to="/" title="Home" />
          <VListItem to="/about" title="About" />
        </VList>
      </CenteredGrid>
    ), {
      global: {
        plugins: [router],
      },
    })

    cy.get('.v-list-item').eq(1).click().should('have.class', 'v-list-item--active')

    cy.get('.v-list').then(() => {
      expect(router.currentRoute.value.path).to.equal('/about')
    })

    cy.get('.v-list').then(() => router.push('/other'))

    cy.get('.v-list-item').eq(1).should('not.have.class', 'v-list-item--active')
  })
})
