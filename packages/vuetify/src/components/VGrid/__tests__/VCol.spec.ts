import { mount } from '@vue/test-utils'

import VCol from '../VCol'
import * as framework from '@/framework'

describe('VCol', () => {
  beforeEach(() => {
    jest.spyOn(framework, 'useVuetify').mockReturnValue({
      defaults: { global: {} },
    })
  })
  afterEach(() => {
    jest.spyOn(framework, 'useVuetify').mockRestore()
  })

  it('should have default expected structure', async () => {
    const wrapper = mount({
      components: { VCol },
      template: `<VCol />`,
    })

    expect(wrapper.html()).toBe('<div class="v-col"></div>')
  })

  it('renders custom root element when tag prop set', async () => {
    const wrapper = mount({
      components: { VCol },
      template: `<VCol tag="span" />`,
    })

    expect(wrapper.html()).toBe('<span class="v-col"></span>')
  })

  it('should apply breakpoint specific col-{bp}-{#} classes', async () => {
    const wrapper = mount({
      components: { VCol },
      template: `<VCol cols="6" sm="5" md="4" lg="3" xl="2" />`,
    })

    expect(wrapper.html()).toBe('<div class="v-col-sm-5 v-col-md-4 v-col-lg-3 v-col-xl-2 v-col-6"></div>')
  })

  it('should apply ".offset-*" classes with "offset-{bp}-{#}" props', async () => {
    const wrapper = mount({
      components: { VCol },
      template: `<VCol offset="6" offset-sm="5" offset-md="4" offset-lg="3" offset-xl="2" />`,
    })

    expect(wrapper.html()).toBe('<div class="offset-sm-5 offset-md-4 offset-lg-3 offset-xl-2 v-col offset-6"></div>')
  })

  it('should apply ".order-*" classes with "order-{bp}-{#}" props', async () => {
    const wrapper = mount({
      components: { VCol },
      template: `<VCol order="6" order-sm="5" order-md="4" order-lg="3" order-xl="2" />`,
    })

    expect(wrapper.html()).toBe('<div class="order-sm-5 order-md-4 order-lg-3 order-xl-2 v-col order-6"></div>')
  })

  it(`should apply boolean breakpoint classes for 'sm', 'md', 'lg', 'xl' prop`, async () => {
    const wrapper = mount({
      components: { VCol },
      template: `<VCol sm md lg xl />`,
    })

    expect(wrapper.html()).toBe('<div class="v-col-sm v-col-md v-col-lg v-col-xl v-col"></div>')
  })

  it(`should apply boolean breakpoint classes for 'sm', 'md', 'lg', 'xl' prop set to empty string`, async () => {
    const wrapper = mount({
      components: { VCol },
      template: `<VCol sm="" md="" lg="" xl="" />`,
    })

    expect(wrapper.html()).toBe('<div class="v-col-sm v-col-md v-col-lg v-col-xl v-col"></div>')
  })

  it('should apply ".align-self-*" class with "align-self" prop', async () => {
    const wrapper = mount({
      components: { VCol },
      template: `<VCol align-self="center" />`,
    })

    expect(wrapper.html()).toBe('<div class="v-col align-self-center"></div>')
  })
})
