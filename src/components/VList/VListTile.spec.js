import { test } from '~util/testing'
import { VListTile } from '~components/VList'
import { compileToFunctions } from 'vue-template-compiler'
import Vue from 'vue/dist/vue.common'

const stub = {
  name: 'router-link',
  render: h => h('button')
}

test('VListTile.vue', ({ mount }) => {
  it('should render with a div when href and to are not used', () => {
    const wrapper = mount(VListTile)

    expect(wrapper.is('li')).toBe(true)
    expect(wrapper.find('div').length).toBe(1)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render <li> with <a> when using href prop', () => {
    const wrapper = mount(VListTile, {
      propsData: {
        href: 'http://www.google.com'
      }
    })

    const a = wrapper.find('a')[0]

    expect(wrapper.is('li')).toBe(true)
    expect(a.getAttribute('href')).toBe('http://www.google.com')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render <li> with <button> when using to prop', () => {
    const instance = Vue.extend()
    instance.component('router-link', stub)

    const wrapper = mount(VListTile, {
      propsData: {
        to: '/home'
      },
      instance
    })

    expect(wrapper.is('li')).toBe(true)
    expect(wrapper.find('button').length).toBe(1)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not have activeClass when not toggled', () => {
    const wrapper = mount(VListTile, {
      propsData: {
        href: 'http://www.google.com'
      }
    })

    const link = wrapper.find('a')[0]
    expect(link.hasClass(wrapper.instance().activeClass)).toBe(false)
  })

  it('should have activeClass when toggled', () => {
    const wrapper = mount(VListTile, {
      propsData: {
        href: 'http://www.google.com',
        value: true
      }
    })

    const link = wrapper.find('a')[0]
    expect(link.hasClass(wrapper.instance().activeClass)).toBe(true)
  })

  it('should have --link class when href prop present', () => {
    const wrapper = mount(VListTile, {
      propsData: {
        href: '/home'
      }
    })

    expect(wrapper.contains('.list__tile--link')).toBe(true)
  })

  it('should have --link class when to prop present', () => {
    const instance = Vue.extend()
    instance.component('router-link', stub)

    const wrapper = mount(VListTile, {
      propsData: {
        to: '/home'
      },
      instance
    })

    expect(wrapper.contains('.list__tile--link')).toBe(true)
  })

  it('should have --link class when click handler present', () => {
    const { render } = compileToFunctions(`
      <v-list-tile @click="">Test</v-list-tile>
    `)

    const component = Vue.component('test', {
      components: {
        VListTile
      },
      render
    })

    const wrapper = mount(component)

    expect(wrapper.contains('div.list__tile--link')).toBe(true)
  })

  it('should have --link class when click.prevent.stop handler present', () => {
    const { render } = compileToFunctions(`
      <v-list-tile @click.prevent.stop="">Test</v-list-tile>
    `)

    const component = Vue.component('test', {
      components: {
        VListTile
      },
      render
    })

    const wrapper = mount(component)

    expect(wrapper.contains('div.list__tile--link')).toBe(true)
  })
})
