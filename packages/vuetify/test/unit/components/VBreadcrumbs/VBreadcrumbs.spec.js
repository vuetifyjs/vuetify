import { test } from '@/test'
import {
  VBreadcrumbs,
  VBreadcrumbsItem
} from '@/components/VBreadcrumbs'
import Vue from 'vue'

test('VBreadcrumbs.js', ({ mount, compileToFunctions }) => {
  it('should have breadcrumbs classes', () => {
    const wrapper = mount(VBreadcrumbs)

    expect(wrapper.hasClass('v-breadcrumbs')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render items without slot', () => {
    const { render } = compileToFunctions(`
      <v-breadcrumbs :items="items"></v-breadcrumbs>
    `)

    const component = Vue.component('test', {
      components: {
        VBreadcrumbs, VBreadcrumbsItem
      },
      data: () => ({
        items: [
          { text: 'a' },
          { text: 'b' },
          { text: 'c' },
          { text: 'd' }
        ]
      }),
      render
    })
    const wrapper = mount(component)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not complain about identical keys', () => {
    const { render } = compileToFunctions(`
      <v-breadcrumbs :items="items"></v-breadcrumbs>
    `)

    const component = Vue.component('test', {
      components: {
        VBreadcrumbs, VBreadcrumbsItem
      },
      data: () => ({
        items: [
          { text: 'a' },
          { text: 'a' }
        ]
      }),
      render
    })
    const wrapper = mount(component)

    expect(`Duplicate keys detected: 'a'`).not.toHaveBeenWarned()
  })

  it('should use slot to render items if present', () => {
    const { render } = compileToFunctions(`
      <v-breadcrumbs :items="items">
        <v-breadcrumbs-item slot="item" slot-scope="props" :key="props.item.text">
          {{ props.item.text.toUpperCase() }}
        </v-breadcrumbs-item>
      </v-breadcrumbs>
    `)
    const component = Vue.component('test', {
      components: {
        VBreadcrumbs, VBreadcrumbsItem
      },
      data: () => ({
        items: [
          { text: 'a' },
          { text: 'b' },
          { text: 'c' },
          { text: 'd' }
        ]
      }),
      render
    })
    const wrapper = mount(component)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should use a custom divider slot', () => {
    const { render } = compileToFunctions(`
      <v-breadcrumbs :items="items">
        <template slot="divider">/divider/</template>
      </v-breadcrumbs>
    `)
    const component = Vue.component('test', {
      components: {
        VBreadcrumbs, VBreadcrumbsItem
      },
      data: () => ({
        items: [
          { text: 'a' },
          { text: 'b' },
          { text: 'c' },
          { text: 'd' }
        ]
      }),
      render
    })
    const wrapper = mount(component)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should show deprecation notice when using justify-end and justify-start', () => {
    const wrapper = mount(VBreadcrumbs, {
      propsData: {
        justifyEnd: true,
        justifyCenter: true
      },
      slots: {
        default: [{ render: h => h('div') }]
      }
    })

    expect(wrapper.find('.justify-end').length).not.toBe(0)
    expect(wrapper.find('.justify-center').length).not.toBe(0)
    expect(wrapper.html()).toMatchSnapshot()
    expect(`'justify-end' is deprecated, use 'class="justify-end"' instead`).toHaveBeenTipped()
    expect(`'justify-center' is deprecated, use 'class="justify-center"' instead`).toHaveBeenTipped()
    expect(`'default slot' is deprecated, use ':items and scoped slot "item"' instead`).toHaveBeenTipped()
  })

  // TODO: this always passes in jest, needs to be e2e
  it.skip('should remove dividers when items change', async () => {
    const component = Vue.component('test', {
      data: () => ({ items: 3 }),
      render (h) {
        return h(VBreadcrumbs, Array.from(Array(this.items), (_, i) => (
          h(VBreadcrumbsItem, { key: i }, [i])
        )))
      }
    })

    const wrapper = mount(component)
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setData({ items: 1 })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
