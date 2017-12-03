<template lang="pug">
  div#home-view
    v-toolbar(fixed :class="[toolbar ? 'toolbar--home' : 'transparent elevation-0']" light)
      img(src="/static/v.png" height="38px")
      v-spacer
      v-toolbar-items
        v-toolbar-item(
          to="/vuetify/quick-start"
          router
        )
          span.subheading Documentation
        v-toolbar-item(
          href="https://github.com/vuetifyjs/vuetify/releases"
          target="_blank"
        ) 
          span.subheading Updates

    section#hero.elevation-12
      v-parallax(src="/static/doc-images/vbanner.jpg" height="400")
        v-layout(row align-vert-center align-horiz-center)
          v-flex(xs12).text-xs-center
            h1.grey--text.text--lighten-4.display-2 Vuetify.js
            div.grey--text.text--lighten-4.headline.hidden-xs-only Material Component Framework
            div.mt-5
              v-btn(
                large
                tag="a"
                href="https://github.com/vuetifyjs/vuetify"
              ).grey.lighten-2
                v-icon(fa left medium) github
                span Github
              v-btn(light large router href="/vuetify/quick-start").green.lighten-2
                span Get Started
                v-icon(right light) chevron_right

    section#development.text-xs-center.pa-5
      v-container(fluid)
        v-layout(row)
          v-flex(xs12)
            img(
              src="static/doc-images/featured.png"
              width="100%"
              style="max-width: 1024px"
            )
      h2.display-2 Supercharge your Development
      span.headline With the power of Vue and Material Design

    v-divider

    section#features.pb-5.pt-3
      v-container(style="max-width: 1024px")
        v-layout(row wrap)
          v-flex(sm12).my-5
            v-layout(row)
              v-flex(xs12 sm6 layout row align-end justify-center)
                v-card.transparent.elevation-0.pa-3
                  v-card-title.pl-0.pt-0 Premade Templates
                  div.grey--text.text--darken-1 Vuetify comes ready to go with 5 pre-made vue-cli templates. Ranging from a simple html to a full blown SSR (server side rendered) application. No matter what the project, you are ready to go in minutes with your next great idea.
              v-flex(xs6).hidden-xs-only
                v-card(height="280px" img="/static/vuetify_cli.svg")
          v-flex(sm12).my-5
            v-layout(row)
              v-flex(xs6).hidden-xs-only
                v-card(height="280px" img="/static/vuetify_layout2.svg")
              v-flex(xs12 sm6 layout row align-end justify-center)
                v-card.transparent.elevation-0.pa-3
                  v-card-title.pl-0.pt-0 Custom layouts
                  div.grey--text.text--darken-1 Each and every available layout from the Material design spec is at your disposal. Create unique and flexible user interfaces that fit the scope of any task.
          v-flex(sm12).my-5
            v-layout(row)
              v-flex(xs12 sm6 layout row align-start justify-center)
                v-card.transparent.elevation-0.pa-3
                  v-card-title.pl-0.pt-0 Semantic components
                  div.grey--text.text--darken-1 Every component has been meticulously crafted to offer the easiest, most understandable interface and robust api of properties that will customize the experience delivered in your next application.
              v-flex(xs6).hidden-xs-only
                v-card(height="280px" img="/static/vuetify_semantic.svg")
          v-flex(sm12).my-5
            v-layout(row)
              v-flex(xs6).hidden-xs-only
                v-card(height="280px" img="/static/vuetify_sizes.svg")
              v-flex(xs12 sm6 layout column align-start justify-center)
                v-card.transparent.elevation-0.pa-3
                  v-card-title.pl-0.pt-0 Material design framework
                  div.grey--text.text--darken-1 Be prepared to have an armada of specialized components at your disposal. With over 80 in total, there is a solution for any situation.

    v-divider

    section#sponsors.py-5.mb-0
      v-container( fluid)
        v-layout(row)
          v-flex(xs10 offset-xs1).text-xs-center
            h4.headline.text-xs-center.mb-5 Vuetify.js is proudly sponsored by
            div(v-for="sponsor in sponsors").mb-5
              a(:href="sponsor.href" target="_blank" :title="sponsor.title")
                img(:src="sponsor.src")

    section#support.py-5.grey.lighten-4.mb-0
      v-container(fluid)
        v-layout(row wrap).text-xs-center
          v-flex(xs12).mb-5
            h4.headline.pb-3 Support Vuetify.js
            p Has Vuetify helped you create an amazing application? You can show your support by making a donation in one of two ways:
          v-flex(xs12 sm6).mb-3
            a(
              href="https://www.patreon.com/vuetify"
              target="_blank"
            ).dark--text
              div.display-1.mb-2 Patreon
              img(src="/static/doc-images/patreon.png" width="125px")
          v-flex(xs12 sm6).mb-3
            a(
              href="https://paypal.me/vuetify"
              target="_blank"
            ).dark--text
              div.display-1.mb-2 Paypal
              img(src="/static/doc-images/paypal.png" width="125px")

    v-footer.secondary.white--text
      v-layout(row flex)
        v-flex(xs6)
          span © {{ new Date().getFullYear() }} John Leider
        v-flex(xs6).text-xs-right
          span MIT License
</template>

<script>
  export default {
    data () {
      return {
        sponsors: [
          { title: 'BrowserStack', href: 'https://www.browserstack.com/', src: '/static/doc-images/browser-stack.svg' },
          { title: 'Cloudflare', href: 'https://www.cloudflare.com/', src: '/static/doc-images/cloudflare.svg' }
        ],
        toolbar: false
      }
    },
    mounted () {
      window.addEventListener('scroll', this.onScroll, { passive: true })
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.onScroll, { passive: true })
    },
    methods: {
      onScroll () {
        this.toolbar = window.scrollY > 0
      }
    }
  }
</script>

<style lang="stylus">
  @import '../node_modules/vuetify/src/stylus/settings/_colors'
  
  #home-view
    .toolbar--home
      background: #132563

    #support
      a
        text-decoration: none

    #hero
      .btn
        width: 190px
        
    #sponsors img
      max-height: 60px
    
    div.grey--text
      line-height: 2
        
  #features
    .card__column.transparent
      height: 150px !important
</style>