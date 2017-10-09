import { test } from '~util/testing'
import { mount } from 'avoriaz'
import VSelect from '~components/VSelect'
import VMenu from '~components/VMenu'

test('VSelect - combobox', () => {
  const backspace = new Event('keydown')
  backspace.keyCode = 8

  it('should emit custom value on blur', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        combobox: true,
        value: null
      }
    })

    const input = wrapper.find('input')[0]

    const change = jest.fn()
    wrapper.vm.$on('input', change)

    input.trigger('focus')
    await wrapper.vm.$nextTick()

    input.element.value = 'foo'
    input.trigger('input')
    await wrapper.vm.$nextTick()

    input.trigger('blur')
    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalledWith('foo')
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })
})
