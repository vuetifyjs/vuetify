import { ref } from 'vue'
import { mount } from '@vue/test-utils'

// Effects
import {
  makeScrollProps,
  useScroll,
} from '../scroll'
import type { ScrollArguments } from '../scroll'

// Utils
import {
  scrollElement,
  scrollWindow,
  wait,
} from '../../../test'

describe('scrollProps', () => {
  it('should allow setting default values', () => {
    const wrapper = mount({
      template: '<div />',
      props: makeScrollProps({
        scrollTarget: 'foo',
        scrollThreshold: 500,
      }),
    })

    expect(wrapper.props()).toStrictEqual({
      scrollTarget: 'foo',
      scrollThreshold: 500,
    })
  })
})

describe('useScroll', () => {
  function mountFunction (args?: ScrollArguments, options?: any) {
    return mount({
      props: makeScrollProps(),
      setup (props) {
        return useScroll(props, args)
      },
      template: '<div />',
    }, options)
  }

  beforeEach(() => {
    (window as any).pageYOffset = 0
    document.body.scrollTop = 0
  })

  it('should set isScrollingUp', async () => {
    const { vm } = mountFunction()

    await scrollWindow(1000)
    expect(vm.isScrollingUp).toBe(false)

    await scrollWindow(0)
    expect(vm.isScrollingUp).toBe(true)
  })

  it('should use a custom target', async () => {
    const thresholdMetCallback = jest.fn()
    mountFunction({ thresholdMetCallback }, {
      props: { scrollTarget: 'body', scrollThreshold: 300 },
    })

    await wait()
    expect(thresholdMetCallback).not.toHaveBeenCalled()

    await scrollElement(document.body, 1000)
    expect(thresholdMetCallback).toHaveBeenCalled()
  })

  it('should do nothing if !canScroll', async () => {
    const thresholdMetCallback = jest.fn()
    mountFunction({
      thresholdMetCallback,
      canScroll: ref(false),
    }, {
      props: { scrollTarget: 'body', scrollThreshold: 300 },
    })

    await wait()
    expect(thresholdMetCallback).not.toHaveBeenCalled()

    await scrollElement(document.body, 1000)
    expect(thresholdMetCallback).not.toHaveBeenCalled()
  })

  it('should do something if canScroll', async () => {
    const thresholdMetCallback = jest.fn()
    mountFunction({
      thresholdMetCallback,
      canScroll: ref(true),
    }, {
      props: { scrollTarget: 'body', scrollThreshold: 300 },
    })

    await wait()
    expect(thresholdMetCallback).not.toHaveBeenCalled()

    await scrollElement(document.body, 1000)
    expect(thresholdMetCallback).toHaveBeenCalled()
  })

  it('should reset savedScroll when isActive state changes', async () => {
    const { vm } = mountFunction()

    await scrollWindow(1000)
    expect(vm.savedScroll).toEqual(0)

    await scrollWindow(900)
    expect(vm.savedScroll).toEqual(900)

    vm.isScrollActive = true
    await wait()
    expect(vm.savedScroll).toEqual(0)
  })

  it(`should warn if target isn't present`, async () => {
    mountFunction(undefined, { props: { scrollTarget: '#test' } })

    await wait()
    expect('Unable to locate element with identifier #test').toHaveBeenTipped()
  })
})
