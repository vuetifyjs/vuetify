// @ts-nocheck
/* eslint-disable */

// Components
// import VFeatureDiscovery from '../VFeatureDiscovery'
// import VCard from '../../VCard/VCard'
// import VListItem from '../../VList/VListItem'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'
// import { keyCodes } from '../../../util/helpers'
// import { waitAnimationFrame } from '../../../../test'

describe.skip('VFeatureDiscovery.ts', () => {
  type Instance = InstanceType<typeof VFeatureDiscovery>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VFeatureDiscovery, {
        // https://github.com/vuejs/vue-test-utils/issues/1130
        sync: false,
        ...options,
        mocks: {
          $vuetify: {
            theme: {},
          },
        },
      })
    }
  })

  it('should work', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: false,
        eager: true,
      },
      scopedSlots: {
        activator: '<button v-on="props.on"></button>',
      },
      slots: {
        default: [VCard],
      },
    })

    const activator = wrapper.find('button')
    const input = jest.fn()
    wrapper.vm.$on('input', input)
    activator.trigger('click')

    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenCalledWith(true)
    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

})
