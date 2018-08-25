import { test } from '@/test'
import VExpansionPanelContent from '@/components/VExpansionPanel/VExpansionPanelContent'

const registrableWarning = '[Vuetify] The v-expansion-panel-content component must be used inside a v-expansion-panel'

function expansionPanelProvide (additional) {
  return Object.assign({
    data: {},
    focusable: true,
    panelClick: () => null,
    register: () => null
  }, additional)
}

test('VExpansionPanelContent.js', ({ mount, compileToFunctions }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VExpansionPanelContent, {
      slots: {
        actions: [compileToFunctions('<span>actions</span>')],
        activator: [compileToFunctions('<span>activator</span>')],
        default: [compileToFunctions('<span>default</span>')],
        header: [compileToFunctions('<span>header</span>')]
      },
      provide: {
        expansionPanel: expansionPanelProvide()
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should respect hideActions prop', () => {
    const wrapper = mount(VExpansionPanelContent, {
      propsData: {
        hideActions: true
      },
      slots: {
        actions: [compileToFunctions('<span>actions</span>')],
        header: [compileToFunctions('<span>header</span>')]
      },
      provide: {
        expansionPanel: expansionPanelProvide()
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render proper expand-icon', async () => {
    const wrapper = mount(VExpansionPanelContent, {
      propsData: {
        expandIcon: 'block'
      },
      slots: {
        header: [compileToFunctions('<span>header</span>')]
      },
      provide: {
        expansionPanel: expansionPanelProvide()
      }
    })

    expect(wrapper.find('.v-icon')[0].element.textContent).toBe('block')
  })

  it('should toggle panel on header click', async () => {
    const wrapper = mount(VExpansionPanelContent, {
      slots: {
        header: [compileToFunctions('<span>header</span>')]
      },
      provide: {
        expansionPanel: expansionPanelProvide({
          panelClick: uid => wrapper.vm.toggle(uid)
        })
      }
    })

    wrapper.first('.v-expansion-panel__activator').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render an expanded component and match snapshot', () => {
    const wrapper = mount(VExpansionPanelContent, {
      propsData: {
        ripple: true
      },
      provide: {
        expansionPanel: expansionPanelProvide()
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render an expanded component with lazy prop and match snapshot', () => {
    const wrapper = mount(VExpansionPanelContent, {
      propsData: {
        lazy: true
      },
      provide: {
        expansionPanel: expansionPanelProvide()
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should call panelClick on enter down', async () => {
    const expansionPanel = expansionPanelProvide()

    expansionPanel.panelClick = jest.fn()

    const wrapper = mount(VExpansionPanelContent, {
      provide: { expansionPanel }
    })

    wrapper.vm.$el.focus()

    expect(document.activeElement === wrapper.vm.$el).toBe(true)
    expect(expansionPanel.panelClick).not.toBeCalled()

    wrapper.trigger('keydown.enter')

    expect(expansionPanel.panelClick).toBeCalled()

    wrapper.trigger('keydown.tab')

    expect(expansionPanel.panelClick).toHaveBeenCalledTimes(1)
  })

  it('should not have tabindex if readonly or disabled', async () => {
    const wrapper = mount(VExpansionPanelContent, {
      provide: {
        expansionPanel: expansionPanelProvide()
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ disabled: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ disabled: false, readonly: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
