import { test } from '@/test'
import VPicker from '@/components/VPicker'

test('VPicker.js', ({ mount, compileToFunctions }) => {
  it('should render component without title and match snapshot', () => {
    const wrapper = mount(VPicker, {
      slots: {
        default: [compileToFunctions('<span>default</span>')]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with title and match snapshot', () => {
    const wrapper = mount(VPicker, {
      slots: {
        default: [compileToFunctions('<span>default</span>')],
        title: [compileToFunctions('<span>title</span>')]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render dark component and match snapshot', () => {
    const wrapper = mount(VPicker, {
      propsData: {
        dark: true,
      },
      slots: {
        default: [compileToFunctions('<span>default</span>')],
        title: [compileToFunctions('<span>title</span>')]
      }
  })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render colored component', () => {
    const wrapper = mount(VPicker, {
      propsData: {
        color: 'orange lighten-1',
      },
      slots: {
        title: [compileToFunctions('<span>title</span>')]
      }
  })

    const title = wrapper.find('.v-picker__title')[0]
    expect(title.hasClass('orange')).toBe(true)
    expect(title.hasClass('lighten-1')).toBe(true)
  })
})
