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
  let mockHeight: jest.SpyInstance
  let mockWidth: jest.SpyInstance
  const elementHeight: number = 100
  const elementWidth: number = 300

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
      itemSize: 50,
      bench: 5,
    }

    // mock clientHeight
    mockHeight = jest.spyOn(window.HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(elementHeight)
    mockWidth = jest.spyOn(window.HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(elementWidth)
  })

  afterEach(() => {
    mockHeight.mockRestore()
    mockWidth.mockRestore()
  })

  it('should render component with scopedSlot and match snapshot', () => {
    const wrapper = mountFunction({
      propsData,
    })

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
        height: `${elementHeight}`,
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        itemSize: 50,
        bench: 5,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render right items on scroll and match snapshot', done => {
    const wrapper = mountFunction({
      propsData: {
        height: `${elementHeight}px`,
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        itemSize: 50,
        bench: 5,
      },
    })

    const evtPayload = new CustomEvent('scroll', { detail: { currentTarget: { scrollTop: 500 } } })
    wrapper.vm.onScroll(evtPayload.detail as unknown as Event) // can't make ts work here

    wrapper.vm.$nextTick(() => {
      expect(wrapper.html()).toMatchSnapshot()
      done()
    })
  })

  it('should render right items on scroll in horizontal mode and match snapshot', done => {
    const wrapper = mountFunction({
      propsData: {
        width: `${elementWidth}px`,
        horizontal: true,
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        itemSize: 150,
        bench: 5,
      },
    })

    const evtPayload = new CustomEvent('scroll', { detail: { currentTarget: { scrollLeft: 1500 } } })
    wrapper.vm.onScroll(evtPayload.detail as unknown as Event) // can't make ts work here

    wrapper.vm.$nextTick(() => {
      expect(wrapper.html()).toMatchSnapshot()
      done()
    })
  })
})
