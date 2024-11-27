/// <reference types="../../../../types/cypress" />

// Components
import { VMain } from '@/components/VMain'

// Utilities
import { ref } from 'vue'

// Tests
describe('VMain', () => {
  it('should render with content', () => {
    cy.mount(() => (
      <VMain data-test="main">
        <div data-test="main-content">Main Content</div>
      </VMain>
    ))
      .get('[data-test="main"]').should('exist') // Check that VMain exists
      .get('[data-test="main-content"]').should('contain.text', 'Main Content') // Ensure content is rendered
  })

  it('should adapt dynamically with layout changes', () => {
    const drawerOpen = ref(true)
    cy.mount(() => (
      <div>
        <VMain data-test="main" class={drawerOpen.value ? 'main-with-drawer' : 'main-no-drawer'}>
          <div data-test="main-content">Main Content</div>
        </VMain>
        <button data-test="toggle-drawer" onClick={() => { drawerOpen.value = !drawerOpen.value }}>
          Toggle Drawer
        </button>
      </div>
    ))
      .get('[data-test="main"]').should('have.class', 'main-with-drawer') // Initial state
      .get('[data-test="toggle-drawer"]').click()
      .get('[data-test="main"]').should('have.class', 'main-no-drawer') // Updated state
  })

  it('should emit events properly', () => {
    const onResize = cy.spy().as('onResize')
    cy.mount(() => (
      <VMain data-test="main" onResize={onResize}>
        <div data-test="main-content">Main Content</div>
      </VMain>
    ))
    // Simulate a window resize to trigger the resize event
    cy.viewport(800, 600) // Resize the viewport
      .wait(100) // Wait for any debounce
      .get('@onResize').should('have.been.called')
  })
})
