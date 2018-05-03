import { test } from '@/test'
import VSelect from '@/components/VSelect/VSelect'
import VChip from '@/components/VChip'

test('VSelect', ({ mount, compileToFunctions }) => {
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.appendChild(app)

  // Inspired by https://github.com/vuetifyjs/vuetify/pull/1425 - Thanks @kevmo314
  it('should open the select when focused and enter, space, up or down are pressed', async () => {
    const wrapper = mount(VSelect)

    wrapper.trigger('mouseup')

    expect(wrapper.vm.isMenuActive).toBe(false)

    wrapper.setProps({ box: true })
    wrapper.trigger('mouseup')

    expect(wrapper.vm.isMenuActive).toBe(true)

    wrapper.setData({ isMenuActive: false })
    wrapper.setProps({ box: false, solo: true })
    wrapper.trigger('mouseup')

    expect(wrapper.vm.isMenuActive).toBe(true)

    wrapper.setData({ isMenuActive: false })
    wrapper.setProps({ solo: false, soloInverted: true })
    wrapper.trigger('mouseup')

    expect(wrapper.vm.isMenuActive).toBe(true)

    wrapper.setData({ isMenuActive: false })
    wrapper.setProps({ soloInverted: false, outline: true })
    wrapper.trigger('mouseup')

    expect(wrapper.vm.isMenuActive).toBe(true)
  })
})
