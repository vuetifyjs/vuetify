// Components
import VPicker from '../VPicker'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'
import { compileToFunctions } from 'vue-template-compiler'

describe('VPicker.ts', () => {
  type Instance = InstanceType<typeof VPicker>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VPicker, {
        ...options,
      })
    }
  })

  it('should render component without title and match snapshot', () => {
    const wrapper = mountFunction({
      slots: {
        default: [compileToFunctions('<span>default</span>')],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with title and match snapshot', () => {
    const wrapper = mountFunction({
      slots: {
        default: [compileToFunctions('<span>default</span>')],
        title: [compileToFunctions('<span>title</span>')],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render flat component and match snapshot', () => {
    const wrapper = mountFunction({
      slots: {
        default: [compileToFunctions('<span>default</span>')],
        title: [compileToFunctions('<span>title</span>')],
      },
      props: {
        flat: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with elevation and match snapshot', () => {
    const wrapper = mountFunction({
      slots: {
        default: [compileToFunctions('<span>default</span>')],
        title: [compileToFunctions('<span>title</span>')],
      },
      props: {
        elevation: 15,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render dark component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        dark: true,
      },
      slots: {
        default: [compileToFunctions('<span>default</span>')],
        title: [compileToFunctions('<span>title</span>')],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render colored component', () => {
    const wrapper = mountFunction({
      propsData: {
        color: 'orange lighten-1',
      },
      slots: {
        title: [compileToFunctions('<span>title</span>')],
      },
    })

    const title = wrapper.find('.v-picker__title')
    expect(title.classes('orange')).toBe(true)
    expect(title.classes('lighten-1')).toBe(true)
  })
})
