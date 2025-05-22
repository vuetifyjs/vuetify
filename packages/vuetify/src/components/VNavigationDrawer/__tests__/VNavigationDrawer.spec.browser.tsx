// Components
import { VNavigationDrawer } from '..'
import { VLayout } from '@/components/VLayout'
import { VLocaleProvider } from '@/components/VLocaleProvider'
import { VMain } from '@/components/VMain'

// Utilities
import { render, userEvent } from '@test'
import { nextTick, ref } from 'vue'

describe('VNavigationDrawer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  // TODO: Handle viewport changes if necessary for these tests
  // beforeEach(() => {
  //   cy.viewport(1280, 768)
  // })

  it('should open when changed to permanent on mobile', async () => {
    // TODO: Viewport dependent test - cy.viewport(400, 800)
    const { container, rerender } = render(
      <VLayout>
        <VNavigationDrawer permanent={ false } />
      </VLayout>
    )

    expect(container.querySelector('.v-navigation-drawer')).toHaveClass('v-navigation-drawer--temporary')

    await rerender(
      <VLayout>
        <VNavigationDrawer permanent />
      </VLayout>
    )
    expect(container.querySelector('.v-navigation-drawer')).not.toHaveClass('v-navigation-drawer--temporary')
  })

  it('should change width when using rail, expandOnHover, and hovering', async () => {
    const { container } = render(
      <VLayout>
        <VNavigationDrawer rail expandOnHover />
      </VLayout>
    )

    const navDrawer = container.querySelector('.v-navigation-drawer')
    expect(navDrawer).toHaveStyle({ width: '56px' })

    await userEvent.hover(navDrawer!)
    await new Promise(resolve => setTimeout(resolve, 300)) // Wait for transition (duration can be adjusted)
    vi.runAllTimers()
    await nextTick()
    expect(navDrawer).toHaveStyle({ width: '256px' })

    await userEvent.unhover(navDrawer!)
    await new Promise(resolve => setTimeout(resolve, 300))
    vi.runAllTimers()
    await nextTick()
    expect(navDrawer).toHaveStyle({ width: '56px' })
  })

  it('should change width when using bound and unbound rail and expandOnHover', async () => {
    const rail = ref(true)

    const { container } = render(() => (
      <VLayout>
        <VNavigationDrawer expandOnHover v-model:rail={ rail.value } />
        <VMain />
      </VLayout>
    ))

    const navDrawer = container.querySelector('.v-navigation-drawer')
    // const mainContent = container.querySelector('.v-main')

    expect(navDrawer).toHaveStyle({ width: '56px' })
    // TODO: Check how padding is applied and assert accordingly
    // expect(mainContent).toHaveStyle({ paddingLeft: '56px' })

    await userEvent.hover(navDrawer!)
    await new Promise(resolve => setTimeout(resolve, 300))
    vi.runAllTimers()
    await nextTick()
    expect(navDrawer).toHaveStyle({ width: '256px' })
    // expect(mainContent).toHaveStyle({ paddingLeft: '256px' })

    await userEvent.unhover(navDrawer!)
    await new Promise(resolve => setTimeout(resolve, 300))
    vi.runAllTimers()
    await nextTick()
    expect(navDrawer).toHaveStyle({ width: '56px' })
    // expect(mainContent).toHaveStyle({ paddingLeft: '56px' })
  })

  it.todo('should hide drawer if window resizes below mobile breakpoint')

  it.todo('should not hide drawer if window resizes below mobile breakpoint and disable-resize-watcher is used')

  it('should always show drawer if using permanent', async () => {
    // TODO: Viewport dependent test - cy.viewport(400, 800)
    const { container } = render(
      <VLayout>
        <VNavigationDrawer permanent />
      </VLayout>
    )
    expect(container.querySelector('.v-navigation-drawer')).toHaveClass('v-navigation-drawer--active')
    // // After viewport change
    // expect(container.querySelector('.v-navigation-drawer')).toHaveClass('v-navigation-drawer--active')
    expect(container.querySelector('.v-navigation-drawer')).not.toHaveClass('v-navigation-drawer--temporary')
  })

  it.todo('should show temporary drawer')

  it('should allow custom widths', () => {
    const { container } = render(
      <VLayout>
        <VNavigationDrawer width={ 300 } permanent />
      </VLayout>
    )
    expect(container.querySelector('.v-navigation-drawer')).toHaveStyle({ width: '300px' })
  })

  it('should position drawer on the opposite side', () => {
    const { container } = render(
      <VLayout>
        <VNavigationDrawer location="end" permanent />
      </VLayout>
    )
    // In JSDOM, offset properties like 'right' might not be directly available or always 0.
    // We might need to check classes or other attributes that indicate position.
    expect(container.querySelector('.v-navigation-drawer')).toHaveClass('v-navigation-drawer--right')
  })

  it('should position drawer on the bottom', () => {
    const { container } = render(
      <VLayout>
        <VNavigationDrawer location="bottom" permanent />
      </VLayout>
    )
    expect(container.querySelector('.v-navigation-drawer')).toHaveClass('v-navigation-drawer--bottom')
  })

  it.todo('should position drawer scrim correctly')

  it.todo('should position drawer scrim correctly in rtl locale')
})
