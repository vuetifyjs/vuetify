import { test } from '~util/testing'
import VSelect from '~components/VSelect'

test('VSelect.vue', ({ mount }) => {
  const up = new Event('keydown')
  const right = new Event('keydown')
  const down = new Event('keydown')
  const left = new Event('keydown')
  const space = new Event('keydown')
  const enter = new Event('keydown')
  const backspace = new Event('keydown')
  const del = new Event('keydown')

  up.keyCode = 38
  right.keyCode = 39
  down.keyCode = 40
  left.keyCode = 37
  space.keyCode = 32
  enter.keyCode = 13
  backspace.keyCode = 8
  del.keyCode = 46

  // Inspired by https://github.com/vuetifyjs/vuetify/pull/1425 - Thanks @kevmo314
  it('should open the select when focused and enter, space, up or down are pressed', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        items: ['foo', 'bar']
      }
    })

    wrapper.vm.focus()

    wrapper.vm.$el.dispatchEvent(up)
    expect(wrapper.data().isActive).toBe(true)
    wrapper.vm.isActive = false
    await wrapper.vm.$nextTick()
    wrapper.vm.$el.dispatchEvent(down)
    expect(wrapper.data().isActive).toBe(true)
    wrapper.vm.isActive = false
    await wrapper.vm.$nextTick()
    wrapper.vm.$el.dispatchEvent(space)
    await wrapper.vm.$nextTick()
    expect(wrapper.data().isActive).toBe(true)
    wrapper.vm.isActive = false
    await wrapper.vm.$nextTick()
    wrapper.vm.$el.dispatchEvent(enter)
    await wrapper.vm.$nextTick()
    expect(wrapper.data().isActive).toBe(true)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should clear input value', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        clearable: true,
        items: ['foo', 'bar'],
        value: 'foo'
      }
    })

    const clear = wrapper.find('.input-group__append-icon')[0]
    const input = jest.fn()

    wrapper.vm.$on('input', input)

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.inputValue).toBe('foo')

    clear.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.inputValue).toBe(null)
    expect(input).toHaveBeenCalledWith(null)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should not display list with no items and autocomplete', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        autocomplete: true,
        items: []
      }
    })

    const input = wrapper.find('.input-group__input')[0]
    input.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$refs.menu.isActive).toBe(false)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should cache items', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        autocomplete: true,
        cacheItems: true,
        items: []
      }
    })

    wrapper.setProps({ items: ['bar', 'baz'] })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.computedItems.length).toBe(2)
    wrapper.setProps({ items: ['foo'] })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.computedItems.length).toBe(3)
    wrapper.setProps({ items: ['bar'] })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.computedItems.length).toBe(3)

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should be clearable with prop, dirty and single select', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        clearable: true,
        items: [1, 2],
        value: 1
      }
    })

    const clear = wrapper.find('.input-group__append-icon')[0]
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.inputValue).toBe(1)
    expect(wrapper.html()).toMatchSnapshot()
    clear.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.inputValue).toBe(null)
    expect(wrapper.html()).toMatchSnapshot()
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should be clearable with prop, dirty and multi select', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        clearable: true,
        items: [1, 2],
        multiple: true,
        value: [1]
      }
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)
    await wrapper.vm.$nextTick()
    const clear = wrapper.find('.input-group__append-icon')[0]
    expect(wrapper.html()).toMatchSnapshot()
    clear.trigger('click')
    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalledWith([])
    expect(wrapper.html()).toMatchSnapshot()
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should create new values when tagging', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        tags: true,
        value: []
      }
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)
    wrapper.vm.isActive = true
    await wrapper.vm.$nextTick()
    wrapper.vm.searchValue = 'foo'
    await wrapper.vm.$nextTick()
    wrapper.vm.onKeyDown(enter)
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

    wrapper.vm.isActive = true
    await wrapper.vm.$nextTick()
    wrapper.vm.onKeyDown(left)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.selectedIndex).toBe(1)
    wrapper.vm.onKeyDown(left)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.selectedIndex).toBe(0)
    wrapper.vm.onKeyDown(left)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.selectedIndex).toBe(-1)

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

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    wrapper.vm.isActive = true
    await wrapper.vm.$nextTick()
    wrapper.vm.onKeyDown(left)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.selectedIndex).toBe(1)
    wrapper.vm.onKeyDown(del)
    await wrapper.vm.$nextTick()
    expect(change).toHaveBeenCalledWith(['foo'])
    expect(wrapper.vm.selectedIndex).toBe(0)
    wrapper.vm.onKeyDown(backspace)
    await wrapper.vm.$nextTick()
    expect(change).toHaveBeenCalledWith([])
    expect(wrapper.vm.selectedIndex).toBe(-1)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should prepropulate selectedItems', () => {
    const items = ['foo', 'bar', 'baz']

    const wrapper = mount(VSelect, {
      propsData: {
        items,
        value: 'foo'
      }
    })

    const wrapper2 = mount(VSelect, {
      propsData: {
        items,
        multiple: true,
        value: ['foo', 'bar']
      }
    })

    const wrapper3 = mount(VSelect, {
      propsData: {
        items,
        value: null
      }
    })

    expect(wrapper.vm.selectedItems.length).toBe(1)
    expect(wrapper2.vm.selectedItems.length).toBe(2)
    expect(wrapper3.vm.selectedItems.length).toBe(0)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should allow changing of browser autocomplete', () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        autocomplete: true,
        browserAutocomplete: 'off'
      }
    })

    const input = wrapper.find('input')[0]

    expect(input.getAttribute('autocomplete')).toBe('off')
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should show input when focused and autocomplete', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        autocomplete: true
      }
    })

    expect(wrapper.find('input')[0].hasStyle('display', 'none'))

    wrapper.trigger('focus')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('input')[0].hasStyle('display', 'block'))
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should show input with placeholder and not dirty', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        placeholder: 'foo'
      }
    })

    expect(wrapper.find('input')[0].hasStyle('display', 'block'))
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should now show input with placeholder and dirty', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        items: ['bar'],
        placeholder: 'foo',
        value: 'bar'
      }
    })

    expect(wrapper.find('input')[0].hasStyle('display', 'none'))
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  // #1704
  it('should populate select when using value as an object', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        items: [
          { text: 'foo', value: { id: 1 } },
          { text: 'foo', value: { id: 2 } }
        ],
        multiple: true,
        value: [{ id: 1 }]
      }
    })

    await wrapper.vm.$nextTick()

    const selections = wrapper.find('.input-group__selections__comma')

    expect(selections.length > 0).toBe(true)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  // Discovered when working on #1704
  it('should remove item when re-selecting it', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        items: [
          { text: 'bar', value: { id: 1 } },
          { text: 'foo', value: { id: 2 } }
        ],
        multiple: true,
        value: [{ id: 1 }]
      }
    })

    await wrapper.vm.$nextTick()
    wrapper.trigger('click')
    const item = wrapper.find('li')[0]
    item.trigger('click')
    await wrapper.vm.$nextTick()
    wrapper.update()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selectedItems.length === 0).toBe(true)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should open menu when clicked on arrow', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        items: ['foo', 'bar']
      }
    })

    expect(wrapper.vm.menuIsActive).toBe(false)

    const arrow = wrapper.find('.input-group__append-icon')[0]
    arrow.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.menuIsActive).toBe(true)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })
})
