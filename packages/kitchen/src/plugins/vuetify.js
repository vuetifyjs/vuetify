import Vue from 'vue'
import Vuetify from 'vuetify'
import goTo from 'vuetify/lib/services/goto'
import 'vuetify/dist/vuetify.css'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
})

goTo.framework = vuetify.framework

export default vuetify
