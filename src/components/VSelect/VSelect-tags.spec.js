import { test } from '@util/testing'
import VSelect from '@components/VSelect'
import VMenu from '@components/VMenu'

test('VSelect - tags', ({ mount, compileToFunctions }) => {
  const backspace = new Event('keydown')
  backspace.keyCode = 8

  it('should create new values when tagging', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        tags: true,
        value: []
      }
    })

    const input = wrapper.find('input')[0]

    const change = jest.fn()
    wrapper.vm.$on('input', change)

    wrapper.vm.focus()
    await wrapper.vm.$nextTick()

    input.element.value = 'foo'
    input.trigger('input')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    input.trigger('keydown.enter')
    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalledWith(['foo'])
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should change selectedIndex with keyboard', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        tags: true,
        value: ['foo', 'bar']
      }
    })

    const input = wrapper.find('input')[0]

    wrapper.vm.focus()
    await wrapper.vm.$nextTick()

    for (const index of [1, 0, -1]) {
      input.trigger('keydown.left')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.selectedIndex).toBe(index)
    }

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should delete a tagged item when selected and backspace/delete is pressed', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        tags: true,
        value: ['foo', 'bar']
      }
    })

    const input = wrapper.find('input')[0]

    const change = jest.fn()
    wrapper.vm.$on('input', change)

    wrapper.vm.focus()

    input.trigger('keydown.left')
    expect(wrapper.vm.selectedIndex).toBe(1)

    input.trigger('keydown.delete')
    await wrapper.vm.$nextTick()
    expect(change).toHaveBeenCalledWith(['foo'])
    expect(wrapper.vm.selectedIndex).toBe(0)

    input.element.dispatchEvent(backspace) // Avoriaz doesn't wrap keydown.backspace
    await wrapper.vm.$nextTick()
    expect(change).toHaveBeenCalledWith([])
    expect(wrapper.vm.selectedIndex).toBe(-1)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should add a tag on tab using the first suggestion', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        tags: true,
        value: [],
        items: ['bar']
      }
    })

    const input = wrapper.find('input')[0]

    const change = jest.fn()
    wrapper.vm.$on('input', change)

    wrapper.vm.focus()
    await wrapper.vm.$nextTick()

    input.element.value = 'b'
    input.trigger('input')
    await wrapper.vm.$nextTick()
    input.trigger('keydown.down')
    input.trigger('keydown.tab')
    await wrapper.vm.$nextTick()

    expect(change).toBeCalledWith(['bar'])
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should add a tag on tab using the current searchValue', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        tags: true,
        value: [],
        items: ['bar']
      }
    })

    const input = wrapper.find('input')[0]

    const change = jest.fn()
    const blur = jest.fn()
    wrapper.vm.$on('input', change)
    wrapper.vm.$on('blur', blur)

    wrapper.vm.focus()
    await wrapper.vm.$nextTick()
    wrapper.setProps({ searchInput: 'ba' })
    await wrapper.vm.$nextTick()
    input.trigger('keydown.down')
    await wrapper.vm.$nextTick()
    input.trigger('keydown.tab')
    await wrapper.vm.$nextTick()
    expect(change).toBeCalledWith(['bar'])

    wrapper.setProps({ searchInput: 'it' })
    await wrapper.vm.$nextTick()
    input.trigger('keydown.tab')
    await wrapper.vm.$nextTick()
    expect(change).toBeCalledWith(['bar', 'it'])

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should add a tag on enter using the current searchValue', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        tags: true,
        value: [],
        items: ['bar']
      }
    })

    const input = wrapper.find('input')[0]

    const change = jest.fn()
    wrapper.vm.$on('input', change)

    wrapper.vm.focus()
    await wrapper.vm.$nextTick()

    input.element.value = 'ba'
    input.trigger('input')
    input.element.setSelectionRange(2, 2)
    await wrapper.vm.$nextTick()
    input.trigger('keydown.right')
    await wrapper.vm.$nextTick()
    input.trigger('keydown.enter')
    await wrapper.vm.$nextTick()

    expect(change).toBeCalledWith(['ba'])
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should add a tag on left arrow and select the previous tag', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        tags: true,
        value: ['foo'],
        items: ['foo', 'bar']
      }
    })

    const input = wrapper.find('input')[0]

    const change = jest.fn()
    wrapper.vm.$on('input', change)

    wrapper.vm.focus()
    await wrapper.vm.$nextTick()

    input.element.value = 'b'
    input.trigger('input')
    await wrapper.vm.$nextTick()
    input.trigger('keydown.left')
    await wrapper.vm.$nextTick()

    expect(change).toBeCalledWith(['foo', 'b'])
    expect(wrapper.vm.selectedIndex).toBe(0)
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should remove a duplicate tag and add it to the end', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        tags: true,
        value: ['foo', 'bar']
      }
    })

    const input = wrapper.find('input')[0]

    const change = jest.fn()
    wrapper.vm.$on('input', change)

    wrapper.vm.focus()
    await wrapper.vm.$nextTick()

    input.element.value = 'foo'
    input.trigger('input')
    input.trigger('keydown.tab')
    await wrapper.vm.$nextTick()

    expect(change).toBeCalledWith(['bar', 'foo'])
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should add tag with valid search value on blur', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        tags: true
      }
    })

    const input = wrapper.find('input')[0]

    const change = jest.fn()
    wrapper.vm.$on('input', change)

    wrapper.vm.focus()
    await wrapper.vm.$nextTick()

    input.element.value = 'bar'
    input.trigger('input')
    await wrapper.vm.$nextTick()

    wrapper.vm.blur()
    await wrapper.vm.$nextTick() // First tick processes blur, menu sets isActive false, adds tag
    await wrapper.vm.$nextTick() // Second tick processes change after tag added

    expect(change).toBeCalledWith(['bar'])
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should be able to add a tag from user input after deleting a tag with delete', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        multiple: true,
        tags: true,
        value: ['foo', 'bar'],
      }
    })

    let input = wrapper.find('input')[0]
    const change = jest.fn()
    wrapper.vm.$on('input', change)
    wrapper.vm.focus()
    await wrapper.vm.$nextTick()

    input.trigger('keydown.left')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.selectedIndex).toBe(1)
    input.trigger('keydown.delete')
    await wrapper.vm.$nextTick()
    expect(change).toHaveBeenCalledWith(['foo'])
    expect(wrapper.vm.selectedIndex).toBe(0)

    input.element.value = 'baz'
    await wrapper.vm.$nextTick()
    input.trigger('input')
    await wrapper.vm.$nextTick()
    input.trigger('keydown.enter')
    await wrapper.vm.$nextTick()

    expect(change).toBeCalledWith(['foo', 'baz'])
    expect(wrapper.vm.selectedIndex).toBe(-1)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should be able to add a tag from user input after clicking a deletable chip', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        chips: true,
        clearable: true,
        deletableChips: true,
        multiple: true,
        tags: true,
        value: ['foo', 'bar']
      }
    })
    await wrapper.vm.$nextTick()

    const input = wrapper.find('input')[0]
    const chip = wrapper.find('.chip')[1]
    const close = chip.find('.chip__close')[0]

    const change = jest.fn()
    wrapper.vm.$on('input', change)
    wrapper.vm.focus()
    chip.trigger('click')
    await wrapper.vm.$nextTick()
    close.trigger('click')
    await wrapper.vm.$nextTick()
    expect(change).toHaveBeenCalledWith(['foo'])
    expect(wrapper.vm.selectedIndex).toBe(-1)

    input.element.value = 'baz'
    await wrapper.vm.$nextTick()
    input.trigger('input')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.searchValue).toBe('baz')
    input.trigger('keydown.enter')
    await wrapper.vm.$nextTick()

    expect(change).toBeCalledWith(['foo', 'baz'])
    expect(wrapper.vm.selectedIndex).toBe(-1)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })
})
