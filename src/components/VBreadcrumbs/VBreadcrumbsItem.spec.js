import { test } from '~util/testing'
import { VBreadcrumbsItem } from '~components/VBreadcrumbs'

// TODO: Fix when next Vue release goes live
test.skip('VBreadcrumbsItem.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VBreadcrumbsItem)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom activeClass and match snapshot', () => {
    const wrapper = mount(VBreadcrumbsItem, {
      propsData: {
        activeClass: 'breadcrumbs-item--active'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
