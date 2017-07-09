import Vue from 'vue'
import { mount } from 'avoriaz'
import Btn from '~components/buttons/Button'
import Card from '~components/cards/Card'
import Menu from '~components/menus/Menu'
import clickOutside from '~directives/click-outside'
import load from '~util/load'
import { ripple } from '~directives/ripple'

Vue.prototype.$vuetify = {
  load: load
}

Btn.directives = {
  ripple
}

Menu.directives = {
  clickOutside
}

describe('Menu.js', () => {
  it('should work', () => {
    const wrapper = mount(Menu, {
      propsData: {
        value: false
      },
      slots: {
        activator: [Btn],
        default: [Card]
      }
    })

    const input = jest.fn()
    wrapper.instance().$on('input', input)
    const activator = wrapper.find('.menu__activator')[0]
    activator.trigger('click')

    expect(input).toBeCalledWith(true)
  })
})
