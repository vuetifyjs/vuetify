// Components
import { VOverlay } from '../VOverlay'
import { VApp } from '@/components/VApp'
import { VBtn } from '@/components/VBtn'
import { VDialog } from '@/components/VDialog'
import { VLayout } from '@/components/VLayout'
import { VMain } from '@/components/VMain'
import { VNavigationDrawer } from '@/components/VNavigationDrawer'

// Utilities
import { commands, isClickable, render, screen, userEvent } from '@test'
import { ref, shallowRef } from 'vue'

describe('VOverlay', () => {
  describe('CSS zoom', () => {
    const zoomLevels = [
      ['html', 0.8],
      ['html', 1.25],
      ['body', 0.8],
      ['body', 1.25],
    ] as const

    afterEach(() => {
      document.documentElement.style.zoom = ''
      document.body.style.zoom = ''
    })

    async function open (
      target: 'html' | 'body',
      zoom: number,
      location: 'top end' | 'top start',
      origin: 'bottom end' | 'bottom start'
    ) {
      const root = target === 'html' ? document.documentElement : document.body
      root.style.zoom = String(zoom)

      render(() => (
        <VOverlay locationStrategy="connected" location={ location } origin={ origin } transition={ false }>
          {{
            activator: ({ props }) => (
              <button { ...props } data-testid="activator" style="position: fixed; right: 32px; bottom: 32px; width: 48px; height: 48px;">
                Open
              </button>
            ),
            default: () => <div style="width: 160px; height: 100px;">Content</div>,
          }}
        </VOverlay>
      ))

      await userEvent.click(screen.getByTestId('activator'))
      await commands.waitStable('.v-overlay__content')

      return screen.getByCSS('.v-overlay__content').getBoundingClientRect()
    }

    it.each(zoomLevels)('should stay attached to the activator with %s zoom %s', async (target, zoom) => {
      const content = await open(target, zoom, 'top end', 'bottom end')
      const activator = screen.getByTestId('activator').getBoundingClientRect()

      expect(Math.abs(content.right - activator.right)).toBeLessThan(2)
      expect(Math.abs(content.bottom - activator.top)).toBeLessThan(2)
    })

    it.each(zoomLevels)('should stay inside the viewport with %s zoom %s', async (target, zoom) => {
      const content = await open(target, zoom, 'top start', 'bottom start')

      expect(content.right).toBeLessThanOrEqual(window.innerWidth)
    })
  })

  it('without activator', async () => {
    const model = ref(false)
    render(() => (
      <div data-testid="container">
        <VLayout>
          <VOverlay v-model={ model.value }>
            <div data-testid="content">Content</div>
          </VOverlay>
        </VLayout>
      </div>
    ))

    expect(screen.queryAllByTestId('content')).toHaveLength(0)
    model.value = true

    await commands.waitStable('.v-overlay__content')
    expect(screen.queryAllByTestId('content')).toHaveLength(1)

    await userEvent.click(screen.getByCSS('.v-overlay__scrim'))
    await expect.poll(() => screen.queryAllByTestId('content')).toHaveLength(0)
    expect(model.value).toBe(false)
  })

  it('should use activator', async () => {
    render(() => (
      <div data-testid="container">
        <VLayout>
          <VOverlay>
            {{
              activator: ({ props }) => <div { ...props } data-testid="activator">Click me</div>,
              default: () => <div data-testid="content">Content</div>,
            }}
          </VOverlay>
        </VLayout>
      </div>
    ))

    expect(screen.queryAllByTestId('content')).toHaveLength(0)

    await userEvent.click(screen.getByTestId('activator'))

    await commands.waitStable('.v-overlay__content')
    expect(screen.getByTestId('content')).toBeVisible()

    await userEvent.click(screen.getByCSS('.v-overlay__scrim'))

    await expect.poll(() => screen.queryAllByTestId('content')).toHaveLength(0)
  })

  it('should render overlay on top of layout', async () => {
    render(() => (
      <VApp>
        <VNavigationDrawer permanent class="bg-blue" data-testid="drawer" />
        <VMain>
          <div data-testid="container">
            <VOverlay>
              {{
                activator: ({ props }) => <div { ...props } data-testid="activator">Click me</div>,
                default: () => <div data-testid="content">Content</div>,
              }}
            </VOverlay>
          </div>
        </VMain>
      </VApp>
    ))

    expect(screen.queryAllByTestId('content')).toHaveLength(0)
    await expect(isClickable(screen.getByTestId('drawer'))).resolves.toBe(true)

    await userEvent.click(screen.getByTestId('activator'))

    await commands.waitStable('.v-overlay__content')
    expect(screen.getByTestId('content')).toBeVisible()

    await expect(isClickable(screen.getByTestId('drawer'))).resolves.toBe(false)

    await userEvent.click(screen.getByCSS('.v-overlay__scrim'))

    await expect.poll(() => screen.queryAllByTestId('content')).toHaveLength(0)
    expect(screen.getByTestId('drawer')).toBeVisible()
    await expect(isClickable(screen.getByTestId('drawer'))).resolves.toBe(true)
  })

  it('should render nested overlays', async () => {
    render(() => (
      <VApp>
        <div data-testid="container">
          <VOverlay>
            {{
              activator: ({ props }) => <div { ...props } data-testid="first-activator">Click me</div>,
              default: () => (
                <div data-testid="first-content">
                  <VOverlay>
                    {{
                      activator: ({ props }) => <div { ...props } data-testid="second-activator">Click me nested</div>,
                      default: () => <div data-testid="second-content">Content</div>,
                    }}
                  </VOverlay>
                </div>
              ),
            }}
          </VOverlay>
        </div>
      </VApp>
    ))

    expect(screen.queryAllByTestId('first-content')).toHaveLength(0)

    await userEvent.click(screen.getByTestId('first-activator'))

    await commands.waitStable('.v-overlay__content')
    expect(screen.getByTestId('first-content')).toBeVisible()

    expect(screen.queryAllByTestId('second-content')).toHaveLength(0)

    await userEvent.click(screen.getByTestId('second-activator'))

    await commands.waitStable('.v-overlay__content')
    expect(screen.getByTestId('second-content')).toBeVisible()

    await expect(isClickable(screen.getByTestId('first-activator'))).resolves.toBe(false)

    await userEvent.click(screen.getAllByCSS('.v-overlay__scrim').at(-1)!)

    await expect.poll(() => screen.queryAllByTestId('second-content')).toHaveLength(0)
    expect(screen.getByTestId('first-content')).toBeVisible()
    await expect(isClickable(screen.getByTestId('first-activator'))).resolves.toBe(false)

    await userEvent.click(screen.getByCSS('.v-overlay__scrim'))

    await expect.poll(() => screen.queryAllByTestId('first-content')).toHaveLength(0)
    await expect(isClickable(screen.getByTestId('first-activator'))).resolves.toBe(true)
  })
})

