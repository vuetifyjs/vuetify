// Extensions
import VWindow from '../VWindow/VWindow'

// Types & Components
import { BaseItemGroup, GroupableInstance } from './../VItemGroup/VItemGroup'
import { VNode } from 'vue'

// Utilities
import ThemeProvider from '../../util/ThemeProvider'

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
  },

  methods: {
    getValue (item: GroupableInstance, i: number) {
      return item.id || BaseItemGroup.options.methods.getValue.call(this, item, i)
    },
  },

  render (h): VNode {
    const render = VWindow.options.render.call(this, h)

    return h(ThemeProvider, {
      props: {
        root: true,
        dark: this.dark,
        light: this.light,
      },
    }, [render])
  },
})
