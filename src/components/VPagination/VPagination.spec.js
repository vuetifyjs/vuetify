import { test } from '~util/testing'
import VPagination from './VPagination'

test('VPagination.vue', ({ mount }) => {
  it('emits an event when next or previous is clicked', async () => {
    jest.useFakeTimers()
    const wrapper = mount(VPagination, {
      propsData: {
        length: 5
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
})
