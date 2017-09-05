import { test } from '~util/testing'
import VSelect from '~components/VSelect'

test('VSelect.vue', ({ mount }) => {
  const up = new Event('keydown')
  const down = new Event('keydown')
  const space = new Event('keydown')
  const enter = new Event('keydown')

  up.keyCode = 38
  down.keyCode = 40
  space.keyCode = 32
  enter.keyCode = 13

  // Inspired by https://github.com/vuetifyjs/vuetify/pull/1425 - Thanks @kevmo314
  it('should open the select when focused and enter, space, up or down are pressed', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        items: ['foo', 'bar']
      }
    })

    wrapper.vm.focus()

    wrapper.vm.$el.dispatchEvent(up)
    expect(wrapper.data().isActive).toBe(true)
    wrapper.vm.isActive = false
    wrapper.vm.$el.dispatchEvent(down)
    expect(wrapper.data().isActive).toBe(true)
    wrapper.vm.isActive = false
    wrapper.vm.$el.dispatchEvent(space)
    await wrapper.vm.$nextTick()
    expect(wrapper.data().isActive).toBe(true)
    wrapper.vm.isActive = false
    await wrapper.vm.$nextTick()
    wrapper.vm.$el.dispatchEvent(enter)
    await wrapper.vm.$nextTick()
    expect(wrapper.data().isActive).toBe(true)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should clear input value', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        clearable: true,
        items: ['foo', 'bar'],
        value: 'foo'
      }
    })

    const clear = wrapper.find('.input-group__append-icon')[0]
    const input = jest.fn()

    wrapper.vm.$on('input', input)

    expect(wrapper.vm.inputValue).toBe('foo')

    clear.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.inputValue).toBe(null)
    expect(input).toHaveBeenCalledWith(null)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })
})
