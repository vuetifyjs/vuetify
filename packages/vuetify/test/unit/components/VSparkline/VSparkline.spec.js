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

  it('should render component with string labels and match a snapshot', async () => {
    const wrapper = mount(VSparkline, {
      propsData: {
        showLabels: true,
        value: [1, 7, 42],
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      value: [
        {
          value: 2,
        },
        {
          value: 8,
        },
        {
          value: 43,
        },
      ]
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      labels: ['foo', 'bar', 'baz'],
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with bars and match a snapshot', async () => {
    const wrapper = mount(VSparkline, {
      propsData: {
        value: [1, 7, 42],
        type: "bar"
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with bars and gradient and match a snapshot', async () => {
    const wrapper = mount(VSparkline, {
      propsData: {
        value: [1, 7, 42],
        gradient: ['#000', 'red', 'rgba(80, 160, 240, 0.5)'],
        type: "bar"
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with bars and labels and match a snapshot', async () => {
    const wrapper = mount(VSparkline, {
      propsData: {
        value: [1, 7, 42],
        labels: ['Value 1', 'Value 2', 'Value 3'],
        type: "bar"
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with bars and auto-line-width and match a snapshot', async () => {
    const wrapper = mount(VSparkline, {
      propsData: {
        value: [1, 7, 42],
        type: "bar",
        autoLineWidth: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with bars and line width and match a snapshot', async () => {
    const wrapper = mount(VSparkline, {
      propsData: {
        value: [1, 7, 42],
        type: "bar",
        lineWidth: 8
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with bars and custom padding and match a snapshot', async () => {
    const wrapper = mount(VSparkline, {
      propsData: {
        value: [1, 7, 42],
        type: "bar",
        padding: 12
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with bars and auto-line-width with custom padding and match a snapshot', async () => {
    const wrapper = mount(VSparkline, {
      propsData: {
        value: [1, 7, 42],
        type: "bar",
        autoLineWidth: true,
        padding: 12
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with bars and custom label size and match a snapshot', async () => {
    const wrapper = mount(VSparkline, {
      propsData: {
        value: [1, 7, 42],
        labels: ['Value 1', 'Value 2', 'Value 3'],
        labelSize: 15,
        type: "bar"
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
