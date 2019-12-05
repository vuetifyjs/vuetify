import intersectable from '../index'

import {
  mount,
  Wrapper,
} from '@vue/test-utils'
import { ComponentOptions } from 'vue'

describe('intersectable.ts', () => {
  let mountFunction: (options?: ComponentOptions<any>) => Wrapper<any>

  beforeEach(() => {
    mountFunction = (options?: ComponentOptions<any>) => {
      return mount({
        render: h => h('div'),
        ...options,
      })
    }
  })

  it('should call callbacks when element is intersected', () => {
    const callback = jest.fn()

    const wrapper = mountFunction({
      mixins: [intersectable({ onVisible: ['callback'] })],
      methods: { callback },
    })

    expect(callback).not.toHaveBeenCalled()

    wrapper.vm.onObserve([] as IntersectionObserverEntry[], null as any as IntersectionObserver, false)

    expect(callback).not.toHaveBeenCalled()

    wrapper.vm.onObserve([] as IntersectionObserverEntry[], null as any as IntersectionObserver, true)

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
