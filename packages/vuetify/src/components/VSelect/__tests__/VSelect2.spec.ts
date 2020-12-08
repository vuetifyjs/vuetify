// Components
import VSelect from '../VSelect'

// Utilities
import { keyCodes } from '../../../util/helpers'
import {
  mount,
  Wrapper,
} from '@vue/test-utils'
import { waitAnimationFrame } from '../../../../test'

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

  it('should use slotted prepend-item', () => {
    const wrapper = mountFunction({
      propsData: {
        eager: true,
        items: ['foo'],
      },
      slots: {
        'prepend-item': [{
          render: h => h('div', 'foo'),
        }],
      },
    })

    const list = wrapper.find('.v-list')

    expect(wrapper.vm.$slots['prepend-item']).toBeTruthy()
    expect(list.html()).toMatchSnapshot()
  })

  it('should use slotted append-item', () => {
    const wrapper = mountFunction({
      propsData: {
        eager: true,
        items: ['foo'],
      },
      slots: {
        'append-item': [{
          render: h => h('div', 'foo'),
        }],
      },
    })

    const list = wrapper.find('.v-list')

    expect(wrapper.vm.$slots['append-item']).toBeTruthy()
    expect(list.html()).toMatchSnapshot()
  })

  it('should use scoped slot for selection generation', () => {
    const wrapper = mountFunction({
      render (h) {
        return h(VSelect, {
          attrs: {
            items: ['foo', 'bar'],
            value: 'foo',
          },
          scopedSlots: {
            selection: ({ item }) => {
              return h('div', item + ' - from slot')
            },
          },
        })
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should toggle menu on icon click', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['foo', 'bar'],
        'menu-props': {
          offsetY: true,
        },
      },
    })

    const icon = wrapper.find('.v-icon')
    const slot = wrapper.find('.v-input__slot')

    expect(wrapper.vm.isMenuActive).toBe(false)

    slot.trigger('click')
    expect(wrapper.vm.isMenuActive).toBe(true)

    slot.trigger('click')
    expect(wrapper.vm.isMenuActive).toBe(true)

    // Mock mouseup event with a target of
    // the inner icon element
    const event = new Event('mouseup')
    Object.defineProperty(event, 'target', { writable: false, value: icon.element })

    wrapper.vm.hasMouseDown = true
    slot.element.dispatchEvent(event)

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isMenuActive).toBe(false)
  })

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should calculate the counter value', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['foo'],
        value: 'foo',
      },
    })

    expect(wrapper.vm.computedCounterValue).toBe(3)

    wrapper.setProps({
      items: [{
        text: 'foobarbaz',
        value: 'foo',
      }],
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.computedCounterValue).toBe(9)

    wrapper.setProps({
      items: ['foo', 'bar', 'baz'],
      multiple: true,
      value: ['foo', 'bar'],
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.computedCounterValue).toBe(2)
  })

  it('should emit a single change event', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        attach: true,
        items: ['foo', 'bar'],
      },
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    const menu = wrapper.find('.v-input__slot')

    menu.trigger('click')
    await wrapper.vm.$nextTick()

    wrapper.vm.selectItem('foo')
    await wrapper.vm.$nextTick()

    wrapper.vm.blur()
    await wrapper.vm.$nextTick()

    expect(change.mock.calls).toEqual([['foo']])
  })

  it('should not emit change event when clicked on the selected item', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['foo', 'bar'],
      },
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    wrapper.vm.selectItem('foo')
    await wrapper.vm.$nextTick()

    wrapper.vm.selectItem('foo')
    await wrapper.vm.$nextTick()

    expect(change.mock.calls).toHaveLength(1)
  })

  // Inspired by https://github.com/vuetifyjs/vuetify/pull/1425 - Thanks @kevmo314
  it('should open the select when focused and enter, space are pressed', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        items: ['foo', 'bar'],
      },
    })

    const input = wrapper.find('input')

    for (const key of ['space', 'enter']) {
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

  it('should not open the select when readonly and focused and enter, space, up or down are pressed', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        items: ['foo', 'bar'],
        readonly: true,
        menuProps: 'eager',
      },
    })

    const input = wrapper.find('input')

    for (const key of ['up', 'down', 'space', 'enter']) {
      input.trigger('focus')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isMenuActive).toBe(false)
      input.trigger(`keydown.${key}`)
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isMenuActive).toBe(false)
      await wrapper.vm.$nextTick()
    }
  })

  it('should clear input value', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        clearable: true,
        items: ['foo', 'bar'],
        value: 'foo',
      },
    })

    const clear = wrapper.find('.v-icon')

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toBe('foo')
    clear.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toBeUndefined()
    expect(input).toHaveBeenCalledWith(undefined)
  })

  it('should be clearable with prop, dirty and single select', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        clearable: true,
        items: [1, 2],
        value: 1,
      },
    })

    const clear = wrapper.find('.v-icon')

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toBe(1)
    expect(wrapper.html()).toMatchSnapshot()

    clear.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toBeUndefined()
    expect(wrapper.vm.isMenuActive).toBe(false)
  })

  it('should be clearable with prop, dirty and multi select', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        clearable: true,
        items: [1, 2],
        multiple: true,
        value: [1],
      },
    })

    const clear = wrapper.find('.v-icon')

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

    const wrapper = mountFunction({
      propsData: {
        items,
        value: 'foo',
      },
    })

    const wrapper2 = mountFunction({
      propsData: {
        items,
        multiple: true,
        value: ['foo', 'bar'],
      },
    })

    const wrapper3 = mountFunction({
      propsData: {
        items,
        value: null,
      },
    })

    expect(wrapper.vm.selectedItems).toHaveLength(1)
    expect(wrapper2.vm.selectedItems).toHaveLength(2)
    expect(wrapper3.vm.selectedItems).toHaveLength(0)
  })

  // #1704
  it('should populate select when using value as an object', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        items: [
          { text: 'foo', value: { id: 1 } },
          { text: 'foo', value: { id: 2 } },
        ],
        multiple: true,
        value: [{ id: 1 }],
      },
    })

    await wrapper.vm.$nextTick()

    const selections = wrapper.findAll('.v-select__selection')

    expect(selections.length).toBeGreaterThan(0)
  })

  // Discovered when working on #1704
  it('should remove item when re-selecting it', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        eager: true,
        items: [
          { text: 'bar', value: { id: 1 } },
          { text: 'foo', value: { id: 2 } },
        ],
        multiple: true,
        value: [{ id: 1 }],
      },
    })

    expect(wrapper.vm.selectedItems).toHaveLength(1)
    wrapper.trigger('click')
    const item = wrapper.find('div.v-list-item__action')
    item.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.selectedItems).toHaveLength(0)
  })

  it('should open menu when cleared with open-on-clear', async () => {
    const wrapper = mountFunction({
      propsData: {
        clearable: true,
        openOnClear: true,
        items: [1],
        value: 1,
      },
    })

    const clear = wrapper.find('.v-input__icon--clear .v-icon')

    clear.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isMenuActive).toBe(true)
  })

  /* eslint-disable-next-line max-statements */
  it('should react to different key down', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: [1, 2, 3, 4],
      },
    })
    const blur = jest.fn()
    wrapper.vm.$on('blur', blur)

    const event = new Event('keydown')
    event.keyCode = keyCodes.tab

    wrapper.vm.$refs.input.focus()
    wrapper.vm.onKeyDown(event)

    await waitAnimationFrame()

    expect(blur).toHaveBeenCalled()
    expect(wrapper.vm.isMenuActive).toBe(false)

    // Enter and Space
    for (const keyCode of [keyCodes.enter, keyCodes.space]) {
      event.keyCode = keyCode
      wrapper.vm.onKeyDown(event)
      expect(wrapper.vm.isMenuActive).toBe(true)

      await waitAnimationFrame()

      // Escape
      event.keyCode = keyCodes.esc
      wrapper.vm.onKeyDown(event)
      expect(wrapper.vm.isMenuActive).toBe(false)
    }

    // Down arrow
    event.keyCode = keyCodes.down
    expect(wrapper.vm.internalValue).toBeUndefined()

    wrapper.vm.onKeyDown(event)

    await waitAnimationFrame()

    expect(wrapper.vm.internalValue).toBe(1)

    wrapper.vm.onKeyDown(event)

    await waitAnimationFrame()

    expect(wrapper.vm.internalValue).toBe(2)

    // Up arrow
    event.keyCode = keyCodes.up
    wrapper.vm.onKeyDown(event)

    await waitAnimationFrame()

    expect(wrapper.vm.internalValue).toBe(1)
  })
})
