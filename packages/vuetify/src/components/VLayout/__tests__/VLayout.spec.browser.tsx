// Components
import { VLayout } from '../VLayout'
import { VAppBar } from '@/components/VAppBar'
import { VMain } from '@/components/VMain'
import { VNavigationDrawer } from '@/components/VNavigationDrawer'

// Utilities
import { page, render, screen, scroll, wait } from '@test'
import { ref } from 'vue'

describe('VLayout', () => {
  it('should position main component', async () => {
    render(() => (
      <VLayout>
        <VAppBar height="64" />
        <VNavigationDrawer width="200" permanent />
        <VMain>
          hello world
        </VMain>
      </VLayout>
    ))

    await wait(100)
    expect(screen.getByCSS('.v-main')).toHaveStyle({ paddingTop: '64px', paddingLeft: '200px' })
  })

  it('should work with sticky elements', async () => {
    render(() => (
      <VLayout>
        <VAppBar height="64" />
        <VNavigationDrawer width="200" permanent />
        <VMain>
          <div>
            <div style="height: 200px"></div>
            <nav
              data-testid="sticky"
              style="position: sticky; top: var(--v-layout-top); background: grey"
            >
              Sticky Header
            </nav>
            <div style="height: 2000px"></div>
          </div>
        </VMain>
      </VLayout>
    ))

    await scroll({ top: 1000 })
    await expect(screen.getByTestId('sticky')).toBeOnScreen()
  })

  it('should work with scrollable main', async () => {
    render(() => (
      <VLayout>
        <VAppBar height="64" />
        <VNavigationDrawer width="200" permanent />
        <VMain scrollable>
          <div>
            <div style="height: 200px"></div>
            <nav
              data-testid="sticky"
              style="position: sticky; top: 0px; background: grey"
            >Sticky Header</nav>
            <div style="height: 2000px"></div>
          </div>
        </VMain>
      </VLayout>
    ))

    await scroll({ top: 1000 }, screen.getByCSS('.v-main__scroller'))
    await expect(screen.getByTestId('sticky')).toBeOnScreen()
  })

  it.todo('should work when nested inside another layout', async () => {
    await page.viewport(600, 600)

    const drawer = ref(false)
    render(() => (
      <VLayout>
        <VAppBar height="64" />
        <VNavigationDrawer width="200" permanent />
        <VMain>
          <VLayout class="ma-10" style="height: 600px" id="nested">
            <VAppBar height="64" color="primary" />
            <VNavigationDrawer width="200" modelValue={ drawer.value } color="primary" />
            <VMain>Nested</VMain>
          </VLayout>
        </VMain>
      </VLayout>
    ))

    const nestedNav = screen.getByCSS('#nested .v-navigation-drawer')

    // TODO: this only checks bounding boxes not clipping
    await expect(nestedNav).not.toBeOnScreen()

    drawer.value = true
    await expect(nestedNav).toBeOnScreen()
  })
})
