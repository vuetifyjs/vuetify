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

    wrapper.find('.v-expansion-panel__header')[0].trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render inset component', () => {
    const wrapper = mount(createPanel({
      inset: true
    }))

    expect(wrapper.hasClass('v-expansion-panel--inset')).toBe(true)
  })

  it('should render popout component', () => {
    const wrapper = mount(createPanel({
      popout: true
    }))

    expect(wrapper.hasClass('v-expansion-panel--popout')).toBe(true)
  })

  it('should render an expanded component and match snapshot', async () => {
    const wrapper = mount(createPanel({
      expand: true
    }))

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.find('.v-expansion-panel__header')[0].trigger('click')
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

  it('should allow array v-model when using expand prop', async () => {
    const wrapper = mount(VExpansionPanel, {
      propsData: {
        expand: true,
        value: [1, 3]
      },
      slots: {
        default: [VExpansionPanelContent, VExpansionPanelContent, VExpansionPanelContent, VExpansionPanelContent]
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.v-expansion-panel__container--active').length).toBe(2)
  })

  it('should reset v-model when disabling expand', async () => {
    const fn = jest.fn()
    const wrapper = mount(VExpansionPanel, {
      propsData: {
        expand: true,
        value: [true, true]
      },
      slots: {
        default: [VExpansionPanelContent, VExpansionPanelContent]
      }
    })

    wrapper.instance().$on('input', fn)

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.v-expansion-panel__container--active').length).toBe(2)

    wrapper.setProps({ expand: false })
    await wrapper.vm.$nextTick()
    expect(fn).toHaveBeenCalledWith(null)
  })

  it('should reset v-model when disabling expand', async () => {
    const input = jest.fn()
    const wrapper = mount(VExpansionPanel, {
      propsData: {
        expand: true,
        value: [false]
      },
      slots: {
        default: [VExpansionPanelContent]
      }
    })

    wrapper.instance().$on('input', input)

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.v-expansion-panel__container--active').length).toBe(0)

    wrapper.setProps({ expand: false })
    await wrapper.vm.$nextTick()
    expect(input).toHaveBeenCalledWith(null)
  })

  it('should keep a single item open when disabling expand', async () => {
    const input = jest.fn()
    const wrapper = mount(VExpansionPanel, {
      propsData: {
        expand: true,
        value: [false, true]
      },
      slots: {
        default: [VExpansionPanelContent, VExpansionPanelContent]
      }
    })
    wrapper.vm.$on('input', input)

    wrapper.setProps({ expand: false })
    await wrapper.vm.$nextTick()
    expect(input).toHaveBeenCalledWith(1)
  })

  it('should keep the current item open when enabling expand', async () => {
    const input = jest.fn()
    const wrapper = mount(VExpansionPanel, {
      propsData: {
        expand: false,
        value: 1
      },
      slots: {
        default: [VExpansionPanelContent, VExpansionPanelContent]
      }
    })
    wrapper.vm.$on('input', input)

    wrapper.setProps({ expand: true })
    await wrapper.vm.$nextTick()
    expect(input).toHaveBeenCalledWith([false, true])
    expect(wrapper.find('.v-expansion-panel__container--active').length).toBe(1)
  })
})
