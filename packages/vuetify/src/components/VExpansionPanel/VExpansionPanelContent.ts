// Components
import VExpansionPanel from './VExpansionPanel'
import { VExpandTransition } from '../transitions'

// Mixins
import Bootable from '../../mixins/bootable'
import { inject as RegistrableInject } from '../../mixins/registrable'

// Utilities
import { getSlot } from '../../util/helpers'
import mixins, { ExtractVue } from '../../util/mixins'

// Types
import Vue, { VNode, VueConstructor } from 'vue'

const baseMixins = mixins(
  Bootable,
  RegistrableInject<'expansionPanel', VueConstructor<Vue>>('expansionPanel', 'v-expansion-panel-content', 'v-expansion-panel')
)

interface options extends ExtractVue<typeof baseMixins> {
  expansionPanel: InstanceType<typeof VExpansionPanel>
}

/* @vue/component */
export default baseMixins.extend<options>().extend({
  name: 'v-expansion-panel-content',

  computed: {
    isActive (): boolean {
      return this.expansionPanel.isActive
    },
  },

  created () {
    this.expansionPanel.registerContent(this)
  },

  beforeDestroy () {
    this.expansionPanel.unregisterContent()
  },

  render (h): VNode {
    return h(VExpandTransition, [
      h('div', {
        staticClass: 'v-expansion-panel-content',
        directives: [{
          name: 'show',
          value: this.isActive,
        }],
      }, this.showLazyContent([
        h('div', { class: 'v-expansion-panel-content__wrap' }, getSlot(this)),
      ])),
    ])
  },
})
