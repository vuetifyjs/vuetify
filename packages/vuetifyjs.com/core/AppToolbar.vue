<template lang="pug">
  v-toolbar(
    color="primary"
    app
    dark
    :fixed="fixed"
    :manual-scroll="isManualScrolling"
    ref="toolbar"
  )#app-toolbar
    v-toolbar-side-icon(@click="$store.commit('app/DRAWER_TOGGLE')")
    router-link(to="/")
      img(
        src="/static/v-alt.svg"
        height="38px"
      )
    v-toolbar-title Vuetify
    v-spacer
    v-toolbar-items
      v-btn(flat)
        span.hidden-md-and-up Docs
        span.hidden-sm-and-down Documentation
      v-btn(flat) Blog
      v-btn(flat).hidden-sm-and-down Vueticasts
      v-btn(flat).hidden-sm-and-down Shop
      v-btn(flat).hidden-sm-and-down Donate
</template>

<script>
  export default {
    name: 'app-toolbar',

    data: () => ({
      fixed: false,
      isManualScrolling: false
    }),

    watch: {
      $route (current) {
        const fixed = current.path !== '/'
        const duration = fixed ? 400 : 0

        setTimeout(() => {
          this.fixed = fixed
          this.isManualScrolling = !duration
        }, duration)
      }
    },

    mounted () {
      const fixed = this.$route.path !== '/'
      this.isManualScrolling = !fixed
      this.fixed = fixed
    }
  }
</script>

<style lang="stylus">
  #app-toolbar
    .toolbar__title
      margin-left .5em
      font-weight 400
      font-size 21px
      position relative
      top 1px

    .toolbar__items
      .btn
        text-transform capitalize
        font-size 18px
        font-weight 300
</style>
