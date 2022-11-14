import {
  mount,
  Wrapper,
} from '@vue/test-utils'
import Applicationable from '../'
import { ComponentOptions } from 'vue'
import { Application } from '../../../services/application'

describe('applicationable.js', () => {
  let mountFunction: (options?: ComponentOptions<any>) => Wrapper<any>
  beforeEach(() => {
    mountFunction = (options?: ComponentOptions<any>) => {
      return mount({
        render: h => h('div'),
        ...options,
      }, {
        mocks: {
          $vuetify: {
            application: new Application(),
          },
        },
      })
    }
  })

  it('should update application on mount', async () => {
    const updateApplication = jest.fn()
    const wrapper = mountFunction({
      mixins: [Applicationable('left')],
      computed: {
        applicationProperty: () => 'left',
      },
      methods: { updateApplication },
    })

    wrapper.setProps({ app: true })
    await wrapper.vm.$nextTick()
    expect(updateApplication.mock.calls).toHaveLength(1)
  })

  it('should update application on app prop change', async () => {
    const updateApplication = jest.fn()
    const removeApplication = jest.fn()
    const wrapper = mountFunction({
      mixins: [Applicationable('left')],
      computed: {
        applicationProperty: () => 'left',
      },
      methods: { updateApplication, removeApplication },
    })

    wrapper.setProps({ app: true })
    await wrapper.vm.$nextTick()
    wrapper.setProps({ app: false })
    await wrapper.vm.$nextTick()
    wrapper.setProps({ app: true })
    await wrapper.vm.$nextTick()
    expect(updateApplication.mock.calls).toHaveLength(2)
    expect(removeApplication.mock.calls).toHaveLength(1)
  })

  it('should bind watchers passed through factory', () => {
    const wrapper = mountFunction({
      data: () => ({
        foo: 1,
        bar: 2,
      }),
      mixins: [Applicationable(null, ['foo', 'bar'])],
    })

    expect(wrapper.vm._scope.effects).toHaveLength(6)
  })

  it('should call to remove application on destroy', async () => {
    const removeApplication = jest.fn()
    const wrapper = mountFunction({
      mixins: [Applicationable('left')],
      computed: {
        applicationProperty: () => 'left',
      },
      methods: { removeApplication },
    })

    wrapper.setProps({ app: true })
    wrapper.destroy()
    await wrapper.vm.$nextTick()
    expect(removeApplication.mock.calls).toHaveLength(1)
  })

  it('should update application with dynamic property', async () => {
    const wrapper = mountFunction({
      mixins: [Applicationable('top')],
      computed: {
        applicationProperty () {
          return 'top'
        },
      },
      methods: {
        updateApplication () {
          return 30
        },
      },
    })

    wrapper.setProps({ app: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$vuetify.application.top).toBe(30)
  })

  it('should remove designated value from application', async () => {
    const wrapper = mountFunction({
      mixins: [Applicationable('footer')],
      methods: {
        updateApplication () {
          return 30
        },
      },
    })

    wrapper.setProps({ app: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$vuetify.application.footer).toBe(30)
    wrapper.vm.removeApplication()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$vuetify.application.footer).toBe(0)
  })
})
