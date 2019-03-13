// Components
import VExpansionPanelItem from '../VExpansionPanelItem'

// Utilities
import {
  mount,
  Wrapper
} from '@vue/test-utils'

describe('VExpansionPanelItem.ts', () => {
  type Instance = InstanceType<typeof VExpansionPanelItem>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VExpansionPanelItem, {
        slots: {
          header: '<span>foobar</span>'
        },
        provide: {
          expansionPanel: {
            register: () => {},
            unregister: () => {}
          }
        },
        ...options
      })
    }
  })

  it('should work respond to mousedown/up events', () => {
    const wrapper = mountFunction()

    const header = wrapper.find('.v-expansion-panel-item__header')
    expect(wrapper.vm.hasMousedown).toBe(false)

    header.trigger('mousedown')
    expect(wrapper.vm.hasMousedown).toBe(true)

    header.trigger('mouseup')
    expect(wrapper.vm.hasMousedown).toBe(false)
  })

  it('should respond to keyboard.enter', () => {
    const click = jest.fn()
    const wrapper = mountFunction({
      methods: { click }
    })

    const header = wrapper.find('.v-expansion-panel-item__header')

    header.trigger('keydown.up')
    expect(click).not.toHaveBeenCalled()

    header.trigger('keydown.enter')
    expect(click).not.toHaveBeenCalled()

    header.element.focus()
    header.trigger('keydown.enter')
    expect(click).toHaveBeenCalled()
  })

  it('should respond to clicks', () => {
    const click = jest.fn()
    const toggle = jest.fn()
    const wrapper = mountFunction({
      propsData: { readonly: true },
      methods: { toggle }
    })

    wrapper.vm.$on('click', click)
    const spy = jest.spyOn(wrapper.vm.$refs.header, 'blur')
    const header = wrapper.find('.v-expansion-panel-item__header')

    header.trigger('click')

    expect(spy).not.toHaveBeenCalled()
    expect(click).toHaveBeenCalledTimes(1)
    expect(toggle).not.toHaveBeenCalled()

    wrapper.setProps({ readonly: false })

    header.trigger('click')

    expect(spy).not.toHaveBeenCalled()
    expect(click).toHaveBeenCalledTimes(2)
    expect(toggle).toHaveBeenCalledTimes(1)

    // Mock detail
    const event = { detail: 1 }
    wrapper.vm.click(event)

    expect(spy).toHaveBeenCalled()
    expect(click).toHaveBeenCalledTimes(3)
    expect(toggle).toHaveBeenCalledTimes(2)
  })

  // Ensures smooth transition when using the lazy prop
  it('should boot expansion panel item', async () => {
    const change = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        lazy: true
      }
    })

    wrapper.vm.$on('change', change)

    expect(wrapper.vm.isBooted).toBe(false)

    wrapper.vm.toggle()

    expect(wrapper.vm.isBooted).toBe(true)

    await wrapper.vm.$nextTick()

    expect(change).toHaveBeenCalled()
  })

  it('should hide actions and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        hideActions: true
      }
    })

    const snapshot = wrapper.html()
    expect(snapshot).toMatchSnapshot()

    wrapper.setProps({ hideActions: false })

    const snapshot2 = wrapper.html()
    expect(snapshot2).toMatchSnapshot()

    expect(snapshot).not.toEqual(snapshot2)
  })
})
