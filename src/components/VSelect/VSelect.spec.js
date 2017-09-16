import Vue from 'vue'
import { test } from '~util/testing'
import VSelect from '~components/VSelect'

test('VSelect.js', ({ mount, shallow }) => {
  it('should return numeric 0', () => {
    const item = { value: 0, text: '0' }
    const wrapper = mount(VSelect, {
      propsData: {
        value: null,
        items: [item],
        multiple: true
      }
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)
    wrapper.vm.selectItem(item)

    expect(change).toBeCalledWith([0])
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should be in an error state', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        value: null,
        items: [0, 1, 2],
        rules: [(v) => !!v || 'Required']
      }
    })

    wrapper.vm.focus()
    wrapper.vm.blur()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.hasError).toBe(true)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should disable list items', () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        items: [{
          text: 'item',
          disabled: true
        }]
      }
    })

    const item = wrapper.find('li')[0]

    expect(item.element.getAttribute('disabled')).toBe('disabled')
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should have -1 tabindex when disabled', () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        autocomplete: true,
        disabled: true
      }
    })

    expect(wrapper.vm.$refs.input.tabIndex).toBe(-1)
    expect(wrapper.vm.$el.tabIndex).toBe(-1)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should have explicit tabindex passed through when autocomplete', () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        autocomplete: true,
        tabindex: 10
      }
    })

    expect(wrapper.vm.$refs.input.tabIndex).toBe(10)
    expect(wrapper.vm.$el.tabIndex).toBe(-1)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should have explicit tabindex passed through when not autocomplete', () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        tabindex: 10
      }
    })

    expect(wrapper.vm.$refs.input.tabIndex).toBe(-1)
    expect(wrapper.vm.$el.tabIndex).toBe(10)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should emit search input changes', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        autocomplete: true,
        debounceSearch: 0
      }
    })

    const input = wrapper.find('input')[0]

    const update = jest.fn()
    wrapper.vm.$on('update:searchInput', update)

    await wrapper.vm.$nextTick()

    input.element.value = 'test'
    input.trigger('input')
    await new Promise(resolve => setTimeout(resolve, 1))

    expect(update).toBeCalledWith('test')
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should filter autocomplete search results', () => {
    const wrapper = mount(VSelect, {
      propsData: {
        autocomplete: true,
        items: ['foo', 'bar']
      }
    })

    wrapper.vm.searchValue = 'foo'

    expect(wrapper.vm.filteredItems).toHaveLength(1)
    expect(wrapper.vm.filteredItems[0]).toBe('foo')
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should filter numeric primitives', () => {
    const wrapper = mount(VSelect, {
      propsData: {
        autocomplete: true,
        items: [1, 2]
      }
    })

    wrapper.vm.searchValue = 1

    expect(wrapper.vm.filteredItems).toHaveLength(1)
    expect(wrapper.vm.filteredItems[0]).toBe(1)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should warn when using incorrect item together with segmented prop', async () => {
    const items = [
      { text: 'Hello', callback: () => {} },
      { text: 'Hello' }
    ]

    const wrapper = mount(VSelect, {
      propsData: {
        segmented: true,
        items
      }
    })

    wrapper.vm.inputValue = items[1]

    await wrapper.vm.$nextTick()

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
    expect('items must contain both a text and callback property').toHaveBeenTipped()
  })

  it('should render buttons correctly when using items array with segmented prop', async () => {
    const items = [
      { text: 'Hello', callback: () => {} }
    ]

    const wrapper = mount(VSelect, {
      propsData: {
        segmented: true,
        items
      }
    })

    wrapper.vm.inputValue = items[0]

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should render buttons correctly when using slot with segmented prop', async () => {
    const items = [
      { text: 'Hello' }
    ]

    const vm = new Vue()
    const selection = props => vm.$createElement('div', [props.item])
    const component = Vue.component('test', {
      components: {
        VSelect
      },
      render (h) {
        return h('v-select', {
          props: {
            segmented: true,
            items
          },
          scopedSlots: {
            selection
          }
        })
      }
    })

    const wrapper = mount(component)

    wrapper.vm.$children[0].inputValue = items[0]

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should not close menu when using multiple prop', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        items: [1, 2, 3, 4],
        multiple: true
      }
    })

    const blur = jest.fn()
    wrapper.vm.$on('blur', blur)

    wrapper.trigger('click')
    wrapper.trigger('blur')

    await wrapper.vm.$nextTick()

    const item = wrapper.find('li')[0]
    item.trigger('click')

    await wrapper.vm.$nextTick()

    expect(blur).not.toBeCalled()
    expect(wrapper.vm.isActive).toBe(true)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should activate when search changes and not active', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        autocomplete: true,
        items: [1, 2, 3, 4],
        multiple: true
      }
    })

    wrapper.vm.isActive = true
    await wrapper.vm.$nextTick()
    wrapper.vm.searchValue = 2
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isActive).toBe(true)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should set searchValue to null when deactivated', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        autocomplete: true,
        items: [1, 2, 3, 4],
        multiple: true
      }
    })

    wrapper.vm.isActive = true
    wrapper.vm.searchValue = 2
    await wrapper.vm.$nextTick()
    wrapper.vm.isActive = false
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.searchValue).toBe(null)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should render role=combobox correctly when autocomplete', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        autocomplete: true
      }
    })

    const inputGroup = wrapper.find('.input-group--select')[0]
    expect(inputGroup.element.getAttribute('role')).toBeFalsy()

    const input = wrapper.find('input')[0]
    expect(input.getAttribute('role')).toBe('combobox')

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should render role=combobox correctly when not autocomplete)', async () => {
    const wrapper = mount(VSelect)

    const inputGroup = wrapper.find('.input-group--select')[0]
    expect(inputGroup.element.getAttribute('role')).toBe('combobox')

    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should render aria-hidden=true on arrow icon', async () => {
    const wrapper = mount(VSelect)

    const icon = wrapper.find('.input-group__append-icon')[0]
    expect(icon.hasAttribute('aria-hidden')).toBe(true)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })

  it('should not duplicate items after items update when caching is turned on', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
       autocomplete: true,
       cacheItems: true,
       returnObject: true,
       items: [],
      }
    })

    wrapper.setProps({items: [{id: 1, text: 'A'}]})
    expect(wrapper.vm.cachedItems).toHaveLength(1)
    wrapper.setProps({items: [{id: 1, text: 'A'}]})
    expect(wrapper.vm.cachedItems).toHaveLength(1)
    expect('Application is missing <v-app> component.').toHaveBeenTipped()
  })
})
