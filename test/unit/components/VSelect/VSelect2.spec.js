import { test } from '@/test'
import VSelect from '@/components/VSelect/VSelect'
import VChip from '@/components/VChip'

test('VSelect', ({ mount, compileToFunctions }) => {
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.appendChild(app)

  // Inspired by https://github.com/vuetifyjs/vuetify/pull/1425 - Thanks @kevmo314
  it('should open the select when focused and enter, space, up or down are pressed', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        items: ['foo', 'bar']
      }
    })

    const input = wrapper.first('input')

    for (const key of ['up', 'down', 'space', 'enter']) {
      input.trigger('focus')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isMenuActive).toBe(false)
      input.trigger(`keydown.${key}`)
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isMenuActive).toBe(true)
      wrapper.vm.isMenuActive = false // reset for next iteration
      await wrapper.vm.$nextTick()
    }
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

    const clear = wrapper.find('.v-icon')[0]

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toBe('foo')
    clear.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toBe(null)
    expect(input).toHaveBeenCalledWith(null)
  })

  it('should be clearable with prop, dirty and single select', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        clearable: true,
        items: [1, 2],
        value: 1
      }
    })

    const clear = wrapper.first('.v-icon')

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toBe(1)
    expect(wrapper.html()).toMatchSnapshot()

    clear.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toBe(null)
    expect(wrapper.vm.isMenuActive).toBe(false)
  })

  it('should be clearable with prop, dirty and multi select', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        clearable: true,
        items: [1, 2],
        multiple: true,
        value: [1]
      }
    })

    const clear = wrapper.first('.v-icon')

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()

    clear.trigger('click')
    await wrapper.vm.$nextTick()
    expect(change).toHaveBeenCalledWith([])
    expect(wrapper.vm.isMenuActive).toBe(false)
  })

  it('should prepopulate selectedItems', () => {
    const items = ['foo', 'bar', 'baz']

    const wrapper = mount(VSelect, {
      propsData: {
        items,
        value: 'foo'
      }
    })

    const wrapper2 = mount(VSelect, {
      propsData: {
        items,
        multiple: true,
        value: ['foo', 'bar']
      }
    })

    const wrapper3 = mount(VSelect, {
      propsData: {
        items,
        value: null
      }
    })

    expect(wrapper.vm.selectedItems).toHaveLength(1)
    expect(wrapper2.vm.selectedItems).toHaveLength(2)
    expect(wrapper3.vm.selectedItems).toHaveLength(0)
  })

  it('should show input with placeholder and not dirty', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        placeholder: 'foo'
      }
    })

    expect(wrapper.find('input')[0].hasStyle('display', 'block'))
  })

  it('should not show input with placeholder and dirty', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        items: ['bar'],
        placeholder: 'foo',
        value: 'bar'
      }
    })

    expect(wrapper.find('input')[0].hasStyle('display', 'none'))
  })

  // #1704
  it('should populate select when using value as an object', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        items: [
          { text: 'foo', value: { id: 1 } },
          { text: 'foo', value: { id: 2 } }
        ],
        multiple: true,
        value: [{ id: 1 }]
      }
    })

    await wrapper.vm.$nextTick()

    const selections = wrapper.find('.v-select__selection')

    expect(selections.length).toBeGreaterThan(0)
  })

  // Discovered when working on #1704
  it('should remove item when re-selecting it', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        items: [
          { text: 'bar', value: { id: 1 } },
          { text: 'foo', value: { id: 2 } }
        ],
        multiple: true,
        value: [{ id: 1 }]
      }
    })

    expect(wrapper.vm.selectedItems).toHaveLength(1)
    wrapper.trigger('click')
    const item = wrapper.first('div.v-list__tile__action')
    item.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.selectedItems).toHaveLength(0)
  })

  it('should open menu when cleared with open-on-clear', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        clearable: true,
        openOnClear: true,
        items: [1],
        value: 1
      }
    })

    const clear = wrapper.first('.v-input__icon--clear .v-icon')

    clear.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isMenuActive).toBe(true)

  })

  it('should react to different key down', async () => {
    const wrapper = mount(VSelect)
    const blur = jest.fn()
    wrapper.vm.$on('blur', blur)

    wrapper.vm.onKeyDown({ keyCode: 9 })

    expect(blur).toBeCalled()
    expect(wrapper.vm.isMenuActive).toBe(false)

    for (let keyCode of [13, 32, 38, 40]) {
      wrapper.vm.onKeyDown({ keyCode })
      expect(wrapper.vm.isMenuActive).toBe(true)

      wrapper.vm.isMenuActive = false
      expect(wrapper.vm.isMenuActive).toBe(false)
    }
  })

  it('should select an item !multiple', async () => {
    const wrapper = mount(VSelect)

    const input = jest.fn()
    const change = jest.fn()
    wrapper.vm.$on('input', input)
    wrapper.vm.$on('change', change)

    wrapper.vm.selectItem('foo')

    expect(wrapper.vm.internalValue).toBe('foo')
    expect(input).toBeCalledWith('foo')
    expect(input).toHaveBeenCalledTimes(1)

    await wrapper.vm.$nextTick()

    expect(change).toBeCalledWith('foo')
    expect(change).toHaveBeenCalledTimes(1)

    wrapper.setProps({ returnObject: true })

    const item = { foo: 'bar' }
    wrapper.vm.selectItem(item)

    expect(wrapper.vm.internalValue).toBe(item)
    expect(input).toBeCalledWith(item)
    expect(input).toHaveBeenCalledTimes(2)

    await wrapper.vm.$nextTick()

    expect(change).toBeCalledWith(item)
    expect(change).toHaveBeenCalledTimes(2)
  })

  it('should disable v-list-tile', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        items: [{ text: 'foo', disabled: true, id: 0 }]
      }
    })

    const selectItem = jest.fn()
    wrapper.setMethods({ selectItem })

    let el = wrapper.first('.v-list__tile')

    el.element.click()

    expect(selectItem).not.toBeCalled()

    wrapper.setProps({
      items: [{ text: 'foo', disabled: false, id: 0 }]
    })

    await wrapper.vm.$nextTick()

    el.element.click()

    expect(selectItem).toBeCalled()
  })

  it('should update menu status and focus when menu closes', async () => {
    const wrapper = mount(VSelect)
    const menu = wrapper.vm.$refs.menu

    wrapper.setData({
      isMenuActive: true,
      isFocused: true
    })

    expect(wrapper.vm.isMenuActive).toBe(true)
    expect(wrapper.vm.isFocused).toBe(true)

    await wrapper.vm.$nextTick()

    expect(menu.isActive).toBe(true)

    menu.isActive = false

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isMenuActive).toBe(false)
    expect(wrapper.vm.isFocused).toBe(false)
  })

  it('should use specified value', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        items: ['foo']
      }
    })
  })

  it('should update model when chips are removed', async () => {
    const selectItem = jest.fn()
    const wrapper = mount(VSelect, {
      propsData: {
        chips: true,
        deletableChips: true,
        items: ['foo'],
        value: 'foo'
      },
      methods: { selectItem }
    })

    const input = jest.fn()
    const change = jest.fn()

    wrapper.vm.$on('input', input)

    expect(wrapper.vm.internalValue).toEqual('foo')
    wrapper.first('.v-chip__close').trigger('click')

    expect(input).toBeCalled()

    wrapper.setProps({
      items: ['foo', 'bar'],
      multiple: true,
      value: ['foo', 'bar']
    })
    wrapper.vm.$on('change', change)

    expect(wrapper.vm.internalValue).toEqual(['foo', 'bar'])
    wrapper.first('.v-chip__close').trigger('click')

    await wrapper.vm.$nextTick()

    expect(selectItem).toHaveBeenCalledTimes(1)
  })

  it('should set selected index', async () => {
    const onFocus = jest.fn()
    const wrapper = mount(VSelect, {
      propsData: {
        chips: true,
        deletableChips: true,
        multiple: true,
        items: ['foo', 'bar', 'fizz', 'buzz'],
        value: ['foo', 'bar', 'fizz', 'buzz']
      },
      methods: { onFocus }
    })

    expect(wrapper.vm.selectedIndex).toBe(-1)

    const foo = wrapper.first('.v-chip--select-multi')
    foo.trigger('click')

    expect(wrapper.vm.selectedIndex).toBe(0)
    expect(onFocus).toHaveBeenCalledTimes(1)

    wrapper.find('.v-chip--select-multi')[1].trigger('click')

    expect(wrapper.vm.selectedIndex).toBe(1)
    expect(onFocus).toHaveBeenCalledTimes(2)

    wrapper.setProps({ disabled: true })

    await wrapper.vm.$nextTick()

    wrapper.first('.v-chip--select-multi').trigger('click')

    expect(wrapper.vm.selectedIndex).toBe(1)
    expect(onFocus).toHaveBeenCalledTimes(2)
  })

  it('should not duplicate items after items update when caching is turned on', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        cacheItems: true,
        returnObject: true,
        itemText: 'text',
        itemValue: 'id',
        items: [],
      }
    })

    wrapper.setProps({ items: [{ id: 1, text: 'A' }] })
    expect(wrapper.vm.computedItems).toHaveLength(1)
    wrapper.setProps({ items: [{ id: 1, text: 'A' }] })
    expect(wrapper.vm.computedItems).toHaveLength(1)
  })

  it('should cache items', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        cacheItems: true,
        items: []
      }
    })

    wrapper.setProps({ items: ['bar', 'baz'] })
    expect(wrapper.vm.computedItems).toHaveLength(2)

    wrapper.setProps({ items: ['foo'] })
    expect(wrapper.vm.computedItems).toHaveLength(3)

    wrapper.setProps({ items: ['bar'] })
    expect(wrapper.vm.computedItems).toHaveLength(3)
  })

  it('should cache items passed via prop', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        cacheItems: true,
        items: [1, 2, 3, 4]
      }
    })

    expect(wrapper.vm.computedItems).toHaveLength(4)

    wrapper.setProps({ items: [5] })
    expect(wrapper.vm.computedItems).toHaveLength(5)
  })

  it('should have an affix', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        prefix: '$',
        suffix: 'lbs'
      }
    })

    expect(wrapper.first('.v-text-field__prefix').element.innerHTML).toBe('$')
    expect(wrapper.first('.v-text-field__suffix').element.innerHTML).toBe('lbs')

    wrapper.setProps({ prefix: undefined, suffix: undefined })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.v-text-field__prefix').length).toBe(0)
    expect(wrapper.find('.v-text-field__suffix').length).toBe(0)
  })

  it('should use custom clear icon cb', () => {
    const clearIconCb = jest.fn()
    const wrapper = mount(VSelect, {
      propsData: {
        clearIconCb,
        clearable: true,
        items: ['foo'],
        value: 'foo'
      }
    })

    wrapper.first('.v-input__icon--clear .v-icon').trigger('click')

    expect(clearIconCb).toBeCalled()
  })

  it('should populate select[multiple=false] when using value as an object', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        items: [
          { text: 'foo', value: { id: { subid: 1 } } },
          { text: 'foo', value: { id: { subid: 2 } } }
        ],
        multiple: false,
        value: { id: { subid: 2 } }
      }
    })

    await wrapper.vm.$nextTick()

    const selections = wrapper.find('.v-select__selection')

    expect(selections.length).toEqual(1)
  })

  it('should add color to selected index', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        multiple: true,
        items: ['foo', 'bar'],
        value: ['foo']
      }
    })

    wrapper.vm.selectedIndex = 0

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not react to click when disabled', async () => {
    const wrapper = mount(VSelect, {
      propsData: { items: ['foo', 'bar'] }
    })
    const slot = wrapper.first('.v-input__slot')
    const input = wrapper.first('input')

    expect(wrapper.vm.isMenuActive).toBe(false)
    slot.trigger('click')
    expect(wrapper.vm.isMenuActive).toBe(true)

    wrapper.setData({ isMenuActive: false })
    wrapper.setProps({ disabled: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isMenuActive).toBe(false)

    slot.trigger('click')
    expect(wrapper.vm.isMenuActive).toBe(false)
  })

  it('should set the menu index', () => {
    const wrapper = mount(VSelect)

    expect(wrapper.vm.getMenuIndex()).toBe(-1)

    wrapper.vm.setMenuIndex(1)

    expect(wrapper.vm.getMenuIndex()).toBe(1)
  })
})
