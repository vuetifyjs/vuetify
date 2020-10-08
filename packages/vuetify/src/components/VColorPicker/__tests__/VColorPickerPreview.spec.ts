import VColorPickerPreview from '../VColorPickerPreview'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import { fromRGBA } from '../util'

describe('VColorPickerPreview.ts', () => {
  type Instance = InstanceType<typeof VColorPickerPreview>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VColorPickerPreview, {
        ...options,
        mocks: {
          $vuetify: {
            rtl: false,
          },
        },
      })
    }
  })

  it('should emit event when hue changes', async () => {
    const warn = console.warn
    console.warn = () => {}

    const update = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        color: fromRGBA({ r: 0, g: 0, b: 0, a: 0 }),
      },
      listeners: {
        'update:color': update,
      },
    })

    const slider = wrapper.find('.v-slider__thumb-container')

    slider.trigger('keydown.right')
    await wrapper.vm.$nextTick()
    expect(update).toHaveBeenCalledTimes(1)
    expect(update.mock.calls[0][0].hue).toBe(1)

    console.warn = warn
  })

  it('should emit event when alpha changes', async () => {
    const warn = console.warn
    console.warn = () => {}

    const update = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        color: fromRGBA({ r: 0, g: 0, b: 0, a: 0 }),
      },
      listeners: {
        'update:color': update,
      },
    })

    const slider = wrapper.findAll('.v-slider__thumb-container').at(1)

    slider.trigger('keydown.right')
    await wrapper.vm.$nextTick()
    expect(update).toHaveBeenCalledTimes(1)
    expect(update.mock.calls[0][0].alpha).toBe(1)

    console.warn = warn
  })
})
