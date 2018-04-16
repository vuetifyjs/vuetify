import { test } from '@/test'
import {
  VBreadcrumbs,
  VBreadcrumbsItem
} from '@/components/VBreadcrumbs'
import Vue from 'vue'

test('VBreadcrumbs.js', ({ mount, compileToFunctions }) => {
  it('should have breadcrumbs classes', () => {
    const wrapper = mount(VBreadcrumbs)

    expect(wrapper.hasClass('breadcrumbs')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should inject slot to children', () => {
    const { render } = compileToFunctions(`
      <v-breadcrumbs>
        <v-breadcrumbs-item v-for="i in 4" :key="i"/>
      </v-breadcrumbs>
    `)
    const component = Vue.component('test', {
      components: {
        VBreadcrumbs, VBreadcrumbsItem
      },
      render
    })
    const wrapper = mount(component)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should use a custom divider slot', () => {
    const { render } = compileToFunctions(`
      <v-breadcrumbs>
        <template slot="divider">/divider/</template>
        <v-breadcrumbs-item/>
        <v-breadcrumbs-item/>
      </v-breadcrumbs>
    `)
    const component = Vue.component('test', {
      components: {
        VBreadcrumbs, VBreadcrumbsItem
      },
      render
    })
    const wrapper = mount(component)

    expect(wrapper.html()).toMatchSnapshot()
  })

  // TODO: Inline styles not working in jest?
  it('should use custom justify props', () => {
    const wrapper = mount(VBreadcrumbs)

    wrapper.setProps({ justifyCenter: true, justifyEnd: false })
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ justifyCenter: false, justifyEnd: true })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not create dividers for non-items', () => {
    const { render } = compileToFunctions(`
      <v-breadcrumbs>
        <span></span>
        <v-breadcrumbs-item/>
        <span></span>
        <v-breadcrumbs-item/>
      </v-breadcrumbs>
    `)
    const component = Vue.component('test', {
      components: {
        VBreadcrumbs, VBreadcrumbsItem
      },
      render
    })
    const wrapper = mount(component)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
