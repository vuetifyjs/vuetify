import Routable from '../'
import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import Router from 'vue-router'
import Vue, { VNode } from 'vue'

describe('routable.ts', () => {
  let mountFunction: (options?: object) => Wrapper<Vue>
  let router: Router
  let localVue: typeof Vue

  beforeEach(() => {
    router = new Router()
    localVue = createLocalVue()
    localVue.use(Router)

    mountFunction = (options = {}) => {
      return mount({
        mixins: [Routable],
        props: {
          activeClass: {
            default: 'active',
          },
          exactActiveClass: {
            default: 'exact-active',
          },
        },
        render (h): VNode {
          const { tag, data } = this.generateRouteLink()

          data.attrs = {
            ...data.attrs,
          }
          data.on = {
            ...data.on,
          }

          return h(tag, data, this.$slots.default)
        },
      }, {
        localVue,
        router,
        ...options,
      })
    }
  })
  it('should generate exact route link with to="/" and undefined exact', async () => {
    const wrapper = mountFunction({
      propsData: {
        to: '/',
      },
    })

    expect(wrapper.vm.generateRouteLink().data.props.exact).toBe(true)
  })

  it('should reflect the link state to isActive', async () => {
    const wrapper = mountFunction({
      propsData: {
        to: '/',
      },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(true)

    // Simulate route changing
    wrapper.vm.$router.push('/foo')

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(false)

    wrapper.vm.$router.push('/')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(true)
  })

  it('should reflect the link state to isActive if not exact', async () => {
    const wrapper = mountFunction({
      propsData: {
        to: '/foo',
      },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(false)

    // Simulate route changing
    wrapper.vm.$router.push('/foo')

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(true)
  })
})
