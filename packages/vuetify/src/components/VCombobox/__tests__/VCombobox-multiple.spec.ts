// Components
import VCombobox from '../VCombobox'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'
import { keyCodes } from '../../../util/helpers'

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

  function createMultipleCombobox (propsData) {
    const change = jest.fn()
    const wrapper = mountFunction({
      attachToDocument: true,
      propsData: Object.assign({
        multiple: true,
        value: [],
      }, propsData),
    })

    wrapper.vm.$on('input', change)
    return { wrapper, change }
  }

  it('should create new values when tagging', async () => {
    const { wrapper, change } = createMultipleCombobox({})

    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement

    input.trigger('focus')
    element.value = 'foo'
    input.trigger('input')
    input.trigger('keydown.enter')

    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalledWith(['foo'])
  })

  it('should change selectedIndex with keyboard', async () => {
    const { wrapper } = createMultipleCombobox({
      value: ['foo', 'bar'],
    })

    const input = wrapper.find('input')

    input.trigger('focus')
    await wrapper.vm.$nextTick()

    for (const index of [1, 0, -1]) {
      input.trigger('keydown.left')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.selectedIndex).toBe(index)
    }
  })

  it('should delete a tagged item when selected and backspace/delete is pressed', async () => {
    const { wrapper, change } = createMultipleCombobox({
      value: ['foo', 'bar'],
    })

    const input = wrapper.find('input')

    input.trigger('focus')
    input.trigger('keydown.left')
    expect(wrapper.vm.selectedIndex).toBe(1)

    input.trigger('keydown.delete')
    await wrapper.vm.$nextTick()
    expect(change).toHaveBeenCalledWith(['foo'])
    expect(wrapper.vm.selectedIndex).toBe(0)

    const backspace = new Event('keydown')
    backspace.keyCode = keyCodes.delete

    input.element.dispatchEvent(backspace) // Avoriaz doesn't wrap keydown.backspace
    await wrapper.vm.$nextTick()
    expect(change).toHaveBeenCalledWith([])
    expect(wrapper.vm.selectedIndex).toBe(-1)
  })

  it('should add a tag on enter using the current searchValue', async () => {
    const { wrapper, change } = createMultipleCombobox({
      items: ['bar'],
    })

    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement

    input.trigger('focus')
    await wrapper.vm.$nextTick()

    element.value = 'ba'
    input.trigger('input')
    await wrapper.vm.$nextTick()
    input.trigger('keydown.enter')
    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalledWith(['ba'])
  })

  it.skip('should add a tag on left arrow and select the previous tag', async () => {
    const { wrapper, change } = createMultipleCombobox({
      value: ['foo'],
      items: ['foo', 'bar'],
    })

    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement

    input.trigger('focus')
    element.value = 'b'
    input.trigger('input')
    input.trigger('keydown.left')

    expect(change).toHaveBeenCalledWith(['foo', 'b'])
    expect(wrapper.vm.selectedIndex).toBe(0)
  })

  it('should remove a duplicate tag and add it to the end', async () => {
    const { wrapper, change } = createMultipleCombobox({
      value: ['foo', 'bar'],
    })

    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement

    input.trigger('focus')
    await wrapper.vm.$nextTick()

    element.value = 'foo'
    input.trigger('input')
    input.trigger('keydown.enter')
    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalledWith(['bar', 'foo'])
  })

  it('should add tag with valid search value on blur', async () => {
    const { wrapper, change } = createMultipleCombobox({})

    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement

    input.trigger('focus')
    element.value = 'bar'
    input.trigger('input')
    input.trigger('keydown.enter')

    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalledWith(['bar'])
  })

  it('should be able to add a tag from user input after deleting a tag with delete', async () => {
    const { wrapper, change } = createMultipleCombobox({
      multiple: true,
      value: ['foo', 'bar'],
    })

    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement

    input.trigger('focus')
    input.trigger('keydown.left')
    expect(wrapper.vm.selectedIndex).toBe(1)
    input.trigger('keydown.delete')
    expect(change).toHaveBeenCalledWith(['foo'])
    expect(wrapper.vm.selectedIndex).toBe(0)

    // Must be reset for input to update
    wrapper.vm.selectedIndex = -1
    await wrapper.vm.$nextTick()

    element.value = 'baz'

    input.trigger('input')
    input.trigger('keydown.enter')

    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalledWith(['foo', 'baz'])
    expect(wrapper.vm.selectedIndex).toBe(-1)
  })

  it('should be able to add a tag from user input after clicking a deletable chip', async () => {
    const { wrapper, change } = createMultipleCombobox({
      chips: true,
      clearable: true,
      deletableChips: true,
      multiple: true,
      value: ['foo', 'bar'],
    })

    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement
    const chip = wrapper.findAll('.v-chip').at(1)
    const close = chip.find('.v-chip__close')

    input.trigger('focus')
    chip.trigger('click')
    close.trigger('click')
    expect(change).toHaveBeenCalledWith(['foo'])
    expect(wrapper.vm.selectedIndex).toBe(-1)

    element.value = 'baz'
    input.trigger('input')
    expect(wrapper.vm.internalSearch).toBe('baz')
    input.trigger('keydown.enter')

    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalledWith(['foo', 'baz'])
    expect(wrapper.vm.selectedIndex).toBe(-1)
  })

  // This test is actually almost useless
  it('should not change search when selecting an index', () => {
    const { wrapper } = createMultipleCombobox({
      chips: true,
      multiple: true,
      value: ['foo', 'bar'],
    })

    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement

    input.trigger('focus')
    expect(wrapper.vm.selectedIndex).toBe(-1)

    input.trigger('keydown.left')
    expect(wrapper.vm.selectedIndex).toBe(1)

    expect(wrapper.vm.internalSearch).toBeUndefined()
    input.trigger('keydown.right')
    element.value = 'fizz'
    input.trigger('input')

    expect(wrapper.vm.internalSearch).toBe('fizz')
    expect(wrapper.vm.selectedIndex).toBe(-1)
  })

  // eslint-disable-next-line max-statements
  it('should create new items when a delimiter is entered', async () => {
    const { wrapper, change } = createMultipleCombobox({
      delimiters: [', ', 'baz'],
    })

    await wrapper.vm.$nextTick()

    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement
    input.trigger('focus')

    element.value = 'foo,'
    input.trigger('input')

    await wrapper.vm.$nextTick()
    expect(change).toHaveBeenCalledTimes(0)

    element.value += ' '
    input.trigger('input')

    await wrapper.vm.$nextTick()
    expect(change).toHaveBeenCalledTimes(1)
    expect(change).toHaveBeenCalledWith(['foo'])
    expect(element.value).toBe('')

    element.value = 'foo,barba'
    input.trigger('input')

    await wrapper.vm.$nextTick()
    expect(change).toHaveBeenCalledTimes(1)

    element.value += 'z'
    input.trigger('input')

    await wrapper.vm.$nextTick()
    expect(change).toHaveBeenCalledTimes(2)
    expect(change).toHaveBeenCalledWith(['foo', 'foo,bar'])
    expect(element.value).toBe('')
  })

  it('should allow the editing of an existing value', async () => {
    const { wrapper } = createMultipleCombobox({
      chips: true,
      value: ['foo'],
    })

    const change = jest.fn()
    const internal = jest.fn()
    const chip = wrapper.find('.v-chip')
    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement

    wrapper.vm.$on('change', change)
    wrapper.vm.$watch('internalValue', internal)

    expect(wrapper.vm.editingIndex).toBe(-1)
    expect(wrapper.vm.internalSearch).toBeUndefined()

    chip.trigger('dblclick')

    expect(wrapper.vm.editingIndex).toBe(0)
    expect(wrapper.vm.internalSearch).toBe('foo')

    element.value = 'foobar'
    input.trigger('input')
    input.trigger('keydown.enter')

    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalledWith(['foobar'])
    expect(internal).toHaveBeenCalledWith(['foobar'], ['foo'])
  })

  it('should paste as item if source of pasted text is item in another v-combobox/v-autocomplete', async () => {
    const { wrapper, change } = createMultipleCombobox({
      items: ['aaa', 'bbb'],
    })

    const input = wrapper.find('input')
    const getData = jest.fn(mimeType => 'ccc')
    const event = {
      clipboardData: {
        getData,
      },
    }

    input.trigger('focus')
    input.trigger('paste', event)

    expect(getData).toHaveBeenCalledTimes(1)
    expect(getData).toHaveBeenCalledWith('text/vnd.vuetify.autocomplete.item+plain')
    expect(change).toHaveBeenCalledWith(['ccc'])
  })

  it('should paste as text if source of pasted text is not item in another v-combobox/v-autocomplete', async () => {
    const { wrapper, change } = createMultipleCombobox({
      items: ['aaa', 'bbb'],
    })

    const input = wrapper.find('input')
    const getData = jest.fn(mimeType => mimeType === 'text/plain' ? 'ccc' : '')
    const event = {
      clipboardData: {
        getData,
      },
    }

    input.trigger('focus')
    input.trigger('paste', event)

    expect(change).not.toHaveBeenCalled()
    // expect(input.element.value).toBe('ccc')  // can be checked only in browser environment
  })

  it('should not add search to list when selecting items with keyboard', async () => {
    const { wrapper, change } = createMultipleCombobox({
      chips: true,
      multiple: true,
      items: ['aaa', 'bbb'],
    })

    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement

    input.trigger('focus')
    element.value = 'a'
    input.trigger('input')
    input.trigger('keydown.down')

    await wrapper.vm.$nextTick()

    input.trigger('keydown.enter')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalSearch).toBe('a')
    expect(change).toHaveBeenCalledWith(['aaa'])
  })

  // https://github.com/vuetifyjs/vuetify/issues/12781
  // eslint-disable-next-line max-statements
  it('should correctly add items after deletion and blur', async () => {
    const { wrapper, change } = createMultipleCombobox({
      multiple: true,
      chips: true,
      value: ['foo', 'bar'],
      items: ['foo', 'bar'],
    })

    const input = wrapper.find('input')
    const element = input.element as HTMLInputElement

    // delete 'bar'
    input.trigger('focus')
    input.trigger('keydown.left')
    expect(wrapper.vm.selectedIndex).toBe(1)
    input.trigger('keydown.delete')
    await wrapper.vm.$nextTick()
    expect(change).toHaveBeenCalledWith(['foo'])
    expect(wrapper.vm.selectedIndex).toBe(0)

    // Lose focus
    input.trigger('keydown.tab')
    await wrapper.vm.$nextTick()
    expect(change).toHaveBeenCalledWith(['foo'])

    // Add 'bar' again
    input.trigger('focus')
    element.value = 'bar'
    input.trigger('input')
    input.trigger('keydown.down')
    await wrapper.vm.$nextTick()
    input.trigger('keydown.enter')
    await wrapper.vm.$nextTick()
    expect(change).toHaveBeenLastCalledWith(['foo', 'bar'])

    // Set 'bar' as search input
    element.value = 'bar'
    input.trigger('input')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalSearch).toBe('bar')

    // Lose focus
    input.trigger('keydown.tab')
    await wrapper.vm.$nextTick()
    expect(change).toHaveBeenLastCalledWith(['foo', 'bar'])
  })
})
