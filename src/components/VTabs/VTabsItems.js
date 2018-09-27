// Extensions
import { WindowInstance } from '../VWindow/VWindow'

/* @vue/component */
export default {
  name: 'v-tabs-items',

  extends: WindowInstance,

  provide () {
    return {
      windowGroup: this
    }
  },

  inject: {
    registerItems: {
      default: null
    },
    tabProxy: {
      default: null
    },
    unregisterItems: {
      default: null
    }
  },

  props: {
    cycle: Boolean
  },

  watch: {
    internalValue (val) {
      /* istanbul ignore else */
      if (this.tabProxy) this.tabProxy(val)
    }
  },

  created () {
    this.registerItems && this.registerItems(this.changeModel)
  },

  beforeDestroy () {
    this.unregisterItems && this.unregisterItems()
  },

  methods: {
    changeModel (val) {
      this.internalValue = val
    },
    next () {
      if (!this.cycle && this.internalIndex === this.items.length - 1) {
        return
      }

      WindowInstance.options.methods.next.call(this)
    },
    prev () {
      if (!this.cycle && this.internalIndex === 0) {
        return
      }

      WindowInstance.options.methods.prev.call(this)
    }
  }
}
