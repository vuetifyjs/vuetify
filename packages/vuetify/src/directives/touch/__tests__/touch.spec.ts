
// Libraries
import {
  defineComponent,
  withDirectives,
  h,
  createApp,
  DirectiveBinding
} from 'vue'

// Directives
import Touch from '../'

// Utilities
import { touch } from '../../../../test'

describe('touch.ts', () => {
  let mountFunction: (value?: object) => HTMLElement
  const el = document.createElement('div')

  beforeEach(() => {
    mountFunction = (value = {}) => {
      const Test = defineComponent(() => () => withDirectives(h('div', { class: 'test' }), [ [ Touch, value ] ]))
      const app = createApp()

      app.mount(Test, el)
      return el
    }
  })

  it('should call directive handlers', () => {
    const down = jest.fn()
    touch(mountFunction({ down }).querySelector('.test')).start(0, 0).end(0, 20)
    expect(down).toHaveBeenCalled()

    const up = jest.fn()
    touch(mountFunction({ up }).querySelector('.test')).start(0, 0).end(0, -20)
    expect(up).toHaveBeenCalled()

    const left = jest.fn()
    touch(mountFunction({ left }).querySelector('.test')).start(0, 0).end(-20, 0)
    expect(left).toHaveBeenCalled()

    const right = jest.fn()
    touch(mountFunction({ right }).querySelector('.test')).start(0, 0).end(20, 0)
    expect(right).toHaveBeenCalled()

    const start = jest.fn()
    touch(mountFunction({ start }).querySelector('.test')).start(0, 0)
    expect(start).toHaveBeenCalled()

    const move = jest.fn()
    touch(mountFunction({ move }).querySelector('.test')).move(0, 0)
    expect(move).toHaveBeenCalled()

    const end = jest.fn()
    touch(mountFunction({ end }).querySelector('.test')).end(0, 0)
    expect(end).toHaveBeenCalled()
  })

  it('should call directive handlers if not straight down/up/right/left', async () => {
    const nope = jest.fn()
    const down = jest.fn()
    touch(mountFunction({ down, right: nope }).querySelector('.test')).start(0, 0).end(5, 20)
    expect(nope).not.toHaveBeenCalled()
    expect(down).toHaveBeenCalled()
  })

  it('should not call directive handlers if distance is too small ', async () => {
    const down = jest.fn()
    touch(mountFunction({ down }).querySelector('.test')).start(0, 0).end(0, 10)
    expect(down).not.toHaveBeenCalled()

    const up = jest.fn()
    touch(mountFunction({ up }).querySelector('.test')).start(0, 0).end(0, -10)
    expect(up).not.toHaveBeenCalled()

    const left = jest.fn()
    touch(mountFunction({ left }).querySelector('.test')).start(0, 0).end(-10, 0)
    expect(left).not.toHaveBeenCalled()

    const right = jest.fn()
    touch(mountFunction({ right }).querySelector('.test')).start(0, 0).end(10, 0)
    expect(right).not.toHaveBeenCalled()
  })

  it('should unmount', async () => {
    const start = jest.fn()
    const el = mountFunction({ start }).querySelector('.test') as HTMLElement

    Touch.unmounted(el, { value: {} } as DirectiveBinding, h('div'), null)

    touch(el).start(0, 0)
    expect(start.mock.calls).toHaveLength(0)
  })
})
