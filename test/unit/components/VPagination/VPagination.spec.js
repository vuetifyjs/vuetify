import { test } from '@/test'
import VPagination from '@/components/VPagination'

test('VPagination.vue', ({ mount }) => {
  it('emits an event when next or previous is clicked', async () => {
    jest.useFakeTimers()
    const wrapper = mount(VPagination, {
      propsData: {
        length: 5,
        value: 2
      }
    })
    jest.runAllTimers()

    await wrapper.vm.$nextTick()

    const previous = jest.fn()
    const next = jest.fn()

    wrapper.instance().$on('previous', previous)
    wrapper.instance().$on('next', next)

    const navigation = wrapper.find('.pagination__navigation')
    navigation[0].trigger('click')
    navigation[1].trigger('click')

    expect(next).toBeCalled()
    expect(previous).toBeCalled()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('emits an event when pagination item is clicked', async () => {
    jest.useFakeTimers()
    const wrapper = mount(VPagination, {
      propsData: {
        length: 5,
        value: 2
      }
    })
    jest.runAllTimers()

    await wrapper.vm.$nextTick()

    const cb = jest.fn()

    wrapper.instance().$on('input', cb)

    const navigation = wrapper.find('.pagination__item')
    navigation[1].trigger('click')

    expect(cb).toBeCalledWith(2)
  })

  it('should render disabled buttons with length equals to 0', async () => {
    jest.useFakeTimers()
    const wrapper = mount(VPagination, {
      propsData: {
        length: 0,
        value: 1
      }
    })
    jest.runAllTimers()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should watch the value', async () => {
    jest.useFakeTimers()
    const wrapper = mount(VPagination, {
      propsData: {
        length: 5,
        value: 1
      }
    })

    jest.runAllTimers()
    expect(wrapper.vm.selected).toBe(1)

    wrapper.setProps({ value: 2 })
    jest.runAllTimers()
    expect(wrapper.vm.selected).toBe(2)
  })

  it('should only render start and end of range if length is big', async () => {
    jest.useFakeTimers()
    const wrapper = mount(VPagination, {
      propsData: {
        length: 100
      }
    })
    jest.runAllTimers()

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.pagination__more').length).toEqual(1)
  })

  it('should only render middle of range if length is big and value is somewhere in the middle', async () => {
    jest.useFakeTimers()
    const wrapper = mount(VPagination, {
      propsData: {
        length: 100,
        value: 50
      }
    })
    jest.runAllTimers()

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.pagination__more').length).toEqual(2)
  })

  it('should use totalVisible prop if defined', async () => {
    jest.useFakeTimers()
    const wrapper = mount(VPagination, {
      propsData: {
        length: 100,
        value: 50,
        totalVisible: 10
      }
    })
    jest.runAllTimers()

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.pagination__more').length).toEqual(2)
    expect(wrapper.find('.pagination__item').length).toEqual(8)
  })

  it('should set from to 1 if <= 0', () => {
    const wrapper = mount(VPagination)

    expect(wrapper.vm.range(1, 2)).toEqual([1, 2])
    expect(wrapper.vm.range(0, 2)).toEqual([1, 2])
  })

  // Since we have no DOM access, test the expected outcome
  // even if it's not real world, so that we can detect changes
  it('should use parents width for on resize calculation', () => {
    const wrapper = mount({
      functional: true,
      render: h => h('div', [h(VPagination)])
    })

    const pagination = wrapper.first(VPagination)

    expect(pagination.vm.maxButtons).toBe(0)

    pagination.vm.onResize()

    expect(pagination.vm.maxButtons).toBe(-3)
  })
})
