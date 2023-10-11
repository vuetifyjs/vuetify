import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import VCarouselItem from '../VCarouselItem'

const imageSrc = 'https://v2.vuetifyjs.com/static/doc-images/cards/sunshine.jpg'
const warning = '[Vuetify] The v-window-item component must be used inside a v-window'

describe('VCarouselItem.ts', () => {
  type Instance = InstanceType<typeof VCarouselItem>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VCarouselItem, options)
    }
  })

  it('should throw warning when not used inside v-carousel', () => {
    const wrapper = mountFunction({
      propsData: {
        src: imageSrc,
      },
    })

    expect(warning).toHaveBeenTipped()
  })
})
