// Components
import VAutocomplete from '../VAutocomplete'

// Utilities
import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'

describe('VAutocomplete.ts', () => {
  type Instance = InstanceType<typeof VAutocomplete>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    document.body.setAttribute('data-app', 'true')

    mountFunction = (options = {}) => {
      return mount(VAutocomplete, {
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

  it('should have the correct role', async () => {
    const wrapper = mountFunction()

    const inputSlot = wrapper.find('.v-input__slot')

    expect(inputSlot.element.getAttribute('role')).toBe('combobox')
  })

  // https://github.com/vuetifyjs/vuetify/issues/7259
  it('should update search when same item is selected', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['foo'],
        value: 'foo',
      },
    })

    await wrapper.vm.$nextTick()

    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement

    expect(element.value).toBe('foo')

    input.trigger('focus')
    input.trigger('click')
    element.value = 'fo'
    input.trigger('input')

    const item = wrapper.find('.v-list-item')

    item.trigger('click')

    await wrapper.vm.$nextTick()

    expect(element.value).toBe('foo')
  })

  it('should copy selected item if multiple', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['aaa', 'bbb', 'ccc'],
        value: ['aaa', 'bbb'],
        chips: true,
        multiple: true,
      },
    })

    const input = wrapper.find('input')
    const chip = wrapper.findAll('.v-chip').at(1)
    const setData = jest.fn()
    const event = {
      clipboardData: {
        setData,
      },
      preventDefault: jest.fn(),
    }

    input.trigger('focus')
    chip.trigger('click')
    wrapper.vm.onCopy(event)

    expect(setData).toHaveBeenCalledWith('text/plain', 'bbb')
    expect(setData).toHaveBeenCalledWith('text/vnd.vuetify.autocomplete.item+plain', 'bbb')
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should not copy anything if there is no selected item', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['aaa', 'bbb', 'ccc'],
        value: ['aaa', 'bbb'],
        chips: true,
        multiple: true,
      },
    })

    const input = wrapper.find('input')
    const setData = jest.fn()
    const event = {
      clipboardData: {
        setData,
      },
      preventDefault: jest.fn(),
    }

    input.trigger('focus')
    wrapper.vm.onCopy(event)

    expect(setData).not.toHaveBeenCalled()
  })

  // https://github.com/vuetifyjs/vuetify/issues/9654
  // https://github.com/vuetifyjs/vuetify/issues/11639
  it('should delete value when pressing backspace', () => {
    const wrapper = mountFunction({
      propsData: {
        chips: true,
        items: ['foo', 'bar', 'fizz', 'buzz'],
        value: 'foo',
      },
    })

    const input = wrapper.find('input')

    input.trigger('focus')
    input.trigger('keydown.backspace')
    input.trigger('keydown.backspace')

    expect(wrapper.vm.internalValue).toBeNull()

    wrapper.setProps({
      multiple: true,
      value: ['foo', 'bar'],
    })

    input.trigger('keydown.backspace')
    input.trigger('keydown.backspace')

    expect(wrapper.vm.internalValue).toEqual(['foo'])
  })

  it('should not change selectedIndex to 0 when backspace is pressed', () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['f', 'b'],
        value: 'f',
      },
    })

    const input = wrapper.find('input')

    input.trigger('focus')
    input.trigger('keydown.backspace')

    expect(wrapper.vm.selectedIndex).toBe(-1)
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
})
