// Libraries
import Vue from 'vue'

// Components
import VDivider from '../VDivider'

// Utilities
import {
  createLocalVue,
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VDivider', () => {
  let mountFunction: (options?: object) => Wrapper<Vue>
  let localVue: typeof Vue

  beforeEach(() => {
    localVue = createLocalVue()

    mountFunction = (options = {}) => {
      return mount(VDivider, {
        localVue,
        ...options,
      })
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render an inset component', () => {
    const wrapper = mountFunction({
      propsData: { inset: true },
    })

    expect(wrapper.classes('v-divider--inset')).toBe(true)
  })

  it('should render a light component', () => {
    const wrapper = mountFunction({
      propsData: { light: true },
    })

    expect(wrapper.classes('theme--light')).toBe(true)
  })

  it('should render a dark component', () => {
    const wrapper = mountFunction({
      propsData: { dark: true },
    })

    expect(wrapper.classes('theme--dark')).toBe(true)
  })

  it('should render a vertical component', () => {
    const wrapper = mountFunction({
      propsData: { vertical: true },
    })

    expect(wrapper.classes('v-divider--vertical')).toBe(true)
  })

  it('should have separator role by default', () => {
    const wrapper = mountFunction()

    expect(wrapper.attributes('role')).toBe('separator')
  })

  it('should have aria-orientation horizontal by default', () => {
    const wrapper = mountFunction()

    expect(wrapper.attributes('aria-orientation')).toBe('horizontal')
  })

  it('should have aria-orientation vertical if vertical prop is set', () => {
    const wrapper = mountFunction({
      propsData: { vertical: true },
    })

    expect(wrapper.attributes('aria-orientation')).toBe('vertical')
  })

  it('should have presentation role if set in attrs', () => {
    const wrapper = mountFunction({
      attrs: { role: 'presentation' },
    })

    expect(wrapper.attributes('role')).toBe('presentation')
  })

  it('should have no aria-orientation if presentation role is set in attrs', () => {
    const wrapper = mountFunction({
      attrs: { role: 'presentation' },
    })

    expect(wrapper.attributes('aria-orientation')).toBeUndefined()
  })
})
