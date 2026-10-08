// Components
import { VNavigationDrawer } from '..'
import { VLayout } from '@/components/VLayout'
import { VLocaleProvider } from '@/components/VLocaleProvider'
import { VMain } from '@/components/VMain'

// Utilities
import { commands, page, render, screen, showcase, userEvent } from '@test'
import { ref, shallowRef } from 'vue'

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
  beforeEach(async () => {
    await page.viewport(1280, 768)
  })

  it('should retain the default tint without fading the element', async () => {
    render(() => <VLayout><VNavigationDrawer modelValue temporary /></VLayout>)

    await expect.element(screen.getByCSS('.v-navigation-drawer__scrim')).toHaveStyle({
      backgroundColor: 'color(srgb 0 0 0 / 0.2)', opacity: '1', backdropFilter: 'blur(0px)',
    })
  })

  it.each([
    ['primary', 'color(srgb 1 0 0 / 0.4)'],
    ['red', 'color(srgb 0.956863 0.262745 0.211765 / 0.4)'],
  ])('should tint explicit color %s instead of the shared color', async (color, backgroundColor) => {
    render(() => (
      <VLayout style={{ '--v-scrim-color': 'rgb(0 255 0)', '--v-scrim-opacity': 0.4 }}>
        <VNavigationDrawer modelValue temporary scrim={ color } />
      </VLayout>
    ), null, { theme: { themes: { light: { colors: { primary: '#ff0000' } } } } })

    await expect.poll(() => getComputedStyle(screen.getByCSS('.v-navigation-drawer__scrim')).backgroundColor).toBe(backgroundColor)
  })

  it('should multiply tint opacity by the CSS color alpha', async () => {
    render(() => (
      <VLayout style={{ '--v-scrim-opacity': 0.4 }}>
        <VNavigationDrawer modelValue temporary scrim="rgba(255, 0, 0, 0.5)" />
      </VLayout>
    ))

    const scrim = screen.getByCSS('.v-navigation-drawer__scrim')
    await expect.poll(() => getComputedStyle(scrim).backgroundColor).toMatch(/^color\(srgb 1 0 0 \/ /)
    await expect.poll(() => parseFloat(getComputedStyle(scrim).backgroundColor.split('/')[1])).toBeCloseTo(0.2, 2)
  })

  it('should apply and update the drawer theme on its sibling scrim', async () => {
    const theme = shallowRef('dark')
    render(() => <VLayout><VNavigationDrawer modelValue temporary theme={ theme.value } /></VLayout>, null, {
      theme: {
        themes: {
          light: { variables: { 'scrim-blur': '4px', 'scrim-color': 'rgb(255 0 0)', 'scrim-opacity': 0.4 } },
          dark: { variables: { 'scrim-blur': '8px', 'scrim-color': 'rgb(0 0 255)', 'scrim-opacity': 0.6 } },
        },
      },
    })

    const scrim = screen.getByCSS('.v-navigation-drawer__scrim')
    await expect.element(scrim).toHaveStyle({ backdropFilter: 'blur(8px)', backgroundColor: 'color(srgb 0 0 1 / 0.6)' })
    theme.value = 'light'
    await expect.element(scrim).toHaveStyle({ backdropFilter: 'blur(4px)', backgroundColor: 'color(srgb 1 0 0 / 0.4)' })
  })

  it('should not create a disabled scrim even with shared blur', async () => {
    render(() => (
      <VLayout style={{ '--v-scrim-blur': '8px' }}>
        <VNavigationDrawer modelValue temporary scrim={ false } />
      </VLayout>
    ))

    await expect.element(screen.getByCSS('.v-navigation-drawer')).toBeVisible()
    expect(screen.queryAllByCSS('.v-navigation-drawer__scrim')).toHaveLength(0)
  })

  it.each([false, true])('should honor persistent=%s when the scrim is clicked', async persistent => {
    const active = shallowRef(true)
    render(() => (
      <VLayout style={{ '--v-scrim-blur': '8px' }}>
        <VNavigationDrawer v-model={ active.value } temporary persistent={ persistent } />
      </VLayout>
    ))

    await userEvent.click(screen.getByCSS('.v-navigation-drawer__scrim'))
    await expect.poll(() => active.value).toBe(persistent)
  })

  it.each(['start', 'end'] as const)('should scale tint and blur while dragging from %s', async location => {
    const active = shallowRef(false)
    render(() => (
      <VLayout style={{ '--v-scrim-blur': '8px', '--v-scrim-opacity': 0.6 }}>
        <VNavigationDrawer v-model={ active.value } temporary width={ 200 } location={ location } />
      </VLayout>
    ))

    const drawer = screen.getByCSS('.v-navigation-drawer')
    const edge = location === 'start' ? 0 : document.documentElement.clientWidth
    const direction = location === 'start' ? 1 : -1
    function dispatchTouch (type: string, distance: number) {
      const touch = new Touch({ identifier: 1, target: drawer, clientX: edge + direction * distance, clientY: 100 })
      drawer.dispatchEvent(new TouchEvent(type, { bubbles: true, cancelable: true, changedTouches: [touch], touches: [touch] }))
    }

    dispatchTouch('touchstart', 0)
    dispatchTouch('touchmove', 100)
    const scrim = await screen.findByCSS('.v-navigation-drawer__scrim')
    await expect.element(scrim).toHaveStyle({ opacity: '1', backdropFilter: 'blur(4px)', backgroundColor: 'color(srgb 0 0 0 / 0.3)' })

    dispatchTouch('touchmove', 200)
    await expect.element(scrim).toHaveStyle({ backdropFilter: 'blur(8px)', backgroundColor: 'color(srgb 0 0 0 / 0.6)' })
    dispatchTouch('touchend', 200)
    await expect.poll(() => active.value).toBe(true)
    await expect.element(scrim).toHaveStyle({ backdropFilter: 'blur(8px)', backgroundColor: 'color(srgb 0 0 0 / 0.6)' })
  })

  it('should blur the backdrop independently of tint opacity', async () => {
    render(() => (
      <VLayout style={{ '--v-scrim-blur': '8px', '--v-scrim-opacity': 0.4 }}>
        <VNavigationDrawer modelValue temporary />
      </VLayout>
    ))

    const scrim = screen.getByCSS('.v-navigation-drawer__scrim')
    await expect.element(scrim).toHaveStyle({ backdropFilter: 'blur(8px)', opacity: '1' })
    await expect.element(scrim).toHaveStyle({ backgroundColor: 'color(srgb 0 0 0 / 0.4)' })
  })

  it('should open when changed to permanent on mobile', async () => {
    await page.viewport(400, 800)
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

    await page.viewport(400, 800)

    await commands.waitStable('.v-navigation-drawer')
    expect(drawer).not.toHaveClass('v-navigation-drawer--active')
  })

  it('should not hide drawer if window resizes below mobile breakpoint and disable-resize-watcher is used', async () => {
    await page.viewport(1280, 800)
    render(() => (
      <VLayout>
        <VNavigationDrawer disableResizeWatcher />
      </VLayout>
    ))

    expect(screen.getByCSS('.v-navigation-drawer')).toHaveClass('v-navigation-drawer--active')
    await page.viewport(400, 800)
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
    await page.viewport(400, 800)
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

  it('should allow percentage widths relative to the layout', async () => {
    render(() => (
      <VLayout>
        <VNavigationDrawer width="20%" permanent />
        <VMain />
      </VLayout>
    ))

    const drawer = screen.getByCSS('.v-navigation-drawer')
    const layoutWidth = screen.getByCSS('.v-layout').getBoundingClientRect().width

    await commands.waitStable('.v-navigation-drawer')

    expect(drawer.getBoundingClientRect().width).toBeCloseTo(layoutWidth * 0.2, 1)
    await expect.element(screen.getByCSS('.v-main')).toHaveStyle({ paddingLeft: `${layoutWidth * 0.2}px` })
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

    await expect.element(screen.getByCSS('.v-navigation-drawer')).toBeInViewport()
    await expect.element(screen.getByCSS('.v-navigation-drawer__scrim')).toBeInViewport()
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

    await expect.element(screen.getByCSS('.v-navigation-drawer')).toBeInViewport()
    await expect.element(screen.getByCSS('.v-navigation-drawer__scrim')).toBeInViewport()
  })

  showcase({ stories })
})
