// Composables
import { createLocale } from '../locale'

// Utilities
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
})
