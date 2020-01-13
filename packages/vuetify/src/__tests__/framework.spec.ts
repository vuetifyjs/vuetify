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

    expect('mock' in vuetify.framework).toBe(false)

    vuetify.use(MockService)

    expect('mock' in vuetify.framework).toBe(true)
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
