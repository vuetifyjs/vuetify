import { test } from '~util/testing'
import VProgressLinear from './VProgressLinear'

test('VProgressLinear.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VProgressLinear, {
      propsData: {
        value: 33
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render indeterminate progress and match snapshot', () => {
    const wrapper = mount(VProgressLinear, {
      propsData: {
        indeterminate: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render indeterminate progress with query prop and match snapshot', () => {
    const wrapper = mount(VProgressLinear, {
      propsData: {
        indeterminate: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with buffer value and match snapshot', () => {
    const wrapper = mount(VProgressLinear, {
      propsData: {
        value: 33,
        bufferValue: 80
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with buffer value and value > buffer value and match snapshot', () => {
    const wrapper = mount(VProgressLinear, {
      propsData: {
        value: 90,
        bufferValue: 80
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

})
