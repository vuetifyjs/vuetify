// Extensions
import VWindow from '../VWindow/VWindow'

// Types & Components
import { BaseItemGroup, GroupableInstance } from './../VItemGroup/VItemGroup'

/* @vue/component */
export default VWindow.extend({
  name: 'v-tabs-items',

  props: {
    mandatory: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes (): object {
      return {
        ...VWindow.options.computed.classes.call(this),
        'v-tabs-items': true,
      }
    },
    isDark (): boolean {
      if (this.dark === true) {
        // explicitly dark
        return true
      } else if (this.light === true) {
        // explicitly light
        return false
      } else {
        // inherit from root
        return this.rootIsDark
      }
    },
  },

  methods: {
    getValue (item: GroupableInstance, i: number) {
      return item.id || BaseItemGroup.options.methods.getValue.call(this, item, i)
    },
  },
})
