import VBtn from '~components/buttons/VBtn'
import VCard from '~components/cards/VCard'
import VMenu from '~components/menus/VMenu'
import clickOutside from '~directives/click-outside'
import { ripple } from '~directives/ripple'
import { test } from '~util/testing'

VBtn.directives = {
  ripple
}

VMenu.directives = {
  clickOutside
}

test('VMenu.js', ({ mount }) => {
  it('should work', async () => {
    const wrapper = mount(VMenu, {
      propsData: {
        value: false
      },
      slots: {
        activator: [VBtn],
        default: [VCard]
      }
    })

    const activator = wrapper.find('.menu__activator')[0]
    const input = jest.fn()
    wrapper.instance().$on('input', input)
    activator.trigger('click')

    await wrapper.vm.$nextTick()

    expect(input).toBeCalledWith(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
