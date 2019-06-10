// Styles
import './VExpansionPanel.sass'

// Components
import { BaseItemGroup, GroupableInstance } from '../VItemGroup/VItemGroup'
import VExpansionPanel from './VExpansionPanel'

interface VExpansionPanelInstance extends InstanceType<typeof VExpansionPanel> {}

/* @vue/component */
export default BaseItemGroup.extend({
  name: 'v-expansion-panels',

  provide (): object {
    return {
      expansionPanels: this,
    }
  },

  props: {
    accordion: Boolean,
    disabled: Boolean,
    focusable: Boolean,
    inset: Boolean,
    popout: Boolean,
    readonly: Boolean,
  },

  computed: {
    classes (): object {
      return {
        ...BaseItemGroup.options.computed.classes.call(this),
        'v-expansion-panels': true,
        'v-expansion-panels--accordion': this.accordion,
        'v-expansion-panels--focusable': this.focusable,
        'v-expansion-panels--inset': this.inset,
        'v-expansion-panels--popout': this.popout,
      }
    },
  },

  methods: {
    updateItem (item: GroupableInstance & VExpansionPanelInstance, index: number) {
      const value = this.getValue(item, index)
      const nextValue = this.getValue(item, index + 1)

      item.isActive = this.toggleMethod(value)
      item.nextIsActive = this.toggleMethod(nextValue)
    },
  },
})
