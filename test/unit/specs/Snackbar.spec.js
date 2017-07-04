import { mount } from 'avoriaz'
import { createRenderer } from 'vue-server-renderer'
import Vue from 'vue/dist/vue.common'
import Snackbar from 'src/components/snackbars/Snackbar'
import Transitions from 'src/components/transitions/_index'

Snackbar.components = {
  'v-slide-y-reverse-transition': Transitions.SlideYReverseTransition,
  'v-slide-y-transition': Transitions.SlideYTransition
}

describe('Snackbar.vue', () => {
  it('should have a snack class', () => {
    const wrapper = mount(Snackbar)

    expect(wrapper.hasClass('snack')).toBe(true)
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
  })
})
