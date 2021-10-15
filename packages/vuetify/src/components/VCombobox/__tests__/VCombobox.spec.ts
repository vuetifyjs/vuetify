// Components
import VCombobox from '../VCombobox'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VCombobox.ts', () => {
  type Instance = InstanceType<typeof VCombobox>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    document.body.setAttribute('data-app', 'true')

    mountFunction = (options = {}) => {
      return mount(VCombobox, {
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

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should evaluate the range of an integer', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: 11,
      },
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentRange).toBe(2)

    wrapper.setProps({ value: 0 })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentRange).toBe(1)
  })

  it('should not use search input when blurring', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        eager: true,
        items: [1, 12],
      },
    })

    const event = jest.fn()
    wrapper.vm.$on('input', event)

    const input = wrapper.find('input')
    input.trigger('focus')
    await wrapper.vm.$nextTick()

    wrapper.setProps({ searchInput: '1' })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalSearch).toBe('1')

    const list = wrapper.findAll('.v-list-item').at(1)
    list.trigger('click')
    await wrapper.vm.$nextTick()
    expect(event).toHaveBeenCalledWith(12)
  })

  it('should not use search input if an option is selected from the menu', async () => {
    const item = { value: 123, text: 'Foo' }
    const wrapper = mountFunction({
      propsData: {
        items: [item],
      },
    })

    const event = jest.fn()
    wrapper.vm.$on('input', event)

    wrapper.setData({ isMenuActive: true })
    await wrapper.vm.$nextTick()

    wrapper.vm.selectItem(item)
    await wrapper.vm.$nextTick()

    wrapper.setData({ isMenuActive: false })
    await wrapper.vm.$nextTick()

    expect(event).toHaveBeenCalledWith(item)
  })

  it('should not populate search field if value is falsey', async () => {
    const wrapper = mountFunction()

    const event = jest.fn()
    wrapper.vm.$on('input', event)

    wrapper.setData({ isMenuActive: true })
    await wrapper.vm.$nextTick()

    wrapper.setProps({ searchInput: '' })
    await wrapper.vm.$nextTick()

    wrapper.setData({ isMenuActive: false })
    await wrapper.vm.$nextTick()

    expect(event).not.toHaveBeenCalled()
  })

  // TODO: fails with TS 3.9
  it.skip('should clear value', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
    })
    await wrapper.vm.$nextTick()

    const change = jest.fn()
    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement

    wrapper.vm.$on('change', change)
    wrapper.vm.$on('input', change)

    input.trigger('focus')
    element.value = 'foo'
    input.trigger('input')
    input.trigger('keydown.enter')

    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalledWith('foo')
    expect(change).toHaveBeenCalledTimes(2)
    expect(wrapper.vm.internalValue).toBe('foo')

    element.value = ''
    input.trigger('input')
    input.trigger('keydown.enter')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toBe('')
    expect(change).toHaveBeenCalledTimes(4)
  })

  it('should call methods on blur', async () => {
    const updateCombobox = jest.fn()
    const wrapper = mountFunction({
      attachToDocument: true,
      methods: {
        updateCombobox,
      },
    })

    const e = { preventDefault: jest.fn() }
    wrapper.vm.onEnterDown(e)

    await wrapper.vm.$nextTick()

    // https://github.com/vuetifyjs/vuetify/issues/4974
    expect(e.preventDefault).toHaveBeenCalled()
    expect(updateCombobox).toHaveBeenCalledTimes(1)
  })

  it('should emit custom value on blur', async () => {
    const wrapper = mountFunction()

    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    input.trigger('focus')
    await wrapper.vm.$nextTick()

    element.value = 'foo'
    input.trigger('input')

    input.trigger('keydown.enter')
    await wrapper.vm.$nextTick()
    expect(change).toHaveBeenCalledWith('foo')

    input.trigger('keydown.esc')
    expect(wrapper.vm.isMenuActive).toBe(false)

    element.value = ''
    input.trigger('input')

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isMenuActive).toBe(false)
  })

  it('should conditionally show the menu', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        items: ['foo', 'bar', 'fizz'],
        searchInput: 'foobar',
      },
    })

    const slot = wrapper.find('.v-input__slot')
    const input = wrapper.find('input')

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
      { text: 'Vuetify', value: 3 },
    ]
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        items,
      },
    })

    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement

    const event = jest.fn()
    wrapper.vm.$on('input', event)

    input.trigger('focus')
    element.value = 'Programming'
    input.trigger('input')
    wrapper.vm.selectItem(items[0])

    expect(wrapper.vm.isFocused).toBe(true)
    expect(event).toHaveBeenCalledWith(items[0])

    input.trigger('keydown.tab')

    expect(wrapper.vm.isFocused).toBe(false)
    expect(wrapper.vm.internalValue).toEqual(items[0])
  })

  // https://github.com/vuetifyjs/vuetify/issues/5008
  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should select item if menu index is greater than -1', async () => {
    const selectItem = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        items: ['foo'],
      },
      methods: { selectItem },
    })

    const input = wrapper.find('input')

    input.trigger('focus')
    input.trigger('keydown.enter')
    input.trigger('keydown.down')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.getMenuIndex()).toBe(0)

    input.trigger('keydown.enter')

    expect(selectItem).toHaveBeenCalledWith('foo')
  })

  // https://github.com/vuetifyjs/vuetify/issues/8476
  it('should properly compare falsey values when setting', async () => {
    const wrapper = mountFunction()

    wrapper.vm.setValue(0)
    expect(wrapper.vm.internalValue).toBe(0)

    wrapper.vm.setValue('')
    expect(wrapper.vm.internalValue).toBe('')

    wrapper.vm.setValue(null)
    expect(wrapper.vm.internalValue).toBeUndefined()

    wrapper.vm.setValue(undefined)
    expect(wrapper.vm.internalValue).toBeUndefined()

    wrapper.setData({ lazySearch: 'foo' })

    wrapper.vm.setValue(null)
    expect(wrapper.vm.internalValue).toBe('foo')

    wrapper.vm.setValue(undefined)
    expect(wrapper.vm.internalValue).toBe('foo')
  })

  it('should change autocomplete attribute', () => {
    const wrapper = mountFunction({
      attrs: {
        autocomplete: 'on',
      },
    })

    expect(wrapper.vm.$attrs.autocomplete).toBe('on')
  })

  // https://github.com/vuetifyjs/vuetify/issues/6607
  it('should select first row when autoSelectFirst true is applied', async () => {
    const wrapper = mountFunction({
      propsData: {
        autoSelectFirst: true,
        items: [
          { text: 'Learn JavaScript', done: false },
          { text: 'Learn Vue', done: false },
          { text: 'Play around in JSFiddle', done: true },
          { text: 'Build something awesome', done: true },
        ],
      },
    })

    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement

    const listIndexUpdate = jest.fn()
    wrapper.vm.$on('update:list-index', listIndexUpdate)

    input.trigger('focus')
    await wrapper.vm.$nextTick()
    element.value = 'L'
    input.trigger('input')
    await wrapper.vm.$nextTick()

    expect(listIndexUpdate.mock.calls.length === 1).toBe(true)
    expect(listIndexUpdate.mock.calls[0][0]).toBe(0)
  })
})
