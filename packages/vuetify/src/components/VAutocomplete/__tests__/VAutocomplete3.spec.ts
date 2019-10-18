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
})
