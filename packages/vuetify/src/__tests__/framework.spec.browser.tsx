// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

describe('framework', () => {
  describe('install', () => {
    it('should return install function', () => {
      const vuetify = createVuetify()

      expect('install' in vuetify).toBe(true)
    })

    it('should install provided components', () => {
      const VFoo = { name: 'Foo', render: () => (<div />) }
      const vuetify = createVuetify({
        components: {
          VFoo,
        },
      })

      const TestComponent = {
        name: 'TestComponent',
        props: {},
        render: () => (<v-foo />),
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
        // eslint-disable-next-line local-rules/jsx-prop-casing
        render: () => (<div v-foo />),
      }

      mount(TestComponent, {
        global: {
          plugins: [vuetify],
        },
      })

      expect('[Vue warn]: Failed to resolve directive: foo').not.toHaveBeenTipped()
    })
  })
})
