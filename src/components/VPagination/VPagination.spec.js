import { test } from '~util/testing'
import VPagination from './VPagination'

test('VPagination.vue', ({ mount }) => {
  it('emits an event when next or previous is clicked', () => {
    const wrapper = mount(VPagination, {
      attachToDocument: true,
      propsData: {
        length: 5
      }
    })

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
})
