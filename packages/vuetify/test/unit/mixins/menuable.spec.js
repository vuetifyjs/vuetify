import { test } from '@/test'
import Menuable from '@/mixins/menuable'
import VBtn from '@/components/VBtn'

test('menuable.js', ({ mount }) => {
  it('should bind custom activator', () => {
    const wrapper = mount({
      mixins: [Menuable],
      render: h => h('div')
    }, {
      attachToDocument: true,
      propsData: {
        activator: 'body'
      }
    })

    expect(wrapper.vm.getActivator()).toBeTruthy()
  })

  it('should update dimensions when activated', async () => {
    const sneakPeek = jest.fn()
    const wrapper = mount({
      mixins: [Menuable],
      methods: {
        sneakPeek
      },
      render: h => h('div')
    })

    wrapper.vm.updateDimensions()
    await wrapper.vm.$nextTick()
    expect(sneakPeek).toHaveBeenCalled()
  })
})
