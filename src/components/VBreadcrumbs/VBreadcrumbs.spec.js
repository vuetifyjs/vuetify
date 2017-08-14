import { test } from '~util/testing'
import {
  VBreadcrumbs,
  VBreadcrumbsItem
} from '~components/VBreadcrumbs'

test('VBreadcrumbs.js', ({ mount }) => {
  it('should have a breadcrumbs classes', () => {
    const wrapper = mount(VBreadcrumbs, {
      propsData: { icons: true }
    })

    expect(wrapper.hasClass('breadcrumbs')).toBe(true)
    expect(wrapper.hasClass('breadcrumbs--with-icons')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should inject divider to children', () => {
    const wrapper = mount(VBreadcrumbs, {
      slots: {
        default: [VBreadcrumbsItem]
      }
    })

    const item = wrapper.find(VBreadcrumbsItem)[0]
    expect(item.hasAttribute('data-divider', '/')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
