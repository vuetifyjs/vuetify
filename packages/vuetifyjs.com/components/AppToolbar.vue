<template lang="pug">
  v-toolbar(
    class="primary"
    app
    clipped
    dark
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
      isManualScrolling: false
    }),

    watch: {
      $route (current) {
        const duration = current.path !== '/'
          ? 300
          : 0

        setTimeout(() => {
          this.isManualScrolling = !duration
        }, duration)
      }
    },

    mounted () {
      this.isManualScrolling = this.$route.path === '/'
    }
  }
</script>
