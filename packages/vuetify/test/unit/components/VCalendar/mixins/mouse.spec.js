import { test } from '@/test'
import Mouse from '@/components/VCalendar/mixins/mouse'

const Mock = {
  mixins: [Mouse],
  render: h => h('div')
}

test('mouse.ts', ({ mount }) => {
  it('should generate mouse event handlers', async () => {
    const noop = e => e
    const wrapper = mount(Mock, {
      listeners: {
        click: noop
      }
    })

    expect(typeof wrapper.vm.getMouseEventHandlers({ click: { event: "click" } }, noop).click).toBe("function")
  })

  it('should generate default mouse event handlers', async () => {
    const noop = e => e
    const wrapper = mount(Mock, {
      listeners: {
        click: noop
      }
    })

    expect(typeof wrapper.vm.getDefaultMouseEventHandlers("", noop).click).toBe("function")
    expect(Object.keys(typeof wrapper.vm.getDefaultMouseEventHandlers("", noop)).length).toBe(6)
  })

  it('should emit events', async () => {
    const fn = jest.fn()
    const wrapper = mount(Mock, {
      listeners: {
        click: fn
      }
    })

    wrapper.vm.getMouseEventHandlers({ click: { event: "click" } }, fn).click()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should handle prevent modifier', async () => {
    const fn = jest.fn()
    const wrapper = mount(Mock, {
      listeners: {
        click: fn
      }
    })
    const event = { preventDefault: () => {} }
    const spy = jest.spyOn(event, 'preventDefault')

    wrapper.vm.getMouseEventHandlers({ click: { event: "click", prevent: true } }, fn).click(event)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should handle stop modifier', async () => {
    const fn = jest.fn()
    const wrapper = mount(Mock, {
      listeners: {
        click: fn
      }
    })
    const event = { stopPropagation: () => {} }
    const spy = jest.spyOn(event, 'stopPropagation')

    wrapper.vm.getMouseEventHandlers({ click: { event: "click", stop: true } }, fn).click(event)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
