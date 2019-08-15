// Components
import VTab from '../VTab'
import VTabsBar from '../VTabsBar'

// Utilities
import {
  mount,
  RouterLinkStub,
  Wrapper,
} from '@vue/test-utils'

// Types
import { ExtractVue } from '../../../util/mixins'

describe('VTabsBar.ts', () => {
  type Instance = ExtractVue<typeof VTabsBar>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VTabsBar, {
        stubs: {
          RouterLink: RouterLinkStub,
        },
        mocks: {
          $vuetify: {
            breakpoint: {},
          },
        },
        ...options,
      })
    }
  })

  it('should render a tabs slider', async () => {
    const wrapper = mountFunction({
      propsData: { mandatory: true },
      slots: {
        default: [
          { render: h => h(VTab, { props: { to: '/foo' } }) },
          { render: h => h(VTab, { props: { to: '/bar' } }) },
        ],
      },
    })

    const route1 = { path: '/foo' }
    const route2 = { path: '/bar' }
    const route3 = { path: '/fizz' }

    expect(wrapper.vm.internalValue).toBe('/foo')

    wrapper.setProps({ mandatory: false })
    wrapper.vm.onRouteChange(route2, route1)

    expect(wrapper.vm.internalValue).toBe('/foo')

    wrapper.vm.onRouteChange(route3, route2)

    expect(wrapper.vm.internalValue).toBeUndefined()
  })
})
