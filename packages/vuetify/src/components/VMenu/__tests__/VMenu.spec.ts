// Components
import VMenu from '../VMenu'
import VCard from '../../VCard/VCard'
import VListItem from '../../VList/VListItem'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'
import { keyCodes } from '../../../util/helpers'

describe('VMenu.ts', () => {
  type Instance = InstanceType<typeof VMenu>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VMenu, {
        // https://github.com/vuejs/vue-test-utils/issues/1130
        sync: false,
        ...options,
        mocks: {
          $vuetify: {
            theme: {},
          },
        },
      })
    }
  })

  it('should work', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: false,
        eager: true,
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

  it('should render multiple content nodes', async () => {
    const wrapper = mountFunction({
      propsData: {
        eager: true,
      },
      scopedSlots: {
        activator: '<button v-on="props.on"></button>',
      },
      slots: {
        default: '<span>foo</span><span>bar</span>',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should round dimensions', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: false,
        eager: true,
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
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should update position dynamically', async () => {
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
    expect(content.attributes('style')).toMatchSnapshot()

    wrapper.setProps({
      positionX: 110,
      positionY: 220,
    })
    expect(content.attributes('style')).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should select next and previous tiles and skip non links/disabled', () => {
    const wrapper = mountFunction({
      propsData: { eager: true },
      scopedSlots: {
        default () {
          return this.$createElement('div', [
            this.$createElement(VListItem, { props: { link: true } }),
            this.$createElement(VListItem, { props: { link: true } }),
            this.$createElement(VListItem),
            this.$createElement(VListItem, { props: { link: true } }),
          ])
        },
      },
    })

    wrapper.vm.getTiles()

    expect(wrapper.vm.listIndex).toBe(-1)

    wrapper.vm.nextTile()
    expect(wrapper.vm.listIndex).toBe(0)

    wrapper.vm.nextTile()
    expect(wrapper.vm.listIndex).toBe(1)

    wrapper.vm.nextTile()
    expect(wrapper.vm.listIndex).toBe(3)

    wrapper.vm.nextTile()
    expect(wrapper.vm.listIndex).toBe(0)

    wrapper.vm.prevTile()
    expect(wrapper.vm.listIndex).toBe(3)

    wrapper.vm.prevTile()
    expect(wrapper.vm.listIndex).toBe(1)

    wrapper.vm.prevTile()
    expect(wrapper.vm.listIndex).toBe(0)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should accept a custom role or use default', () => {
    expect(mountFunction({
      propsData: { eager: true },
    }).vm.$refs.content.getAttribute('role')).toBe('menu')
    expect(mountFunction({
      propsData: { eager: true },
      attrs: { role: 'listbox' },
    }).vm.$refs.content.getAttribute('role')).toBe('listbox')

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should select first or last item when opening menu with up or down key', async () => {
    const event = (keyCode: number) => new KeyboardEvent('keydown', { keyCode })
    const wrapper = mountFunction({
      propsData: { eager: true },
      scopedSlots: {
        default () {
          return this.$createElement('div', [
            this.$createElement(VListItem, { props: { link: true } }),
            this.$createElement(VListItem, { props: { link: true } }),
            this.$createElement(VListItem, { props: { link: true } }),
            this.$createElement(VListItem, { props: { link: true } }),
          ])
        },
      },
    })

    wrapper.vm.onKeyDown(event(keyCodes.up))
    expect(wrapper.vm.isActive).toBe(true)

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.listIndex).toBe(3)

    wrapper.setData({ isActive: false })

    wrapper.vm.onKeyDown(event(keyCodes.down))
    expect(wrapper.vm.isActive).toBe(true)

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.listIndex).toBe(0)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })
})
