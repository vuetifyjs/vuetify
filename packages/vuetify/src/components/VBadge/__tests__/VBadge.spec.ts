// Components
import VBadge from '../VBadge'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'
import { compileToFunctions } from 'vue-template-compiler'

// Types
import { ExtractVue } from '../../../util/mixins'

describe('VBadge.ts', () => {
  type Instance = ExtractVue<typeof VBadge>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VBadge, {
        mocks: {
          $vuetify: {
            lang: { t: (text = '') => text },
          },
        },
        ...options,
      })
    }
  })

  it('should render component and match snapshot', async () => {
    const wrapper = mountFunction({
      slots: {
        badge: [compileToFunctions('<span>content</span>')],
        default: [compileToFunctions('<span>element</span>')],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with with value=false and match snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: false,
      },
      slots: {
        badge: [compileToFunctions('<span>content</span>')],
        default: [compileToFunctions('<span>element</span>')],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with bottom prop', () => {
    const wrapper = mountFunction({
      propsData: {
        bottom: true,
      },
    })

    expect(wrapper.classes('v-badge--bottom')).toBeTruthy()
  })

  it('should render component with left prop', () => {
    const wrapper = mountFunction({
      propsData: {
        left: true,
      },
    })

    expect(wrapper.classes('v-badge--left')).toBeTruthy()
  })

  it('should render component with overlap prop', () => {
    const wrapper = mountFunction({
      propsData: {
        overlap: true,
      },
    })

    expect(wrapper.classes('v-badge--overlap')).toBeTruthy()
  })

  it('should render component with color prop', () => {
    const wrapper = mountFunction({
      propsData: {
        color: 'green lighten-1',
      },
      slots: {
        badge: [compileToFunctions('<span>content</span>')],
      },
    })

    const badge = wrapper.find('.v-badge__badge')
    expect(badge.classes('green')).toBeTruthy()
    expect(badge.classes('lighten-1')).toBeTruthy()
  })

  it('should render component with transition element', () => {
    const transitionStub = {
      name: 'transition',
      render: jest.fn(),
    }

    mountFunction({
      stubs: {
        transition: transitionStub,
      },
    })

    expect(transitionStub.render).toHaveBeenCalled()
  })

  it('should render component without transition element', () => {
    const transitionStub = {
      name: 'transition',
      render: jest.fn(),
    }

    mountFunction({
      propsData: {
        transition: '',
      },
      stubs: {
        transition: transitionStub,
      },
    })

    expect(transitionStub.render).not.toHaveBeenCalled()
  })
})
