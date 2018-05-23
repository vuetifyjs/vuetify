import { default as setup } from '@/components/Vuetify/mixins/lang'
import { test } from '@/test'

let lang

test('$vuetify.lang', () => {
  beforeEach(() => {
    lang = setup()
  })

  it('should fall back to en', () => {
    Object.assign(lang.locales.en, { foo: 'bar', bar: 'baz' })
    lang.locales.foreign = { foo: 'foreignBar' }
    lang.current = 'foreign'

    expect(lang.t('$vuetify.lang.foo')).toBe('foreignBar')

    expect(lang.t('$vuetify.lang.bar')).toBe('baz')
    expect('Translation key "bar" not found, falling back to default').toHaveBeenTipped()

    expect(lang.t('$vuetify.lang.baz')).toBe('$vuetify.lang.baz')
    expect('Translation key "baz" not found, falling back to default').toHaveBeenTipped()
    expect('Translation key "baz" not found in fallback').toHaveBeenWarned()
  })

  it('should ignore unprefixed strings', () => {
    expect(lang.t('foo.bar.baz')).toBe('foo.bar.baz')
  })

  it('should use a different default', () => {
    lang = setup({
      current: 'foreign',
      locales: {
        foreign: { foo: 'foreignBar' }
      }
    })

    expect(lang.t('$vuetify.lang.foo')).toBe('foreignBar')
  })
})
