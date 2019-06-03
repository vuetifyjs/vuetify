import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import VCardText from '../VCardText'
import { ExtractVue } from '../../../util/mixins'

describe('VCardText.vue', () => {
  type Instance = ExtractVue<typeof VCardText>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VCardText, options)
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with slotted content', () => {
    const wrapper = mountFunction({
      slots: {
        default: '<span>default</span>',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
