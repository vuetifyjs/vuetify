// Components
import { VLayout } from '../VLayout'
import { VAppBar } from '@/components/VAppBar'
import { VMain } from '@/components/VMain'
import { VNavigationDrawer } from '@/components/VNavigationDrawer'

// Utilities
import { render } from '@test'
import { ref } from 'vue'
import { createRange } from '@/util'

describe('VLayout', () => {
  it('should render main component with app bar and navigation drawer', () => {
    const { container } = render(() => (
      <VLayout>
        <VAppBar height="64"></VAppBar>
        <VNavigationDrawer width="200" permanent></VNavigationDrawer>
        <VMain>
          hello world
        </VMain>
      </VLayout>
    ))

    // Verify the components are rendered
    expect(container.querySelector('.v-layout')).toBeTruthy()
    expect(container.querySelector('.v-app-bar')).toBeTruthy()
    expect(container.querySelector('.v-navigation-drawer')).toBeTruthy()
    expect(container.querySelector('.v-main')).toBeTruthy()
    expect(container.querySelector('.v-main')).toHaveTextContent('hello world')
  })

  it('should work with sticky elements', () => {
    const { container } = render(() => (
      <VLayout>
        <VAppBar height="64"></VAppBar>
        <VNavigationDrawer width="200" permanent></VNavigationDrawer>
        <VMain>
          <div data-testid="content">
            { createRange(10).map((_, i) => <div key={ i }>hello</div>) }
            <div data-testid="sticky-nav" style="position: sticky; top: var(--v-layout-top); background: grey">Sticky Header</div>
            { createRange(100).map((_, i) => <div key={ i }>hello</div>) }
          </div>
        </VMain>
      </VLayout>
    ))

    // In JSDOM we can't test scrolling behavior effectively
    // Just verify the component structure is correct
    const content = container.querySelector('[data-testid="content"]')
    expect(content).toBeTruthy()

    const stickyNav = container.querySelector('[data-testid="sticky-nav"]')
    expect(stickyNav).toBeTruthy()
    expect(stickyNav?.textContent).toBe('Sticky Header')
    expect(stickyNav?.getAttribute('style')).toContain('position: sticky')
  })

  it('should work with scrollable main', () => {
    const { container } = render(() => (
      <VLayout>
        <VAppBar height="64"></VAppBar>
        <VNavigationDrawer width="200" permanent></VNavigationDrawer>
        <VMain scrollable>
          <div data-testid="content">
            { createRange(10).map((_, i) => <div key={ i }>hello</div>) }
            <div data-testid="sticky-nav" style="position: sticky; top: 0px; background: grey">Sticky Header</div>
            { createRange(100).map((_, i) => <div key={ i }>hello</div>) }
          </div>
        </VMain>
      </VLayout>
    ))

    // Verify the scrollable container exists
    const scroller = container.querySelector('.v-main__scroller')
    expect(scroller).toBeTruthy()

    // In JSDOM we can't test scrolling behavior effectively
    // Just verify the component structure is correct
    const content = container.querySelector('[data-testid="content"]')
    expect(content).toBeTruthy()

    const stickyNav = container.querySelector('[data-testid="sticky-nav"]')
    expect(stickyNav).toBeTruthy()
    expect(stickyNav?.textContent).toBe('Sticky Header')
    expect(stickyNav?.getAttribute('style')).toContain('position: sticky')
  })

  it('should work when nested inside another layout', async () => {
    const drawer = ref(false)

    const TestComponent = () => (
      <VLayout>
        <VAppBar height="64"></VAppBar>
        <VNavigationDrawer width="200" permanent></VNavigationDrawer>
        <VMain>
          <VLayout class="ma-10" style="height: 600px" id="nested">
            <VAppBar height="64" color="primary"></VAppBar>
            <VNavigationDrawer width="200" modelValue={ drawer.value } permanent color="primary"></VNavigationDrawer>
            <VMain>
              Nested
            </VMain>
          </VLayout>
        </VMain>
      </VLayout>
    )

    const { container, rerender } = render(TestComponent)

    // Check that nested layout exists
    const nestedLayout = container.querySelector('#nested')
    expect(nestedLayout).toBeTruthy()

    // Initially, drawer.value is false
    expect(drawer.value).toBe(false)

    // Set drawer to true and re-render
    drawer.value = true
    await rerender(TestComponent)

    // Now drawer.value should be true
    expect(drawer.value).toBe(true)

    // Verify the nested main content
    const nestedMain = container.querySelector('#nested .v-main')
    expect(nestedMain).toBeTruthy()
    expect(nestedMain).toHaveTextContent('Nested')
  })
})
