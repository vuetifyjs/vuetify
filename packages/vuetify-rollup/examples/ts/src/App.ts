import { defineComponent, h } from 'vue'
import { VApp, VAlert } from 'vuetify-rollup'

export default defineComponent({
  setup () {
    return () => h(VApp, {}, () => h(VAlert, { type: 'success' }, () => 'hello'))
  }
})