describe('VOverlay scrim', () => {
  it('should retain the default tint without fading the element', async () => {
    render(() => <VOverlay modelValue />)

    await expect.element(screen.getByCSS('.v-overlay__scrim')).toHaveStyle({
      backgroundColor: 'color(srgb 0 0 0 / 0.32)',
      opacity: '1',
      backdropFilter: 'blur(0px)',
    })
  })

  it('should blur the backdrop independently of tint opacity', async () => {
    render(() => (
      <VOverlay modelValue style={{ '--v-scrim-blur': '8px', '--v-scrim-opacity': 0.4 }} />
    ))

    const scrim = screen.getByCSS('.v-overlay__scrim')
    await expect.element(scrim).toHaveStyle({ backdropFilter: 'blur(8px)', opacity: '1' })
    await expect.element(scrim).toHaveStyle({ backgroundColor: 'color(srgb 0 0 0 / 0.4)' })
  })

  it.each([
    [0.7, undefined, '0.7'],
    [undefined, 0.6, '0.6'],
    [0, undefined, '0'],
    ['1', undefined, '1'],
  ])('should prioritize component opacity %s and CSS override %s', async (opacity, override, alpha) => {
    render(() => (
      <VOverlay
        modelValue
        opacity={ opacity }
        style={{ '--v-scrim-opacity': 0.4, ...override !== undefined ? { '--v-overlay-opacity': override } : {} }}
      />
    ))

    await expect.element(screen.getByCSS('.v-overlay__scrim')).toHaveStyle({
      backgroundColor: alpha === '1' ? 'color(srgb 0 0 0)' : `color(srgb 0 0 0 / ${alpha})`,
    })
  })

  it.each([
    ['primary', 'color(srgb 1 0 0 / 0.4)'],
    ['black', 'color(srgb 0 0 0 / 0.4)'],
    ['red', 'color(srgb 0.956863 0.262745 0.211765 / 0.4)'],
    ['var(--custom-scrim)', 'color(srgb 0 0 1 / 0.4)'],
  ])('should tint explicit color %s instead of the shared color', async (color, backgroundColor) => {
    render(() => (
      <VOverlay
        modelValue
        scrim={ color }
        style={{ '--v-scrim-color': 'rgb(0 255 0)', '--v-scrim-opacity': 0.4, '--custom-scrim': 'rgb(0 0 255)' }}
      />
    ), null, { theme: { themes: { light: { colors: { primary: '#ff0000' } } } } })

    await expect.poll(() => getComputedStyle(screen.getByCSS('.v-overlay__scrim')).backgroundColor).toBe(backgroundColor)
  })

  it('should multiply tint opacity by the CSS color alpha', async () => {
    render(() => <VOverlay modelValue scrim="rgba(255, 0, 0, 0.5)" opacity={ 0.4 } />)

    const scrim = screen.getByCSS('.v-overlay__scrim')
    await expect.poll(() => getComputedStyle(scrim).backgroundColor).toMatch(/^color\(srgb 1 0 0 \/ /)
    await expect.poll(() => parseFloat(getComputedStyle(scrim).backgroundColor.split('/')[1])).toBeCloseTo(0.2, 2)
  })

  it('should update shared tokens without tinting the content', async () => {
    const blur = shallowRef('4px')
    const color = shallowRef('rgb(255 0 0)')
    const opacity = shallowRef(0.4)
    render(() => (
      <VOverlay modelValue style={{ '--v-scrim-blur': blur.value, '--v-scrim-color': color.value, '--v-scrim-opacity': opacity.value }}>
        <VBtn color="primary">Content</VBtn>
      </VOverlay>
    ), null, { theme: { themes: { light: { colors: { primary: '#ff0000' } } } } })

    const scrim = screen.getByCSS('.v-overlay__scrim')
    await expect.element(scrim).toHaveStyle({ backdropFilter: 'blur(4px)', backgroundColor: 'color(srgb 1 0 0 / 0.4)' })
    await expect.element(screen.getByRole('button')).toHaveStyle({ backgroundColor: 'color(srgb 1 0 0)' })

    blur.value = '12px'
    color.value = 'rgb(0 0 255)'
    opacity.value = 0.6
    await expect.element(scrim).toHaveStyle({ backdropFilter: 'blur(12px)', backgroundColor: 'color(srgb 0 0 1 / 0.6)' })
    await expect.element(screen.getByRole('button')).toHaveStyle({ backgroundColor: 'color(srgb 1 0 0)' })
  })

  it('should use theme tokens after teleporting and changing theme', async () => {
    const theme = shallowRef('light')
    render(() => <VOverlay modelValue theme={ theme.value } />, null, {
      theme: {
        themes: {
          light: { variables: { 'scrim-blur': '4px', 'scrim-color': 'rgb(255 0 0)', 'scrim-opacity': 0.4 } },
          dark: { variables: { 'scrim-blur': '8px', 'scrim-color': 'rgb(0 0 255)', 'scrim-opacity': 0.6 } },
        },
      },
    })

    const scrim = screen.getByCSS('.v-overlay__scrim')
    expect(scrim.closest('.v-overlay-container')?.parentElement).toBe(document.body)
    await expect.element(scrim).toHaveStyle({ backdropFilter: 'blur(4px)', backgroundColor: 'color(srgb 1 0 0 / 0.4)' })
    theme.value = 'dark'
    await expect.element(scrim).toHaveStyle({ backdropFilter: 'blur(8px)', backgroundColor: 'color(srgb 0 0 1 / 0.6)' })
  })

  it('should not create a scrim when disabled', async () => {
    render(() => <VOverlay modelValue scrim={ false } style={{ '--v-scrim-blur': '8px' }}><button>Content</button></VOverlay>)

    await expect.element(screen.getByRole('button')).toBeVisible()
    expect(screen.queryAllByCSS('.v-overlay__scrim')).toHaveLength(0)
  })

  it('should contain the scrim and blur within its parent', async () => {
    render(() => (
      <div data-testid="parent" style={{ position: 'relative', width: '240px', height: '180px' }}>
        <VOverlay modelValue contained style={{ '--v-scrim-blur': '8px' }} />
      </div>
    ))

    const scrim = screen.getByCSS('.v-overlay__scrim')
    await expect.element(scrim).toHaveStyle({ position: 'absolute', width: '240px', height: '180px', backdropFilter: 'blur(8px)' })
    expect(scrim.getBoundingClientRect().toJSON()).toEqual(screen.getByTestId('parent').getBoundingClientRect().toJSON())
  })

  it('should keep persistent scrims active when clicked', async () => {
    const active = shallowRef(true)
    render(() => <VOverlay v-model={ active.value } persistent noClickAnimation style={{ '--v-scrim-blur': '8px' }} />)

    await userEvent.click(screen.getByCSS('.v-overlay__scrim'))
    expect(active.value).toBe(true)
    await expect.element(screen.getByCSS('.v-overlay__scrim')).toBeVisible()
  })

  it('should close only the top dialog when scrims are nested', async () => {
    const outer = shallowRef(true)
    const inner = shallowRef(true)
    render(() => (
      <VDialog v-model={ outer.value } maxWidth="440" style={{ '--v-scrim-blur': '4px' }}>
        <button>Outer content</button>
        <VDialog v-model={ inner.value } maxWidth="320" style={{ '--v-scrim-blur': '8px' }}><button>Inner content</button></VDialog>
      </VDialog>
    ))

    await expect.poll(() => screen.queryAllByCSS('.v-overlay__scrim')).toHaveLength(2)
    await userEvent.click(screen.getAllByCSS('.v-overlay__scrim').at(-1)!, { position: { x: 10, y: 10 } })
    await expect.poll(() => inner.value).toBe(false)
    expect(outer.value).toBe(true)
    await expect.poll(() => screen.queryAllByCSS('.v-overlay__scrim')).toHaveLength(1)
  })
})
