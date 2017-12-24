import { test } from '@/util/testing'
import VTabsItems from './VTabsItems'

test('VTabsItems', ({ mount }) => {
  it('should call next and previous', () => {
    const next = jest.fn()
    const prev = jest.fn()
    const wrapper = mount({
      provide: {
        next,
        prev
      },
      render (h) {
        return h('div', this.$slots.default)
      }
    }, {
      slots: {
        default: [VTabsItems]
      }
    })

    const items = wrapper.find(VTabsItems)[0]

    items.vm.onSwipe('next')
    items.vm.onSwipe('prev')

    expect(next).toHaveBeenCalled()
    expect(prev).toHaveBeenCalled()
  })
})
