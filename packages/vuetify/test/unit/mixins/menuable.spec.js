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

  it('should apply maxWidth in left calculations when offset', async () => {
    const wrapper = mount({
      mixins: [Menuable],
      props: {
        offsetY: Boolean,
        offsetX: Boolean
      },
      render: h => h('div')
    }, {
      propsData: {
        attach: true,
        left: true,
        offsetX: true,
        maxWidth: 200
      }
    })

    wrapper.setData({
      dimensions: {
        activator: { width: 300 },
        content: { width: 138 }
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.computedLeft).toBe(-200)
  })
})
