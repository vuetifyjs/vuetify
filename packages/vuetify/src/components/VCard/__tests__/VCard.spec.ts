// Components
import { VCard, VCardAvatar, VCardImg, VCardSubtitle, VCardText, VCardTitle } from '..'

// Utilities
import { h, nextTick } from 'vue'
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from '@jest/globals'

// Types
import type { FunctionalComponent } from 'vue'

describe('VCard', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount(VCard, {
      global: {
        plugins: [vuetify],
      },
      ...options,
    })
  }

  it('should match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it.each([
    [{ appendAvatar: 'bar' }, VCardAvatar],
    [{ appendIcon: 'bar' }, VCardAvatar],
    [{ image: 'foo.png' }, VCardImg],
    [{ prependAvatar: 'foo' }, VCardAvatar],
    [{ prependIcon: 'foo' }, VCardAvatar],
    [{ subtitle: 'bar' }, VCardSubtitle],
    [{ text: 'foobar' }, VCardText],
    [{ title: 'foo' }, VCardTitle],
  ])('should render functional components when using props %s', (props: any, component: FunctionalComponent) => {
    const wrapper = mountFunction({ props })

    expect(wrapper.findComponent(component).exists()).toBe(true)
  })

  it('should render slots and match a snapshot', () => {
    const wrapper = mountFunction({
      props: { image: 'foo.png' },
      slots: {
        actions: '<div>actions</div>',
        append: '<div>foo</div>',
        image: (props: any) => h('v-img', props),
        prepend: '<div>foobar</div>',
        subtitle: '<div>fizz</div>',
        text: '<div>buzz</div>',
        title: '<div>fizzbuzz</div>',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should conditionally have the hover class', async () => {
    const wrapper = mountFunction({
      props: { hover: true },
    })

    expect(wrapper.classes()).toContain('v-card--hover')

    wrapper.setProps({ disabled: true })

    await nextTick()

    expect(wrapper.classes()).not.toContain('v-card--hover')

    wrapper.setProps({ disabled: false, flat: true })

    await nextTick()

    expect(wrapper.classes()).not.toContain('v-card--hover')

    wrapper.setProps({ flat: false })

    await nextTick()

    expect(wrapper.classes()).toContain('v-card--hover')
  })
})
