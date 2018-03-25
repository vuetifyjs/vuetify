import { test } from '@/test'
import VSelect from '@/components/VSelect'

test('VSelect', ({ mount, compileToFunctions }) => {
  // Inspired by https://github.com/vuetifyjs/vuetify/pull/1425 - Thanks @kevmo314
  it('should open the select when focused and enter, space, up or down are pressed', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        items: ['foo', 'bar']
      }
    })

    for (const key of ['up', 'down', 'space', 'enter']) {
      wrapper.trigger('focus')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.menuIsActive).toBe(false)
      wrapper.trigger(`keydown.${key}`)
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.menuIsActive).toBe(true)
      wrapper.vm.blur()
      await wrapper.vm.$nextTick()
    }

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it.skip('should clear input value', async () => {
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
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it.skip('should be clearable with prop, dirty and single select', async () => {
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
    expect(clear.element.classList).toContain('input-group__icon-clearable')
    expect(wrapper.vm.inputValue).toBe(1)
    expect(wrapper.html()).toMatchSnapshot()

    clear.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.inputValue).toBe(null)
    expect(wrapper.vm.menuIsVisible).toBe(false)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it.skip('should be clearable with prop, dirty and multi select', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        clearable: true,
        items: [1, 2],
        multiple: true,
        value: [1]
      }
    })

    const clear = wrapper.find('.input-group__append-icon')[0]

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()

    clear.trigger('click')
    await wrapper.vm.$nextTick()
    expect(change).toHaveBeenCalledWith([])
    expect(wrapper.vm.menuIsVisible).toBe(false)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
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
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should show input with placeholder and not dirty', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        placeholder: 'foo'
      }
    })

    expect(wrapper.find('input')[0].hasStyle('display', 'block'))
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
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
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  // #1704
  it.skip('should populate select when using value as an object', async () => {
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

    expect(selections.length).toBeGreaterThan(0)
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
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
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it.skip('should open menu when arrow is clicked', async () => {
    const wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        items: ['foo', 'bar']
      }
    })

    const arrow = wrapper.find('.input-group__append-icon')[0]

    expect(wrapper.vm.menuIsActive).toBe(false)

    arrow.trigger('click')
    expect(wrapper.vm.menuIsActive).toBe(true)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it.skip('should open menu when cleared with open-on-clear', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        clearable: true,
        openOnClear: true,
        value: 1
      }
    })

    const clear = wrapper.find('.input-group__append-icon')[0]

    clear.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.menuIsActive).toBe(true)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it.skip('should not rotate icon if menu is not open', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        items: [1]
      }
    })

    wrapper.trigger('focus')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.menuIsVisible).toBe(false)
    expect(wrapper.hasClass('input-group--open')).toBe(false)

    wrapper.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.menuIsVisible).toBe(true)
    expect(wrapper.hasClass('input-group--open')).toBe(true)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })
})
