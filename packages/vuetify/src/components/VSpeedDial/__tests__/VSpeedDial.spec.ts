// Components
import VSpeedDial from '../VSpeedDial'
import VBtn from '../../VBtn/VBtn'
import VTooltip from '../../VTooltip/VTooltip'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'
import { compileToFunctions } from 'vue-template-compiler'

describe('VSpeedDial.ts', () => {
  type Instance = InstanceType<typeof VSpeedDial>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VSpeedDial, {
        ...options,
      })
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render active component and match snapshot', () => {
    const wrapper = mountFunction({
      slots: {
        default: [compileToFunctions('<span>test</span>')],
      },
      data: () => ({ isActive: true }),
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom direction and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        direction: 'right',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should activate on click', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.isActive).toBe(false)
    wrapper.trigger('click')
    expect(wrapper.vm.isActive).toBe(true)
  })

  it('should activate on hover', () => {
    const wrapper = mountFunction({
      propsData: {
        openOnHover: true,
      },
    })

    expect(wrapper.vm.isActive).toBe(false)
    wrapper.trigger('mouseenter')
    expect(wrapper.vm.isActive).toBe(true)
    wrapper.trigger('mouseleave')
    expect(wrapper.vm.isActive).toBe(false)
  })

  it('should wrap v-btn or v-tooltip component with div tag', () => {
    const wrapper = mount(VSpeedDial, {
      slots: {
        default: [VBtn, VTooltip],
      },
      data: () => ({ isActive: true }),
    })

    expect(wrapper.findAll('.v-speed-dial__list div button')).toHaveLength(1)
    expect(wrapper.findAll('.v-speed-dial__list div .v-tooltip')).toHaveLength(1)
  })
})
