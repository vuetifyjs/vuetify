// Components
import VImg from '../VImg'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VImg.ts', () => {
  type Instance = InstanceType<typeof VImg>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VImg, {
        ...options,
        propsData: {
          eager: true,
          ...options.propsData,
        },
      })
    }
  })

  const LOAD_FAILURE_SRC = 'LOAD_FAILURE_SRC'
  const LOAD_SUCCESS_SRC = 'LOAD_SUCCESS_SRC'

  beforeAll(() => {
    jest.useFakeTimers()
    Object.defineProperty((global as any).Image.prototype, 'src', {
      get () {},
      set (src) {
        this._currentSrc = src
        if (src === LOAD_FAILURE_SRC) {
          setTimeout(() => this.onerror && this.onerror(new Error('mocked error')))
        } else {
          setTimeout(() => {
            this._naturalWidth = 1600
            this._naturalHeight = 900
            this.onload && this.onload()
          })
        }
      },
    })
    Object.defineProperty((global as any).Image.prototype, 'currentSrc', {
      get () {
        return this._currentSrc
      },
    })
    Object.defineProperty((global as any).Image.prototype, 'naturalWidth', {
      get () { return this._naturalWidth },
    })
    Object.defineProperty((global as any).Image.prototype, 'naturalHeight', {
      get () { return this._naturalHeight },
    })
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should load', async () => {
    const wrapper = mountFunction({
      propsData: { src: LOAD_SUCCESS_SRC },
    })

    expect(wrapper.html()).toMatchSnapshot()

    jest.runOnlyPendingTimers()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should display placeholders', async () => {
    const wrapper = mountFunction({
      propsData: {
        src: 'full_src',
        lazySrc: 'lazy_src',
      },
      slots: {
        placeholder: { render: h => h('div', ['loading...']) },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    jest.runOnlyPendingTimers()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit errors', () => {
    const wrapper = mountFunction({
      propsData: {
        src: LOAD_FAILURE_SRC,
      },
    })

    const error = jest.fn()
    wrapper.vm.$on('error', error)

    jest.runOnlyPendingTimers()

    expect(error).toHaveBeenCalledTimes(1)
    expect(error).toHaveBeenCalledWith(LOAD_FAILURE_SRC)
  })

  it('should have aria attributes', async () => {
    const wrapper = mountFunction({
      propsData: {
        src: LOAD_SUCCESS_SRC,
        alt: 'this is not a decorative image',
      },
    })

    jest.runOnlyPendingTimers()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should use vuetify-loader data', async () => {
    const wrapper = mountFunction({
      propsData: {
        src: {
          src: LOAD_SUCCESS_SRC,
          lazySrc: 'lazySrc_auto',
          aspect: 1,
        },
      },
    })

    jest.runOnlyPendingTimers()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should override vuetify-loader values', async () => {
    const wrapper = mountFunction({
      propsData: {
        src: {
          src: LOAD_SUCCESS_SRC,
          lazySrc: 'lazySrc_auto',
          aspect: 1,
        },
        lazySrc: 'lazySrc_manual',
        aspectRatio: 2,
      },
    })

    jest.runOnlyPendingTimers()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should update src', async () => {
    const wrapper = mountFunction({
      propsData: {
        src: LOAD_SUCCESS_SRC,
      },
    })

    jest.runOnlyPendingTimers()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ src: LOAD_SUCCESS_SRC + 1 })

    jest.runOnlyPendingTimers()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should update src while still loading', async () => {
    const wrapper = mountFunction({
      propsData: {
        src: LOAD_SUCCESS_SRC,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ src: LOAD_SUCCESS_SRC + 1 })

    jest.runOnlyPendingTimers()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
