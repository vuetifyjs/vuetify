import { test } from '@/test'
import VSelect from '@/components/VSelect'

test('VSelect', ({ mount, compileToFunctions }) => {
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.appendChild(app)

  // Inspired by https://github.com/vuetifyjs/vuetify/pull/1425 - Thanks @kevmo314
  it('should open the select when focused and enter, space, up or down are pressed', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        items: ['foo', 'bar']
      }
    })

    const input = wrapper.first('input')

    for (const key of ['up', 'down', 'space', 'enter']) {
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

  it('should clear input value', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        clearable: true,
        items: ['foo', 'bar'],
        value: 'foo'
      }
    })

    const clear = wrapper.find('.icon')[0]

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toBe('foo')
    clear.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.internalValue).toBe(null)
    expect(input).toHaveBeenCalledWith(null)
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

    const clear = wrapper.first('.icon')

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toBe(1)
    expect(wrapper.html()).toMatchSnapshot()

    clear.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toBe(null)
    expect(wrapper.vm.isMenuActive).toBe(false)
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

    const clear = wrapper.first('.icon')

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()

    clear.trigger('click')
    await wrapper.vm.$nextTick()
    expect(change).toHaveBeenCalledWith([])
    expect(wrapper.vm.isMenuActive).toBe(false)
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

    expect(wrapper.vm.selectedItems).toHaveLength(1)
    expect(wrapper2.vm.selectedItems).toHaveLength(2)
    expect(wrapper3.vm.selectedItems).toHaveLength(0)
  })

  it('should show input with placeholder and not dirty', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        placeholder: 'foo'
      }
    })

    expect(wrapper.find('input')[0].hasStyle('display', 'block'))
  })

  it('should not show input with placeholder and dirty', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        items: ['bar'],
        placeholder: 'foo',
        value: 'bar'
      }
    })

    expect(wrapper.find('input')[0].hasStyle('display', 'none'))
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

    const selections = wrapper.find('.v-select__selection')

    expect(selections.length).toBeGreaterThan(0)
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

    expect(wrapper.vm.selectedItems).toHaveLength(1)
    wrapper.trigger('click')
    const item = wrapper.find('div.list__tile__action')[0]
    item.trigger('click')

    expect(wrapper.vm.selectedItems).toHaveLength(0)
  })

  it('should open menu when cleared with open-on-clear', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        clearable: true,
        openOnClear: true,
        items: [1],
        value: 1
      }
    })

    const clear = wrapper.first('.v-input__icon--clear .icon')

    clear.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isMenuActive).toBe(true)

  })
})
