// Components
import VSelect from '../VSelect'

// Utilities
import { waitAnimationFrame } from '../../../../test'
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VSelect.ts', () => {
  type Instance = InstanceType<typeof VSelect>
  let mountFunction: (options?: object) => Wrapper<Instance>
  let el

  (global as any).performance = {
    now: () => {},
  }
  beforeEach(() => {
    mountFunction = (options = {}) => {
      el = document.createElement('div')
      el.setAttribute('data-app', 'true')
      document.body.appendChild(el)

      return mount(VSelect, {
        // https://github.com/vuejs/vue-test-utils/issues/1130
        sync: false,
        ...options,
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

  afterEach(() => {
    document.body.removeChild(el)
  })

  // https://github.com/vuetifyjs/vuetify/issues/4359
  // Vue modifies the `on` property of the
  // computed `listData` — easiest way to fix
  it('should select value when using a scoped slot', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['foo', 'bar'],
      },
      slots: {
        'no-data': {
          render: h => h('div', 'No Data'),
        },
      },
    })

    // Will be undefined if fails
    expect(wrapper.vm.listData.on).toBeTruthy()
  })

  // https://github.com/vuetifyjs/vuetify/issues/4431
  it('should accept null and "" as values', async () => {
    const wrapper = mountFunction({
      propsData: {
        clearable: true,
        items: [
          { text: 'Foo', value: null },
          { text: 'Bar', value: 'bar' },
        ],
        value: null,
      },
    })

    expect(wrapper.vm.selectedItems).toHaveLength(1)
    expect(wrapper.vm.isDirty).toBe(true)
  })

  it('should only calls change once when clearing', async () => {
    const wrapper = mountFunction({
      propsData: {
        clearable: true,
        items: ['foo'],
        value: 'foo',
      },
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    const icon = wrapper.find('.v-input__icon > .v-icon')

    icon.trigger('click')

    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalledTimes(1)
  })

  it('should not call change when model updated externally', async () => {
    const change = jest.fn()
    const wrapper = mountFunction()

    wrapper.vm.$on('change', change)

    wrapper.setProps({ value: 'bar' })

    expect(change).not.toHaveBeenCalled()

    wrapper.vm.setValue('foo')

    expect(change).toHaveBeenCalledWith('foo')
    expect(change).toHaveBeenCalledTimes(1)
  })

  // https://github.com/vuetifyjs/vuetify/issues/4713
  it('should nudge select menu', () => {
    const wrapper = mountFunction({
      propsData: {
        menuProps: {
          nudgeTop: 5,
          nudgeRight: 5,
          nudgeBottom: 5,
          nudgeLeft: 5,
        },
      },
    })

    const menu = wrapper.vm.$refs.menu

    expect(menu.nudgeTop).toBe(5)
    expect(menu.nudgeRight).toBe(5)
    expect(menu.nudgeBottom).toBe(5)
    expect(menu.nudgeLeft).toBe(5)
  })

  // https://github.com/vuetifyjs/vuetify/issues/5774
  it('should close menu on tab down when no selectedIndex', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['foo', 'bar'],
      },
    })

    const menu = wrapper.find('.v-input__slot')
    const input = wrapper.find('input')

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
    const wrapper = mountFunction({
      propsData: {
        items: ['aaa', 'foo', 'faa'],
      },
    })

    const input = wrapper.find('input')
    input.trigger('focus')
    await wrapper.vm.$nextTick()

    input.trigger('keypress', { key: 'f' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toEqual('foo')

    input.trigger('keypress', { key: 'a' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toEqual('faa')
  })

  // https://github.com/vuetifyjs/vuetify/issues/10406
  it('should load more items when typing', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: Array.from({ length: 24 }, (_, i) => 'Item ' + i).concat('foo'),
      },
    })

    const input = wrapper.find('input')
    input.trigger('focus')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.virtualizedItems).toHaveLength(20)

    input.trigger('keypress', { key: 'f' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toEqual('foo')
    expect(wrapper.vm.virtualizedItems).toHaveLength(25)
  })

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should have the correct a11y attributes', async () => {
    const wrapper = mountFunction({
      propsData: {
        eager: true,
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        value: 'Foo',
      },
    })
    await wrapper.vm.$nextTick()

    const inputSlot = wrapper.find('.v-input__slot')

    expect(inputSlot.element.getAttribute('role')).toBe('button')
    expect(inputSlot.element.getAttribute('aria-haspopup')).toBe('listbox')
    expect(inputSlot.element.getAttribute('aria-expanded')).toBe('false')
    expect(inputSlot.element.getAttribute('aria-owns')).toBe(wrapper.vm.computedOwns)

    const list = wrapper.find('.v-select-list')
    let items = list.findAll('.v-list-item')

    expect(list.element.children[0].getAttribute('role')).toBe('listbox')
    expect(list.element.children[0].id).toBe(wrapper.vm.computedOwns)
    expect(items.at(0).element.getAttribute('role')).toBe('option')
    expect(items.at(0).element.getAttribute('aria-selected')).toBe('true')
    expect(items.at(1).element.getAttribute('aria-selected')).toBe('false')

    wrapper.setProps({ value: 'Bar' })

    items = list.findAll('.v-list-item')
    expect(items.at(0).element.getAttribute('aria-selected')).toBe('false')
    expect(items.at(1).element.getAttribute('aria-selected')).toBe('true')

    const item = items.at(0)
    const generatedId = item.find('.v-list-item__title').element.id

    expect(generatedId).toMatch(/^foo-list-item-\d+$/)
    expect(item.element.getAttribute('aria-labelledby')).toBe(generatedId)
  })

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should not reset menu index when hide-on-selected is used', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      },
    })

    const input = wrapper.find('input')
    input.trigger('click')

    await wrapper.vm.$nextTick()

    input.trigger('keydown.down')

    expect(wrapper.vm.$refs.menu.listIndex).toBe(0)

    input.trigger('keydown.enter')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toBe('Foo')
    expect(wrapper.vm.$refs.menu.listIndex).toBe(0)

    wrapper.setProps({ value: null, hideSelected: true })
    input.trigger('keydown.enter')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toBe('Foo')
    expect(wrapper.vm.$refs.menu.listIndex).toBe(-1)
  })

  it('should not change value when typing on readonly field', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        readonly: true,
        value: 'Foo',
      },
    })

    const input = wrapper.find('input')
    input.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toBe('Foo')

    input.trigger('keypress', { key: 'b' })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toBe('Foo')

    input.trigger('keydown.up')

    // Wait for keydown event to propagate
    await wrapper.vm.$nextTick()

    // Waiting for items to be rendered
    await waitAnimationFrame()

    expect(wrapper.vm.internalValue).toBe('Foo')
  })

  it('should emit listIndex event when navigated by keyboard', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['foo', 'bar'],
      },
    })

    const listIndexUpdate = jest.fn()
    wrapper.vm.$on('update:list-index', listIndexUpdate)

    const input = wrapper.find('input')
    const slot = wrapper.find('.v-input__slot')
    slot.trigger('click')

    input.trigger('keydown.down')
    await wrapper.vm.$nextTick()
    expect(listIndexUpdate).toHaveBeenCalledWith(0)
    input.trigger('keydown.down')
    await wrapper.vm.$nextTick()
    expect(listIndexUpdate).toHaveBeenCalledWith(1)
  })

  it('should close menu when append icon is clicked', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['foo', 'bar'],
      },
    })

    const append = wrapper.find('.v-input__append-inner')
    const slot = wrapper.find('.v-input__slot')
    slot.trigger('click')
    expect(wrapper.vm.isMenuActive).toBe(true)
    append.trigger('mousedown')
    append.trigger('mouseup')
    append.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isMenuActive).toBe(false)
  })

  it('should open menu when append icon is clicked', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['foo', 'bar'],
      },
    })

    const append = wrapper.find('.v-input__append-inner')

    append.trigger('mousedown')
    append.trigger('mouseup')
    append.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isMenuActive).toBe(true)
  })

  // https://github.com/vuetifyjs/vuetify/issues/9960
  it('should not manipulate menu state if is readonly or disabled', async () => {
    const wrapper = mountFunction({
      data: () => ({ hasMouseDown: true }),
      propsData: { readonly: true },
    })

    const icon = wrapper.find('.v-input__append-inner')

    icon.trigger('mousedown')
    icon.trigger('mouseup')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isMenuActive).toBe(false)

    wrapper.setProps({
      disabled: true,
      readonly: undefined,
    })

    icon.trigger('mousedown')
    icon.trigger('mouseup')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isMenuActive).toBe(false)

    wrapper.setProps({ disabled: undefined })

    icon.trigger('mousedown')
    icon.trigger('mouseup')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isMenuActive).toBe(true)
  })

  it('should emit click event', async () => {
    const item = { value: 'hello', text: 'Hello' }
    const wrapper = mountFunction({
      propsData: {
        value: 'hello',
        items: [item],
      },
    })

    const click = jest.fn()
    wrapper.vm.$on('click', click)

    const select = wrapper.find('.v-input__slot')
    select.trigger('click')

    await wrapper.vm.$nextTick()

    expect(click).toHaveBeenCalledTimes(1)
  })
})
