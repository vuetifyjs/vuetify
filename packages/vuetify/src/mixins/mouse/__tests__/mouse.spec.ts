import Mouse from '../index'

import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import { ExtractVue } from '../../../util/mixins'

const Mock = Mouse.extend({
  render: h => h('div'),
})

describe('mouse.ts', () => {
  type Instance = ExtractVue<typeof Mock>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(Mock, options)
    }
  })

  it('should generate mouse event handlers', async () => {
    const noop = e => e
    const wrapper = mount(Mock, {
      listeners: {
        click: noop,
      },
    })

    expect(typeof wrapper.vm.getMouseEventHandlers({ click: { event: 'click' } }, noop).click).toBe('function')
  })

  it('should generate default mouse event handlers', async () => {
    const noop = e => e
    const wrapper = mount(Mock, {
      listeners: {
        'click:foo': noop,
      },
    })

    expect(typeof wrapper.vm.getDefaultMouseEventHandlers(':foo', noop).click).toBe('function')
    expect(Object.keys(typeof wrapper.vm.getDefaultMouseEventHandlers('', noop))).toHaveLength(6)
  })

  it('should emit events', async () => {
    const fn = jest.fn()
    const wrapper = mount(Mock, {
      listeners: {
        click: fn,
      },
    })

    const { click } = wrapper.vm.getMouseEventHandlers({ click: { event: 'click' } }, () => {})
    Array.isArray(click) ? click[0](null) : click(null)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should handle prevent modifier', async () => {
    const fn = jest.fn()
    const wrapper = mount(Mock, {
      listeners: {
        click: fn,
      },
    })
    const event = { preventDefault: () => {} }
    const spy = jest.spyOn(event, 'preventDefault')

    const { click } = wrapper.vm.getMouseEventHandlers({ click: { event: 'click', prevent: true } }, () => {})
    Array.isArray(click) ? click[0](event as MouseEvent) : click(event as MouseEvent)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should handle stop modifier', async () => {
    const fn = jest.fn()
    const wrapper = mount(Mock, {
      listeners: {
        click: fn,
      },
    })
    const event = { stopPropagation: () => {} }
    const spy = jest.spyOn(event, 'stopPropagation')

    const { click } = wrapper.vm.getMouseEventHandlers({ click: { event: 'click', stop: true } }, () => {})
    Array.isArray(click) ? click[0](event as MouseEvent) : click(event as MouseEvent)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
