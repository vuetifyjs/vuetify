import { test } from '@util/testing'
import VTabs from './VTabs'
import VTabsContent from './VTabsContent'

const contentWarning = 'The v-tabs-content component must be used inside a v-tabs.'

test('VTabsContent', ({ mount }) => {
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
          h(VTabsContent, {
            props: { id: 'foo' }
          })
        ])
      }
    })

    await wrapper.vm.$nextTick()
    expect(register).toHaveBeenCalled()
    
    const content = wrapper.find(VTabsContent)[0]
    content.destroy()
    await wrapper.vm.$nextTick()
    expect(unregister).toHaveBeenCalled()
  })

  it('should not wrap component in transition if false is used', () => {
    const wrapper = mount(VTabsContent, {
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
    const wrapper = mount(VTabsContent, {
      propsData: {
        id: 'foo'
      }
    })

    wrapper.vm.toggle('foo', false, false)
    expect(wrapper.vm.$el.style.transition).toBe('none')
    wrapper.vm.toggle('foo', false, true)
    expect(wrapper.vm.$el.style.transition).toBe(null)
    expect(contentWarning).toHaveBeenTipped()
  })
})
