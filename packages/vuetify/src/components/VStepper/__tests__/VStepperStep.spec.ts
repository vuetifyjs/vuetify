import Vue from 'vue'

// Components
import VStepperStep from '../VStepperStep'

// Utilities
import {
  mount,
  Wrapper,
  MountOptions,
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
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

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

  it('should emit event and invoke stepClick when clicked', async () => {
    const stepClick = jest.fn()
    const click = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        editable: true,
      },
      provide: {
        stepClick,
      },
    })
    wrapper.vm.$on('click', click)

    wrapper.find('.v-stepper__step').trigger('click')
    expect(click).toHaveBeenCalledTimes(1)
    expect(stepClick).toHaveBeenCalledWith(wrapper.vm.step)

    expect(tip).toHaveBeenTipped()
  })

  it('should render', async () => {
    const wrapper = mountFunction({
      propsData: {
        step: 1,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(warning).toHaveBeenWarned()
    expect(tip).toHaveBeenTipped()
  })

  it('should render complete step', async () => {
    const wrapper = mountFunction({
      propsData: {
        complete: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(warning).toHaveBeenWarned()
    expect(tip).toHaveBeenTipped()
  })

  it('should render step with error', async () => {
    const wrapper = mountFunction({
      computed: {
        hasError: () => true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(warning).toHaveBeenWarned()
    expect(tip).toHaveBeenTipped()
  })

  it('should render editable step', async () => {
    const wrapper = mountFunction({
      propsData: {
        editable: true,
        complete: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(warning).toHaveBeenWarned()
    expect(tip).toHaveBeenTipped()
  })

  it('should toggle', async () => {
    const wrapper = mountFunction({
      propsData: {
        step: 3,
      },
    })

    wrapper.vm.toggle(1)
    expect(wrapper.vm.isActive).toBeFalsy()
    expect(wrapper.vm.isInactive).toBeTruthy()

    wrapper.vm.toggle(3)
    expect(wrapper.vm.isActive).toBeTruthy()
    expect(wrapper.vm.isInactive).toBeFalsy()

    wrapper.vm.toggle(5)
    expect(wrapper.vm.isActive).toBeFalsy()
    expect(wrapper.vm.isInactive).toBeFalsy()

    expect(warning).toHaveBeenWarned()
    expect(tip).toHaveBeenTipped()
  })
})
