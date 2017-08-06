import VDialog from '~components/dialogs/VDialog'
import clickOutside from '~directives/click-outside'
import { test } from '~util/testing'

VDialog.directives = {
  clickOutside
}

test('VSpeedDial.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VDialog)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a disabled component and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a persistent component and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        persistent: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a fullscreen component and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        fullscreen: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a lazy component and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        lazy: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a scrollable component and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        scrollable: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom origin and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        origin: 'top right'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom width and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        width: 100
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom transition and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        transition: 'fade-transition'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
