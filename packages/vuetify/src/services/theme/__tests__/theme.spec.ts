// Service
import { Theme } from '../index'

// Preset
import { preset } from '../../../presets/default'

// Utilities
import { mergeDeep } from '../../../util/helpers'

// Types
import Vue from 'vue'
import {
  VuetifyParsedTheme,
  VuetifyThemeVariant,
  ThemeOptions,
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
    ...variant,
  }
}

describe('Theme.ts', () => {
  function rootFactory () {
    return mergeDeep(JSON.parse(JSON.stringify(preset)), {
      theme: {
        default: 'light',
        themes: {
          dark: FillVariant(),
          light: FillVariant(),
        },
      },
    })
  }

  let mockTheme: (theme?: Partial<ThemeOptions>) => Theme
  let instance: Vue

  beforeEach(() => {
    mockTheme = (themeOptions?: Partial<ThemeOptions>) => {
      const options = { theme: themeOptions || {} }
      const theme = new Theme(mergeDeep(rootFactory(), options))
      instance = new Vue({
        beforeCreate () {
          theme.init(this)
        },
      })

      return theme
    }
  })

  afterEach(() => {
    const style = document.getElementById('vuetify-theme-stylesheet')

    style && style.remove()
  })

  it('should disable theme colors', () => {
    const theme = mockTheme({ disable: true })

    expect(theme.styleEl).toBeFalsy()
  })

  it('should generate theme and apply to document', () => {
    const theme = mockTheme({
      themes: {
        light: FillVariant({
          primary: '#000001',
          secondary: '#000002',
          accent: '#000003',
        }),
      },
    })

    const style = document.getElementById('vuetify-theme-stylesheet')
    const html = style!.innerHTML

    expect(html).toMatchSnapshot()
    expect(html.indexOf('#000001') > -1).toBe(true)
    expect(html.indexOf('#000002') > -1).toBe(true)
    expect(html.indexOf('#000003') > -1).toBe(true)
  })

  it('should apply a new theme', () => {
    const theme = mockTheme({
      default: 'light',
      themes: {
        light: FillVariant(),
        dark: FillVariant({
          primary: '#FFFFFF',
        }),
      },
    })

    const style = document.getElementById('vuetify-theme-stylesheet')
    const html = style!.innerHTML

    theme.dark = true

    expect(html).not.toEqual(style!.innerHTML)
  })

  it('should clear css', () => {
    const theme = mockTheme()
    const spy = jest.spyOn(theme, 'clearCss')

    theme.dark = true
    expect(spy).toHaveBeenCalledTimes(0)

    theme.themes.light = FillVariant()
    theme.dark = false
    expect(spy).toHaveBeenCalledTimes(0)

    theme.disabled = true
    theme.dark = true
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should use themeCache', () => {
    const cache = new Map()
    const themeCache = {
      get: jest.fn(theme => cache.get(theme)),
      set: jest.fn((theme: VuetifyParsedTheme, css: string) => {
        cache.set(theme, css)
      }),
    }

    const theme = mockTheme({
      options: { themeCache },
    })

    expect(theme.generatedStyles).toMatchSnapshot()
    expect(themeCache.set).toHaveBeenCalledTimes(2)

    theme.applyTheme()

    expect(themeCache.get).toHaveBeenCalledTimes(3)
    expect(themeCache.set).toHaveBeenCalledTimes(3)
    expect(theme.generatedStyles).toMatchSnapshot()
  })

  it('should minify theme', () => {
    const minifyTheme = jest.fn((css: string) => css + 'foobar')

    const theme = mockTheme({
      options: { minifyTheme },
    })

    const style = document.getElementById('vuetify-theme-stylesheet')
    const html = style!.innerHTML

    expect(minifyTheme).toHaveBeenCalled()
    expect(html.indexOf('foobar') > -1).toBe(true)
    expect(theme.generatedStyles).toMatchSnapshot()
  })

  it('should add nonce to stylesheet', () => {
    const theme = mockTheme({
      options: { cspNonce: 'foobar' },
    })

    const style = document.getElementById('vuetify-theme-stylesheet')

    expect(style!.getAttribute('nonce')).toBe('foobar')
  })

  it('should initialize the theme', () => {
    const theme = mockTheme()
    const spy = jest.spyOn(theme, 'applyTheme')
    const ssrContext = { head: '' }
    theme.init(instance, ssrContext)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(ssrContext.head).toBeTruthy()
    expect(ssrContext.head).toMatchSnapshot()
  })

  it('should set theme with vue-meta@1', () => {
    const theme = mockTheme()
    const anyInstance = instance as any

    anyInstance.$meta = () => ({})

    theme.init(anyInstance)

    expect(typeof anyInstance.$options['metaInfo']).toBe('function')

    const metaInfo = anyInstance.$options['metaInfo']()

    expect(metaInfo).toBeTruthy()
    expect(metaInfo.style).toHaveLength(1)
    expect(metaInfo.style[0].cssText).toMatchSnapshot()
  })

  it('should set theme with vue-meta@2', () => {
    const theme = mockTheme()
    const anyInstance = instance as any

    anyInstance.$meta = () => ({
      getOptions: () => ({ keyName: 'metaInfo' }),
    })

    theme.init(anyInstance)

    const metaKeyName = anyInstance.$meta().getOptions().keyName

    expect(typeof anyInstance.$options[metaKeyName]).toBe('function')

    const metaInfo = anyInstance.$options[metaKeyName]()

    expect(metaInfo).toBeTruthy()
    expect(metaInfo.style).toHaveLength(1)
    expect(metaInfo.style[0].cssText).toMatchSnapshot()
  })

  it('should react to theme changes', async () => {
    const theme = mockTheme()
    const spy = jest.spyOn(theme, 'applyTheme')

    theme.themes.light.primary = '#000000'
    await instance.$nextTick()

    theme.themes.dark.secondary = '#000000'
    await instance.$nextTick()

    theme.currentTheme.accent = '#000000'
    await instance.$nextTick()

    expect(spy).toHaveBeenCalledTimes(3)
  })

  it('should reset themes', async () => {
    const theme = mockTheme()
    const spy = jest.spyOn(theme, 'applyTheme')

    expect(theme.generatedStyles).toMatchSnapshot()
    theme.resetThemes()
    expect(theme.generatedStyles).toMatchSnapshot()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should set theme', () => {
    const theme = mockTheme()
    const spy = jest.spyOn(theme, 'applyTheme')

    expect(theme.generatedStyles).toMatchSnapshot()
    theme.setTheme('light', { accent: '#c0ffee' })
    expect(theme.generatedStyles).toMatchSnapshot()
    theme.setTheme('dark', { accent: '#c0ffee' })
    expect(theme.generatedStyles).toMatchSnapshot()
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('should use vue-meta@2.3 functionality', () => {
    const theme = mockTheme()
    const set = jest.fn()

    const $meta = () => ({
      addApp: () => ({ set }),
    })

    ;(instance as any).$meta = $meta as any

    theme.init(instance)

    expect(set).toHaveBeenCalled()
  })

  it('should not generate variations', () => {
    const theme = mockTheme({ options: { variations: false } })

    const style = document.getElementById('vuetify-theme-stylesheet')
    const html = style!.innerHTML

    expect(html).toMatchSnapshot()
  })
})
