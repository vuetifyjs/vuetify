/// <reference types="../../../../types/cypress" />

// Components
import { Application } from '../../../../cypress/templates'
import { VOverlay } from '../VOverlay'
import { VLayout } from '@/components/VLayout'
import { VMain } from '@/components/VMain'
import { VNavigationDrawer } from '@/components/VNavigationDrawer'

// Utilities
import { ref } from 'vue'

describe('VOverlay', () => {
  it('without activator', () => {
    const model = ref(false)
    cy.mount(() => (
      <VLayout>
        <VOverlay v-model={ model.value }>
          <div data-test="content">Content</div>
        </VOverlay>
      </VLayout>
    ))
      .get('[data-test="content"]').should('not.exist')
      // .setProps({ modelValue: true })
      .then(() => {
        model.value = true
      })
      .get('[data-test="content"]').should('be.visible')
      .get('body').click()
      .get('[data-test="content"]').should('not.exist')
      .then(() => {
        expect(model.value).to.be.false
      })
  })

  it('should use activator', () => {
    cy.mount(() => (
      <VLayout>
        <VOverlay>
          {{
            activator: ({ props }) => <div { ...props } data-test="activator">Click me</div>,
            default: () => <div data-test="content">Content</div>,
          }}
        </VOverlay>
      </VLayout>
    ))
      .get('[data-test="content"]').should('not.exist')
      .get('[data-test="activator"]').should('exist').click()
      .get('[data-test="content"]').should('be.visible')
      .get('body').click()
      .get('[data-test="content"]').should('not.exist')
  })

  it('should render overlay on top of layout', () => {
    cy.mount(() => (
      <Application>
        <VNavigationDrawer permanent class="bg-blue" data-test="drawer" />
        <VMain>
          <VOverlay>
            {{
              activator: ({ props }) => <div { ...props } data-test="activator">Click me</div>,
              default: () => <div data-test="content">Content</div>,
            }}
          </VOverlay>
        </VMain>
      </Application>
    ))
      .get('[data-test="content"]').should('not.exist')
      .get('[data-test="activator"]').should('exist').click()
      .get('[data-test="content"]').should('be.visible')
      .get('[data-test="drawer"]').should('not.be.visible')
      .get('body').click()
      .get('[data-test="content"]').should('not.exist')
      .get('[data-test="drawer"]').should('be.visible')
  })

  it('should render nested overlays', () => {
    cy.mount(() => (
      <Application>
        <VOverlay>
          {{
            activator: ({ props }) => <div { ...props } data-test="first-activator">Click me</div>,
            default: () => (
              <div data-test="first-content">
                <VOverlay>
                  {{
                    activator: ({ props }) => <div { ...props } data-test="second-activator">Click me nested</div>,
                    default: () => <div data-test="second-content">Content</div>,
                  }}
                </VOverlay>
              </div>
            ),
          }}
        </VOverlay>
      </Application>
    ))
      .get('[data-test="first-content"]').should('not.exist')
      .get('[data-test="first-activator"]').should('exist').click()
      .get('[data-test="first-content"]').should('be.visible')
      .get('[data-test="second-activator"]').should('exist').click()
      .get('[data-test="first-content"]').should('not.be.visible')
      .get('[data-test="second-content"]').should('be.visible')
      .get('body').click()
      .get('[data-test="second-content"]').should('not.exist')
      .get('[data-test="first-content"]').should('be.visible')
      .get('body').click()
      .get('[data-test="first-content"]').should('not.exist')
  })
})
