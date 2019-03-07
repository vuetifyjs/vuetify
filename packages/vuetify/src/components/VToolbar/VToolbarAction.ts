// Components
import VBtn from '../VBtn'

// Types
import Vue from 'vue'

/* @vue/component */
export default Vue.extend({
  name: 'v-toolbar-action',

  functional: true,

  render (h, { children, listeners, props, data }) {
    return h(VBtn, Object.assign(data, {
      staticClass: (`v-toolbar__icon ${data.staticClass || ''}`).trim(),
      props: {
        ...props,
        fab: true,
        icon: true
      },
      on: listeners
    }), children)
  }
})
