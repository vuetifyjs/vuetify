import VDialog from '~components/VDialog'
import { test } from '~util/testing'

test('VDialog.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VDialog)

    expect(wrapper.html()).toMatchSnapshot()
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should render a disabled component and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should render a persistent component and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        persistent: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should render a fullscreen component and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        fullscreen: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should render a lazy component and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        lazy: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should render a scrollable component and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        scrollable: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should render component with custom origin and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        origin: 'top right'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should render component with custom width and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        width: 100
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should render component with custom transition and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        transition: 'fade-transition'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })
})
