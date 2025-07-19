// Components
import { VLayout } from '../VLayout'
import { VAppBar } from '@/components/VAppBar'
import { VMain } from '@/components/VMain'
import { VNavigationDrawer } from '@/components/VNavigationDrawer'

// Utilities
import { page, render, screen, scroll, wait } from '@test'
import { ref } from 'vue'
import { createRange } from '@/util'

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

  it.skip('should work with sticky elements', async () => {
    render(() => (
      <VLayout>
        <VAppBar height="64" />
        <VNavigationDrawer width="200" permanent />
        <VMain>
          <div>
            { createRange(10).map(_ => <div>hello</div>) }
            <nav style="position: sticky; top: var(--v-layout-top); background: grey">Sticky Header</nav>
            { createRange(100).map(_ => <div>hello</div>) }
          </div>
        </VMain>
      </VLayout>
    ))

    await scroll({ top: 1000 })

    // TODO: figure out how to make it work
    expect(screen.getByCSS('nav')).toBeVisible()
  })

  it.skip('should work with scrollable main', async () => {
    render(() => (
      <VLayout>
        <VAppBar height="64" />
        <VNavigationDrawer width="200" permanent />
        <VMain scrollable>
          <div>
            { createRange(10).map(_ => <div>hello</div>) }
            <nav style="position: sticky; top: 0px; background: grey">Sticky Header</nav>
            { createRange(100).map(_ => <div>hello</div>) }
          </div>
        </VMain>
      </VLayout>
    ))

    await scroll({ top: 1000 }, screen.getByCSS('.v-main__scroller'))

    // TODO: figure out how to make it work
    expect(screen.getByCSS('nav')).toBeVisible()
  })

  it.skip('should work when nested inside another layout', () => {
    page.viewport(600, 600)

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

    // TODO: figure out how to make it work
    expect(nestedNav).not.toBeVisible()

    drawer.value = true
    expect(nestedNav).toBeVisible()
  })
})
