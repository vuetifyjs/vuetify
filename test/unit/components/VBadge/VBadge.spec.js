import VBadge from '@/components/VBadge'
import { test } from '@/test'

test('VBadge.js', ({ mount, compileToFunctions }) => {
  it('should render component and match snapshot', async () => {
    const wrapper = mount(VBadge, {
      slots: {
        badge: [compileToFunctions('<span>content</span>')],
        default: [compileToFunctions('<span>element</span>')]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with with value=false and match snapshot', async () => {
    const wrapper = mount(VBadge, {
      propsData: {
        value: false
      },
      slots: {
        badge: [compileToFunctions('<span>content</span>')],
        default: [compileToFunctions('<span>element</span>')]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with bottom prop', () => {
    const wrapper = mount(VBadge, {
      propsData: {
        bottom: true
      }
    })

    expect(wrapper.classes()).toContain('v-badge--bottom')
  })

  it('should render component with left prop', () => {
    const wrapper = mount(VBadge, {
      propsData: {
        left: true
      }
    })

    expect(wrapper.classes()).toContain('v-badge--left')
  })

  it('should render component with overlap prop', () => {
    const wrapper = mount(VBadge, {
      propsData: {
        overlap: true
      }
    })

    expect(wrapper.classes()).toContain('v-badge--overlap')
  })

  it('should render component with color prop', () => {
    const wrapper = mount(VBadge, {
      propsData: {
        color: 'green lighten-1'
      },
      slots: {
        badge: [compileToFunctions('<span>content</span>')]
      }
    })

    const badge = wrapper.find('.v-badge__badge')
    expect(badge.classes()).toContain('green')
    expect(badge.classes()).toContain('lighten-1')
  })
})
