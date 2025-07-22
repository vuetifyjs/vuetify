// Components
import { VNavigationDrawer } from '..'
import { VLayout } from '@/components/VLayout'
import { VLocaleProvider } from '@/components/VLocaleProvider'
import { VMain } from '@/components/VMain'

// Utilities
import { commands, generate, page, render, screen, userEvent } from '@test'
import { ref } from 'vue'

const stories = {
  'With end location': (
    <VLayout>
      <VNavigationDrawer location="end" permanent />
    </VLayout>
  ),
  'With bottom location': (
    <VLayout>
      <VNavigationDrawer location="bottom" permanent />
    </VLayout>
  ),
}

describe('VNavigationDrawer', () => {
  beforeEach(() => {
    page.viewport(1280, 768)
  })

  it('should open when changed to permanent on mobile', async () => {
    page.viewport(400, 800)
    const permanent = ref(false)
    render(() => (
      <VLayout>
        <VNavigationDrawer permanent={ permanent.value } />
      </VLayout>
    ))

    const drawer = screen.getByCSS('.v-navigation-drawer')

    await commands.waitStable('.v-navigation-drawer')
    expect(drawer).toHaveClass('v-navigation-drawer--temporary')

    permanent.value = true

    await commands.waitStable('.v-navigation-drawer')
    expect(drawer).not.toHaveClass('v-navigation-drawer--temporary')
  })

  it('should change width when using rail, expandOnHover, and hovering', async () => {
    render(() => (
      <VLayout>
        <VNavigationDrawer modelValue expandOnHover rail />
      </VLayout>
    ))

    const drawer = screen.getByCSS('.v-navigation-drawer')

    await expect.element(drawer).toHaveStyle({ width: '56px' })

    await userEvent.hover(drawer)
    await expect.element(drawer).toHaveStyle({ width: '256px' })

    await userEvent.unhover(drawer)
    await expect.element(drawer).toHaveStyle({ width: '56px' })
  })

  it('should change width when using bound and unbound rail and expandOnHover', async () => {
    const rail = ref(true)

    render(() => (
      <VLayout>
        <VNavigationDrawer v-model:rail={ rail.value } expandOnHover />

        <VMain />
      </VLayout>
    ))

    const drawer = screen.getByCSS('.v-navigation-drawer')
    const main = screen.getByCSS('.v-main')

    await expect.element(drawer).toHaveStyle({ width: '56px' })
    await expect.element(main).toHaveStyle({ paddingLeft: '56px' })

    await userEvent.hover(drawer)
    await expect.element(drawer).toHaveStyle({ width: '256px' })
    await expect.element(main).toHaveStyle({ paddingLeft: '256px' })

    await userEvent.unhover(drawer)
    await expect.element(drawer).toHaveStyle({ width: '56px' })
    await expect.element(main).toHaveStyle({ paddingLeft: '56px' })
  })

  it('should hide drawer if window resizes below mobile breakpoint', async () => {
    render(() => (
      <VLayout>
        <VNavigationDrawer />
      </VLayout>
    ))

    const drawer = screen.getByCSS('.v-navigation-drawer')

    expect(drawer).toHaveClass('v-navigation-drawer--active')

    page.viewport(400, 800)

    await commands.waitStable('.v-navigation-drawer')
    expect(drawer).not.toHaveClass('v-navigation-drawer--active')
  })

  it('should not hide drawer if window resizes below mobile breakpoint and disable-resize-watcher is used', async () => {
    page.viewport(1200, 800)
    render(() => (
      <VLayout>
        <VNavigationDrawer disableResizeWatcher />
      </VLayout>
    ))

    expect(screen.getByCSS('.v-navigation-drawer')).toHaveClass('v-navigation-drawer--active')
    page.viewport(400, 800)
    await commands.waitStable('.v-navigation-drawer')
    expect(screen.getByCSS('.v-navigation-drawer')).toHaveClass('v-navigation-drawer--active')
  })

  it('should always show drawer if using permanent', async () => {
    render(() => (
      <VLayout>
        <VNavigationDrawer permanent />
      </VLayout>
    ))

    expect(screen.getByCSS('.v-navigation-drawer')).toHaveClass('v-navigation-drawer--active')
    page.viewport(400, 800)
    await commands.waitStable('.v-navigation-drawer')
    expect(screen.getByCSS('.v-navigation-drawer')).toHaveClass('v-navigation-drawer--active')
    expect(screen.getByCSS('.v-navigation-drawer')).not.toHaveClass('v-navigation-drawer--temporary')
  })

  it('should show temporary drawer', async () => {
    const model = ref()
    render(() => (
      <VLayout>
        <VNavigationDrawer temporary modelValue={ model.value } />
      </VLayout>
    ))

    const drawer = screen.getByCSS('.v-navigation-drawer')

    await expect.element(drawer).toHaveClass('v-navigation-drawer--temporary')
    await expect.element(drawer).not.toHaveClass('v-navigation-drawer--active')

    model.value = true

    await expect.element(drawer).toHaveClass('v-navigation-drawer--active')
  })

  it('should allow custom widths', async () => {
    render(() => (
      <VLayout>
        <VNavigationDrawer width={ 300 } permanent />
      </VLayout>
    ))

    await expect.element(screen.getByCSS('.v-navigation-drawer')).toHaveStyle({ width: '300px' })
  })

  it('should position drawer scrim correctly', async () => {
    const visible = ref(false)
    render(() => (
      <VLayout>
        <VNavigationDrawer v-model={ visible.value } temporary />
      </VLayout>
    ))

    expect(screen.queryAllByCSS('.v-navigation-drawer__scrim')).toHaveLength(0)

    visible.value = true

    await expect.element(screen.getByCSS('.v-navigation-drawer')).toBeOnScreen()
    await expect.element(screen.getByCSS('.v-navigation-drawer__scrim')).toBeOnScreen()
  })

  it('should position drawer scrim correctly in rtl locale', async () => {
    const visible = ref(false)
    render(() => (
      <VLocaleProvider rtl>
        <VLayout>
          <VNavigationDrawer v-model={ visible.value } temporary />
        </VLayout>
      </VLocaleProvider>
    ))

    expect(screen.queryAllByCSS('.v-navigation-drawer__scrim')).toHaveLength(0)

    visible.value = true

    await expect.element(screen.getByCSS('.v-navigation-drawer')).toBeOnScreen()
    await expect.element(screen.getByCSS('.v-navigation-drawer__scrim')).toBeOnScreen()
  })

  describe('Showcase', () => {
    generate({ stories })
  })
})
