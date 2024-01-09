// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

describe('framework', () => {
  describe('install', () => {
    it('should return install function', () => {
      const vuetify = createVuetify()

      expect('install' in vuetify).toBe(true)
    })

    it('should install provided components', () => {
      const Foo = { name: 'Foo', template: '<div />' }
      const vuetify = createVuetify({
        components: {
          Foo,
        },
      })

      const TestComponent = {
        name: 'TestComponent',
        props: {},
        template: '<foo />',
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
        template: '<div v-foo />',
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
