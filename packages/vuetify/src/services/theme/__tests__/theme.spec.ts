// Service
import { Theme } from '../index'

// Types
import Vue from 'vue'
import {
  VuetifyParsedTheme,
  VuetifyThemeVariant,
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
  let mock: any
  let instance: Vue

  beforeEach(() => {
    const style = document.getElementById('vuetify-theme-stylesheet')

    if (style) {
      style.remove()
    }

    mock = {
      default: 'light',
      themes: {
        dark: FillVariant(),
        light: FillVariant(),
      },
    }

    instance = new Vue()
  })

  it('should disable theme colors', () => {
    const theme = new Theme({ disable: true })

    theme.init(instance)

    expect(theme.styleEl).toBeFalsy()
  })

  it('should generate theme and apply to document', () => {
    const theme = new Theme({
      themes: {
        light: FillVariant({
          primary: '#000001',
          secondary: '#000002',
          accent: '#000003',
        }),
      },
    })

    theme.init(instance)

    const style = document.getElementById('vuetify-theme-stylesheet')
    const html = style!.innerHTML

    expect(html).toMatchSnapshot()
    expect(html.indexOf('#000001') > -1).toBe(true)
    expect(html.indexOf('#000002') > -1).toBe(true)
    expect(html.indexOf('#000003') > -1).toBe(true)
  })

  it('should apply a new theme', () => {
    const theme = new Theme({
      default: 'light',
      themes: {
        light: FillVariant(),
        dark: FillVariant({
          primary: '#FFFFFF',
        }),
      },
    })

    theme.init(instance)

    const style = document.getElementById('vuetify-theme-stylesheet')
    const html = style!.innerHTML

    theme.dark = true

    expect(html).not.toEqual(style!.innerHTML)
  })

  it('should clear css', () => {
    const theme = new Theme()
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
    let cache: VuetifyParsedTheme | undefined
    const themeCache = {
      get: jest.fn(() => cache),
      set: jest.fn((obj: VuetifyParsedTheme) => {
        cache = obj
      }),
    }

    const theme = new Theme({
      ...mock,
      options: {
        themeCache,
      },
    })

    expect(theme.generatedStyles).toMatchSnapshot()
    expect(themeCache.set).toHaveBeenCalledTimes(1)

    theme.applyTheme()

    expect(themeCache.get).toHaveBeenCalledTimes(2)
    expect(themeCache.set).toHaveBeenCalledTimes(1)
    expect(theme.generatedStyles).toMatchSnapshot()
  })

  it('should minify theme', () => {
    const minifyTheme = jest.fn((css: string) => css + 'foobar')

    const theme = new Theme({
      ...mock,
      options: {
        minifyTheme,
      },
    })

    theme.init(instance)

    const style = document.getElementById('vuetify-theme-stylesheet')
    const html = style!.innerHTML

    expect(minifyTheme).toHaveBeenCalled()
    expect(html.indexOf('foobar') > -1).toBe(true)
    expect(theme.generatedStyles).toMatchSnapshot()
  })

  it('should add nonce to stylesheet', () => {
    const theme = new Theme({
      ...mock,
      options: {
        cspNonce: 'foobar',
      },
    })

    theme.init(instance)

    const style = document.getElementById('vuetify-theme-stylesheet')
    expect(style!.getAttribute('nonce')).toBe('foobar')
  })

  it('should initialize the theme', () => {
    const theme = new Theme({
      ...mock,
    })
    const spy = jest.spyOn(theme, 'applyTheme')
    const ssrContext = { head: '' }
    theme.init(instance, ssrContext)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(ssrContext.head).toBeTruthy()
    expect(ssrContext.head).toMatchSnapshot()
  })

  it('should set theme with vue-meta@1', () => {
    const theme = new Theme(mock)
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
    const theme = new Theme(mock)
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
    const theme = new Theme(mock)
    const spy = jest.spyOn(theme, 'applyTheme')
    theme.init(instance)

    expect(spy).toHaveBeenCalledTimes(1)

    theme.themes.light.primary = '#000000'
    await instance.$nextTick()

    theme.themes.dark.secondary = '#000000'
    await instance.$nextTick()

    theme.currentTheme.accent = '#000000'
    await instance.$nextTick()

    expect(spy).toHaveBeenCalledTimes(4)
  })

  it('should reset themes', async () => {
    const theme = new Theme(mock)
    const spy = jest.spyOn(theme, 'applyTheme')
    theme.init(instance)

    expect(theme.generatedStyles).toMatchSnapshot()
    theme.resetThemes()
    expect(theme.generatedStyles).toMatchSnapshot()
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('should set theme', () => {
    const theme = new Theme(mock)
    const spy = jest.spyOn(theme, 'applyTheme')
    theme.init(instance)

    expect(theme.generatedStyles).toMatchSnapshot()
    theme.setTheme('light', { accent: '#c0ffee' })
    expect(theme.generatedStyles).toMatchSnapshot()
    theme.setTheme('dark', { accent: '#c0ffee' })
    expect(theme.generatedStyles).toMatchSnapshot()
    expect(spy).toHaveBeenCalledTimes(3)
  })

  it('should use vue-meta@2.3 functionality', () => {
    const theme = new Theme(mock)
    const set = jest.fn()

    const $meta = () => ({
      addApp: () => ({ set }),
    })

    ;(instance as any).$meta = $meta as any

    theme.init(instance)

    expect(set).toHaveBeenCalled()
  })
})
