// Components
import { VBtn } from '@/components/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

// Composables
import { useDefaults } from '@/composables/defaults'

// Utilities
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { createVuetify } from '@/framework'

describe('defaults', () => {
  it('applies global default class and style', () => {
    const vuetify = createVuetify({
      defaults: {
        VBtn: {
          class: 'foobar',
          style: 'color: red;',
        },
      },
    })

    const wrapper = mount<any>(VBtn, {
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.classes()).toContain('foobar')
    expect(wrapper.attributes('style')).toContain('color: red;')
  })

  it('prefers local styles', () => {
    const vuetify = createVuetify({
      defaults: {
        VBtn: {
          class: 'foobar',
          style: 'color: red; background: red;',
        },
      },
    })

    const wrapper = mount<any>(VBtn, {
      props: {
        class: 'baz',
        style: 'background: blue; caret-color: blue;',
      },
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.classes()).toContain('foobar')
    expect(wrapper.classes()).toContain('baz')
    expect(wrapper.attributes('style')).toContain('color: red;')
    expect(wrapper.attributes('style')).toContain('background: blue;')
    expect(wrapper.attributes('style')).toContain('caret-color: blue;')
  })

  it.each([false, true])('keeps nested root defaults under a provideDefaults ancestor (ancestor: %s)', hasAncestor => {
    const vuetify = createVuetify({
      defaults: {
        Owner: {
          VMenu: {
            Probe: { color: 'primary' },
          },
        },
      },
    })

    const Probe = defineComponent({
      name: 'Probe',
      props: { color: String },
      setup (props) {
        const _props = useDefaults(props, 'Probe')
        return () => h('div', { 'data-color': _props.color || 'red' })
      },
    })

    const Owner = defineComponent({
      name: 'Owner',
      setup (props) {
        useDefaults(props, 'Owner')
        return () => h(VDefaultsProvider, { root: 'VMenu' }, () => h(Probe))
      },
    })

    const wrapper = mount(
      hasAncestor
        ? defineComponent(() => () => h(VDefaultsProvider, { defaults: { Unrelated: { foo: 'bar' } } }, () => h(Owner)))
        : Owner,
      { global: { plugins: [vuetify] } },
    )

    expect(wrapper.find('[data-color]').attributes('data-color')).toBe('primary')
  })

  it('drops an ancestor contextual default from reset content', () => {
    const vuetify = createVuetify({
      defaults: {
        Probe: { color: 'global' },
        Container: {
          Probe: { color: 'contextual' },
        },
      },
    })

    const Probe = defineComponent({
      name: 'Probe',
      props: { color: String },
      setup (props) {
        const _props = useDefaults(props, 'Probe')
        return () => h('div', { 'data-color': _props.color || 'red' })
      },
    })

    const Container = defineComponent({
      name: 'Container',
      setup (props) {
        useDefaults(props, 'Container')
        return () => h(VDefaultsProvider, { root: 'VMenu' }, () => h(Probe))
      },
    })

    const wrapper = mount(Container, { global: { plugins: [vuetify] } })

    expect(wrapper.find('[data-color]').attributes('data-color')).toBe('global')
  })
})
