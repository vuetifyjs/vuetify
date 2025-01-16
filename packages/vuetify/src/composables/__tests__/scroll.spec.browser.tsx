// Composables
import { makeScrollProps, useScroll } from '../scroll'

// Utilities
import { render, scroll, wait } from '@test'
import { defineComponent, reactive } from 'vue'

// Types
import type { UnwrapNestedRefs } from 'vue'
import type { ScrollProps } from '../scroll'

describe('useScroll', () => {
  function setup (props?: Partial<ScrollProps>) {
    let data!: UnwrapNestedRefs<ReturnType<typeof useScroll>>
    render(defineComponent({
      props: makeScrollProps(),
      setup (props) {
        data = reactive(useScroll(props))
        return () => <div style="height: 2000px" />
      },
    }), { props })
    return { data }
  }

  it('should set isScrollingUp', async () => {
    const { data } = setup()

    await scroll({ top: 1000 })
    expect(data.isScrollingUp).toBe(false)

    await scroll({ top: 0 })
    expect(data.isScrollingUp).toBe(true)
  })

  // it.skip('should use a custom target', async () => {
  //   const thresholdMetCallback = vi.fn()
  //   mountFunction({}, {
  //     props: { scrollTarget: 'body', scrollThreshold: 300 },
  //   })
  //
  //   await wait()
  //   expect(thresholdMetCallback).not.toHaveBeenCalled()
  //
  //   await scroll({ top: 1000 }, document.body)
  //   await expect.poll(() => thresholdMetCallback).toHaveBeenCalled()
  // })
  //
  // it.skip('should do nothing if !canScroll', async () => {
  //   const thresholdMetCallback = vi.fn()
  //   mountFunction({
  //     canScroll: ref(false),
  //   }, {
  //     props: { scrollTarget: 'body', scrollThreshold: 300 },
  //   })
  //
  //   await wait()
  //   expect(thresholdMetCallback).not.toHaveBeenCalled()
  //
  //   await scroll({ top: 1000 }, document.body)
  //   await expect.poll(() => thresholdMetCallback).not.toHaveBeenCalled()
  // })
  //
  // it.skip('should do something if canScroll', async () => {
  //   const thresholdMetCallback = vi.fn()
  //   mountFunction({
  //     canScroll: ref(true),
  //   }, {
  //     props: { scrollTarget: 'body', scrollThreshold: 300 },
  //   })
  //
  //   await wait()
  //   expect(thresholdMetCallback).not.toHaveBeenCalled()
  //
  //   await scroll({ top: 1000 }, document.body)
  //   await expect.poll(() => thresholdMetCallback).toHaveBeenCalled()
  // })

  it('should reset savedScroll when isActive state changes', async () => {
    const { data } = setup()

    await scroll({ top: 1000 })
    expect(data.savedScroll).toBe(0)

    await scroll({ top: 900 })
    expect(data.savedScroll).toBe(900)

    data.isScrollActive = true
    await wait()
    expect(data.savedScroll).toBe(0)
  })

  it(`should warn if target isn't present`, async () => {
    setup({ scrollTarget: '#test' })

    await wait()
    expect('Unable to locate element with identifier #test').toHaveBeenTipped()
  })
})
