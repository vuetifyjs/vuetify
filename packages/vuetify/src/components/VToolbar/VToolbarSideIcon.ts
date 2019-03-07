// Components
import VIcon from '../VIcon'
import VToolbarAction from './VToolbarAction'

// Types
import Vue from 'vue'

/* @vue/component */
export default Vue.extend({
  name: 'v-toolbar-side-icon',

  functional: true,

  render (h, { slots, listeners, props, data }) {
    const d = Object.assign(data, {
      staticClass: (`v-toolbar__side-icon ${data.staticClass || ''}`).trim(),
      props,
      on: listeners
    })

    const defaultSlot = slots().default

    return h(VToolbarAction, d, defaultSlot || [h(VIcon, '$vuetify.icons.menu')])
  }
})
