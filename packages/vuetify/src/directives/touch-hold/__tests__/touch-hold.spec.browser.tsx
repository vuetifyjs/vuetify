// Directives
import vTouchHold from '../'

// Utilities
import { render, screen, wait } from '@test'
import { defineComponent, shallowRef } from 'vue'

function dispatch (type: string, target: Element, x = 50, y = 50) {
  const touch = new Touch({ identifier: 1, target, clientX: x, clientY: y })
  const event = new TouchEvent(type, {
    bubbles: true,
    cancelable: true,
    touches: type === 'touchend' ? [] : [touch],
    changedTouches: [touch],
  })
  target.dispatchEvent(event)
  return event
}

function setup (onRender?: () => void) {
  const handler = vi.fn()
  const count = shallowRef(0)
  const TestComponent = defineComponent({
    directives: { vTouchHold },
    setup () {
      return () => {
        onRender?.()
        return (
          <div data-testid="el" v-touch-hold={{ handler: (e: any) => handler(e), duration: 100 }} style="width: 100px; height: 100px">
            <span data-testid="inner">{ count.value }</span>
          </div>
        )
      }
    },
  })
  render(TestComponent)
  return { handler, el: screen.getByTestId('el'), inner: screen.getByTestId('inner'), count }
}

describe('v-touch-hold', () => {
  it('should call the handler after the duration and cancel the following click', async () => {
    const { handler, el, inner } = setup()

    dispatch('touchstart', inner, 20, 30)
    expect(el.style.getPropertyValue('user-select')).toBe('none')

    await expect.poll(() => handler).toHaveBeenCalledTimes(1)
    expect(handler.mock.calls[0][0]).toMatchObject({ target: el, clientX: 20, clientY: 30 })
    expect(dispatch('touchend', inner).defaultPrevented).toBe(true)

    await expect.poll(() => el.style.getPropertyValue('user-select')).toBe('')
  })

  it('should not call the handler when released or moved too early', async () => {
    const { handler, el, inner } = setup()

    dispatch('touchstart', inner)
    await wait(50)
    expect(dispatch('touchend', inner).defaultPrevented).toBe(false)
    await wait(100)

    dispatch('touchstart', inner, 50, 50)
    dispatch('touchmove', inner, 56, 56)
    dispatch('touchmove', inner, 62, 50)
    await wait(150)

    expect(handler).not.toHaveBeenCalled()
    expect(el.style.getPropertyValue('user-select')).toBe('')
  })

  it('should tolerate small movement', async () => {
    const { handler, inner } = setup()

    dispatch('touchstart', inner, 50, 50)
    dispatch('touchmove', inner, 56, 56)

    await expect.poll(() => handler).toHaveBeenCalledTimes(1)
  })

  it('should cancel when the touched node is removed before release', async () => {
    const { handler, inner } = setup()

    dispatch('touchstart', inner)
    inner.remove()
    dispatch('touchend', inner)
    await wait(150)

    expect(handler).not.toHaveBeenCalled()
  })

  it('should keep the press when re-rendered with an inline handler', async () => {
    const onRender = vi.fn()
    const { handler, inner, count } = setup(onRender)

    dispatch('touchstart', inner)
    count.value++

    await expect.poll(() => handler).toHaveBeenCalledTimes(1)
    expect(onRender).toHaveBeenCalledTimes(2)
  })

  it('should only call the innermost handler when nested', async () => {
    const outer = vi.fn()
    const inner = vi.fn()
    render(defineComponent({
      directives: { vTouchHold },
      setup: () => () => (
        <div v-touch-hold={{ handler: outer, duration: 100 }}>
          <div data-testid="inner" v-touch-hold={{ handler: inner, duration: 100 }}>inner</div>
        </div>
      ),
    }))

    dispatch('touchstart', screen.getByTestId('inner'))
    await wait(150)

    expect(inner).toHaveBeenCalledTimes(1)
    expect(outer).not.toHaveBeenCalled()
  })
})
