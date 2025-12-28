// Utilities
import { mount } from '@vue/test-utils'
import { VCol } from '../VCol'
import { createVuetify } from '@/framework'

describe('VCol', () => {
  const vuetify = createVuetify()

  function mountFunction (template: string) {
    return mount({
      components: { VCol },
      template,
    }, {
      global: { plugins: [vuetify] },
    })
  }

  it('should have default expected structure', async () => {
    const wrapper = mountFunction(`<VCol />`)

    expect(wrapper.html()).toBe('<div class="v-col"></div>')
  })

  it('renders custom root element when tag prop set', async () => {
    const wrapper = mountFunction(`<VCol tag="span" />`)

    expect(wrapper.html()).toBe('<span class="v-col"></span>')
  })

  it('should apply breakpoint specific col-{bp}-{#} classes', async () => {
    const wrapper = mountFunction(`<VCol cols="6" sm="5" md="4" lg="3" xl="2" />`)

    expect(wrapper.html()).toBe('<div class="v-col-sm-5 v-col-md-4 v-col-lg-3 v-col-xl-2 v-col-6"></div>')
  })

  it('should apply ".v-col-offset-*" classes with "offset-{bp}-{#}" props', async () => {
    const wrapper = mountFunction(`<VCol offset="6" offset-sm="5" offset-md="4" offset-lg="3" offset-xl="2" />`)
    expect(wrapper.html()).toBe(
      '<div class="v-col-offset-sm-5 v-col-offset-md-4 v-col-offset-lg-3 v-col-offset-xl-2 v-col v-col-offset-6"></div>'
    )
  })

  it(`should apply boolean breakpoint classes for 'sm', 'md', 'lg', 'xl' prop`, async () => {
    const wrapper = mountFunction(`<VCol sm md lg xl />`)

    expect(wrapper.html()).toBe('<div class="v-col-sm v-col-md v-col-lg v-col-xl v-col"></div>')
  })

  it(`should apply boolean breakpoint classes for 'sm', 'md', 'lg', 'xl' prop set to empty string`, async () => {
    const wrapper = mountFunction(`<VCol sm="" md="" lg="" xl="" />`)

    expect(wrapper.html()).toBe('<div class="v-col-sm v-col-md v-col-lg v-col-xl v-col"></div>')
  })
})
