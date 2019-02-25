import VBtn from '@/components/VBtn/VBtn'
import VCard from '@/components/VCard/VCard'
import VMenu from '@/components/VMenu/VMenu'
import { test } from '@/test'

test('VMenu.js', ({ mount, compileToFunctions, runAllTimers }) => {
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

    // TODO replace with jest fakeTimers when it will support requestAnimationFrame: https://github.com/facebook/jest/pull/7776
    // See https://github.com/vuetifyjs/vuetify/pull/6330#issuecomment-460083547 for details
    runAllTimers()
    await wrapper.vm.$nextTick()
    expect(content.getAttribute('style')).toMatchSnapshot()

    wrapper.setProps({
      positionX: 110,
      positionY: 220
    })
    runAllTimers()
    await wrapper.vm.$nextTick()
    expect(content.getAttribute('style')).toMatchSnapshot()

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })
})
