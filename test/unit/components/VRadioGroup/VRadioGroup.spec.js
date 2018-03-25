import { test } from '@/test'
import { VRadioGroup, VRadio } from '@/components/VRadioGroup'

test('VRadioGroup.vue', ({ mount }) => {
  it('should render role on radio group', () => {
    const wrapper = mount(VRadioGroup)

    expect(wrapper.html()).toMatchSnapshot()

    const radioGroup = wrapper.find('.v-input--radio-group__input')[0]
    expect(radioGroup.getAttribute('role')).toBe('radiogroup')
  })

  // TODO: Test ability to toggle multiple data types

  it('should be in error when v-radio-group is', async () => {
    const wrapper = mount(VRadioGroup, {
      propsData: {
        error: false
      },
      slots: {
        default: [VRadio]
      }
    })

    const radio = wrapper.vm.radios[0]

    wrapper.setProps({ error: true })
    await wrapper.vm.$nextTick()
    expect(radio.parentError).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ error: false })
    await wrapper.vm.$nextTick()
    expect(radio.parentError).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
