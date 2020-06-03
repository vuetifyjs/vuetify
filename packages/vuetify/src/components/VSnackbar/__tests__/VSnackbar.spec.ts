// Components
import VSnackbar from '../VSnackbar'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VSnackbar.ts', () => {
  type Instance = InstanceType<typeof VSnackbar>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {} as MountOptions<Instance>) => {
      return mount(VSnackbar, {
        mocks: {
          $vuetify: {
            application: {
              bar: 24,
              bottom: 56,
              footer: 48,
              insetFooter: 32,
              left: 256,
              right: 256,
              top: 64,
            },
          },
        },
        ...options,
      })
    }
  })

  it.each([
    [{}, true],
    [{ text: true }, false],
    [{ outlined: true }, false],
    [{ light: true }, false],
  ])('should be dark when using %s', (propsData, expected: boolean) => {
    const wrapper = mountFunction({ propsData })

    expect(wrapper.vm.isDark).toBe(expected)
  })

  it.each([
    [undefined, undefined, undefined],
    [false, undefined, undefined],
    [true, '256px', '256px'],
  ])('should have app padding on the x-axis using %s', (app, left, right) => {
    const wrapper = mountFunction({
      propsData: { app },
    })

    expect(wrapper.vm.styles).toHaveProperty('paddingLeft', left)
    expect(wrapper.vm.styles).toHaveProperty('paddingRight', right)
  })

  it.each([
    [undefined, true],
    [false, true],
    [true, false],
  ])('should have app padding on the x-axis using %s', (absolute, expected: boolean) => {
    const wrapper = mountFunction({
      propsData: { absolute },
    })

    expect(Object.keys(wrapper.vm.styles).length > 0).toBe(expected)
  })

  it.each([
    [undefined, false],
    [false, false],
    [true, true],
  ])('should conditionally invoke setTimeout method using %s', (value, expected: boolean) => {
    const setTimeout = jest.fn()

    mountFunction({
      propsData: { value },
      methods: { setTimeout },
    })

    expect(setTimeout.mock.calls.length > 0).toBe(expected)
  })

  it.each([
    [undefined, false],
    [false, true],
  ])('should conditionally render transition content using %s', (transition, expected: boolean) => {
    const genContent = jest.fn()
    const genTransition = jest.fn()

    mountFunction({
      propsData: { transition },
      methods: {
        genTransition,
        genContent,
      },
    })

    expect(genContent.mock.calls.length > 0).toBe(expected)
    expect(genTransition.mock.calls.length > 0).toBe(!expected)
  })

  it.each([
    [undefined, false],
    [false, false],
    [true, true],
  ])('should conditionally invoke setTimeout method using %s', (value, expected) => {
    const setTimeout = jest.fn()

    mountFunction({
      propsData: { value },
      methods: { setTimeout },
    })

    expect(setTimeout.mock.calls.length > 0).toBe(expected)
  })

  it.each([
    [undefined, true],
    [100, true],
    [0, false],
    [-1, false],
  ])('should condtionally remove the snackbar when using a timeout value of %s', (timeout, expected) => {
    jest.useFakeTimers()
    const spy = jest.spyOn(window, 'setTimeout')

    mountFunction({
      propsData: {
        timeout,
        value: true,
      },
    })

    jest.runAllTimers()

    expect(spy.mock.calls.length > 0).toBe(expected)

    // TODO: remove in v3
    if (timeout === 0) {
      expect(`[Vuetify] [UPGRADE] 'timeout="0"' is deprecated, use '-1' instead.`).toHaveBeenTipped()
    }
  })
})
