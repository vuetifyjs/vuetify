// Service
import { Lang } from '../index'

describe('$vuetify.lang', () => {
  let lang: Lang

  beforeEach(() => {
    lang = new Lang()
  })

  it('should fall back to en', () => {
    lang.locales.en = Object.assign({}, lang.locales.en, { foo: 'bar', bar: 'baz' })
    lang.locales.foreign = { foo: 'foreignBar' }
    lang.current = 'foreign'

    expect(lang.t('foo')).toBe('foreignBar')

    expect(lang.t('bar')).toBe('baz')
    expect('Translation key "bar" not found, falling back to default').toHaveBeenTipped()

    expect(lang.t('baz')).toBe('baz')
    expect('Translation key "baz" not found, falling back to default').toHaveBeenTipped()
    expect('Translation key "baz" not found in fallback').toHaveBeenWarned()
  })

  it('should use a different default', () => {
    lang = new Lang({
      current: 'foreign',
      locales: {
        foreign: { foo: 'foreignBar' },
      },
    })

    expect(lang.t('foo')).toBe('foreignBar')
  })

  it('should use a custom translator', () => {
    const translator = jest.fn(str => str)

    lang = new Lang({ t: translator })

    lang.t('$vuetify.foobar', 'fizzbuzz')

    expect(translator).toHaveBeenCalledWith('$vuetify.foobar', 'fizzbuzz')
  })

  it('should override default message', () => {
    lang = new Lang({
      current: 'foreign',
      locales: {
        foreign: {
          $vuetify: {
            dataTable: { sortBy: 'foobar' },
          },
        },
      },
    })

    expect(lang.t('$vuetify.dataTable.sortBy')).toBe('foobar')
  })
})
