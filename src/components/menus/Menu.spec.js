import Btn from '~components/buttons/Button'
import Card from '~components/cards/Card'
import Menu from '~components/menus/Menu'
import clickOutside from '~directives/click-outside'
import { ripple } from '~directives/ripple'
import { test } from '~util/testing'

Btn.directives = {
  ripple
}

Menu.directives = {
  clickOutside
}

test('Menu.js', ({ mount }) => {
  it('should work', (done) => {
    const wrapper = mount(Menu, {
      propsData: {
        value: false
      },
      slots: {
        activator: [Btn],
        default: [Card]
      }
    })

    const activator = wrapper.find('.menu__activator')[0]
    const input = jest.fn()
    wrapper.instance().$on('input', input)
    activator.trigger('click')

    wrapper.vm.$nextTick(() => {
      try {
        expect(input).toBeCalledWith(true)
      } finally {
        done()
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
