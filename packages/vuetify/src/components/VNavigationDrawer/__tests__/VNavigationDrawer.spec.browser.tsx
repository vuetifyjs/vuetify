// Components
import { VNavigationDrawer } from '..'
import { VLayout } from '@/components/VLayout'
import { VMain } from '@/components/VMain'

// Utilities
import { page, render, screen, userEvent } from '@test'
import { nextTick, ref } from 'vue'

describe('VNavigationDrawer', () => {
  it('should open when changed to permanent on mobile', async () => {
    await page.viewport(400, 800)

    const permanent = ref(false)
    render(() => (
      <VLayout>
        <VNavigationDrawer permanent={ permanent.value } />
      </VLayout>
    ))
    const drawer = screen.getByCSS('.v-navigation-drawer')

    await expect.element(drawer).toHaveClass('v-navigation-drawer--temporary')

    permanent.value = true
    await expect.element(drawer).not.toHaveClass('v-navigation-drawer--temporary')
  })

  it('should change width when using rail, expandOnHover, and hovering', async () => {
    render(
      <VLayout>
        <VNavigationDrawer rail expandOnHover />
      </VLayout>
    )
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
        <VNavigationDrawer expandOnHover v-model:rail={ rail.value } />
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

  it.todo('should hide drawer if window resizes below mobile breakpoint')

  it.todo('should not hide drawer if window resizes below mobile breakpoint and disable-resize-watcher is used')

  it('should always show drawer if using permanent', async () => {
    render(
      <VLayout>
        <VNavigationDrawer permanent />
      </VLayout>
    )
    const drawer = screen.getByCSS('.v-navigation-drawer')

    await expect.element(drawer).toHaveClass('v-navigation-drawer--active')
    await page.viewport(400, 800)
    await nextTick()
    await expect.element(drawer).toHaveClass('v-navigation-drawer--active')
    await expect.element(drawer).not.toHaveClass('v-navigation-drawer--temporary')
  })

  it.todo('should show temporary drawer')

  it('should allow custom widths', async () => {
    render(
      <VLayout>
        <VNavigationDrawer width={ 300 } permanent />
      </VLayout>
    )
    await expect.element(screen.getByCSS('.v-navigation-drawer')).toHaveStyle({ width: '300px' })
  })

  it('should position drawer on the opposite side', async () => {
    render(
      <VLayout>
        <VNavigationDrawer location="end" permanent />
      </VLayout>
    )
    await expect.element(screen.getByCSS('.v-navigation-drawer')).toHaveStyle({ right: '0px' })
  })

  it('should position drawer on the bottom', async () => {
    render(
      <VLayout>
        <VNavigationDrawer location="bottom" permanent />
      </VLayout>
    )
    await expect.element(screen.getByCSS('.v-navigation-drawer')).toHaveStyle({ bottom: '0px' })
  })

  it.todo('should position drawer scrim correctly')

  it.todo('should position drawer scrim correctly in rtl locale')
})
