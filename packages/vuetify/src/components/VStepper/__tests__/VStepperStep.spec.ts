import Vue from 'vue'

// Components
import VStepperStep from '../VStepperStep'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

Vue.prototype.$vuetify = {
  icons: {
    values: {
      complete: 'mdi-check',
    },
  },
}

const tip = '[Vuetify] The v-stepper-step component must be used inside a v-stepper'
const warning = '[Vue warn]: Injection "stepClick" not found'

describe('VStepperStep.ts', () => {
  type Instance = InstanceType<typeof VStepperStep>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VStepperStep, {
        ...options,
      })
    }
  })

  it('should accept a custom color', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        color: 'pink',
        complete: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(warning).toHaveBeenWarned()
    expect(tip).toHaveBeenTipped()
  })

  it('should accept a custom css color', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        color: '#aabbcc',
        complete: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(warning).toHaveBeenWarned()
    expect(tip).toHaveBeenTipped()
  })
})
