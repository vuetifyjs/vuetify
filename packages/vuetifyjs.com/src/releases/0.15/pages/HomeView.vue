<template lang="pug">
  #home-view
    v-toolbar(fixed :class="[toolbar ? 'toolbar--home' : 'hidden']" ).white.text-xs-center
      img(src="/doc-images/header-logo.svg" height="38px")
      v-spacer
      v-toolbar-items
        v-btn(flat to="/vuetify/quick-start") Documentation
        v-btn(flat tag="a" href="https://github.com/vuetifyjs/vuetify/releases" target="_blank" rel="noopener").hidden-xs-only Updates

    section#hero
      v-container(grid-list-xl)
        v-layout(row wrap)
          v-flex(xs12 md4).text-xs-center
            img(src="/doc-images/logo.svg").logo
          v-flex(xs12 md8).text-xs-center.text-md-left
            v-layout(row wrap :class="{\
              'justify-center': $vuetify.breakpoint.smAndDown\
            }")
              v-flex(xs12).py-1
                h1.mb-0 Vuetify
              v-flex(xs12).py-1
                h2 Material Component Framework
              v-flex(xs12 sm8 md6 lg4)
                v-btn(block dark large to="/vuetify/quick-start").blue
                  span Documentation
              v-flex(xs12 sm8 md6 lg4)
                v-btn(
                  large
                  block
                  tag="a"
                  href="https://github.com/vuetifyjs/vuetify"
                  target="_blank"
                  rel="noopener"
                ).white.primary--text
                  v-icon(left).primary--text fa-github
                  span Github

    div#section-body
      section#features.mb-3
          v-container
            v-card.elevation-2
              v-card-text.py-5
                v-layout(row wrap)
                  v-flex(xs12 md4).text-xs-center.my-3
                    img(src="/doc-images/feature1.svg")
                    h3.mt-4.mb-3 Vue-CLI Templates
                    p Vuetify comes ready to go with 5 pre-made vue-cli templates. From simple html to full-blown SSR, you are ready to go in minutes.

                  v-flex(xs12 md4).text-xs-center.my-3
                    img(src="/doc-images/feature2.svg")
                    h3.mt-4.mb-3 Custom Layouts
                    p Each and every available layout from the Material design spec is at your disposal. Create unique and flexible user interfaces that fit the scope of any project.

                  v-flex(xs12 md4).text-xs-center.my-3
                    img(src="/doc-images/feature3.svg")
                    h3.mt-4.mb-3 Semantic Material Components
                    p Be prepared for an armada of specialized components at your disposal. With over 80 in total, there is a solution for any application.

      section#sponsors.mb-3
          v-container
            v-card.elevation-2
              v-card-text.py-5
                h2.mb-5.text-xs-center Proudly sponsored by:
                v-layout(row wrap align-center justify-center)
                  v-flex(xs12 md3 v-for="(sponsor, i) in sponsors" :key="i").text-xs-center
                      a(:href="sponsor.href" target="_blank" :title="sponsor.title" rel="noopener")
                        img(:src="sponsor.src").sponsor
                  v-flex(xs12).text-xs-center
                    v-btn(to="/vuetify/sponsors-and-backers" large).white.primary--text Become a backer
                      v-icon(right).primary--text fa-arrow-circle-right

      section#support.mb-3
          v-container
            v-card.elevation-2
              v-card-text.py-5
                v-layout(row wrap).text-xs-center
                  v-flex(xs12).mb-5
                    h2 Has Vuetify helped you create an amazing application?<br> <br class="hidden-md-and-up"> You can show your support by making a <strong>donation</strong> in one of two ways:
                  v-flex(xs12 sm3 offset-sm3)
                    a(
                      href="https://www.patreon.com/vuetify"
                      target="_blank" rel="noopener"
                    )
                      div.display-1.my-3 Patreon
                      img(src="/doc-images/patreon.png" width="125px")
                  v-flex(xs12 sm3)
                    a(
                      href="https://paypal.me/vuetify"
                      target="_blank" rel="noopener"
                    )
                      div.display-1.my-3 PayPal
                      img(src="/doc-images/paypal.png" width="125px")

      section#footer-hero.mb-0
        v-container
          v-layout(row wrap)
            v-flex(xs12 md8 lg10)
              img(src="/doc-images/logo.svg" height="90px")
              h2.mt-4.mb-5 Supercharge Your Development with the Power of Vue and Material Design

    footer
      v-layout(row wrap)
        v-flex(xs6 sm3).vuetify
          h5
            img(src="/doc-images/logo.svg")
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

        v-flex(xs6 sm3)
          h5 Donate
          ul
            li
              a(href="https://www.patreon.com/vuetify" target="_blank") Patreon
            li
              a(href="https://www.paypal.me/vuetify" target="_blank") PayPal

        v-flex(xs6 sm3)
          h5 Sponsors
          ul
            li
              a(href="https://www.browserstack.com/" target="_blank") BrowserStack
            li
              a(href="https://www.cloudflare.com/" target="_blank") CloudFlare

        v-flex(xs6 sm3)
          h5 Links
          ul
            li
              a( href="https://vuejs.org/" target="_blank") Vue.js
            li
              a( href="https://material.io/guidelines/" target="_blank") Material Design



      .legal-footer.text-xs-center
        span &copy; {{ new Date().getFullYear() }} Vuetify LLC. Distributed under the
        a(
          href="https://opensource.org/licenses/MIT"
          target="_blank"
        )  MIT License.

</template>

<script>
  export default {
    data() {
      return {
        sponsors: [
          {
            title: 'BrowserStack',
            href: 'https://www.browserstack.com/',
            src: '/doc-images/browser-stack.svg'
          },
          {
            title: 'Cloudflare',
            href: 'https://www.cloudflare.com/',
            src: '/doc-images/cloudflare.svg'
          },
          {
            title: 'LMAX Exchange',
            href: 'https://careers.lmax.com/?utm_source=vuetify&utm_medium=logo-link&utm_campaign=lmax-careers',
            src: '/doc-images/backers/lmax-exchange.png'
          }
        ],
        toolbar: false
      }
    },
    mounted() {
      // TODO: change this to v-scroll
      window.addEventListener('scroll', this.onScroll, { passive: true })
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll, { passive: true })
    },
    methods: {
      onScroll() {
        this.toolbar = window.scrollY > 300
      }
    }
  }
</script>
