import { test } from '@/test'
import VTabs from '@/components/VTabs'
import VTabItem from '@/components/VTabs/VTabItem'

const contentWarning = '[Vuetify] The v-tab-item component must be used inside a v-tabs-items'

test('VTabItem', ({ mount }) => {
  it('should unregister on destroy', async () => {
    const register = jest.fn()
    const unregister = jest.fn()
    const wrapper = mount({
      provide () {
        return {
          tabs: {
            register,
            unregister
          }
        }
      },
      render (h) {
        return h('div', [
          h(VTabItem, {
            props: { id: 'foo' }
          })
        ])
      }
    })

    await wrapper.vm.$nextTick()
    expect(register).toHaveBeenCalled()

    const content = wrapper.find(VTabItem)[0]
    content.destroy()
    await wrapper.vm.$nextTick()
    expect(unregister).toHaveBeenCalled()
  })

  it('should not wrap component in transition if false is used', () => {
    const wrapper = mount(VTabItem, {
      propsData: {
        id: 'foo',
        transition: false,
        reverseTransition: false
      }
    })

    expect(wrapper.vm.computedTransition).toBe(false)
    expect(contentWarning).toHaveBeenTipped()
  })

  it('should set transition to none of no transition', async () => {
    const wrapper = mount(VTabItem, {
      propsData: { id: 'foo' }
    })

    wrapper.vm.toggle('foo', false, false)
    expect(wrapper.vm.$el.style.transition).toBe('none')
    wrapper.vm.toggle('foo', false, true)
    expect(wrapper.vm.$el.style.transition).toBe(null)
    expect(contentWarning).toHaveBeenTipped()
  })

  it('should return reverse transition', () => {
    const wrapper = mount(VTabItem, {
      propsData: { id: 'foo' }
    })

    wrapper.setData({ reverse: true })
    expect(wrapper.vm.computedTransition).toBe('tab-reverse-transition')
    expect(contentWarning).toHaveBeenTipped()
  })
})
