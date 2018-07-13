import VExpansionPanel from './VExpansionPanel'
import VExpansionPanelContent from './VExpansionPanelContent'

export { VExpansionPanel, VExpansionPanelContent }

/* istanbul ignore next */
VExpansionPanel.install = function install (Vue) {
  Vue.component(VExpansionPanel.name, VExpansionPanel)
  Vue.component(VExpansionPanelContent.name, VExpansionPanelContent)
}

export default VExpansionPanel
