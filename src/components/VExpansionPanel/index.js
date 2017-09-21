import VExpansionPanel from './VExpansionPanel'
import VExpansionPanelContent from './VExpansionPanelContent'

VExpansionPanel.install = function install (Vue) {
  Vue.component(VExpansionPanel.name, VExpansionPanel)
  Vue.component(VExpansionPanelContent.name, VExpansionPanelContent)
}

export default VExpansionPanel
