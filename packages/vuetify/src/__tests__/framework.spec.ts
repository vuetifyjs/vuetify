// Framework
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { createVuetify, makeProps } from '../framework'

// Types
// import { Service } from '../services/service'

// class MockService extends Service {
//   static property = 'mock'
// }

describe('framework', () => {
  describe('install', () => {
    it('should return install function', () => {
      const vuetify = createVuetify()

      expect('install' in vuetify).toBe(true)
    })

    it('should install provided components', () => {
      const Foo = { name: 'Foo', template: '<div/>' }
      const vuetify = createVuetify({
        components: {
          Foo,
        },
      })

      const TestComponent = {
        name: 'TestComponent',
        props: {},
        template: '<foo/>',
      }

      mount(TestComponent, {
        global: {
          plugins: [vuetify],
        },
      })

      expect('[Vue warn]: Failed to resolve component: foo').not.toHaveBeenTipped()
    })

    it('should install provided directives', () => {
      const Foo = { mounted: () => null }
      const vuetify = createVuetify({
        directives: {
          Foo,
        },
      })

      const TestComponent = {
        name: 'TestComponent',
        props: {},
        template: '<div v-foo/>',
      }

      mount(TestComponent, {
        global: {
          plugins: [vuetify],
        },
      })

      expect('[Vue warn]: Failed to resolve directive: foo').not.toHaveBeenTipped()
    })
  })

  describe('defaults', () => {
    const Foo = {
      name: 'Foo',
      props: makeProps({
        bar: {
          type: String,
          default: 'goodbye world',
        },
      }),
      setup (props) {
        return () => h('div', [props.bar])
      },
    }

    it('should use global default if defined', () => {
      const vuetify = createVuetify({
        defaults: {
          Foo: {
            bar: 'hello world',
          },
        },
      })

      const wrapper = mount(Foo, {
        global: {
          plugins: [vuetify],
        },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should use component default if global not defined', () => {
      const vuetify = createVuetify()

      const wrapper = mount(Foo, {
        global: {
          plugins: [vuetify],
        },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should use runtime value if defined', () => {
      const vuetify = createVuetify({
        defaults: {
          Foo: {
            bar: 'hello world',
          },
        },
      })

      const wrapper = mount(Foo, {
        props: {
          bar: 'baz',
        },
        global: {
          plugins: [vuetify],
        },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should handle factory function as default value', () => {
      const vuetify = createVuetify({
        defaults: {
          TestComponent: {
            foo: () => ({ bar: 'baz' }),
          },
        },
      })

      const TestComponent = {
        name: 'TestComponent',
        props: makeProps({
          foo: {
            type: Object,
            default: () => ({}),
          },
        }),
        setup (props) {
          return () => h('div', [JSON.stringify(props.foo)])
        },
      }

      const wrapper = mount(TestComponent, {
        global: {
          plugins: [vuetify],
        },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should handle function prop correctly', () => {
      const vuetify = createVuetify({
        defaults: {
          TestComponent: {
            foo: () => 'this should be visible',
          },
        },
      })

      const TestComponent = {
        name: 'TestComponent',
        props: makeProps({
          foo: {
            type: [Function], // Function must be wrapper in array
          },
        }),
        setup (props) {
          return () => h('div', [props.foo()])
        },
      }

      const wrapper = mount(TestComponent, {
        global: {
          plugins: [vuetify],
        },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  // it('should merge user options with default preset', () => {
  //   const vuetify = new Vuetify({
  //     icons: { iconfont: 'fa' },
  //     lang: {
  //       current: 'es',
  //       locales: {
  //         es: { foo: 'bar' },
  //       },
  //     },
  //     theme: {
  //       themes: {
  //         dark: {
  //           primary: 'blue',
  //         },
  //       },
  //     },
  //   })

  //   expect(vuetify.preset).toMatchSnapshot()
  // })

  // it('should merge user options with global and default preset', () => {
  //   const vuetify = new Vuetify({
  //     lang: { current: 'en' },
  //     theme: { dark: false },
  //     preset: {
  //       lang: {
  //         current: 'es',
  //         locales: {
  //           es: { foo: 'bar' },
  //         },
  //       },
  //       theme: {
  //         dark: true,
  //         themes: {
  //           dark: {
  //             primary: 'blue',
  //           },
  //         },
  //       },
  //     },
  //   })

  //   expect(vuetify.preset).toMatchSnapshot()
  // })
})
