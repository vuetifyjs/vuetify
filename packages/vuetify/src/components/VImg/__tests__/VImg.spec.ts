// Components
import VImg from '../VImg'

// Utilities
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import * as framework from '@/framework'

function mountFunction (options: any = {}) {
  return mount(VImg, {
    ...options,
    propsData: {
      eager: true,
      ...options.propsData,
    },
  })
}

describe('VImg', () => {
  const LOAD_FAILURE_SRC = 'LOAD_FAILURE_SRC'
  const LOAD_SUCCESS_SRC = 'LOAD_SUCCESS_SRC'

  beforeEach(() => {
    jest.spyOn(framework, 'useVuetify').mockReturnValue({
      defaults: { global: {} },
    })
  })
  afterEach(() => {
    jest.spyOn(framework, 'useVuetify').mockRestore()
  })

  beforeAll(() => {
    jest.useFakeTimers()
    Object.defineProperty((global as any).Image.prototype, 'src', {
      get () {
        return this._currentSrc
      },
      set (src) {
        this._currentSrc = src
        if (src === LOAD_FAILURE_SRC) {
          setTimeout(() => {
            this.dispatchEvent(new ErrorEvent('error'))
          })
        } else {
          setTimeout(() => {
            this._naturalWidth = 1600
            this._naturalHeight = 900
            this.dispatchEvent(new Event('load', { bubbles: false }))
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

  it('should render a <picture>', async () => {
    const wrapper = mountFunction({
      propsData: { src: LOAD_SUCCESS_SRC },
      slots: {
        sources: () => h('source', { srcset: LOAD_SUCCESS_SRC + '.webp' }),
      },
    })

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
        placeholder: () => h('div', ['loading...']),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    jest.runOnlyPendingTimers()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit errors', () => {
    const error = jest.fn()
    mountFunction({
      propsData: {
        src: LOAD_FAILURE_SRC,
        onError: error,
      },
    })

    jest.runOnlyPendingTimers()

    expect(error).toHaveBeenCalledTimes(1)
    expect(error).toHaveBeenCalledWith(LOAD_FAILURE_SRC)
  })

  it('should display error slot', async () => {
    const wrapper = mountFunction({
      propsData: {
        src: LOAD_FAILURE_SRC,
      },
      slots: {
        error: () => h('div', 'Error loading image'),
      },
    })

    jest.runOnlyPendingTimers()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
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

    await wrapper.setProps({ src: `${LOAD_SUCCESS_SRC}-1` })

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

    await wrapper.setProps({ src: `${LOAD_SUCCESS_SRC}-1` })
    jest.runOnlyPendingTimers()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
