/* istanbul ignore file */
import VExpansionPanelItem from './VExpansionPanelItem'
import { deprecate } from '../../util/console'

/* @vue/component */
export default VExpansionPanelItem.extend({
  created () {
    deprecate('<v-expansion-panel-content>', '<v-expansion-panel-item>')
  }
})
