export default {
  created () {
    this.$store.commit('vuetify/COMPONENT_INIT', {
      id: (this.id || this._uid),
      component: this.$options.name,
      defaultState: (this.defaultState || { active: null })
    })
  }
}