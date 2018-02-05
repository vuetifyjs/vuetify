import Vue from 'vue'
import { test } from '@util/testing'
import VExpansionPanel from '@components/VExpansionPanel'
import { VExpansionPanelContent } from '@components/VExpansionPanel'

const createPanel = props => {
  return Vue.component('test', {
    components: { VExpansionPanel, VExpansionPanelContent },
    render: h => {
      const panelContent = h('v-expansion-panel-content', [
        h('div', { slot: 'header' }, 'header'),
        'content'
      ])
      return h('v-expansion-panel', { props }, [panelContent])
    }
  })
}

test('VExpansionPanel.js', ({ mount, compileToFunctions }) => {
  it('should render component and match snapshot', async () => {
    const wrapper = mount(createPanel())

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.find('.expansion-panel__header')[0].trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render inset component', () => {
    const wrapper = mount(createPanel({
      inset: true
    }))

    expect(wrapper.hasClass('expansion-panel--inset')).toBe(true)
  })

  it('should render popout component', () => {
    const wrapper = mount(createPanel({
      popout: true
    }))

    expect(wrapper.hasClass('expansion-panel--popout')).toBe(true)
  })

  it('should render an expanded component and match snapshot', async () => {
    const wrapper = mount(createPanel({
      expand: true
    }))

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.find('.expansion-panel__header')[0].trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
