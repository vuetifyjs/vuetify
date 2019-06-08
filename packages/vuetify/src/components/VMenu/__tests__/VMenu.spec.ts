// Components
import VMenu from '../VMenu'
import VBtn from '../../VBtn/VBtn'
import VCard from '../../VCard/VCard'

// Utilities
import { compileToFunctions } from 'vue-template-compiler'
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VMenu.ts', () => {
  type Instance = InstanceType<typeof VMenu>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VMenu, {
        ...options,
        mocks: {
          $vuetify: {
            theme: {},
          },
        },
      })
    }
  })
  // const wrapper = mountFunction()

  it('should work', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: false,
        fullWidth: true,
      },
      scopedSlots: {
        activator: '<button v-on="props.on"></button>',
      },
      slots: {
        default: [VCard],
      },
    })

    const activator = wrapper.find('button')
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
        value: false,
      },
      scopedSlots: {
        activator: '<button v-on="props.on"></button>',
      },
      slots: {
        default: '<span class="content"></span>',
      },
    })

    const content = wrapper.find('.v-menu__content')

    const getBoundingClientRect = () => {
      return {
        width: 100.5,
        height: 100.25,
        top: 0.75,
        left: 50.123,
        right: 75.987,
        bottom: 4,
        x: 0,
        y: 0,
      }
    }

    wrapper.find('button').element.getBoundingClientRect = getBoundingClientRect
    wrapper.vm.$refs.content.getBoundingClientRect = getBoundingClientRect

    wrapper.setProps({ value: true })

    await new Promise(resolve => requestAnimationFrame(resolve))

    expect(content.attributes('style')).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should not attach event handlers to the activator container if disabled', async () => {
    const wrapper = mountFunction({
      propsData: {
        disabled: true,
      },
      scopedSlots: {
        activator: '<button v-on="props.on"></button>',
      },
    })

    const activator = wrapper.find('button')
    activator.trigger('click')

    expect(wrapper.vm.isActive).toBe(false)
  })

  it('should show the menu on mounted', () => {
    const activate = jest.fn()
    mountFunction({
      methods: { activate },
    })

    expect(activate).not.toHaveBeenCalled()

    mountFunction({
      propsData: { value: true },
      methods: { activate },
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
        positionY: 200,
      },
    })

    const content = wrapper.findAll('.v-menu__content').at(0)

    // TODO replace with jest fakeTimers when it will support requestAnimationFrame: https://github.com/facebook/jest/pull/7776
    // See https://github.com/vuetifyjs/vuetify/pull/6330#issuecomment-460083547 for details
    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    expect(content.attributes('style')).toMatchSnapshot()

    wrapper.setProps({
      positionX: 110,
      positionY: 220,
    })
    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    expect(content.attributes('style')).toMatchSnapshot()
  })
})
