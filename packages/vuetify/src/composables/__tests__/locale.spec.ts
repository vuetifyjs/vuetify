// Composables
import { createLocale } from '../locale'

// Utilities
import * as vue from 'vue'
import { effectScope } from 'vue'

describe('locale.ts', () => {
  it('should follow the locale rtl map', () => {
    const scope = effectScope()
    const locale = scope.run(() => createLocale({ locale: 'en' }))!

    expect(locale.isRtl.value).toBe(false)
    expect(locale.rtlClasses.value).toBe('v-locale--is-ltr')

    locale.current.value = 'ar'
    expect(locale.isRtl.value).toBe(true)
    expect(locale.rtlClasses.value).toBe('v-locale--is-rtl')

    locale.current.value = 'en'
    locale.rtl.value = { ...locale.rtl.value, en: true }
    expect(locale.isRtl.value).toBe(true)
    expect(locale.rtlClasses.value).toBe('v-locale--is-rtl')

    scope.stop()
  })

  it('should use a provided rtl map instead of the defaults', () => {
    const scope = effectScope()
    const locale = scope.run(() => createLocale({
      locale: 'ar',
      rtl: { ar: false },
    }))!

    expect(locale.isRtl.value).toBe(false)
    expect(locale.rtlClasses.value).toBe('v-locale--is-ltr')

    scope.stop()
  })

  it('should translate $vuetify keys through the locale bundle', () => {
    const scope = effectScope()
    const locale = scope.run(() => createLocale({ locale: 'en' }))!

    expect(locale.t('$vuetify.close')).toBe('Close')
    expect(locale.t('$vuetify.dataFooter.pageText', 1, 10, 100)).toBe('1-10 of 100')
    expect(locale.t('plain {0}', 'x')).toBe('plain x')

    scope.stop()
  })

  it('should fall back to the fallback locale and keep the key when nothing matches', () => {
    const scope = effectScope()
    const locale = scope.run(() => createLocale({
      locale: 'fr',
      fallback: 'en',
      messages: { fr: { other: 'Autre' } },
    }))!
    const warned = vi.spyOn(vue, 'warn').mockImplementation(() => {})

    expect(locale.t('$vuetify.close')).toBe('Close')

    expect(locale.t('$vuetify.notAKey')).toBe('$vuetify.notAKey')
    expect(warned).toHaveBeenCalled()

    warned.mockRestore()
    scope.stop()
  })
})
