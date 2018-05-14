export default {
  name: 'filterable',

  props: {
    noDataText: {
      type: String,
      default () {
        return this.$vuetify.lang.t('noDataText')
      }
    }
  }
}
