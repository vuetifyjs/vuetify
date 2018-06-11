import Vue from 'vue'
import Touch from '@/directives/touch'
import { test, touch } from '@/test'

test('touch.js', ({ mount }) => {
  function create(value) {
    return mount(Vue.component('test', {
      directives: { Touch },
      render: h => h('div', {
        directives: [{
          name: 'touch',
          value
        }]
      })
    }))
  }

  it('should call directive handlers', async () => {
    const down = jest.fn()
    touch(create({ down })).start(0, 0).end(0, 20)
    expect(down).toBeCalled()

    const up = jest.fn()
    touch(create({ up })).start(0, 0).end(0, -20)
    expect(up).toBeCalled()

    const left = jest.fn()
    touch(create({ left })).start(0, 0).end(-20, 0)
    expect(left).toBeCalled()

    const right = jest.fn()
    touch(create({ right })).start(0, 0).end(20, 0)
    expect(right).toBeCalled()

    const start = jest.fn()
    touch(create({ start })).start(0, 0)
    expect(start).toBeCalled()

    const move = jest.fn()
    touch(create({ move })).move(0, 0)
    expect(move).toBeCalled()

    const end = jest.fn()
    touch(create({ end })).end(0, 0)
    expect(end).toBeCalled()
  })

  it('should call directive handlers if not straight down/up/right/left', async () => {
    const nope = jest.fn()
    const down = jest.fn()
    touch(create({ down, right: nope })).start(0, 0).end(5, 20)
    expect(nope).not.toBeCalled()
    expect(down).toBeCalled()
  })

  it('should not call directive handlers if distance is too small ', async () => {
    const down = jest.fn()
    touch(create({ down })).start(0, 0).end(0, 10)
    expect(down).not.toBeCalled()

    const up = jest.fn()
    touch(create({ up })).start(0, 0).end(0, -10)
    expect(up).not.toBeCalled()

    const left = jest.fn()
    touch(create({ left })).start(0, 0).end(-10, 0)
    expect(left).not.toBeCalled()

    const right = jest.fn()
    touch(create({ right })).start(0, 0).end(10, 0)
    expect(right).not.toBeCalled()
  })

  it('should unbind', async () => {
    const start = jest.fn()
    const wrapper = create({ start })

    Touch.unbind(wrapper.element, { value: {} }, { context: wrapper.vm })

    touch(wrapper).start(0, 0)
    expect(start.mock.calls).toHaveLength(0)
  })
})
