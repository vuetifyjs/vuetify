// Component
import VVirtualScroll from '../VVirtualScroll'

// Utilities
import {
  shallowMount,
  Wrapper,
} from '@vue/test-utils'

describe('VVirtualScroll.ts', () => {
  type Instance = InstanceType<typeof VVirtualScroll>
  let mountFunction: (options?: object) => Wrapper<Instance>
  let propsData: Object
  let mock: jest.SpyInstance
  const elementHeight: number = 100

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return shallowMount(VVirtualScroll, {
        ...options,
        scopedSlots: {
          default ({ item }) {
            return this.$createElement('div', { class: 'item' }, item)
          },
        },
      })
    }
    propsData = {
      height: elementHeight,
      items: [1, 2, 3],
      itemHeight: 50,
    }

    // mock clientHeight
    mock = jest.spyOn(window.HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(elementHeight)
  })

  afterEach(() => {
    mock.mockRestore()
  })

  it('should render component with scopedSlot and match snapshot', async () => {
    const wrapper = mountFunction({
      propsData,
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should set height of scrollable element', () => {
    const wrapper = mountFunction({
      propsData,
    })

    const scrollable = wrapper.find('.v-virtual-scroll__container')
    expect(scrollable.element.style.height).toEqual('150px')
  })

  it('should render not more than 5 hidden items and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        height: elementHeight,
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        itemHeight: 50,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render right items on scroll and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        height: elementHeight,
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        itemHeight: 50,
      },
    })

    wrapper.vm.scrollTop = 500
    wrapper.trigger('scroll')

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should provide the correct item index', () => {
    const helpers = require('../../../util/helpers')
    const spy = jest.spyOn(helpers, 'getSlot')
    const wrapper = mountFunction({
      propsData,
      computed: { firstToRender: () => 2 },
    })

    wrapper.setData({ first: 2 })

    wrapper.vm.genChild(0, 1)

    expect(spy.mock.calls[0][2]).toEqual({
      item: 0,
      index: 3,
    })
  })
})
