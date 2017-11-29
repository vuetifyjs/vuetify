<template lang="pug">
  v-toolbar(
    color="primary"
    app
    dark
    fixed
    :inverted-scroll="isManualScrolling"
    :scroll-off-screen="isManualScrolling"
    ref="toolbar"
  )#app-toolbar
    v-toolbar-side-icon(@click="$store.commit('app/DRAWER_TOGGLE')").hidden-sm-and-up
    router-link(to="/").ml-3
      img(
        src="/static/v-alt.svg"
        height="38px"
      )
    v-toolbar-title.pb-1 Vuetify
    v-spacer
    v-toolbar-items
      v-menu(bottom offset-y)
        v-btn(
          slot="activator"
          flat
        ) 
          span Translations
          v-icon keyboard_arrow_down
      v-menu(bottom offset-y)
        v-btn(
          slot="activator"
          flat
        )
          span 0.17
          v-icon keyboard_arrow_down
      v-btn(
        flat
        v-if="$route.path === '/'"
        to="/getting-started/quick-start"
      )
        span.hidden-md-and-up Docs
        span.hidden-sm-and-down Documentation
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
        const isManualScrolling = current.path === '/'
        const duration = !isManualScrolling ? 400 : 0

        setTimeout(() => {
          this.isManualScrolling = isManualScrolling
        }, duration)
      }
    },

    created () {
      const fixed = this.$route.path !== '/'
      this.isManualScrolling = !fixed
    }
  }
</script>

<style lang="stylus">
  #app-toolbar
    .toolbar__title
      margin-left .5em
      font-weight 300
      font-size 21px
      position relative
      top 1px

    .toolbar__items
      .btn
        text-transform capitalize
        font-size 18px
        font-weight 300
</style>
