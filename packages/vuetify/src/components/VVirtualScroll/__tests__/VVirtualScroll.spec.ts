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
          default (item) {
            return this.$createElement('div', { class: 'item' }, item)
          },
        },
      })
    }
    propsData = {
      height: `${elementHeight}px`,
      items: [1, 2, 3],
      itemHeight: 50,
    }

    // mock clientHeight
    mock = jest.spyOn(window.HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(elementHeight)
  })

  afterEach(() => {
    mock.mockRestore()
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
        itemHeight: 50,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render right items on scroll and match snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        height: '100px',
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        itemHeight: 50,
      },
    })

    const evtPayload = new CustomEvent('scroll', { detail: { currentTarget: { scrollTop: 500 } } })
    wrapper.vm.onScroll(evtPayload.detail as unknown as Event) // can't make ts work here

    expect(wrapper.html()).toMatchSnapshot()
  })
})
