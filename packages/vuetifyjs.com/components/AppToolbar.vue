<style lang="stylus" scoped>
  .toolbar__title
    margin-left .5em
    font-weight 400
    font-size 21px
    position relative
    top 1px
  .toolbar__items
    margin-right 0 !important
    .btn
      text-transform capitalize
      font-size 18px
      margin 0
      padding: 0 .125em
      font-weight 300
</style>



<template lang="pug">
  v-toolbar(
    app
    clipped
    ref="toolbar"
    dark
    class="primary"
  )
    img(
      src="/static/v-alt.svg"
      height="38px"
    )
    <v-toolbar-title>Vuetify</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      v-btn(flat)
        span.hidden-md-and-up Docs
        span.hidden-sm-and-down Documentation
      v-btn(flat) Blog
      v-btn(flat).hidden-sm-and-down Vueticasts
      v-btn(flat).hidden-sm-and-down Shop
      v-btn(flat).hidden-sm-and-down Donate
    </v-toolbar-items>
</template>

<script>
  export default {
    name: 'app-toolbar',

    watch: {
      $route (current) {
        const duration = current.path !== '/'
          ? 300
          : 0

        setTimeout(() => {
          this.$refs.toolbar.isScrolling = !duration
        }, duration)
      }
    },

    mounted () {
      this.$refs.toolbar.isScrolling = this.$route.path === '/'
    }
  }
</script>
