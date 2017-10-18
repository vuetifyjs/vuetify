import { test } from '~util/testing'
import {
  VBreadcrumbs,
  VBreadcrumbsItem
} from '~components/VBreadcrumbs'

test('VBreadcrumbs.js', ({ mount }) => {
  it('should have breadcrumbs classes', () => {
    const wrapper = mount(VBreadcrumbs)

    expect(wrapper.hasClass('breadcrumbs')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  // TODO: Return to this
  it.skip('should inject slot to children', () => {
    const wrapper = mount(VBreadcrumbs, {
      attachToDocument: true,
      slots: {
        default: [
          VBreadcrumbsItem,
          VBreadcrumbsItem,
          VBreadcrumbsItem,
          VBreadcrumbsItem
        ]
      }
    })

    const item = wrapper.find('.breadcrumbs__divider')[0]
    // console.log(wrapper.html())
    // expect(item.html()).toBe('/')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
