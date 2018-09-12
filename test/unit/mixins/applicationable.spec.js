import Vue from 'vue'
import { test } from '@/test'
import Applicationable from '@/mixins/applicationable'

test('applicationable.js', ({ mount }) => {
  it('should update application on mount', async () => {
    const updateApplication = jest.fn()
    const wrapper = mount({
      mixins: [ Applicationable() ],
      methods: { updateApplication },
      render: h => h('div')
    })

    wrapper.setProps({ app: true })
    await wrapper.vm.$nextTick()
    expect(updateApplication.mock.calls).toHaveLength(1)
  })

  it('should update application on app prop change', async () => {
    const updateApplication = jest.fn()
    const removeApplication = jest.fn()
    const wrapper = mount({
      mixins: [ Applicationable() ],
      methods: { updateApplication, removeApplication },
      render: h => h('div')
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
    const wrapper = mount({
      data: () => ({
        foo: 1,
        bar: 2
      }),
      mixins: [ Applicationable(null, ['foo', 'bar']) ],
      render: h => h('div')
    })

    expect(wrapper.vm._watchers.length).toBe(6)
  })

  it('should call to remove application on destroy', async () => {
    const removeApplication = jest.fn()
    const wrapper = mount({
      mixins: [ Applicationable() ],
      methods: { removeApplication },
      render: h => h('div')
    })

    wrapper.setProps({ app: true })
    wrapper.destroy()
    await wrapper.vm.$nextTick()
    expect(removeApplication.mock.calls).toHaveLength(1)
  })

  it('should update application with dynamic property', async () => {
    const wrapper = mount({
      mixins: [ Applicationable() ],
      computed: {
        applicationProperty () {
          return 'top'
        }
      },
      methods: {
        updateApplication () {
          return 30
        }
      },
      render: h => h('div')
    })

    wrapper.setProps({ app: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$vuetify.application.top).toBe(30)
  })

  it('should remove designated value from application', async () => {
    const wrapper = mount({
      mixins: [ Applicationable('footer') ],
      methods: {
        updateApplication () {
          return 30
        }
      },
      render: h => h('div')
    })

    wrapper.setProps({ app: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$vuetify.application.footer).toBe(30)
    wrapper.vm.removeApplication()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$vuetify.application.footer).toBe(0)
  })
})
