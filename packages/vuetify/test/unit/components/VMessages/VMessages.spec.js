import VMessages from '@/components/VMessages'
import { test } from '@/test'

test('VMessages.js', ({ mount }) => {
  it('should have a default array', () => {
    const wrapper = mount(VMessages)

    expect(Array.isArray(wrapper.vm.value)).toBe(true)
  })

  it('should show messages', async () => {
    const wrapper = mount(VMessages, {
      propsData: {
        value: ['foo', 'bar']
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ value: [] })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should allow HTML', () => {
    const wrapper = mount(VMessages, {
      propsData: {
        value: ['<a href="#">a link</a>']
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
