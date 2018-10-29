import Vue from 'vue'
import Vuetify, { checkVueVersion } from '@/components/Vuetify'
import { test } from '@/test'

test('Vuetify.install.js', () => {
  it('should register components and directives', async () => {
    const { component, directive, use } = Vue

    Vue.component = jest.fn()
    Vue.directive = jest.fn()
    Vue.use = jest.fn()

    Vuetify.installed = false
    Vuetify.install(Vue, {
      components: {
        OneComponent: {},
        ComponentPack: { $_vuetify_subcomponents: { HisChild: {} } }
      },
      directives: {
        foobarbaz: {
          name: 'foobarbaz'
        }
      }
    })

    expect(Vue.use.mock.calls).toEqual([])
    expect(Vue.directive.mock.calls).toEqual([
      ['foobarbaz', { name: 'foobarbaz' }]
    ])
    expect(Vue.component.mock.calls).toEqual([
      ['OneComponent', {}],
      ['HisChild', {}]
    ])

    Vue.use = jest.fn()
    Vuetify.install(Vue, {
      components: {
        component: 'component'
      }
    })
    expect(Vue.use).not.toBeCalled()

    Object.assign(Vue, { component, directive, use })
  })

  describe('should warn about an unsupported version of Vue', () => {
    it('older version', () => {
      checkVueVersion({ version: '2.5.0' }, '^2.5.10')
      expect('Vuetify requires Vue version ^2.5.10').toHaveBeenTipped()
    })

    it('newer version', () => {
      checkVueVersion({ version: '2.5.12' }, '^2.5.10')
    })

    it('newer, prerelease version', () => {
      checkVueVersion({ version: '2.5.17-beta.0' }, '^2.5.10')
    })
  })
})
