import { test } from '@/test'
import VSparkline from '@/components/VSparkline'

test('VSparkline.vue', ({ mount }) => {
  it('should render component and match a snapshot', async () => {
    const wrapper = mount(VSparkline, {
      propsData: {
        value: [1, 7, 42]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with padding and match a snapshot', async () => {
    const wrapper = mount(VSparkline, {
      propsData: {
        value: [1, 7, 42],
        padding: 20
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render smooth component and match a snapshot', async () => {
    const wrapper = mount(VSparkline, {
      propsData: {
        value: [1, 7, 42],
        smooth: 20
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with line width and match a snapshot', async () => {
    const wrapper = mount(VSparkline, {
      propsData: {
        value: [1, 7, 42],
        lineWidth: 42
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with gradient and match a snapshot', async () => {
    const wrapper = mount(VSparkline, {
      propsData: {
        value: [1, 7, 42],
        gradient: ['#000', 'red', 'rgba(80, 160, 240, 0.5)']
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
