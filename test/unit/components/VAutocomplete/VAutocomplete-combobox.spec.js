import { test } from '@/test'
import VAutocomplete from '@/components/VAutocomplete'

test('VAutocomplete - combobox', ({ mount, shallow }) => {
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.appendChild(app)

  it('should evaluate the range of an integer', async () => {
    const wrapper = shallow(VAutocomplete, {
      propsData: {
        combobox: true,
        value: 11
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentRange).toBe(2)

    wrapper.setProps({ value: 0 })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentRange).toBe(1)
  })

  it('should not use search input when blurring', async () => {
    const wrapper = shallow(VAutocomplete, {
      attachToDocument: true,
      propsData: {
        combobox: true,
        items: [1, 12]
      }
    })

    const event = jest.fn()
    wrapper.vm.$on('input', event)

    const input = wrapper.first('input')
    input.trigger('focus')
    await wrapper.vm.$nextTick()

    wrapper.setProps({ searchInput: '1' })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalSearch).toBe('1')

    const list = wrapper.find('.v-list > div')[1]
    list.trigger('click')
    await wrapper.vm.$nextTick()
    expect(event).toBeCalledWith(12)
  })

  it('should not use search input if an option is selected from the menu', async () => {
    const item = { value: 123, text: 'Foo' }
    const wrapper = shallow(VAutocomplete, {
      propsData: {
        combobox: true,
        items: [item]
      }
    })

    const event = jest.fn()
    wrapper.vm.$on('input', event)

    wrapper.setData({ isMenuActive: true })
    await wrapper.vm.$nextTick()

    wrapper.vm.selectItem(item)
    await wrapper.vm.$nextTick()

    wrapper.setData({ isMenuActive: false })
    await wrapper.vm.$nextTick()

    expect(event).toBeCalledWith(123)
  })

  it('should not populate search field if value is falsey', async () => {
    const wrapper = shallow(VAutocomplete, {
      propsData: {
        combobox: true
      }
    })

    const event = jest.fn()
    wrapper.vm.$on('input', event)

    wrapper.setData({ isMenuActive: true })
    await wrapper.vm.$nextTick()

    wrapper.setProps({ searchInput: '' })
    await wrapper.vm.$nextTick()

    wrapper.setData({ isMenuActive: false })
    await wrapper.vm.$nextTick()

    expect(event).not.toBeCalled()
  })

  it('should clear value', async () => {
    const wrapper = mount(VAutocomplete, {
      attachToDocument: true,
      propsData: { combobox: true }
    })

    const change = jest.fn()
    const input = wrapper.first('input')

    wrapper.vm.$on('change', change)
    wrapper.vm.$on('input', change)

    input.trigger('focus')
    input.element.value = 'foo'
    input.trigger('input')
    input.trigger('keydown.enter')

    expect(change).toBeCalledWith('foo')
    expect(change).toHaveBeenCalledTimes(2)
    expect(wrapper.vm.internalValue).toBe('foo')

    input.element.value = ''
    input.trigger('input')
    input.trigger('keydown.tab')

    expect(wrapper.vm.internalValue).toBe('')
    expect(change).toHaveBeenCalledTimes(4)
  })
})
