import VExpansionPanel from './VExpansionPanel'
import VExpansionPanelContent from './VExpansionPanelContent'

export { VExpansionPanel, VExpansionPanelContent }

/* istanbul ignore next */
VExpansionPanel.install = function install (Vue) {
  Vue.component(VExpansionPanel.options.name, VExpansionPanel)
  Vue.component(VExpansionPanelContent.options.name, VExpansionPanelContent)
}

export default VExpansionPanel
