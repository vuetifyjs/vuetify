<style lang="stylus" scoped>
  footer
    display: block // todo: default of display flex causing issues
    a
      text-decoration none
      color #cfd8dc
      &:hover
        color white
        cursor pointer
    background #37424b
    color white
    .flex
      padding 2.5em 3em
      &.vuetify
        background #303c42
        h5
          font-size 21px
        img
          height 32px
          margin-right 10px
          vertical-align middle
        span
          position relative
          top 3px
      h5
        color white
        font-size 16px
      ul
        list-style none
        margin 0
        padding 0
        li
          a
            font-size 16px
            display block
            padding: 0 0 .66em
            .icon.fa
              font-size 18px
              width 25px
</style>


<template lang="pug">
  v-footer.white--text
    v-layout(row wrap).ma-0
      v-flex(xs6 md3).pa-5.blue-grey.darken-2.vuetify
        h5
          img(src="/static/doc-images/logo.svg")
          span Vuetify
        ul
          li
            a(href="https://vuetifyjs.com/vuetify/quick-start")
              span.hidden-sm-only Documentation
              span.hidden-md-and-up.hidden-xs-only Docs
          li
            a(href="https://github.com/vuetifyjs/vuetify" target="_blank") <v-icon dark class="hidden-sm-only">fa-github</v-icon>  GitHub
          li
            a(href="https://twitter.com/vuetifyjs" target="_blank") <v-icon dark class="hidden-sm-only">fa-twitter</v-icon>  Twitter
          li
            a(href="https://www.facebook.com/vuetifyjs" target="_blank") <v-icon dark class="hidden-sm-only">fa-facebook</v-icon>  Facebook

      v-flex(xs6 md3).blue-grey.darken-3
        h5 Donate
        ul
          li
            a(href="https://www.patreon.com/vuetify" target="_blank") Patreon
          li
            a(href="https://www.paypal.me/vuetify" target="_blank") PayPal

      v-flex(xs6 md3).blue-grey.darken-3
        h5 Sponsors
        ul
          li
            a(href="https://www.browserstack.com/" target="_blank") BrowserStack
          li
            a(href="https://www.cloudflare.com/" target="_blank") CloudFlare

      v-flex(xs6 md3).blue-grey.darken-3
        h5 Links
        ul
          li
            a( href="https://vuejs.org/" target="_blank") Vue.js
          li
            a( href="https://material.io/guidelines/" target="_blank") Material Design

      v-flex(xs12).blue-grey.darken-4.text-xs-center.pa-3
        span &copy; {{ new Date().getFullYear() }} Vuetify LLC. Distributed under the
          a(
            href="https://opensource.org/licenses/MIT"
            target="_blank"
          )  MIT License.
</template>

<script>
  export default {
    name: 'home-footer'
  }
</script>
