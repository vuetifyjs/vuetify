import Vue from 'vue'
import { test } from '@/test'
import VExpansionPanel from '@/components/VExpansionPanel/VExpansionPanel'
import VExpansionPanelContent from '@/components/VExpansionPanel/VExpansionPanelContent'

const createPanel = props => {
  return Vue.component('test', {
    render: h => {
      const panelContent = h(VExpansionPanelContent, [
        h('div', { slot: 'header' }, 'header'),
        'content'
      ])
      return h(VExpansionPanel, { props }, [panelContent])
    }
  })
}

test('VExpansionPanel.js', ({ mount, compileToFunctions }) => {
  it('should render component and match snapshot', async () => {
    const wrapper = mount(createPanel())

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.find('.v-expansion-panel__activator')[0].trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a multiple component and match snapshot', async () => {
    const wrapper = mount(createPanel({
      multiple: true
    }))

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.find('.v-expansion-panel__activator')[0].trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should show content on v-model change', async () => {
    const wrapper = mount(VExpansionPanel, {
      slots: {
        default: VExpansionPanelContent.options
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ value: 0 })
    await wrapper.vm.$nextTick()

    expect(wrapper.first('.v-expansion-panel__container--active')).not.toBe(null)
  })

  it('should show content on mount using v-model', async () => {
    const wrapper = mount(VExpansionPanel, {
      propsData: {
        value: 0
      },
      slots: {
        default: VExpansionPanelContent.options
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.first('.v-expansion-panel__container--active')).not.toBe(null)
  })

  it('should allow array v-model when using multiple prop', async () => {
    const wrapper = mount(VExpansionPanel, {
      propsData: {
        multiple: true,
        value: [1, 3]
      },
      slots: {
        default: [VExpansionPanelContent, VExpansionPanelContent, VExpansionPanelContent, VExpansionPanelContent]
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.v-expansion-panel__container--active').length).toBe(2)
  })

  it('should reset v-model when disabling multiple', async () => {
    const fn = jest.fn()
    const wrapper = mount(VExpansionPanel, {
      propsData: {
        multiple: true,
        value: [true, true]
      },
      slots: {
        default: [VExpansionPanelContent, VExpansionPanelContent]
      }
    })

    wrapper.instance().$on('input', fn)

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.v-expansion-panel__container--active').length).toBe(2)

    wrapper.setProps({ multiple: false })
    await wrapper.vm.$nextTick()
    expect(fn).toHaveBeenCalledWith(null)
  })

  it('should reset v-model when disabling multiple', async () => {
    const input = jest.fn()
    const wrapper = mount(VExpansionPanel, {
      propsData: {
        multiple: true,
        value: [false]
      },
      slots: {
        default: [VExpansionPanelContent]
      }
    })

    wrapper.instance().$on('input', input)

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.v-expansion-panel__container--active').length).toBe(0)

    wrapper.setProps({ multiple: false })
    await wrapper.vm.$nextTick()
    expect(input).toHaveBeenCalledWith(null)
  })

  it('should keep a single item open when disabling multiple', async () => {
    const input = jest.fn()
    const wrapper = mount(VExpansionPanel, {
      propsData: {
        multiple: true,
        value: [false, true]
      },
      slots: {
        default: [VExpansionPanelContent, VExpansionPanelContent]
      }
    })
    wrapper.vm.$on('input', input)

    wrapper.setProps({ multiple: false })
    await wrapper.vm.$nextTick()
    expect(input).toHaveBeenCalledWith(1)
  })

  it('should keep the current item open when enabling multiple', async () => {
    const input = jest.fn()
    const wrapper = mount(VExpansionPanel, {
      propsData: {
        multiple: false,
        value: 1
      },
      slots: {
        default: [VExpansionPanelContent, VExpansionPanelContent]
      }
    })
    wrapper.vm.$on('input', input)

    wrapper.setProps({ multiple: true })
    await wrapper.vm.$nextTick()
    expect(input).toHaveBeenCalledWith([false, true])
    expect(wrapper.find('.v-expansion-panel__container--active').length).toBe(1)
  })

  it('should unregister content', async () => {
    const wrapper = mount(VExpansionPanel, {
      slots: {
        default: [VExpansionPanelContent]
      }
    })

    const content = wrapper.first(VExpansionPanelContent.options)

    expect(wrapper.vm.items.length).toBe(1)

    content.destroy()

    expect(wrapper.vm.items.length).toBe(0)
  })

  it('should update from value', async () => {
    const updatePanels = jest.fn()
    const wrapper = mount(VExpansionPanel, {
      methods: { updatePanels }
    })

    wrapper.vm.updateFromValue([true])

    expect(updatePanels).not.toBeCalled()

    wrapper.vm.updateFromValue(0)

    expect(updatePanels).toBeCalledWith([true])

    wrapper.vm.updateFromValue('foo')

    expect(updatePanels).toBeCalledWith('foo')

    wrapper.vm.updateFromValue(null)

    expect(updatePanels).toBeCalledWith([])
  })
})
