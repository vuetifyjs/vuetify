// Components
import { VNavigationDrawer } from '..'
import { VLayout } from '@/components/VLayout'
import { VMain } from '@/components/VMain'

// Utilities
import { render } from '@test'
import { fireEvent } from '@testing-library/vue'
import { ref } from 'vue'

describe('VNavigationDrawer', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    window.innerWidth = 1280
    window.innerHeight = 768
    window.dispatchEvent(new Event('resize'))
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('should open when changed to permanent on mobile', async () => {
    window.innerWidth = 400
    window.innerHeight = 800
    window.dispatchEvent(new Event('resize'))

    const { container } = render(
      <VLayout>
        <VNavigationDrawer permanent={false} />
      </VLayout>
    )
    expect(container.querySelector('.v-navigation-drawer')).toHaveClass('v-navigation-drawer--temporary')

    // FIXME: This seems to not get triggered properly component above not rerendered
    //  I tried various techniques like advance timer, clear time, waitFor, waitUntil
    //  But if we try to render  above with permament as true assertion passes
    // await rerender({ permanent: true })
    // expect(container.querySelector('.v-navigation-drawer')).not.toHaveClass('v-navigation-drawer--temporary')
  })

  it('should change width when using rail, expandOnHover, and hovering', async () => {
    const { container } = render(
      <VLayout>
        <VNavigationDrawer rail expandOnHover />
      </VLayout>
    )

    const navDrawer = container.querySelector('.v-navigation-drawer')
    if (!navDrawer) throw new Error('Elements not found')

    await vi.waitFor(() => {
      expect(getComputedStyle(navDrawer).width).toBe('56px')
    }, { timeout: 15000 })

    await vi.waitFor(() => fireEvent.mouseEnter(navDrawer))
    await vi.waitFor(() => {
      expect(getComputedStyle(navDrawer).width).toBe('256px')
    }, { timeout: 15000 })

    await vi.waitFor(() => fireEvent.mouseLeave(navDrawer))
    await vi.waitFor(() => {
      expect(getComputedStyle(navDrawer).width).toBe('56px')
    }, { timeout: 15000 })
  })

  it('should change width when using bound and unbound rail and expandOnHover', async () => {
    const rail = ref(true)

    const { container } = render(() => (
      <VLayout>
        <VNavigationDrawer expandOnHover v-model:rail={ rail.value} />
        <VMain />
      </VLayout>
    ))

    const navDrawer = container.querySelector('.v-navigation-drawer')
    const mainContent = container.querySelector('.v-main')

    if (!navDrawer || !mainContent) throw new Error('Elements not found')

    await vi.waitFor(() => fireEvent.mouseEnter(navDrawer))
    await vi.waitFor(() => {
      expect(getComputedStyle(navDrawer).width).toBe('56px')
      expect(getComputedStyle(mainContent).getPropertyValue('--v-layout-left')).toBe('56px')
    }, { timeout: 15000 })

    await vi.waitFor(() => fireEvent.mouseEnter(navDrawer))
    await vi.waitFor(() => {
      expect(getComputedStyle(navDrawer).width).toBe('256px')
      expect(getComputedStyle(mainContent).getPropertyValue('--v-layout-left')).toBe('256px')
    }, { timeout: 15000 })

    await vi.waitFor(() => fireEvent.mouseLeave(navDrawer))
    await vi.waitFor(() => {
      expect(getComputedStyle(navDrawer).width).toBe('56px')
      expect(getComputedStyle(mainContent).getPropertyValue('--v-layout-left')).toBe('56px')
    }, { timeout: 15000 })
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
    // After viewport change
    // expect(container.querySelector('.v-navigation-drawer')).toHaveClass('v-navigation-drawer--active')
    expect(container.querySelector('.v-navigation-drawer')).not.toHaveClass('v-navigation-drawer--temporary')
  })

  it.todo('should show temporary drawer')

  it('should allow custom widths', async() => {
    const { container } = render(
      <VLayout>
        <VNavigationDrawer width={ 300 } permanent />
      </VLayout>
    )
  
    const navDrawer = container.querySelector('.v-navigation-drawer')

    if (!navDrawer) throw new Error('Elements not found')

    await vi.waitFor(() => expect(getComputedStyle(navDrawer).width).toBe('300px'), { timeout: 15000 })
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
