// Extensions
import VWindow from '../VWindow/VWindow'

// Types & Components
import {
  BaseItemGroup,
  GroupableInstance,
} from './../VItemGroup/VItemGroup'

/* @vue/component */
export default VWindow.extend({
  name: 'v-tabs-items',

  props: { mandatory: Boolean },

  computed: {
    classes (): object {
      return {
        ...VWindow.options.computed.classes.call(this),
        'v-tabs-items': true,
      }
    },
    isDark (): boolean {
      return this.isAppDark
    },
  },

  methods: {
    getValue (item: GroupableInstance, i: number) {
      return item.id || BaseItemGroup.options.methods.getValue.call(this, item, i)
    },
  },
})
