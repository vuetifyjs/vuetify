// Components
import VSelect from '../VSelect'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

// eslint-disable-next-line max-statements
describe('VSelect.ts', () => {
  type Instance = InstanceType<typeof VSelect>
  let mountFunction: (options?: object) => Wrapper<Instance>
  let el

  beforeEach(() => {
    el = document.createElement('div')
    el.setAttribute('data-app', 'true')
    document.body.appendChild(el)
    mountFunction = (options = {}) => {
      return mount(VSelect, {
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
        ...options,
      })
    }
  })

  afterEach(() => {
    document.body.removeChild(el)
  })

  it('should select an item !multiple', async () => {
    const wrapper = mountFunction()

    const input = jest.fn()
    const change = jest.fn()
    wrapper.vm.$on('input', input)
    wrapper.vm.$on('change', change)

    wrapper.vm.selectItem('foo')

    expect(wrapper.vm.internalValue).toBe('foo')
    expect(input).toHaveBeenCalledWith('foo')
    expect(input).toHaveBeenCalledTimes(1)

    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalledWith('foo')
    expect(change).toHaveBeenCalledTimes(1)

    wrapper.setProps({ returnObject: true })

    const item = { foo: 'bar' }
    wrapper.vm.selectItem(item)

    expect(wrapper.vm.internalValue).toBe(item)
    expect(input).toHaveBeenCalledWith(item)
    expect(input).toHaveBeenCalledTimes(2)

    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalledWith(item)
    expect(change).toHaveBeenCalledTimes(2)
  })

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should disable v-list-item', async () => {
    const selectItem = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        eager: true,
        items: [{ text: 'foo', disabled: true, id: 0 }],
      },
      methods: { selectItem },
    })

    const el = wrapper.find('.v-list-item')

    el.element.click()

    expect(selectItem).not.toHaveBeenCalled()

    wrapper.setProps({
      items: [{ text: 'foo', disabled: false, id: 0 }],
    })

    await wrapper.vm.$nextTick()

    el.element.click()

    expect(selectItem).toHaveBeenCalled()
  })

  it('should update menu status and focus when menu closes', async () => {
    const wrapper = mountFunction()
    const menu = wrapper.vm.$refs.menu

    wrapper.setData({
      isMenuActive: true,
      isFocused: true,
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

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should update model when chips are removed', async () => {
    const selectItem = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        chips: true,
        deletableChips: true,
        items: ['foo'],
        value: 'foo',
      },
      methods: { selectItem },
    })

    const input = jest.fn()
    const change = jest.fn()

    wrapper.vm.$on('input', input)

    expect(wrapper.vm.internalValue).toEqual('foo')
    wrapper.find('.v-chip__close').trigger('click')

    expect(input).toHaveBeenCalledTimes(1)

    wrapper.setProps({
      items: ['foo', 'bar'],
      multiple: true,
      value: ['foo', 'bar'],
    })
    wrapper.vm.$on('change', change)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toEqual(['foo', 'bar'])
    wrapper.find('.v-chip__close').trigger('click')

    await wrapper.vm.$nextTick()

    expect(selectItem).toHaveBeenCalledTimes(1)
  })

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should set selected index', async () => {
    const wrapper = mountFunction({
      propsData: {
        chips: true,
        deletableChips: true,
        multiple: true,
        items: ['foo', 'bar', 'fizz', 'buzz'],
        value: ['foo', 'bar', 'fizz', 'buzz'],
      },
    })

    expect(wrapper.vm.selectedIndex).toBe(-1)

    const foo = wrapper.find('.v-chip')
    foo.trigger('click')

    expect(wrapper.vm.selectedIndex).toBe(0)

    wrapper.findAll('.v-chip').at(1).trigger('click')

    expect(wrapper.vm.selectedIndex).toBe(1)

    wrapper.setProps({ disabled: true })

    wrapper.find('.v-chip').trigger('click')

    expect(wrapper.vm.selectedIndex).toBe(1)
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

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should cache items', async () => {
    const wrapper = mountFunction({
      propsData: {
        cacheItems: true,
        items: [],
      },
    })

    wrapper.setProps({ items: ['bar', 'baz'] })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.computedItems).toHaveLength(2)

    wrapper.setProps({ items: ['foo'] })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.computedItems).toHaveLength(3)

    wrapper.setProps({ items: ['bar'] })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.computedItems).toHaveLength(3)
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

  it('should have an affix', async () => {
    const wrapper = mountFunction({
      propsData: {
        prefix: '$',
        suffix: 'lbs',
      },
    })

    expect(wrapper.find('.v-text-field__prefix').element.innerHTML).toBe('$')
    expect(wrapper.find('.v-text-field__suffix').element.innerHTML).toBe('lbs')

    wrapper.setProps({ prefix: undefined, suffix: undefined })

    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('.v-text-field__prefix')).toHaveLength(0)
    expect(wrapper.findAll('.v-text-field__suffix')).toHaveLength(0)
  })

  it('should use custom clear icon cb', async () => {
    const clearIconCb = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        clearable: true,
        items: ['foo'],
        value: 'foo',
      },
    })

    wrapper.vm.$on('click:clear', clearIconCb)
    wrapper.find('.v-input__icon--clear .v-icon').trigger('click')

    expect(clearIconCb).toHaveBeenCalled()
  })

  it('should populate select[multiple=false] when using value as an object', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        items: [
          { text: 'foo', value: { id: { subid: 1 } } },
          { text: 'foo', value: { id: { subid: 2 } } },
        ],
        multiple: false,
        value: { id: { subid: 2 } },
      },
    })

    const selections = wrapper.findAll('.v-select__selection')

    expect(selections).toHaveLength(1)
  })

  it('should add color to selected index', async () => {
    const wrapper = mountFunction({
      propsData: {
        multiple: true,
        items: ['foo', 'bar'],
        value: ['foo'],
      },
    })

    wrapper.vm.selectedIndex = 0

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not react to click when disabled', async () => {
    const wrapper = mountFunction({
      propsData: { items: ['foo', 'bar'] },
    })

    const slot = wrapper.find('.v-input__slot')

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

  it('should set the menu index', async () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.getMenuIndex()).toBe(-1)

    wrapper.vm.setMenuIndex(1)

    expect(wrapper.vm.getMenuIndex()).toBe(1)
  })

  // Inspired by https://github.com/vuetifyjs/vuetify/pull/1425 - Thanks @kevmo314
  it('should open the select when enter is pressed', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['foo', 'bar'],
      },
    })

    wrapper.find('input').trigger('keydown.enter')
    await wrapper.vm.$nextTick()

    expect(document.body.querySelector('[data-app="true"]')).toMatchSnapshot()
  })

  it('should open the select when space is pressed', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['foo', 'bar'],
      },
    })

    wrapper.find('input').trigger('keydown.space')
    await wrapper.vm.$nextTick()

    expect(document.body.querySelector('[data-app="true"]')).toMatchSnapshot()
  })

  it('should open the select is multiple and key up is pressed', async () => {
    const wrapper = mountFunction({
      propsData: {
        multiple: true,
        items: ['foo', 'bar'],
      },
    })

    wrapper.find('input').trigger('keydown.up')
    await wrapper.vm.$nextTick()

    expect(document.body.querySelector('[data-app="true"]')).toMatchSnapshot()
  })

  it('should open the select is multiple and key down is pressed', async () => {
    const wrapper = mountFunction({
      propsData: {
        multiple: true,
        items: ['foo', 'bar'],
      },
    })

    wrapper.find('input').trigger('keydown.down')
    await wrapper.vm.$nextTick()

    expect(document.body.querySelector('[data-app="true"]')).toMatchSnapshot()
  })

  it('should return full items if using auto prop', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: [...Array(100).keys()],
      },
    })

    expect(wrapper.vm.virtualizedItems).toHaveLength(20)

    wrapper.setProps({ menuProps: 'auto' })

    expect(wrapper.vm.virtualizedItems).toHaveLength(100)
  })

  it('should fallback to using text as value if none present', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: [{
          text: 'foo',
        }],
      },
    })

    expect(wrapper.vm.getValue(wrapper.vm.items[0])).toBe('foo')
  })

  it('should accept arrays as values', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: [
          { text: 'Foo', value: ['bar'] },
        ],
      },
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.vm.selectItem(wrapper.vm.items[0])

    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenCalledWith(['bar'])
    expect(wrapper.vm.selectedItems).toEqual([
      { text: 'Foo', value: ['bar'] },
    ])
  })

  it('should update inner input element', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['foo', 'bar', 'fizz', 'buzz'],
        value: ['fizz'],
      },
    })

    const inputs = wrapper.findAll('input')
    const element = inputs.at(1).element

    expect(element.value).toEqual('fizz')

    wrapper.vm.selectItem(wrapper.vm.items[1])

    await wrapper.vm.$nextTick()

    expect(element.value).toEqual('bar')
  })

  it('should pass the name attribute to the inner input element', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['foo'],
        name: ['bar'],
      },
    })

    const inputs = wrapper.findAll('input')
    const element = inputs.at(1).element

    expect(element.name).toEqual('bar')
  })
})
