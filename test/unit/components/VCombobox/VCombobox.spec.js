import { test } from '@/test'
import VCombobox from '@/components/VCombobox'

test('VCombobox', ({ shallow }) => {
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.appendChild(app)

  it('should evaluate the range of an integer', async () => {
    const wrapper = shallow(VCombobox, {
      propsData: {
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
    const wrapper = shallow(VCombobox, {
      attachToDocument: true,
      propsData: {
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
    const wrapper = shallow(VCombobox, {
      propsData: {
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

    expect(event).toBeCalledWith(item)
  })

  it('should not populate search field if value is falsey', async () => {
    const wrapper = shallow(VCombobox)

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
    const wrapper = shallow(VCombobox, {
      attachToDocument: true
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

  it('should call methods on blur', async () => {
    const updateCombobox = jest.fn()
    const wrapper = shallow(VCombobox, {
      attachToDocument: true,
      methods: {
        updateCombobox
      }
    })


    const e = { preventDefault: jest.fn() }
    wrapper.vm.onEnterDown(e)

    // https://github.com/vuetifyjs/vuetify/issues/4974
    expect(e.preventDefault).toBeCalled()
    expect(updateCombobox).toHaveBeenCalledTimes(1)
  })

  it('should emit custom value on blur', async () => {
    const wrapper = shallow(VCombobox)

    const input = wrapper.first('input')

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    input.trigger('focus')
    await wrapper.vm.$nextTick()

    input.element.value = 'foo'
    input.trigger('input')

    input.trigger('keydown.tab')
    expect(change).toHaveBeenCalledWith('foo')

    input.trigger('keydown.esc')
    expect(wrapper.vm.isMenuActive).toBe(false)

    input.element.value = ''
    input.trigger('input')

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isMenuActive).toBe(false)
  })

  it('should conditionally show the menu', async () => {
    const wrapper = shallow(VCombobox, {
      attachToDocument: true,
      propsData: {
        items: ['foo', 'bar', 'fizz'],
        searchInput: 'foobar'
      }
    })

    const slot = wrapper.first('.v-input__slot')
    const input = wrapper.first('input')

    // Focus input should only focus
    input.trigger('focus')

    expect(wrapper.vm.isFocused).toBe(true)
    expect(wrapper.vm.$_menuProps.value).toBe(false)

    slot.trigger('click')

    expect(wrapper.vm.$_menuProps.value).toBe(false)

    // TODO: Add expects for tags when impl
  })

  it('should return an object', () => {
    const items = [
      { text: 'Programming', value: 0 },
      { text: 'Design', value: 1 },
      { text: 'Vue', value: 2 },
      { text: 'Vuetify', value: 3 }
    ]
    const wrapper = shallow(VCombobox, {
      propsData: {
        items
      }
    })

    const input = wrapper.first('input')
    const event = jest.fn()
    wrapper.vm.$on('input', event)

    input.trigger('focus')
    input.element.value = 'Programming'
    input.trigger('input')
    wrapper.vm.selectItem(items[0])

    expect(wrapper.vm.isFocused).toBe(true)
    expect(event).toBeCalledWith(items[0])

    input.trigger('keydown.tab')

    expect(wrapper.vm.isFocused).toBe(false)
    expect(wrapper.vm.internalValue).toEqual(items[0])
  })

  // https://github.com/vuetifyjs/vuetify/issues/5008
  it('should select item if menu index is greater than -1', async () => {
    const wrapper = shallow(VCombobox, {
      propsData: {
        items: ['foo']
      }
    })

    const input = wrapper.first('input')

    input.trigger('focus')
    input.trigger('keydown.enter')
    input.trigger('keydown.down')

    expect(wrapper.vm.getMenuIndex()).toBe(0)

    input.trigger('keydown.enter')

    expect(wrapper.vm.internalValue).toBe('foo')
  })
})
