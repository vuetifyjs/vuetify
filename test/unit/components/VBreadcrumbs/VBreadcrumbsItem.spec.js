import { test } from '@/test'
import { VBreadcrumbsItem } from '@/components/VBreadcrumbs'

// TODO: Enable when Vue has optional injects
test.skip('VBreadcrumbsItem.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VBreadcrumbsItem)

    expect(wrapper.html()).toMatchSnapshot()
  })

  // TODO: Use vue-router or nuxt in tests
  it.skip('should have a custom active class', () => {
    const wrapper = mount(VBreadcrumbsItem, {
      propsData: {
        activeClass: 'v-breadcrumbs-item--active',
        to: '/'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
