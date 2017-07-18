import { mount } from 'avoriaz'
import Snackbar from '~components/snackbars/Snackbar'
import {
  SlideYTransition,
  SlideYReverseTransition
} from '~components/transitions'

Snackbar.components = {
  'v-slide-y-reverse-transition': SlideYReverseTransition,
  'v-slide-y-transition': SlideYTransition
}

describe('Snackbar.vue', () => {
  it('should have a snack class', () => {
    const wrapper = mount(Snackbar)

    expect(wrapper.hasClass('snack')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a snack__content class only when active', async () => {
    const wrapper = mount(Snackbar, {
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
