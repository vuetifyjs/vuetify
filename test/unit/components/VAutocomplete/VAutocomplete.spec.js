import { test } from '@/test'
import VAutocomplete from '@/components/VAutocomplete'

test('VAutocomplete.js', ({ mount, shallow }) => {
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.appendChild(app)

  it('should allow changing of browser autocomplete', async () => {
    const wrapper = shallow(VAutocomplete, {
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
    const wrapper = shallow(VAutocomplete, {
      propsData: {
        tabindex: 10
      }
    })

    expect(wrapper.vm.$refs.input.tabIndex).toBe(10)
    expect(wrapper.vm.$el.tabIndex).toBe(-1)
  })

  it('should emit search input changes', async () => {
    const wrapper = shallow(VAutocomplete, {
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
    const wrapper = shallow(VAutocomplete, {
      propsData: { items: ['foo', 'bar'] }
    })

    wrapper.setData({ internalSearch: 'foo' })

    expect(wrapper.vm.filteredItems).toHaveLength(1)
    expect(wrapper.vm.filteredItems[0]).toBe('foo')
  })

  it('should filter numeric primitives', () => {
    const wrapper = shallow(VAutocomplete, {
      propsData: {
        items: [1, 2]
      }
    })

    wrapper.setData({ internalSearch: 1 })

    expect(wrapper.vm.filteredItems).toHaveLength(1)
    expect(wrapper.vm.filteredItems[0]).toBe(1)
  })

  it('should activate when search changes and not active', async () => {
    const wrapper = shallow(VAutocomplete, {
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
    const wrapper = shallow(VAutocomplete, {
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
    const wrapper = shallow(VAutocomplete)

    expect(wrapper.vm.$el.getAttribute('role')).toBeFalsy()

    const input = wrapper.first('input')
    expect(input.element.getAttribute('role')).toBe('combobox')
  })

  it('should not duplicate items after items update when caching is turned on', async () => {
    const wrapper = shallow(VAutocomplete, {
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
    const wrapper = shallow(VAutocomplete, {
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
    const wrapper = shallow(VAutocomplete, {
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
    const wrapper = shallow(VAutocomplete)

    const input = wrapper.first('input')

    expect(input.hasStyle('display', 'none'))

    wrapper.trigger('focus')

    expect(input.hasStyle('display', 'block'))
  })

  it('should not filter text with no items', async () => {
    const wrapper = shallow(VAutocomplete, {
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
    const wrapper = shallow(VAutocomplete, {
      propsData: {
        items: [1 ,2],
        value: 1
      }
    })

    const input = wrapper.first('input')
    input.trigger('focus')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isMenuActive).toBe(false)

    wrapper.setProps({
      items: [
        { text: 'Foo', value: 1 },
        { text: 'Bar', value: 2 }
      ]
    })

    input.trigger('blur')
    await wrapper.vm.$nextTick()

    input.trigger('focus')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isMenuActive).toBe(false)
  })

  it('should emit custom value on blur', async () => {
    const wrapper = shallow(VAutocomplete, {
      propsData: { combobox: true }
    })

    const input = wrapper.first('input')

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    input.trigger('focus')
    await wrapper.vm.$nextTick()

    input.element.value = 'foo'
    input.trigger('input')

    input.trigger('blur')
    expect(change).toHaveBeenCalledWith('foo')

    input.trigger('keydown.esc')
    expect(wrapper.vm.isMenuActive).toBe(false)

    input.element.value = ''
    input.trigger('input')

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isMenuActive).toBe(false)
  })



  it('should change selected index', async () => {
    const wrapper = shallow(VAutocomplete, {
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
    wrapper.vm.changeSelectedIndex(39)
    expect(wrapper.vm.selectedIndex).toBe(0)

    wrapper.vm.changeSelectedIndex(39)
    expect(wrapper.vm.selectedIndex).toBe(1)

    wrapper.vm.changeSelectedIndex(39)
    expect(wrapper.vm.selectedIndex).toBe(2)

    // Left arrow
    wrapper.vm.changeSelectedIndex(37)
    expect(wrapper.vm.selectedIndex).toBe(1)

    wrapper.vm.changeSelectedIndex(37)
    expect(wrapper.vm.selectedIndex).toBe(0)

    wrapper.vm.changeSelectedIndex(37)
    expect(wrapper.vm.selectedIndex).toBe(-1)

    wrapper.vm.changeSelectedIndex(37)
    expect(wrapper.vm.selectedIndex).toBe(2)

    wrapper.vm.changeSelectedIndex(37)
    expect(wrapper.vm.selectedIndex).toBe(1)

    // Delete key
    wrapper.vm.changeSelectedIndex(8)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.selectedIndex).toBe(1)

    wrapper.vm.changeSelectedIndex(37)
    expect(wrapper.vm.selectedIndex).toBe(0)

    wrapper.vm.changeSelectedIndex(8)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.selectedIndex).toBe(0)

    // Should not change index if search is dirty
    wrapper.setProps({ searchInput: 'foo' })
    wrapper.vm.changeSelectedIndex(8)

    expect(wrapper.vm.selectedIndex).toBe(0)
    expect(wrapper.vm.selectedItems.length).toBe(1)

    wrapper.setProps({ searchInput: undefined })

    // Should not proceed if keyCode doesn't match
    wrapper.vm.changeSelectedIndex(99)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedIndex).toBe(0)
    expect(wrapper.vm.selectedItems.length).toBe(1)

    wrapper.vm.changeSelectedIndex(8)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedItems.length).toBe(0)
    expect(wrapper.vm.selectedIndex).toBe(-1)

    // Should not change/error if called with no selection
    wrapper.vm.changeSelectedIndex(8)
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
    wrapper.vm.changeSelectedIndex(46)
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

    // Should not show menu
    wrapper.setProps({
      combobox: true,
      searchInput: 'foobar'
    })

    expect(wrapper.vm.menuCanShow).toBe(false)

    slot.trigger('click')

    expect(wrapper.vm.isMenuActive).toBe(false)

    // TODO: Add expects for tags when impl
  })

  it('should have the correct selected item', async () => {
    const wrapper = shallow(VAutocomplete, {
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
    const wrapper = shallow(VAutocomplete, {
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

  it('should call methods on blur', () => {
    const updateTags = jest.fn()
    const updateCombobox = jest.fn()
    const updateAutocomplete = jest.fn()
    const wrapper = shallow(VAutocomplete, {
      methods: {
        updateAutocomplete,
        updateCombobox,
        updateTags
      }
    })

    wrapper.vm.onEnterDown()

    expect(updateAutocomplete).toHaveBeenCalledTimes(1)

    wrapper.setProps({ combobox: true })

    wrapper.vm.onEnterDown()

    expect(updateCombobox).toHaveBeenCalledTimes(1)

    wrapper.setProps({
      combobox: false,
      tags: true
    })

    wrapper.vm.onEnterDown()

    expect(updateTags).toHaveBeenCalledTimes(1)
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

  it('should react to tabs', async () => {
    const updateTags = jest.fn()
    const wrapper = mount(VAutocomplete, {
      propsData: {
        items: ['fizz', 'buzz'],
        tags: true
      },
      methods: {
        updateTags
      }
    })

    const input = wrapper.first('input')
    const menu = wrapper.first('.v-menu')
    const tile = wrapper.first('.v-list__tile')

    input.trigger('focus')
    input.element.value = 'foo'
    input.trigger('input')
    input.trigger('keydown.tab')

    expect(wrapper.vm.getMenuIndex()).toBe(-1)
    expect(updateTags).toBeCalled()

    input.trigger('focus')
    input.element.value = 'fizz'
    input.trigger('input')
    menu.trigger('keydown.down')

    // Allow dom to update class for
    // selected tile
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isMenuActive).toBe(true)
    expect(wrapper.vm.getMenuIndex()).toBe(0)

    input.trigger('keydown.tab')

    // We overwrite update tags so above
    // is does not persist
    expect(wrapper.vm.internalValue).toEqual(['fizz'])
    expect(updateTags).toHaveBeenCalledTimes(2)
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

    wrapper.setProps({ hideSelections: true })

    expect(wrapper.vm.genSelections()).toEqual([])
  })

  // https://github.com/vuetifyjs/vuetify/issues/3793
  it('should reset menu index after selection', async () => {
    const wrapper = shallow(VAutocomplete, {
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

    expect(wrapper.vm.internalSearch).toBe(null)
  })
})
