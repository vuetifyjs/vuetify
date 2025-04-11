/* eslint-disable vitest/no-commented-out-tests */
// Composables
import { createTheme } from '../theme'

// Utilities
import { createApp } from 'vue'

// Types
import type { App } from 'vue'

describe('createTheme', () => {
  let app: App

  beforeEach(() => {
    const child = document.querySelector('#vuetify-theme-stylesheet')
    child && document.head.removeChild(child)
    app = createApp({})
  })

  it('should create style element', async () => {
    const { install } = createTheme()

    install(app)

    expect(document.head).toMatchSnapshot()
  })

  it('should not generate style element if disabled', async () => {
    const { install } = createTheme(false)

    install(app)

    expect(document.head).toMatchSnapshot()
  })

  it('should generate on-* colors', async () => {
    const theme = createTheme()

    theme.install(app)

    const colors = [
      'on-background',
      'on-surface',
      'on-primary',
      'on-secondary',
      'on-success',
      'on-warning',
      'on-error',
      'on-info',
    ]

    for (const color of colors) {
      expect(theme.computedThemes.value.light.colors).toHaveProperty(color)
    }
  })

  it('should generate color variants', async () => {
    const theme = createTheme({
      variations: {
        colors: ['primary', 'secondary'],
        lighten: 2,
        darken: 2,
      },
    })

    theme.install(app)

    for (const color of ['primary', 'secondary']) {
      for (const variant of ['lighten', 'darken']) {
        for (const amount of [1, 2]) {
          expect(theme.computedThemes.value.light.colors).toHaveProperty(`${color}-${variant}-${amount}`)
          expect(theme.computedThemes.value.light.colors).toHaveProperty(`on-${color}-${variant}-${amount}`)
        }
      }
    }
  })

  it('should update existing theme', async () => {
    const theme = createTheme({
      variations: false,
    })

    theme.install(app)

    expect(theme.computedThemes.value.light.colors.background).not.toBe('#FF0000')

    theme.themes.value.light = {
      ...theme.themes.value.light,
      colors: {
        ...theme.themes.value.light.colors,
        background: '#FF0000',
      },
    }

    expect(theme.computedThemes.value.light.colors.background).toBe('#FF0000')
  })

  it('should set a CSP nonce if configured', async () => {
    const { install } = createTheme({ cspNonce: 'my-csp-nonce' })

    install(app)

    const styleElement = document.getElementById('vuetify-theme-stylesheet')
    expect(styleElement?.getAttribute('nonce')).toBe('my-csp-nonce')
  })

  it('should not set a CSP nonce if option was left blank', async () => {
    const { install } = createTheme({})

    install(app)

    const styleElement = document.getElementById('vuetify-theme-stylesheet')
    expect(styleElement?.getAttribute('nonce')).toBeNull()
  })

  it('should merge custom theme based upon the supplied dark property', async () => {
    for (const dark of [true, false, undefined]) {
      const theme = createTheme({
        defaultTheme: 'myTheme',
        themes: { myTheme: { dark } },
      })

      theme.install(app)

      expect(theme.computedThemes.value.myTheme.dark).toBe(dark)
      expect(theme.computedThemes.value.myTheme.colors).toHaveProperty('primary')
    }
  })

  it('should generate variations for custom color keys', async () => {
    const theme = createTheme({
      themes: {
        light: {
          colors: { color2: '#1697f6' },
        },
      },
      variations: {
        colors: ['color2'],
        lighten: 1,
        darken: 1,
      },
    })

    theme.install(app)

    expect(theme.computedThemes.value.light.colors).toHaveProperty('color2-darken-1')
    expect(theme.computedThemes.value.light.colors).toHaveProperty('color2-lighten-1')
  })

  it('should allow for customization of the stylesheet id', () => {
    const customStylesheetId = 'custom-vuetify-stylesheet-id'
    const theme = createTheme({
      stylesheetId: customStylesheetId,
    })

    theme.install(app)

    expect(document.getElementById(customStylesheetId)).toBeDefined()
  })

  it('should allow for themes to be scoped', () => {
    const scope = '#my-app'
    const theme = createTheme({
      scope,
    })

    theme.install(app)

    const scopedStyles = document.getElementById('vuetify-theme-stylesheet')!.innerHTML
    const selectors = scopedStyles.split('\n').filter(line => line.includes('{')).map(line => line.trim())
    selectors.forEach(selector => {
      expect(selector.startsWith(`:where(${scope})`)).toBe(true)
      expect(selector).not.toContain(':root')
    })
  })

  it('should properly integrate with unhead when available', async () => {
    const mockPush = vi.fn().mockReturnValue({ patch: vi.fn() })
    const mockUpdateHead = vi.fn()
    const mockUseUnhead = {
      push: mockPush,
      updateDOM: mockUpdateHead,
    }

    // Mock the app context with head
    app._context = {
      provides: {
        usehead: mockUseUnhead,
      },
    } as any

    const theme = createTheme()
    theme.install(app)

    // Verify the head push method was called
    expect(mockPush).toHaveBeenCalled()

    // The push method should receive a function that returns an object with a style property
    const headObj = mockPush.mock.calls[0][0]()
    expect(headObj).toHaveProperty('style')
    expect(Array.isArray(headObj.style)).toBe(true)
    expect(headObj.style[0]).toHaveProperty('textContent')
    expect(headObj.style[0]).toHaveProperty('id', 'vuetify-theme-stylesheet')
  })

  it('should work with legacy head client methods', async () => {
    const mockAddHeadObjs = vi.fn()
    const mockUpdateHead = vi.fn()
    const mockLegacyHead = {
      addHeadObjs: mockAddHeadObjs,
      updateDOM: mockUpdateHead,
    }

    // Mock the app context with legacy head
    app._context = {
      provides: {
        usehead: mockLegacyHead,
      },
    } as any

    const theme = createTheme()
    theme.install(app)

    // Verify the legacy addHeadObjs method was called
    expect(mockAddHeadObjs).toHaveBeenCalled()

    // Verify updateDOM is called during reactivity
    expect(mockUpdateHead).toHaveBeenCalled()
  })

  it('should change, toggle, and cycle theme', async () => {
    const theme = createTheme({
      defaultTheme: 'light',
      themes: {
        custom: { dark: false },
        utopia: { dark: true },
      },
    })

    // Test 1: Toggle through all available themes when no argument provided
    expect(theme.name.value).toBe('light')

    theme.toggle()
    expect(theme.name.value).toBe('dark')

    theme.toggle()
    expect(theme.name.value).toBe('light')

    // Test 2: Change to a specific theme
    theme.change('dark')
    expect(theme.name.value).toBe('dark')

    // Test 3: Cycle between a limited set of themes
    theme.cycle()
    expect(theme.name.value).toBe('custom')

    theme.cycle()
    expect(theme.name.value).toBe('utopia')

    theme.cycle()
    expect(theme.name.value).toBe('light')

    // Test 4: Cycle between a subset of themes
    theme.cycle(['light', 'utopia'])
    expect(theme.name.value).toBe('utopia')

    theme.cycle(['light', 'utopia'])
    expect(theme.name.value).toBe('light')

    // Test 5: Error when changing to a non-existent theme
    const consoleMock = vi.spyOn(console, 'warn').mockImplementation(() => {})
    theme.change('nonexistent')
    expect(consoleMock).toHaveBeenCalledWith('[Vue warn]: Vuetify: Theme "nonexistent" not found on the Vuetify theme instance')
    consoleMock.mockReset()
  })
})
