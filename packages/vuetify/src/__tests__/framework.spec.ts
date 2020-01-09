// Framework
import Vuetify, { useVuetify, VuetifySymbol } from '../framework'

// Types
import { Service } from '../services/service'

class MockService extends Service {
  static property = 'mock'
}

describe('framework.ts', () => {
  it('should initialize a Vuetify service', () => {
    const vuetify = new Vuetify()

    expect(vuetify.installed.size).toBe(6)
    expect(vuetify.installed.has('mock')).toBe(false)

    vuetify.use(MockService)

    expect(vuetify.installed.has('mock')).toBe(true)
    expect(vuetify.installed.size).toBe(7)

    // If already installed, won't add again
    vuetify.use(MockService)
    expect(vuetify.installed.size).toBe(7)
  })

  it('should merge user options with default preset', () => {
    const vuetify = new Vuetify({
      icons: { iconfont: 'fa' },
      lang: {
        current: 'es',
        locales: {
          es: { foo: 'bar' },
        },
      },
      theme: {
        themes: {
          dark: {
            primary: 'blue',
          },
        },
      },
    })

    expect(vuetify.preset).toMatchSnapshot()
  })

  it('should merge user options with global and default preset', () => {
    const vuetify = new Vuetify({
      lang: { current: 'en' },
      theme: { dark: false },
      preset: {
        lang: {
          current: 'es',
          locales: {
            es: { foo: 'bar' },
          },
        },
        theme: {
          dark: true,
          themes: {
            dark: {
              primary: 'blue',
            },
          },
        },
      },
    })

    expect(vuetify.preset).toMatchSnapshot()
  })

  // inject modified in __mocks__
  it('should return injected value', () => {
    const vuetify = useVuetify()

    expect(vuetify).toEqual(VuetifySymbol)
  })
})
