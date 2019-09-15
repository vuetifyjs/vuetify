// Components
import VAutocomplete from '../VAutocomplete'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'
import { keyCodes } from '../../../util/helpers'

describe('VAutocomplete.ts', () => {
  type Instance = InstanceType<typeof VAutocomplete>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    document.body.setAttribute('data-app', 'true')

    mountFunction = (options = {}) => {
      return mount(VAutocomplete, {
        ...options,
        // https://github.com/vuejs/vue-test-utils/issues/1130
        sync: false,
        mocks: {
          $vuetify: {
            lang: {
              t: (val: string) => val,
            },
            theme: {
              dark: false,
            },
          },
        },
      })
    }
  })

  it('should have explicit tabindex passed through when autocomplete', () => {
    const wrapper = mountFunction({
      attrs: {
        tabindex: 10,
      },
    })

    expect(wrapper.vm.$refs.input.tabIndex).toBe(10)
    expect(wrapper.vm.$el.tabIndex).toBe(-1)
  })

  it('should emit search input changes', async () => {
    const wrapper = mountFunction({
      propsData: {
      },
    })

    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement

    const update = jest.fn()
    wrapper.vm.$on('update:search-input', update)

    element.value = 'test'
    input.trigger('input')

    await wrapper.vm.$nextTick()

    expect(update).toHaveBeenCalledWith('test')
  })

  it('should filter autocomplete search results', async () => {
    const wrapper = mountFunction({
      propsData: { items: ['foo', 'bar'] },
    })

    wrapper.setData({ internalSearch: 'foo' })

    expect(wrapper.vm.filteredItems).toHaveLength(1)
    expect(wrapper.vm.filteredItems[0]).toBe('foo')
  })

  it('should filter numeric primitives', () => {
    const wrapper = mountFunction({
      propsData: {
        items: [1, 2],
      },
    })

    wrapper.setData({ internalSearch: 1 })

    expect(wrapper.vm.filteredItems).toHaveLength(1)
    expect(wrapper.vm.filteredItems[0]).toBe(1)
  })

  it('should activate when search changes and not active', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: [1, 2, 3, 4],
        multiple: true,
      },
    })

    wrapper.vm.isMenuActive = true
    await wrapper.vm.$nextTick()
    wrapper.setData({ internalSearch: 2 })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isMenuActive).toBe(true)
  })

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should set searchValue to null when deactivated', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: [1, 2, 3, 4],
        multiple: true,
      },
    })

    await wrapper.vm.$nextTick()

    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement

    input.trigger('focus')
    element.value = '2'
    input.trigger('input')

    expect(wrapper.vm.internalSearch).toBe('2')

    wrapper.setProps({
      multiple: false,
      value: 1,
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalSearch).toBe(1)

    input.trigger('focus')
    element.value = '3'
    input.trigger('input')
    input.trigger('blur')

    expect(wrapper.vm.internalSearch).toBe('3')
  })

  it('should render role=combobox correctly when autocomplete', async () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.$el.getAttribute('role')).toBeFalsy()

    const input = wrapper.find('.v-input__slot')
    expect(input.element.getAttribute('role')).toBe('combobox')
  })

  it('should not duplicate items after items update when caching is turned on', async () => {
    const wrapper = mountFunction({
      propsData: {
        cacheItems: true,
        returnObject: true,
        itemText: 'text',
        itemValue: 'id',
        items: [],
      },
    })

    wrapper.setProps({ items: [{ id: 1, text: 'A' }] })
    expect(wrapper.vm.computedItems).toHaveLength(1)
    wrapper.setProps({ items: [{ id: 1, text: 'A' }] })
    expect(wrapper.vm.computedItems).toHaveLength(1)
  })

  it('should cache items passed via prop', async () => {
    const wrapper = mountFunction({
      propsData: {
        cacheItems: true,
        items: [1, 2, 3, 4],
      },
    })

    expect(wrapper.vm.computedItems).toHaveLength(4)

    wrapper.setProps({ items: [5] })

    expect(wrapper.vm.computedItems).toHaveLength(5)
  })

  it('should not filter text with no items', async () => {
    const wrapper = mountFunction({
      propsData: {
        eager: true,
        items: ['foo', 'bar'],
      },
    })

    await wrapper.vm.$nextTick()

    wrapper.setProps({ searchInput: 'asdf' })

    // Wait for watcher
    await wrapper.vm.$nextTick()

    const tile = wrapper.find('.v-list-item__title')

    expect(tile.text()).toBe('$vuetify.noDataText')
  })

  it('should not display menu when tab focused', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: [1, 2],
        value: 1,
      },
    })

    const input = wrapper.find('input')
    input.trigger('focus')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isMenuActive).toBe(false)
  })

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  // eslint-disable-next-line max-statements
  it.skip('should change selected index', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        items: ['foo', 'bar', 'fizz'],
        multiple: true,
        value: ['foo', 'bar', 'fizz'],
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedIndex).toBe(-1)
    expect(wrapper.vm.selectedItems).toHaveLength(3)

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
    expect(wrapper.vm.selectedItems).toHaveLength(1)

    wrapper.setProps({ searchInput: undefined })

    // Should not proceed if keyCode doesn't match
    wrapper.vm.changeSelectedIndex(99)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedIndex).toBe(0)
    expect(wrapper.vm.selectedItems).toHaveLength(1)

    wrapper.vm.changeSelectedIndex(keyCodes.backspace)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedItems).toHaveLength(0)
    expect(wrapper.vm.selectedIndex).toBe(-1)

    // Should not change/error if called with no selection
    wrapper.vm.changeSelectedIndex(keyCodes.backspace)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedIndex).toBe(-1)

    wrapper.setProps({ value: ['foo', 'bar', 'fizz'] })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedItems).toHaveLength(3)

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
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        items: ['foo', 'bar', 'fizz'],
      },
    })

    const slot = wrapper.find('.v-input__slot')
    const input = wrapper.find('input')

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

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should have the correct selected item', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['foo', 'bar', 'fizz'],
        multiple: true,
        value: ['foo'],
      },
    })

    expect(wrapper.vm.selectedItem).toBeNull()

    wrapper.setProps({
      multiple: false,
      value: 'foo',
    })

    expect(wrapper.vm.selectedItem).toBe('foo')
  })

  it('should reset lazySearch', async () => {
    const wrapper = mountFunction({
      propsData: {
        chips: true,
        items: ['foo', 'bar', 'fizz'],
        searchInput: 'foo',
      },
    })

    expect(wrapper.vm.lazySearch).toBe('foo')
    expect(wrapper.vm.hasSlot).toBe(true)

    wrapper.setData({ isMenuActive: true })
    await wrapper.vm.$nextTick()
    wrapper.setData({ isMenuActive: false })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.lazySearch).toBeUndefined()
  })

  it('should select input text on focus', async () => {
    const wrapper = mountFunction()
    const select = jest.fn()
    wrapper.vm.$refs.input.select = select

    const input = wrapper.find('input')
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
    const wrapper = mountFunction({
      propsData: { disabled: true },
      methods: { onFocus },
    })
    const slot = wrapper.find('.v-input__slot')

    slot.trigger('click')

    expect(onFocus).not.toHaveBeenCalled()

    wrapper.setProps({ disabled: false, readonly: true })

    slot.trigger('click')

    expect(onFocus).not.toHaveBeenCalled()

    wrapper.setProps({ readonly: false })

    slot.trigger('click')

    expect(onFocus).toHaveBeenCalled()
  })

  it('should react to keydown', () => {
    const activateMenu = jest.fn()
    const changeSelectedIndex = jest.fn()
    const onEscDown = jest.fn()
    const onTabDown = jest.fn()
    const wrapper = mountFunction({
      methods: {
        activateMenu,
        changeSelectedIndex,
        onEscDown,
        onTabDown,
      },
    })

    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement

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

    element.value = 'foo'
    input.trigger('input')

    wrapper.setProps({ hideSelected: true })

    expect(wrapper.vm.genSelections()).toEqual([])
  })
})
