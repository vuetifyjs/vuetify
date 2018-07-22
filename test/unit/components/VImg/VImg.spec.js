import { test } from '@/test'
import VImg from '@/components/VImg'

test('VImg', ({ mount }) => {
  const LOAD_FAILURE_SRC = 'LOAD_FAILURE_SRC'
  const LOAD_SUCCESS_SRC = 'LOAD_SUCCESS_SRC'

  beforeAll(() => {
    Object.defineProperty(global.Image.prototype, 'src', {
      set (src) {
        this.setAttribute('src', src)
        this._currentSrc = src
        if (src === LOAD_FAILURE_SRC) {
          setTimeout(() => this.onerror(new Error('mocked error')))
        } else {
          setTimeout(() => this.onload())
        }
      }
    })
    Object.defineProperty(global.Image.prototype, 'currentSrc', {
      get () {
        return this._currentSrc
      }
    })
  })

  it('should load', async () => {
    jest.useFakeTimers()
    const wrapper = mount(VImg, {
      propsData: { src: './image.png' }
    })

    expect(wrapper.html()).toMatchSnapshot()

    jest.runOnlyPendingTimers()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit errors', () => {
    jest.useFakeTimers()

    const wrapper = mount(VImg, {
      propsData: { src: LOAD_FAILURE_SRC }
    })

    const error = jest.fn()
    wrapper.vm.$on('error', error)

    jest.runOnlyPendingTimers()

    expect(error).toHaveBeenCalledTimes(1)
    expect(error).toHaveBeenCalledWith(LOAD_FAILURE_SRC)
    expect('Image load failed').toHaveBeenWarned()
  })

  it('should have aria attributes', () => {
    const wrapper = mount(VImg, {
      propsData: {
        src: LOAD_SUCCESS_SRC,
        alt: 'this is not a decorative image'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
