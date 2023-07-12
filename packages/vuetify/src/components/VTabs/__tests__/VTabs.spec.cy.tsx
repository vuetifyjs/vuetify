/// <reference types="../../../../types/cypress" />

// Components
import { VTab, VTabs } from '../'

// Utilities
import { ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

describe('VTabs', () => {
  it('should respond to clicks', () => {
    cy.mount(() => (
      <>
        <VTabs>
          <VTab value="foo">foo</VTab>
          <VTab value="bar">bar</VTab>
        </VTabs>
      </>
    ))

    cy.get('.v-tab').eq(1).click()
      .emitted(VTabs, 'update:modelValue')
      .should('deep.equal', [
        ['foo'], // tabs will have initially set first tab as selected because of mandatory
        ['bar'],
      ])
  })

  it('should render slider', () => {
    cy.mount(() => (
      <VTabs>
        <VTab>foo</VTab>
        <VTab>bar</VTab>
      </VTabs>
    ))

    cy.get('.v-tab').eq(0).find('.v-tab__slider').should('exist')
      .get('.v-tab').eq(1).click().find('.v-tab__slider').should('exist')
  })

  it('should hide slider', () => {
    cy.mount(() => (
      <VTabs hideSlider>
        <VTab>foo</VTab>
        <VTab>bar</VTab>
      </VTabs>
    ))

    cy.get('.v-tab').eq(0).find('.v-tab__slider').should('not.exist')
      .get('.v-tab').eq(1).click().find('.v-tab__slider').should('not.exist')
  })

  it('should respond to v-model changes', () => {
    cy.mount(({ modelValue }: { modelValue: string }) => (
      <VTabs modelValue={ modelValue }>
        <VTab value="foo">foo</VTab>
        <VTab value="bar">bar</VTab>
      </VTabs>
    ), {
      props: {
        modelValue: 'foo',
      },
    })

    cy.get('.v-tab').eq(0).should('have.class', 'v-tab--selected')
      .setProps({ modelValue: 'bar' })
      .get('.v-tab').eq(0).should('not.have.class', 'v-tab--selected')
      .get('.v-tab').eq(1).should('have.class', 'v-tab--selected')
  })

  it('should react to router changes', () => {
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
      <VTabs>
        <VTab to="/">foo</VTab>
        <VTab to="/about">bar</VTab>
      </VTabs>
    ), {
      global: {
        plugins: [router],
      },
    })

    cy.get('.v-tab').eq(1).click()
      .then(() => {
        expect(router.currentRoute.value.path).to.equal('/about')
      })
      .get('.v-tabs')
      .then(() => {
        router.push('/')
      })
      .get('.v-tab').eq(0).should('not.have.class', 'v-tab--selected')
      .get('.v-tab').eq(1).should('have.class', 'v-tab--selected')
  })

  it('should render tabs vertically', () => {
    cy.mount(() => (
      <VTabs direction="vertical">
        <VTab>foo</VTab>
        <VTab>bar</VTab>
      </VTabs>
    ))

    cy.get('.v-tabs').should('have.class', 'v-tabs--vertical')
      .get('.v-tab').eq(1).click().should('have.class', 'v-tab--selected')
  })

  // https://github.com/vuetifyjs/vuetify/issues/15237
  it('should not change model value if tab items are hidden with v-show', () => {
    const model = ref('B')
    cy.mount(({ show = true }: { show?: boolean }) => (
      <div v-show={ show }>
        <VTabs modelValue={ model.value } onUpdate:modelValue={ v => model.value = v as string }>
          <VTab value="A">A</VTab>
          <VTab value="B">B</VTab>
          <VTab value="C">C</VTab>
        </VTabs>
      </div>
    ))
      .get('.v-tabs').should('be.visible')
      .then(() => {
        expect(model.value).to.equal('B')
      })
      .setProps({ show: false })
      .get('.v-tabs').should('not.be.visible')
      .then(() => {
        expect(model.value).to.equal('B')
      })
      .setProps({ show: true })
      .get('.v-tabs').should('be.visible')
      .then(() => {
        expect(model.value).to.equal('B')
      })
  })
})
