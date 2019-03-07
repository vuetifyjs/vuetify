import { test } from '@/test'
import VSelect from '@/components/VSelect/VSelect'
import VChip from '@/components/VChip'
import VAutocomplete from '@/components/VAutocomplete'

test('VSelect', ({ mount, compileToFunctions }) => {
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.appendChild(app)

  // Inspired by https://github.com/vuetifyjs/vuetify/pull/1425 - Thanks @kevmo314
  it('should open the select when focused and enter, space, up or down are pressed', async () => {
    const wrapper = mount(VSelect)

    wrapper.vm.hasMouseDown = true
    wrapper.trigger('mouseup')

    expect(wrapper.vm.isMenuActive).toBe(false)

    wrapper.setProps({ box: true })
    wrapper.vm.hasMouseDown = true
    wrapper.first('.v-input__slot').trigger('mouseup')

    expect(wrapper.vm.isMenuActive).toBe(true)

    wrapper.setData({ isMenuActive: false })
    wrapper.setProps({ box: false, solo: true })
    wrapper.vm.hasMouseDown = true
    wrapper.first('.v-input__slot').trigger('mouseup')

    expect(wrapper.vm.isMenuActive).toBe(true)

    wrapper.setData({ isMenuActive: false })
    wrapper.setProps({ solo: false, soloInverted: true })
    wrapper.vm.hasMouseDown = true
    wrapper.first('.v-input__slot').trigger('mouseup')

    expect(wrapper.vm.isMenuActive).toBe(true)

    wrapper.setData({ isMenuActive: false })
    wrapper.setProps({ soloInverted: false, outline: true })
    wrapper.vm.hasMouseDown = true
    wrapper.first('.v-input__slot').trigger('mouseup')

    expect(wrapper.vm.isMenuActive).toBe(true)
  })

  it('should return full items if using auto prop', () => {
    const wrapper = mount(VSelect, {
      propsData: {
        items: [...Array(100).keys()]
      }
    })

    expect(wrapper.vm.virtualizedItems.length).toBe(20)

    wrapper.setProps({ menuProps: 'auto' })

    expect(wrapper.vm.virtualizedItems.length).toBe(100)
  })

  it('should fallback to using text as value if none present', () => {
    const wrapper = mount(VSelect, {
      propsData: {
        items: [{
          text: 'foo'
        }]
      }
    })

    expect(wrapper.vm.getValue(wrapper.vm.items[0])).toBe('foo')
  })

  it('should accept arrays as values', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        items: [
          { text: 'Foo', value: ['bar'] }
        ]
      }
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.vm.selectItem(wrapper.vm.items[0])

    await wrapper.vm.$nextTick()

    expect(input).toBeCalledWith(['bar'])
    expect(wrapper.vm.selectedItems).toEqual([
      { text: 'Foo', value: ['bar'] }
    ])
  })

  // https://github.com/vuetifyjs/vuetify/issues/4359
  // Vue modifies the `on` property of the
  // computed `listData` — easiest way to fix
  it('should select value when using a scoped slot', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        items: ['foo', 'bar']
      },
      slots: {
        'no-data': {
          render: h => h('div', 'No Data')
        }
      }
    })

    // Will be undefined if fails
    expect(wrapper.vm.listData.on).toBeTruthy()
  })

  // https://github.com/vuetifyjs/vuetify/issues/4431
  it('should accept null and "" as values', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        clearable: true,
        items: [
          { text: 'Foo', value: null },
          { text: 'Bar', value: 'bar' }
        ],
        value: null
      },
    })

    const icon = wrapper.first('.v-input__append-inner .v-icon')

    expect(wrapper.vm.selectedItems.length).toBe(1)
    expect(wrapper.vm.isDirty).toBe(true)

    icon.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedItems.length).toBe(0)
    expect(wrapper.vm.isDirty).toBe(false)
    expect(wrapper.vm.internalValue).toBe(undefined)
  })

  it('should only calls change once when clearing', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        clearable: true,
        value: 'foo'
      }
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    const icon = wrapper.first('.v-input__icon > .v-icon')

    icon.trigger('click')

    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalledTimes(1)
  })

  it('should not call change when model updated externally', async () => {
    const change = jest.fn()
    const wrapper = mount(VSelect)

    wrapper.vm.$on('change', change)

    wrapper.setProps({ value: 'bar' })

    expect(change).not.toBeCalled()

    wrapper.vm.setValue('foo')

    expect(change).toBeCalledWith('foo')
    expect(change).toHaveBeenCalledTimes(1)
  })

  // https://github.com/vuetifyjs/vuetify/issues/4713
  it('should nudge select menu', () => {
    const wrapper = mount(VSelect, {
      propsData: {
        menuProps: {
          nudgeTop: 5,
          nudgeRight: 5,
          nudgeBottom: 5,
          nudgeLeft: 5
        }
      }
    })

    const menu = wrapper.vm.$refs.menu

    expect(menu.nudgeTop).toBe(5)
    expect(menu.nudgeRight).toBe(5)
    expect(menu.nudgeBottom).toBe(5)
    expect(menu.nudgeLeft).toBe(5)
  })

  // https://github.com/vuetifyjs/vuetify/issues/5774
  it('should close menu on tab down when no selectedIndex', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        items: ['foo', 'bar']
      }
    })

    const menu = wrapper.first('.v-input__slot')
    const input = wrapper.first('input')

    menu.trigger('click')

    expect(wrapper.vm.isFocused).toBe(true)
    expect(wrapper.vm.isMenuActive).toBe(true)

    input.trigger('keydown.tab')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isFocused).toBe(false)
    expect(wrapper.vm.isMenuActive).toBe(false)
  })

  // https://github.com/vuetifyjs/vuetify/issues/4853
  it('should select item after typing its first few letters', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        items: ['aaa', 'foo', 'faa']
      }
    })

    const input = wrapper.first('input')
    input.trigger('focus')
    await wrapper.vm.$nextTick()

    input.trigger('keypress', { key: 'f' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toEqual('foo')

    input.trigger('keypress', { key: 'a' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toEqual('faa')
  })

  // https://github.com/vuetifyjs/vuetify/issues/4853
  it('should not replicate html select hotkeys in v-autocomplete', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        items: ['aaa', 'foo', 'faa']
      }
    })

    const onKeyPress = jest.fn()
    wrapper.setMethods({ onKeyPress })

    const input = wrapper.first('input')
    input.trigger('focus')
    await wrapper.vm.$nextTick()

    input.trigger('keypress', { key: 'f' })
    await wrapper.vm.$nextTick()
    expect(onKeyPress).not.toBeCalled()
  })
})
