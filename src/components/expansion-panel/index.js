import VExpansionPanel from './VExpansionPanel'
import VExpansionPanelContent from './VExpansionPanelContent'

export default function install (Vue) {
  Vue.component('v-expansion-panel', VExpansionPanel)
  Vue.component('v-expansion-panel-content', VExpansionPanelContent)
}
