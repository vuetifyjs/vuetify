// Components
import VListItem from '../VListItem'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VListItem.ts', () => {
  type Instance = InstanceType<typeof VListItem>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VListItem, {
        ...options,
      })
    }
  })

  it('should render with a div when inactive is true and href is used', () => {
    const wrapper = mountFunction({
      propsData: {
        href: 'http://www.google.com',
        inactive: true,
      },
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes('v-list-item--link')).toBe(false)
  })

  it('should render with a tag when tag is specified', () => {
    const wrapper = mountFunction({
      propsData: {
        tag: 'code',
      },
    })

    expect(wrapper.is('code')).toBe(true)
  })

  it('should render with a div when href and to are not used', () => {
    const wrapper = mountFunction()

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with <a> when using href prop', () => {
    const wrapper = mountFunction({
      propsData: {
        href: 'http://www.google.com',
      },
    })

    const a = wrapper.find('a')

    expect(wrapper.is('a')).toBe(true)
    expect(a.element.getAttribute('href')).toBe('http://www.google.com')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have --link class when href/to prop present or link prop is used', () => {
    const wrapper = mountFunction({
      propsData: {
        href: '/home',
      },
    })

    expect(wrapper.classes('v-list-item--link')).toBe(true)

    wrapper.setProps({ href: undefined, to: '/foo' })
    expect(wrapper.classes('v-list-item--link')).toBe(true)

    wrapper.setProps({ to: undefined, link: true })
    expect(wrapper.classes('v-list-item--link')).toBe(true)

    wrapper.setProps({ link: false })
    expect(wrapper.classes('v-list-item--link')).toBe(false)
  })

  it('should have --link class when click handler present', () => {
    const wrapper = mountFunction({
      listeners: {
        click: () => {},
      },
    })

    expect(wrapper.classes('v-list-item--link')).toBe(true)
  })

  it('should have --link class when click.prevent.stop handler present', () => {
    const wrapper = mountFunction({
      listeners: {
        '!click': () => {},
      },
    })

    expect(wrapper.classes('v-list-item--link')).toBe(true)
  })

  it('should have --selectable class if the selectable property is true', () => {
    const wrapper = mountFunction({
      propsData: {
        selectable: true,
      },
    })

    expect(wrapper.classes('v-list-item--selectable')).toBe(true)
  })

  it('should react to keydown.enter', () => {
    const click = jest.fn()
    const wrapper = mountFunction({
      methods: { click },
    })

    wrapper.trigger('keydown.enter')

    expect(click).toHaveBeenCalled()
  })

  it('should react to clicks', async () => {
    const blur = jest.fn()
    const click = jest.fn()
    const toggle = jest.fn()
    const wrapper = mountFunction({
      methods: { toggle },
    })

    wrapper.vm.$el.blur = blur
    wrapper.vm.$on('click', click)

    wrapper.trigger('click')
    expect(blur).not.toHaveBeenCalled()
    expect(click).toHaveBeenCalled()
    expect(toggle).toHaveBeenCalled()

    wrapper.vm.click({ detail: 1 })

    expect(blur).toHaveBeenCalled()

    wrapper.setProps({ to: '/foo' })
    await wrapper.vm.$nextTick()

    expect(toggle).toHaveBeenCalledTimes(2)
    wrapper.trigger('click')
    expect(toggle).toHaveBeenCalledTimes(2)
  })

  it('should inherit listItemGroup activeClass', () => {
    const wrapper = mountFunction({
      provide: {
        listItemGroup: {
          activeClass: 'foobar',
          register: () => {},
          unregister: () => {},
        },
      },
    })

    expect(wrapper.vm.activeClass).toBe('foobar')
  })

  it('should have the correct aria attributes and tabindex', () => {
    const wrapper = mountFunction({
      propsData: { disabled: true },
    })

    expect(wrapper.element.getAttribute('aria-disabled')).toBe('true')
    expect(wrapper.element.tabIndex).toBe(-1)

    wrapper.setProps({
      disabled: false,
      inputValue: true,
    })

    expect(wrapper.element.getAttribute('aria-disabled')).toBeNull()
    expect(wrapper.element.tabIndex).toBe(-1)

    wrapper.setProps({ link: true })

    expect(wrapper.element.tabIndex).toBe(0)
  })

  it('should have the correct role', () => {
    // Custom provided
    const wrapper = mountFunction({
      attrs: { role: 'item' },
    })
    expect(wrapper.element.getAttribute('role')).toBe('item')

    // In nav
    const wrapper2 = mountFunction({
      provide: { isInNav: true },
    })
    expect(wrapper2.element.getAttribute('role')).toBeNull()

    // In list-item-group
    const wrapper3 = mountFunction({
      provide: { isInGroup: true },
    })
    expect(wrapper3.element.getAttribute('role')).toBe('option')

    // In menu
    const wrapper4 = mountFunction({
      provide: { isInMenu: true },
    })
    expect(wrapper4.element.getAttribute('role')).toBeNull()
    wrapper4.setProps({ href: '#' }) // could be `to` or `link` as well
    expect(wrapper4.element.getAttribute('role')).toBe('menuitem')

    // In list not a link
    const wrapper5 = mountFunction({
      provide: { isInList: true },
    })
    expect(wrapper5.element.getAttribute('role')).toBe('listitem')
  })

  it('should not have an internal state unless its a router-link', async () => {
    const wrapper = mountFunction({})

    expect(wrapper.vm.isActive).toBeFalsy()
    wrapper.vm.toggle()
    expect(wrapper.vm.isActive).toBeFalsy()
    wrapper.vm.toggle()
    expect(wrapper.vm.isActive).toBeFalsy()

    const wrapper2 = mountFunction({ propsData: { to: { name: 'test' } }, stubs: ['router-link'] })

    expect(wrapper2.vm.isActive).toBeFalsy()
    wrapper2.vm.toggle()
    expect(wrapper2.vm.isActive).toBeTruthy()
  })

  it('should not react to keydown.enter when disabled', () => {
    const click = jest.fn()
    const wrapper = mountFunction({
      methods: { click },
      propsData: { disabled: true },
    })

    wrapper.trigger('keydown.enter')

    expect(click).not.toHaveBeenCalled()
  })
})
