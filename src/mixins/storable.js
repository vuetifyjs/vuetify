export default {
  created () {
    this.$vuetify().event('component init', {
      id: (this.id || this._uid),
      component: this.$options.name,
      defaultState: (this.defaultState || { active: null })
    })
  }
}