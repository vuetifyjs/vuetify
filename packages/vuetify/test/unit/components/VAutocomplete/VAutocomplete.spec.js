import { test } from '@/test'
import { keyCodes } from '@/util/helpers'
import VAutocomplete from '@/components/VAutocomplete'

test('VAutocomplete.js', ({ mount, compileToFunctions }) => {
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.appendChild(app)

  it('should allow changing of browser autocomplete', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        browserAutocomplete: 'on'
      }
    })

    const input = wrapper.first('input')

    expect(input.element.getAttribute('autocomplete')).toBe('on')

    wrapper.setProps({ browserAutocomplete: 'off' })

    await wrapper.vm.$nextTick()

    expect(input.element.getAttribute('autocomplete')).toBe('off')
  })

  it('should have explicit tabindex passed through when autocomplete', () => {
    const wrapper = mount(VAutocomplete, {
      attrs: {
        tabindex: 10
      }
    })

    expect(wrapper.vm.$refs.input.tabIndex).toBe(10)
    expect(wrapper.vm.$el.tabIndex).toBe(-1)
  })

  it('should emit search input changes', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
      }
    })

    const input = wrapper.first('input')

    const update = jest.fn()
    wrapper.vm.$on('update:searchInput', update)

    input.element.value = 'test'
    input.trigger('input')

    await wrapper.vm.$nextTick()

    expect(update).toBeCalledWith('test')
  })

  it('should filter autocomplete search results', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: { items: ['foo', 'bar'] }
    })

    wrapper.setData({ internalSearch: 'foo' })

    expect(wrapper.vm.filteredItems).toHaveLength(1)
    expect(wrapper.vm.filteredItems[0]).toBe('foo')
  })

  it('should filter numeric primitives', () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        items: [1, 2]
      }
    })

    wrapper.setData({ internalSearch: 1 })

    expect(wrapper.vm.filteredItems).toHaveLength(1)
    expect(wrapper.vm.filteredItems[0]).toBe(1)
  })

  it('should activate when search changes and not active', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        items: [1, 2, 3, 4],
        multiple: true
      }
    })

    wrapper.vm.isMenuActive = true
    await wrapper.vm.$nextTick()
    wrapper.setData({ internalSearch: 2 })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isMenuActive).toBe(true)
  })

  it('should set searchValue to null when deactivated', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        items: [1, 2, 3, 4],
        multiple: true
      }
    })

    await wrapper.vm.$nextTick()

    const input = wrapper.first('input')

    input.trigger('focus')
    input.element.value = 2
    input.trigger('input')

    expect(wrapper.vm.internalSearch).toBe('2')

    wrapper.setProps({
      multiple: false,
      value: 1
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalSearch).toBe(1)

    input.trigger('focus')
    input.element.value = 3
    input.trigger('input')
    input.trigger('blur')

    expect(wrapper.vm.internalSearch).toBe('3')
  })

  it('should render role=combobox correctly when autocomplete', async () => {
    const wrapper = mount(VAutocomplete)

    expect(wrapper.vm.$el.getAttribute('role')).toBeFalsy()

    const input = wrapper.first('input')
    expect(input.element.getAttribute('role')).toBe('combobox')
  })

  it('should not duplicate items after items update when caching is turned on', async () => {
    const wrapper = mount(VAutocomplete, {
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
    const wrapper = mount(VAutocomplete, {
      propsData: { cacheItems: true }
    })

    wrapper.setProps({ items: ['bar', 'baz'] })
    expect(wrapper.vm.computedItems).toHaveLength(2)

    wrapper.setProps({ items: ['foo'] })
    expect(wrapper.vm.computedItems).toHaveLength(3)

    wrapper.setProps({ items: ['bar'] })
    expect(wrapper.vm.computedItems).toHaveLength(3)
  })

  it('should cache items passed via prop', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        cacheItems: true,
        items: [1, 2, 3, 4]
      }
    })

    expect(wrapper.vm.computedItems).toHaveLength(4)

    wrapper.setProps({ items: [5] })

    expect(wrapper.vm.computedItems).toHaveLength(5)
  })

  it('should show input when focused and autocomplete', async () => {
    const wrapper = mount(VAutocomplete)

    const input = wrapper.first('input')

    expect(input.hasStyle('display', 'none'))

    wrapper.trigger('focus')

    expect(input.hasStyle('display', 'block'))
  })

  it('should not filter text with no items', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        items: ['foo', 'bar']
      }
    })

    await wrapper.vm.$nextTick()

    wrapper.setProps({ searchInput: 'asdf' })

    // Wait for watcher
    await wrapper.vm.$nextTick()

    const tile = wrapper.first('.v-list__tile__title')

    expect(tile.text()).toBe('No data available')
  })

  it('should not display menu when tab focused', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        items: [1, 2],
        value: 1
      }
    })

    const input = wrapper.first('input')
    input.trigger('focus')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isMenuActive).toBe(false)
  })

  it('should change selected index', async () => {
    const wrapper = mount(VAutocomplete, {
      attachToDocument: true,
      propsData: {
        items: ['foo', 'bar', 'fizz'],
        multiple: true,
        value: ['foo', 'bar', 'fizz']
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedIndex).toBe(-1)
    expect(wrapper.vm.selectedItems.length).toBe(3)

    // Right arrow
    wrapper.vm.changeSelectedIndex(keyCodes.right)
    expect(wrapper.vm.selectedIndex).toBe(0)

    wrapper.vm.changeSelectedIndex(keyCodes.right)
    expect(wrapper.vm.selectedIndex).toBe(1)

    wrapper.vm.changeSelectedIndex(keyCodes.right)
    expect(wrapper.vm.selectedIndex).toBe(2)

    // Left arrow
    wrapper.vm.changeSelectedIndex(keyCodes.left)
    expect(wrapper.vm.selectedIndex).toBe(1)

    wrapper.vm.changeSelectedIndex(keyCodes.left)
    expect(wrapper.vm.selectedIndex).toBe(0)

    wrapper.vm.changeSelectedIndex(keyCodes.left)
    expect(wrapper.vm.selectedIndex).toBe(-1)

    wrapper.vm.changeSelectedIndex(keyCodes.left)
    expect(wrapper.vm.selectedIndex).toBe(2)

    wrapper.vm.changeSelectedIndex(keyCodes.left)
    expect(wrapper.vm.selectedIndex).toBe(1)

    // Delete key
    wrapper.vm.changeSelectedIndex(keyCodes.backspace)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.selectedIndex).toBe(1)

    wrapper.vm.changeSelectedIndex(keyCodes.left)
    expect(wrapper.vm.selectedIndex).toBe(0)

    wrapper.vm.changeSelectedIndex(keyCodes.backspace)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.selectedIndex).toBe(0)

    // Should not change index if search is dirty
    wrapper.setProps({ searchInput: 'foo' })
    wrapper.vm.changeSelectedIndex(keyCodes.backspace)

    expect(wrapper.vm.selectedIndex).toBe(0)
    expect(wrapper.vm.selectedItems.length).toBe(1)

    wrapper.setProps({ searchInput: undefined })

    // Should not proceed if keyCode doesn't match
    wrapper.vm.changeSelectedIndex(99)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedIndex).toBe(0)
    expect(wrapper.vm.selectedItems.length).toBe(1)

    wrapper.vm.changeSelectedIndex(keyCodes.backspace)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedItems.length).toBe(0)
    expect(wrapper.vm.selectedIndex).toBe(-1)

    // Should not change/error if called with no selection
    wrapper.vm.changeSelectedIndex(keyCodes.backspace)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedIndex).toBe(-1)

    wrapper.setProps({ value: ['foo', 'bar', 'fizz'] })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedItems.length).toBe(3)

    wrapper.vm.selectedIndex = 2

    // Simulating removing items when an index already selected
    wrapper.setProps({ value: ['foo', 'bar'] })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedIndex).toBe(2)

    // Backspace
    wrapper.vm.changeSelectedIndex(keyCodes.delete)
    expect(wrapper.vm.selectedIndex).toBe(-1)
  })

  it('should conditionally show the menu', async () => {
    const wrapper = mount(VAutocomplete, {
      attachToDocument: true,
      propsData: {
        items: ['foo', 'bar', 'fizz']
      }
    })

    const slot = wrapper.first('.v-input__slot')
    const input = wrapper.first('input')

    // Focus input should only focus
    input.trigger('focus')

    expect(wrapper.vm.isFocused).toBe(true)
    expect(wrapper.vm.menuCanShow).toBe(true)
    expect(wrapper.vm.isMenuActive).toBe(false)

    // Clicking input should open menu
    slot.trigger('click')

    expect(wrapper.vm.isMenuActive).toBe(true)
    expect(wrapper.vm.menuCanShow).toBe(true)

    wrapper.setProps({ searchInput: 'foo' })

    expect(wrapper.vm.isMenuActive).toBe(true)
    expect(wrapper.vm.menuCanShow).toBe(true)

    // Should close menu but keep focus
    input.trigger('keydown.esc')

    expect(wrapper.vm.isFocused).toBe(true)
    expect(wrapper.vm.isMenuActive).toBe(false)
    expect(wrapper.vm.menuCanShow).toBe(true)

    // TODO: Add expects for tags when impl
  })

  it('should have the correct selected item', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        items: ['foo', 'bar', 'fizz'],
        multiple: true,
        value: ['foo']
      }
    })

    expect(wrapper.vm.selectedItem).toBe(null)

    wrapper.setProps({
      multiple: false,
      value: 'foo'
    })

    expect(wrapper.vm.selectedItem).toBe('foo')
  })

  it('should reset lazySearch', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        chips: true,
        items: ['foo', 'bar', 'fizz'],
        searchInput: 'foo'
      }
    })

    expect(wrapper.vm.lazySearch).toBe('foo')
    expect(wrapper.vm.hasSlot).toBe(true)

    wrapper.setData({ isMenuActive: true })
    await wrapper.vm.$nextTick()
    wrapper.setData({ isMenuActive: false })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.lazySearch).toBe(null)
  })

  it('should select input text on focus', async () => {
    const wrapper = mount(VAutocomplete)
    const select = jest.fn()
    wrapper.vm.$refs.input.select = select

    const input = wrapper.first('input')
    input.trigger('focus')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isFocused).toBe(true)
    expect(select).toHaveBeenCalledTimes(1)

    input.trigger('keydown.tab')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isFocused).toBe(false)
    expect(select).toHaveBeenCalledTimes(1)
  })

  it('should not respond to click', () => {
    const onFocus = jest.fn()
    const wrapper = mount(VAutocomplete, {
      propsData: { disabled: true },
      methods: { onFocus }
    })
    const slot = wrapper.first('.v-input__slot')

    slot.trigger('click')

    expect(onFocus).not.toBeCalled()

    wrapper.setProps({ disabled: false, readonly: true })

    slot.trigger('click')

    expect(onFocus).not.toBeCalled()

    wrapper.setProps({ readonly: false })

    slot.trigger('click')

    expect(onFocus).toBeCalled()
  })

  it('should react to keydown', () => {
    const activateMenu = jest.fn()
    const changeSelectedIndex = jest.fn()
    const onEscDown = jest.fn()
    const onTabDown = jest.fn()
    const wrapper = mount(VAutocomplete, {
      methods: {
        activateMenu,
        changeSelectedIndex,
        onEscDown,
        onTabDown
      }
    })

    const input = wrapper.first('input')

    expect(wrapper.vm.isMenuActive).toBe(false)

    input.trigger('keydown.enter')
    input.trigger('keydown.space')
    input.trigger('keydown.up')
    input.trigger('keydown.down')

    expect(activateMenu).toHaveBeenCalledTimes(4)

    input.trigger('keydown.esc')

    expect(onEscDown).toHaveBeenCalledTimes(1)

    input.trigger('keydown.tab')

    expect(onTabDown).toHaveBeenCalledTimes(1)

    // Skip menu activation
    wrapper.setData({ isMenuActive: true })

    input.element.value = 'foo'
    input.trigger('input')

    wrapper.setProps({ hideSelected: true })

    expect(wrapper.vm.genSelections()).toEqual([])
  })

  // https://github.com/vuetifyjs/vuetify/issues/3793
  it('should reset menu index after selection', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        items: ['foo', 'bar'],
        value: 'foo'
      }
    })

    expect(wrapper.vm.isMenuActive).toBe(false)
    const slot = wrapper.first('.v-input__slot')
    const item = wrapper.first('.v-list__tile')
    slot.trigger('click')

    expect(wrapper.vm.isMenuActive).toBe(true)

    expect(wrapper.vm.getMenuIndex()).toBe(-1)
  })

  it('should not remove a disabled item', () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        chips: true,
        multiple: true,
        items: [
          { text: 'foo', value: 'foo', disabled: true },
          { text: 'bar', value: 'bar' },
        ],
        value: ['foo', 'bar']
      }
    })

    const chips = wrapper.find('.v-chip')
    const input = wrapper.first('input')

    expect(chips[0].element.classList.contains('v-chip--disabled')).toBe(true)

    input.trigger('focus')
    input.trigger('keydown.left')

    expect(wrapper.vm.selectedIndex).toBe(1)

    input.trigger('keydown.delete')

    expect(wrapper.vm.internalValue).toEqual(['foo'])

    input.trigger('keydown.delete')

    expect(wrapper.vm.internalValue).toEqual(['foo'])
  })

  it('should not filter results', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        items: ['foo', 'bar']
      }
    })

    const input = wrapper.first('input')
    input.element.value = 'foo'
    input.trigger('input')

    expect(wrapper.vm.filteredItems.length).toBe(1)

    wrapper.setProps({ noFilter: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.filteredItems.length).toBe(2)
  })

  it('should hide menu when no data', async () => {
    const wrapper = mount(VAutocomplete)

    const input = wrapper.first('input')
    input.trigger('focus')
    input.element.value = 'foo'
    input.trigger('input')

    expect(wrapper.vm.menuCanShow).toBe(true)

    wrapper.setProps({ hideNoData: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.menuCanShow).toBe(false)

    wrapper.setProps({ hideNoData: false })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.menuCanShow).toBe(true)

    // If we are hiding selected
    // filtered will have a positive length
    // but the hidden items will not show
    // check to make sure when all values are
    // selected to close the menu
    wrapper.setProps({
      hideNoData: true,
      hideSelected: true,
      items: [1,2,3,4],
      multiple: true,
      value: [1,2,3]
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.menuCanShow).toBe(true)

    wrapper.setProps({ value: [1,2,3,4] })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.menuCanShow).toBe(false)
  })

  it('should not hide menu when no data but has no-data slot', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        combobox: true
      },
      slots: {
        'no-data': [compileToFunctions('<span>show me</span>')]
      }
    })

    const input = wrapper.first('input')
    input.trigger('focus')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.menuCanShow).toBe(true)
  })

  // https://github.com/vuetifyjs/vuetify/issues/2834
  it('should not update search if selectedIndex is > -1', () => {
    const wrapper = mount(VAutocomplete)

    const input = wrapper.first('input')

    input.trigger('focus')
    input.element.value = 'foo'
    input.trigger('input')

    expect(wrapper.vm.internalSearch).toBe('foo')

    wrapper.setData({
      lazySearch: '',
      selectedIndex: 0
    })

    expect(wrapper.vm.internalSearch).toBe('')

    input.element.value = 'bar'
    input.trigger('input')

    expect(wrapper.vm.internalSearch).toBe('')
  })

  it('should clear search input on clear callback', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        clearable: true
      }
    })

    const icon = wrapper.first('.v-input__append-inner .v-icon')
    const input = wrapper.first('input')

    input.element.value = 'foobar'
    input.trigger('input')

    expect(wrapper.vm.internalSearch).toBe('foobar')

    icon.trigger('click')

    expect(wrapper.vm.internalSearch).toBe(undefined)
  })

  it('should propagate content class', () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        menuProps: { contentClass: 'foobar' }
      }
    })

    const content = wrapper.first('.v-autocomplete__content')

    expect(content.element.classList.contains('foobar')).toBe(true)
  })

  it('should update the displayed value when items changes', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        value: 1,
        items: []
      }
    })

    const input = wrapper.first('input')

    await wrapper.vm.$nextTick()
    wrapper.setProps({ items: [{ text: 'foo', value: 1 }] })
    await wrapper.vm.$nextTick()
    expect(input.element.value).toBe('foo')
  })

  it('should show menu when items are added for the first time and hide-no-data is enabled', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        hideNoData: true,
        items: []
      }
    })

    const input = wrapper.first('input')

    input.trigger('focus')

    expect(wrapper.vm.isMenuActive).toBe(false)
    expect(wrapper.vm.isFocused).toBe(true)

    wrapper.setProps({
      items: ['Foo', 'Bar']
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isMenuActive).toBe(true)
  })

  it('should not show menu when items are updated and hide-no-data is enabled ', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        hideNoData: true,
        items: [ 'Something first' ]
      }
    })

    const input = wrapper.first('input')

    input.trigger('focus')

    expect(wrapper.vm.isMenuActive).toBe(false)
    expect(wrapper.vm.isFocused).toBe(true)

    wrapper.setProps({
      items: ['Foo', 'Bar']
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isMenuActive).toBe(false)
  })

  // https://github.com/vuetifyjs/vuetify/issues/5110
  it('should set internal search', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        value: undefined,
        items: [0, 1, 2]
      }
    })

    // Initial value
    expect(wrapper.vm.internalSearch).toBe(undefined)

    wrapper.vm.setSearch()

    await wrapper.vm.$nextTick()

    // !this.selectedItem
    expect(wrapper.vm.internalSearch).toBe(null)

    wrapper.setData({ internalSearch: undefined })
    wrapper.setProps({ multiple: true, value: 1 })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedItems.length).toBe(1)

    wrapper.vm.setSearch()

    await wrapper.vm.$nextTick()

    // this.multiple
    expect(wrapper.vm.internalSearch).toBe(null)

    wrapper.setData({ internalSearch: undefined })
    wrapper.setProps({ multiple: false, value: 0 })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalSearch).toBe(0)
  })

  it('should auto select first', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        autoSelectFirst: true,
        items: [
          'foo',
          'foobar',
          'bar'
        ]
      }
    })

    wrapper.setData({ internalSearch: 'fo' })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.getMenuIndex()).toBe(0)
  })

  // https://github.com/vuetifyjs/vuetify/issues/4580
  it('should display menu when hide-no-date and hide-selected are enabled and selected item does not match search', async () => {
    const wrapper = mount(VAutocomplete, {
      propsData: {
        items: [1, 2],
        value: 1,
        hideNoData: true,
        hideSelected: true,
      }
    })

    const input = wrapper.first('input')
    input.trigger('focus')
    await wrapper.vm.$nextTick()

    input.element.value = 2
    input.trigger('input')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.menuCanShow).toBe(true)
  })
})
