import { mount } from 'avoriaz'
import VSnackbar from '~components/snackbars/VSnackbar'
import {
  VSlideYTransition,
  VSlideYReverseTransition
} from '~components/transitions'

VSnackbar.components = {
  VSlideYReverseTransition,
  VSlideYTransition
}

describe('VSnackbar.vue', () => {
  it('should have a snack class', () => {
    const wrapper = mount(VSnackbar)

    expect(wrapper.hasClass('snack')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a snack__content class only when active', async () => {
    const wrapper = mount(VSnackbar, {
      propsData: {
        value: false,
        timeout: 1000
      }
    })

    expect(wrapper.find('div .snack__content').length).toEqual(0)

    wrapper.setProps({ 'value': true })
    wrapper.update()

    await wrapper.vm.$nextTick()

    expect(wrapper.find('div .snack__content').length).toEqual(1)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
