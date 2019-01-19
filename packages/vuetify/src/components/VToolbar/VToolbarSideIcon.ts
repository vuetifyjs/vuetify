import VBtn from '../VBtn'
import VIcon from '../VIcon'

import Vue from 'vue'

/* @vue/component */
export default Vue.extend({
  name: 'v-toolbar-side-icon',

  functional: true,

  render (h, { slots, listeners, props, data }) {
    const classes = data.staticClass
      ? `${data.staticClass} v-toolbar__side-icon`
      : 'v-toolbar__side-icon'

    const d = Object.assign(data, {
      staticClass: classes,
      props: Object.assign(props, {
        icon: true
      }),
      on: listeners
    })

    const defaultSlot = slots().default

    return h(VBtn, d, defaultSlot || [h(VIcon, '$vuetify.icons.menu')])
  }
})
