import VBtn from '@/components/VBtn/VBtn'
import VCard from '@/components/VCard/VCard'
import VMenu from '@/components/VMenu/VMenu'
import { test } from '@/test'

// TODO: Most of these have exactly the same snapshots
test('VMenu.js', ({ mount, compileToFunctions }) => {
  it('should work', async () => {
    const wrapper = mount(VMenu, {
      propsData: {
        value: false,
        fullWidth: true
      },
      slots: {
        activator: [VBtn],
        default: [VCard]
      }
    })

    const activator = wrapper.find('.v-menu__activator')[0]
    const input = jest.fn()
    wrapper.instance().$on('input', input)
    activator.trigger('click')

    await wrapper.vm.$nextTick()

    expect(input).toBeCalledWith(true)
    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom top and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        top: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom bottom and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        bottom: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom left and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        left: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom right and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        right: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom fullWidth and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        fullWidth: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom auto and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        auto: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom offsetX and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        offsetX: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom offsetY and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        offsetY: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom disabled and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom maxHeight and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        maxHeight: 100
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom nudgeTop and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        nudgeTop: 100
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom nudgeBottom and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        nudgeBottom: 100
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom nudgeLeft and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        nudgeLeft: 100
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom nudgeRight and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        nudgeRight: 100
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom nudgeWidth and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        nudgeWidth: 100
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom openOnClick and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        openOnClick: false
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom openOnHover and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        openOnHover: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom lazy and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        lazy: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom closeOnClick and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        closeOnClick: false
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom closeOnContentClick and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        closeOnContentClick: false
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom activator and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        activator: [VBtn]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom origin and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        origin: 'top right'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom transition and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        transition: 'fade-transition'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom positionX and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        positionX: 100
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom positionY and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        positionY: 100
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom absolute and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        absolute: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom maxWidth and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        maxWidth: 100
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom minWidth and match snapshot', () => {
    const wrapper = mount(VMenu, {
      propsData: {
        minWidth: 100
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should round dimensions', async () => {
    const wrapper = mount(VMenu, {
      propsData: {
        value: false
      },
      slots: {
        activator: [VBtn]
      }
    })

    const content = wrapper.find('.v-menu__content')[0]

    const getBoundingClientRect = () => {
      return {
        width: 100.5,
        height: 100.25,
        top: 0.75,
        left: 50.123,
        right: 75.987,
        bottom: 4,
        x: 0,
        y: 0
      }
    }

    wrapper.vm.$refs.activator.querySelector('.v-btn').getBoundingClientRect = getBoundingClientRect
    wrapper.vm.$refs.content.getBoundingClientRect = getBoundingClientRect

    wrapper.setProps({ value: true })

    await new Promise(resolve => requestAnimationFrame(resolve))

    expect(content.getAttribute('style')).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should not attach event handlers to the activator container if disabled', async () => {
    const wrapper = mount(VMenu, {
      propsData: {
        disabled: true,
      },
      slots: {
        activator: [compileToFunctions('<button></button>')]
      }
    })

    expect(Object.keys(wrapper.find('.v-menu__activator')[0].vNode.data.on)).toHaveLength(0)

    wrapper.setProps({ openOnHover: true })
    expect(Object.keys(wrapper.find('.v-menu__activator')[0].vNode.data.on)).toHaveLength(0)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should close menu when tab is pressed', async () => {
    const wrapper = mount(VMenu)

    wrapper.vm.isActive = true
    await wrapper.vm.$nextTick()
    wrapper.trigger(`keydown.tab`)
    await new Promise(resolve => setTimeout(resolve))
    expect(wrapper.vm.isActive).toBe(false)

    wrapper.setProps({ disableKeys: true })
    wrapper.vm.isActive = true
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(true)
    wrapper.trigger(`keydown.tab`)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(true)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  // TODO: figure out how to simulate tab focus
  it.skip('should not close on tab if child is focused', async () => {
    const wrapper = mount({
      render: h =>  h('div', [
        h(VMenu, {
          ref: 'menu',
          props: {
            value: true,
            attach: true
          }
        }, [h('input', { class: 'first' }), h('input', { class: 'second' })]),
        h('input', { class: 'third' })
      ])
    }, { attachToDocument: true })
    const menu = wrapper.first({ name: 'v-menu', render: () => null })
    const input = wrapper.find('input')

    input[0].element.focus()
    input[0].trigger('keydown.tab')
    await wrapper.vm.$nextTick()
    expect(menu.vm.isActive).toBe(true)
    expect(document.activeElement).toBe(input[1].element)

    input[1].trigger('keydown.tab')
    await wrapper.vm.$nextTick()
    expect(menu.vm.isActive).toBe(false)
    expect(document.activeElement).toBe(input[2].element)
  })

  it('should show the menu on mounted', () => {
    const activate = jest.fn()
    mount(VMenu, {
      methods: { activate }
    })

    expect(activate).not.toBeCalled()

    mount(VMenu, {
      propsData: { value: true },
      methods: { activate }
    })
    expect(activate).toBeCalled()

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should update position dynamically', async () => {
    const wrapper = mount(VMenu, {
      propsData: {
        absolute: true,
        value: true,
        positionX: 100,
        positionY: 200,
      }
    })

    const content = wrapper.find('.v-menu__content')[0]

    const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds))

    // TODO replace with jest fakeTimers when it will support requestAnimationFrame: https://github.com/facebook/jest/pull/7776
    // See https://github.com/vuetifyjs/vuetify/pull/6330#issuecomment-460083547 for details
    await sleep(50)
    expect(content.getAttribute('style')).toMatchSnapshot()

    wrapper.setProps({
      positionX: 110,
      positionY: 220
    })
    await sleep(50)
    expect(content.getAttribute('style')).toMatchSnapshot()

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })
})
