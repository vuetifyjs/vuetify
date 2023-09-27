// Directives
import Touch from '../'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { touch } from '@/../test'

// Types
import type { TouchValue } from '../'

describe('v-touch', () => {
  const mountFunction = (value: TouchValue): Element => {
    const wrapper = mount({
      directives: { Touch },
      props: {
        value: Object,
      },
      template: '<div class="test" v-touch="value" />',
    }, { props: { value } })

    return wrapper.element
  }

  it('should call directive handlers', () => {
    const down = jest.fn()
    touch(mountFunction({ down })).start(0, 0).end(0, 20)
    expect(down).toHaveBeenCalled()

    const up = jest.fn()
    touch(mountFunction({ up })).start(0, 0).end(0, -20)
    expect(up).toHaveBeenCalled()

    const left = jest.fn()
    touch(mountFunction({ left })).start(0, 0).end(-20, 0)
    expect(left).toHaveBeenCalled()

    const right = jest.fn()
    touch(mountFunction({ right })).start(0, 0).end(20, 0)
    expect(right).toHaveBeenCalled()

    const start = jest.fn()
    touch(mountFunction({ start })).start(0, 0)
    expect(start).toHaveBeenCalled()

    const move = jest.fn()
    touch(mountFunction({ move })).move(0, 0)
    expect(move).toHaveBeenCalled()

    const end = jest.fn()
    touch(mountFunction({ end })).end(0, 0)
    expect(end).toHaveBeenCalled()
  })

  it('should call directive handlers if not straight down/up/right/left', async () => {
    const nope = jest.fn()
    const down = jest.fn()
    touch(mountFunction({ down, right: nope })).start(0, 0).end(5, 20)
    expect(nope).not.toHaveBeenCalled()
    expect(down).toHaveBeenCalled()
  })

  it('should not call directive handlers if distance is too small', async () => {
    const down = jest.fn()
    touch(mountFunction({ down })).start(0, 0).end(0, 10)
    expect(down).not.toHaveBeenCalled()

    const up = jest.fn()
    touch(mountFunction({ up })).start(0, 0).end(0, -10)
    expect(up).not.toHaveBeenCalled()

    const left = jest.fn()
    touch(mountFunction({ left })).start(0, 0).end(-10, 0)
    expect(left).not.toHaveBeenCalled()

    const right = jest.fn()
    touch(mountFunction({ right })).start(0, 0).end(10, 0)
    expect(right).not.toHaveBeenCalled()
  })

  it('should unmount', async () => {
    const start = jest.fn()
    const wrapper = mount({
      directives: { Touch },
      props: {
        value: Object,
        bound: Boolean,
      },
      template: '<div v-if="bound" class="test" v-touch="value" /><div v-else class="test" />',
    }, {
      props: {
        value: { start },
        bound: true,
      },
    })
    const el = wrapper.element

    await nextTick()
    await wrapper.setProps({ bound: false })

    touch(el).start(0, 0)
    expect(start.mock.calls).toHaveLength(0)
  })
})
