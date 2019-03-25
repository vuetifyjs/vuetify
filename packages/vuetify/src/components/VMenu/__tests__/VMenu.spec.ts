// Components
import VMenu from '../VMenu'
import VBtn from '../../VBtn/VBtn'
import VCard from '../../VCard/VCard'

// Utilities
import { compileToFunctions } from 'vue-template-compiler'
import { rafPolyfill } from '../../../../test'
import {
  mount,
  Wrapper
} from '@vue/test-utils'

describe('VMenu.ts', () => {
  type Instance = InstanceType<typeof VMenu>
  let mountFunction: (options?: object) => Wrapper<Instance>

  rafPolyfill(window)

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VMenu, {
        ...options,
        mocks: {
          $vuetify: {
            theme: {}
          }
        }
      })
    }
  })
  // const wrapper = mountFunction()

  it('should work', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: false,
        fullWidth: true
      },
      slots: {
        activator: [VBtn],
        default: [VCard]
      }
    })

    const activator = wrapper.findAll('.v-menu__activator').at(0)
    const input = jest.fn()
    wrapper.vm.$on('input', input)
    activator.trigger('click')

    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenCalledWith(true)
    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should round dimensions', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: false
      },
      slots: {
        activator: [VBtn]
      }
    })

    const content = wrapper.findAll('.v-menu__content').at(0)

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

    expect(content.attributes('style')).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should not attach event handlers to the activator container if disabled', async () => {
    const wrapper = mountFunction({
      propsData: {
        disabled: true
      },
      slots: {
        activator: [compileToFunctions('<button></button>')]
      }
    })

    const activator = wrapper.find('.v-menu__activator')
    activator.trigger('click')

    expect(wrapper.vm.isActive).toBe(false)
  })

  it('should close menu when tab is pressed', async () => {
    const wrapper = mountFunction()

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
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should not close on tab if child is focused', async () => {
    const wrapper = mount({
      render: h => h('div', [
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
    const menu = wrapper.find({ name: 'v-menu', render: () => null })
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
    mountFunction({
      methods: { activate }
    })

    expect(activate).not.toHaveBeenCalled()

    mountFunction({
      propsData: { value: true },
      methods: { activate }
    })
    expect(activate).toHaveBeenCalled()
  })

  it('should update position dynamically', async () => {
    jest.useFakeTimers()
    const wrapper = mountFunction({
      propsData: {
        absolute: true,
        value: true,
        positionX: 100,
        positionY: 200
      }
    })

    const content = wrapper.findAll('.v-menu__content').at(0)

    // TODO replace with jest fakeTimers when it will support requestAnimationFrame: https://github.com/facebook/jest/pull/7776
    // See https://github.com/vuetifyjs/vuetify/pull/6330#issuecomment-460083547 for details
    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    expect(content.attributes('style')).toMatchSnapshot()

    wrapper.setProps({
      positionX: 110,
      positionY: 220
    })
    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    expect(content.attributes('style')).toMatchSnapshot()
  })
})
