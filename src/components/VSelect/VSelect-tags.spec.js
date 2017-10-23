import { test } from '~util/testing'
import { mount } from 'avoriaz'
import VSelect from '~components/VSelect'
import VMenu from '~components/VMenu'

test('VSelect - tags', () => {
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
    wrapper.vm.$on('change', change)

    wrapper.vm.focus()
    await wrapper.vm.$nextTick()

    input.element.value = 'foo'
    input.trigger('input')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    input.trigger('keydown.enter')
    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalledWith(['foo'])
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
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

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
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
    wrapper.vm.$on('change', change)

    wrapper.vm.focus()

    input.trigger('keydown.left')
    expect(wrapper.vm.selectedIndex).toBe(1)

    input.trigger('keydown.delete')
    expect(change).toHaveBeenCalledWith(['foo'])
    expect(wrapper.vm.selectedIndex).toBe(0)

    input.element.dispatchEvent(backspace) // Avoriaz doesn't wrap keydown.backspace
    expect(change).toHaveBeenCalledWith([])
    expect(wrapper.vm.selectedIndex).toBe(-1)

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
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
    wrapper.vm.$on('change', change)

    wrapper.vm.focus()
    await wrapper.vm.$nextTick()

    input.element.value = 'b'
    input.trigger('input')
    await wrapper.vm.$nextTick()
    input.trigger('keydown.tab')
    await wrapper.vm.$nextTick()

    expect(change).toBeCalledWith(['bar'])
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
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
    wrapper.vm.$on('change', change)
    wrapper.vm.$on('blur', blur)

    wrapper.vm.focus()
    await wrapper.vm.$nextTick()
    wrapper.setProps({ searchInput: 'ba' })
    await wrapper.vm.$nextTick()
    input.trigger('keydown.tab')
    await wrapper.vm.$nextTick()
    expect(change).toBeCalledWith(['bar'])

    wrapper.setProps({ searchInput: 'it' })
    await wrapper.vm.$nextTick()
    input.trigger('keydown.tab')
    await wrapper.vm.$nextTick()
    expect(change).toBeCalledWith(['bar', 'it'])

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
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
    wrapper.vm.$on('change', change)

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
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
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
    wrapper.vm.$on('change', change)

    wrapper.vm.focus()
    await wrapper.vm.$nextTick()

    input.element.value = 'b'
    input.trigger('input')
    input.trigger('keydown.left')
    await wrapper.vm.$nextTick()

    expect(change).toBeCalledWith(['foo', 'b'])
    expect(wrapper.vm.selectedIndex).toBe(0)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })
})
