<template lang="pug">
  v-footer#home-footer
    v-layout(row wrap).ma-0
      v-flex(xs12 sm6 md3).px-5.blue-grey.darken-2.vuetify
        h5.mb-3
          img(src="/static/doc-images/logo.svg")
          span Vuetify
        ul
          li
            a(href="https://vuetifyjs.com/vuetify/quick-start")
              v-icon.hidden-sm-only(dark) fa-book
              span.hidden-sm-only  Documentation
              span.hidden-md-and-up.hidden-xs-only  Docs
          li
            a(href="https://github.com/vuetifyjs/vuetify" target="_blank")
              v-icon.hidden-sm-only(dark) fa-github
              |  GitHub
          li
            a(href="https://twitter.com/vuetifyjs" target="_blank")
              v-icon.hidden-sm-only(dark) fa-twitter
              |  Twitter
          li
            a(href="https://www.facebook.com/vuetifyjs" target="_blank")
              v-icon.hidden-sm-only(dark) fa-facebook
              |  Facebook

      v-flex(xs12 sm6 md3).blue-grey.darken-3
        h5.title.mb-3 Donate
        ul
          li
            a(href="https://www.patreon.com/vuetify" target="_blank") Patreon
          li
            a(href="https://www.paypal.me/vuetify" target="_blank") PayPal

      v-flex(xs12 sm6 md3).blue-grey.darken-3
        h5.title.mb-3 Sponsors
        ul
          li
            a(href="https://www.browserstack.com/" target="_blank") BrowserStack
          li
            a(href="https://www.cloudflare.com/" target="_blank") CloudFlare

      v-flex(xs12 sm6 md3).blue-grey.darken-3
        h5.title.mb-3 Links
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
    name: 'HomeFooter'
  }
</script>
