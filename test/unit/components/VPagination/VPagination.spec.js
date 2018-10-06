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

    const navigation = wrapper.find('.v-pagination__navigation')
    navigation[0].trigger('click')
    navigation[1].trigger('click')

    expect(next).toBeCalled()
    expect(previous).toBeCalled()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component in RTL mode and match snapshot', async () => {
    jest.useFakeTimers()
    const wrapper = mount(VPagination, {
      propsData: {
        length: 5,
        value: 2
      }
    })
    wrapper.vm.$vuetify.rtl = true
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.vm.$vuetify.rtl = undefined
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

    const navigation = wrapper.find('.v-pagination__item')
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
    expect(wrapper.find('.v-pagination__more').length).toEqual(1)
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
    expect(wrapper.find('.v-pagination__more').length).toEqual(2)
  })

  it('should only render start of range if value is equals "left"', async () => {
    jest.useFakeTimers()
    const wrapper = mount(VPagination, {
      propsData: {
        length: 100,
        totalVisible: 5
      }
    })
    const maxLength = wrapper.vm.totalVisible
    const left = Math.floor(maxLength / 2)
    wrapper.setProps({ value: left })
    jest.runAllTimers()

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.v-pagination__more').length).toEqual(1)
  })

  it('should only render end of range if value is equals "right"', async () => {
    jest.useFakeTimers()
    const wrapper = mount(VPagination, {
      propsData: {
        length: 100,
        totalVisible: 5
      }
    })
    const maxLength = wrapper.vm.totalVisible
    const even = maxLength % 2 === 0 ? 1 : 0
    const left = Math.floor(maxLength / 2)
    const right = wrapper.vm.length - left + 1 + even
    wrapper.setProps({ value: right })
    jest.runAllTimers()

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.v-pagination__more').length).toEqual(1)
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
    expect(wrapper.find('.v-pagination__more').length).toEqual(2)
    expect(wrapper.find('.v-pagination__item').length).toEqual(8)
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

    const pagination = wrapper.first(VPagination.options)

    expect(pagination.vm.maxButtons).toBe(0)

    pagination.vm.onResize()

    expect(pagination.vm.maxButtons).toBe(-3)
  })
})
