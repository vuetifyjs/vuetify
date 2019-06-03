import Vue from 'vue'

export default Vue.extend({
  name: 'localable',

  props: {
    locale: String,
  },

  computed: {
    currentLocale (): string {
      return this.locale || this.$vuetify.lang.current
    },
  },
})
