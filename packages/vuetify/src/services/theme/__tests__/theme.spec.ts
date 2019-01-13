// Service
import { Theme } from '..'

// Types
import {
  VuetifyParsedTheme,
  VuetifyThemeVariant
} from 'vuetify/types/services/theme'

const FillVariant = (variant: Partial<VuetifyThemeVariant> = {}) => {
  return {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    ...variant
  }
}

describe('Theme.ts', () => {
  let mock: any

  beforeEach(() => {
    const style = document.getElementById('vuetify-theme-stylesheet')

    if (style) {
      style.remove()
    }

    mock = {
      default: 'light',
      themes: {
        dark: FillVariant(),
        light: FillVariant()
      }
    }
  })

  it('should disable theme colors', () => {
    const theme = new Theme({ disable: true })

    expect(theme.style).toBeFalsy()
  })

  it('should generate theme and apply to document', () => {
    const theme = new Theme({
      default: 'custom',
      themes: {
        custom: FillVariant({
          primary: '#000001',
          secondary: '#000002',
          accent: '#000003'
        })
      }
    })

    const style = document.getElementById('vuetify-theme-stylesheet')
    const html = style!.innerHTML

    expect(html).toMatchSnapshot()
    expect(html.indexOf('#000001') > -1).toBe(true)
    expect(html.indexOf('#000002') > -1).toBe(true)
    expect(html.indexOf('#000003') > -1).toBe(true)
  })

  it ('should apply a new theme', () => {
    const theme = new Theme({
      default: 'light',
      themes: {
        light: FillVariant(),
        vuetify: FillVariant({
          primary: '#FFFFFF'
        })
      }
    })

    const style = document.getElementById('vuetify-theme-stylesheet')
    const html = style!.innerHTML

    theme.applyTheme('vuetify')

    expect(html).not.toEqual(style!.innerHTML)
  })

  it('should clear css', () => {
    const theme = new Theme()
    const spy = jest.spyOn(theme, 'clearCss')

    theme.applyTheme()
    expect(spy).toHaveBeenCalledTimes(1)

    theme.options.themes = { light: FillVariant() }
    theme.applyTheme(false)
    expect(spy).toHaveBeenCalledTimes(2)

    theme.applyTheme('dark')
    expect(spy).toHaveBeenCalledTimes(3)
  })

  it('should use themeCache', () => {
    let cache: VuetifyParsedTheme | undefined
    const themeCache = {
      get: jest.fn(() => cache),
      set: jest.fn((obj: VuetifyParsedTheme) => {
        cache = obj
      })
    }

    const theme = new Theme({
      ...mock,
      themeCache
    })

    theme.applyTheme()

    expect(themeCache.get).toHaveBeenCalledTimes(2)
    expect(themeCache.set).toHaveBeenCalledTimes(1)
  })

  it('should minify theme', () => {
    const minifyTheme = jest.fn((css: string) => css + 'foobar')

    const theme = new Theme({
      ...mock,
      minifyTheme
    })

    const style = document.getElementById('vuetify-theme-stylesheet')
    const html = style!.innerHTML

    expect(minifyTheme).toBeCalled()
    expect(html.indexOf('foobar') > -1).toBe(true)
  })

  it('should add nonce to stylesheet', () => {
    const theme = new Theme({
      ...mock,
      cspNonce: 'foobar'
    })

    const style = document.getElementById('vuetify-theme-stylesheet')
    expect(style!.getAttribute('nonce')).toBe('foobar')
  })
})
