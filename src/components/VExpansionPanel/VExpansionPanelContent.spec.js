import { compileToFunctions } from 'vue-template-compiler'
import { test } from '~util/testing'
import { mount } from 'avoriaz'
import VExpansionPanelContent from './VExpansionPanelContent'

test('VExpansionPanelContent.js', () => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VExpansionPanelContent, {
      slots: {
        actions: [compileToFunctions('<span>actions</span>')],
        default: [compileToFunctions('<span>default</span>')],
        header: [compileToFunctions('<span>header</span>')]
      },
      provide: {
        focusable: true,
        panelClick: jest.fn()
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
        focusable: true,
        panelClick: jest.fn()
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should toggle panel on header click', async () => {
    const wrapper = mount(VExpansionPanelContent, {
      slots: {
        header: [compileToFunctions('<span>header</span>')]
      },
      provide: {
        focusable: true,
        panelClick: uid => wrapper.vm.toggle(uid)
      }
    })

    wrapper.find('.expansion-panel__header')[0].trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render an expanded component and match snapshot', () => {
    const wrapper = mount(VExpansionPanelContent, {
      propsData: {
        ripple: true
      },
      provide: {
        focusable: true,
        panelClick: jest.fn()
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
        focusable: true,
        panelClick: jest.fn()
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
