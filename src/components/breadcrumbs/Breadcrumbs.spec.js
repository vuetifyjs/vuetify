import { test } from '~util/testing'
import Breadcrumbs from '~components/breadcrumbs/Breadcrumbs'
import BreadcrumbsItem from '~components/breadcrumbs/BreadcrumbsItem'
import { ripple } from '~directives/ripple'

BreadcrumbsItem.directives = {
  ripple
}

test('Breadcrumbs.js', ({ mount }) => {
  it('should have a breadcrumbs classes', () => {
    const wrapper = mount(Breadcrumbs, {
      propsData: { icons: true }
    })

    expect(wrapper.hasClass('breadcrumbs')).toBe(true)
    expect(wrapper.hasClass('breadcrumbs--with-icons')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should inject divider to children', () => {
    const wrapper = mount(Breadcrumbs, {
      slots: {
        default: [BreadcrumbsItem]
      }
    })

    const item = wrapper.find(BreadcrumbsItem)[0]
    expect(item.hasAttribute('data-divider', '/')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
