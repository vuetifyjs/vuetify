<template lang="pug">
  div#home
    v-jumbotron(
      gradient="to right top, #1867c0, #19e5f4"
      height="auto"
      dark
    )
      v-container(fill-height)
        v-layout(align-center wrap).text-xs-center
          v-flex(xs12)
            img(
              src="/static/vuetify-logo-300.png"
              alt="Logo"
              width="196px"
              height="196px"
            )
            h1.display-3 {{ $t("Vuetify.Home.heading1") }}
            div.headline.mb-3 {{ $t("Vuetify.Home.heading1cont") }}
            div.mb-5
              v-btn(
                icon
                color="white"
                v-for="(social, i) in socials"
                :key="i"
                :href="social.href"
                target="_blank"
                rel="noopener"
              ).mx-3
                v-icon(color="primary") {{ social.icon }}
            v-btn(
              color="white"
              class="primary--text"
              :to="{ name: 'getting-started/QuickStart' }"
              large
            ).mb-2
              strong {{ $t("Vuetify.Home.getStarted") }}
            div version {{ $store.state.currentVersion }}

    section#features
      v-container
        v-layout(row wrap)
          v-flex(
            xs12 sm12 md4 lg4
            v-for="(feature, i) in features"
            :key="i"
          )

            img(:src="feature.img")
            h3(v-text="feature.title").mb-4
            p(v-text="feature.text").text-xs-justify

    section#checkFeatures
      v-container
        h2.text-xs-center
          span {{ $t("Vuetify.Home.checkFeaturesTitle") }}
          | {{ $t("Vuetify.Home.checkFeaturesTitleCtd") }}
        v-layout(row wrap justify-center)
          v-flex(
            xs12
            md5
            lg5
            xl3
            offset-lg1
            :pl-5="$vuetify.breakpoint.smAndDown"
          )
            ul
              li(v-for="(feature, i) in checkFeatures" :key="i") {{feature}}
          v-flex(
            xs12
            md4
            lg4
            xl3
            offset-xl3
            :pl-5="$vuetify.breakpoint.smAndDown"
          )
            ul
              li(v-for="(feature, i) in checkFeaturesCtd" :key="i") {{feature}}

    section#letterFromAuthor
      v-container
        v-layout
          v-flex(
            xs12
            xl8
            offset-xl1
          )
            v-card
              p(v-for="(p, i) in letterFromAuthor" :key="i") {{p}}
          v-flex(xs3 xl2).text-xs-center.hidden-xs-only
            v-avatar
             img(src="/static/doc-images/john.jpg")
            p.john John Leider
            p.authorOfVuetify {{ $t("Vuetify.Home.authorOfVuetify") }}

    section#support
      v-container
        v-layout(row wrap)
          v-flex(
            xs6
            offset-xs3
            md3
            offset-md0
            offset-xl1
          ).text-xs-center
            a(
              href="https://www.patreon.com/vuetify"
              target="_blank"
              rel="noopener"
            )
              img(src="/static/doc-images/patreon_logo.png" width="75%")
          v-flex(xs12 md9 xl7).mb-5
            p {{ $t("Vuetify.Home.support.hasVuetifyHelped") }}
            p {{ $t("Vuetify.Home.support.showYourSupport") }} <a href="https://www.patreon.com/vuetify" target="_blank">{{ $t("Vuetify.Home.support.becomingAPatron") }}</a>.

    section.sponsors-and-backers.my-5
      v-container
        v-card(
          :class="{ 'pa-5': $vuetify.breakpoint.mdAndUp, 'py-5 px-2': $vuetify.breakpoint.smAndDown }"
        )
          h2.text-xs-center.text-md-left {{ $t("Vuetify.Home.proudlySponsoredBy") }}
          v-layout(row wrap justify-center align-center)
            template(v-for="(supporter, i) in supporters")
              v-flex(
                xs12
                v-if="supporter.break"
                :key="i"
              ) &nbsp;
              a(
                target="_blank"
                rel="noopener"
                class="ma-3"
                :href="`${supporter.href}?ref=vuetifyjs.com`"
                :title="supporter.title"
                :key="i"
                @click="$ga.event('home sponsor click', 'click', supporter.title)"
                v-else
              )
                img(
                  :src="`/static/doc-images/${supporter.src}`"
                  :height="supporter.size || 'auto'"
                  :style="{ maxHeight: `${supporter.size}px` }"
                ).supporter
            v-flex(xs12).text-xs-center.mt-5
              v-btn(:to="{ name: 'getting-started/SponsorsAndBackers' }" large).white.primary--text {{ $t("Vuetify.Home.becomeSponsor") }}
                v-icon(right color="primary") chevron_right

    section#callout
      v-container
        v-layout(flex xs12 md8 lg10 align-center justify-center mx-auto wrap)
          img(src="/static/v-alt.svg" height="75px")
          h2.mx-4 {{ $t("Vuetify.Home.callout") }}

    home-footer
</template>

<script>
  import supporters from '@/assets/supporters'

  // Components
  import HomeFooter from '@/components/misc/HomeFooter'

  // Mixins
  import Message from '@/mixins/message'

  export default {
    name: 'HomePage',

    components: {
      HomeFooter
    },

    mixins: [Message],

    data: () => ({
      diamond: supporters.diamond,
      palladium: supporters.palladium,
      socials: [
        {
          icon: 'fa-github',
          href: 'https://github.com/vuetifyjs/vuetify'
        },
        {
          icon: 'fa-twitter',
          href: 'https://twitter.com/vuetifyjs'
        },
        {
          icon: 'fa-facebook',
          href: 'https://www.facebook.com/vuetifyjs/'
        }
      ]
    }),

    computed: {
      checkFeatures () {
        return this.$t('Vuetify.Home.checkFeatures')
      },
      checkFeaturesCtd () {
        return this.$t('Vuetify.Home.checkFeaturesCtd')
      },
      features () {
        return this.$t('Vuetify.Home.features')
      },
      letterFromAuthor () {
        return this.$t('Vuetify.Home.letterFromAuthor')
      },
      supporters () {
        const supporters = [...this.diamond, ...this.palladium]

        const end = { break: true }

        supporters.splice(2, 0, end)

        return supporters
      }
    },

    methods: {
      snackHandler () {
        this.$router.push({ name: 'store/Index' })
      }
    }
  }
</script>

<style lang="stylus">
  @import '~vuetify/src/stylus/settings/_variables'

  #home
    background white
    color #455163

  #features
    padding 5vh 0 0
    margin 5vh 0 0

    .layout
      margin 0 -1em
      .flex
        padding-left: 1em
        padding-right: 1em
        margin-bottom: 4em
        text-align: center
        &:last-child
          margin-bottom 0
        img
          box-shadow: 0 1px 3px rgba(0,0,0,0.18) !important;
          max-width 75%
          margin-bottom 1.75em
        h3
          font-size 21px
          color #455163
          line-height 1.2em
          font-weight 400
        p
          font-size 18px
          line-height 1.5em
          font-weight 300
          color #455163

    @media $display-breakpoints.md-and-up
      .layout
        .flex
          margin-bottom: 0
          text-align left
          img
            max-width 90%

    @media $display-breakpoints.xl-only
      .layout
        margin 0 -1.5em
        .flex
          padding-left: 1.5em
          padding-right: 1.5em
          h3
            font-size 24px
          p
            font-size 21px
          img
            max-width 75%

  #checkFeatures
    padding 8em 0
    h2
      font-size 42px
      font-weight 400
      margin-bottom .75em
      display block
      line-height 1.2em
      span
        font-size 36px
        font-weight 300
        display block
    ul
      list-style: none;
      li
        &::before
          content: '✓'
          position relative
          left: -10px
          color: #00c100
        font-size 21px
        margin-bottom .5em
        font-weight 300

    @media $display-breakpoints.xs-only
      padding 2em 0
      h2
        font-size 36px
        span
          font-size 28px
      ul
        li
          font-size 18px
    @media $display-breakpoints.sm-only
      padding 3em 0

  #letterFromAuthor
    .card
      padding 3em
      position relative
      &:before {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        top: 30px
        right: -15px
        box-sizing: border-box;
        border: 1.25em solid black;
        border-color: transparent transparent white white
        transform: rotate(-135deg);
        box-shadow: -3px 3px 3px -1px rgba(0,0,0,0.08) !important;
      }
      box-shadow: 0 1px 3px rgba(0,0,0,0.18) !important;

    .avatar
      margin-top 0
      width: 100px !important
      height: 100px !important
    p
      font-size 21px
      font-weight 300
      line-height 1.7em
      &.john, &.authorOfVuetify
        font-size 21px
        margin-bottom: 0
        line-height 1.2em
      &.john
        font-weight 500
        margin-top .5em

    @media $display-breakpoints.sm-and-down
      .card
        padding 2em
      .avatar
        margin-top 1em
        width: 50px !important
        height: 50px !important
      p
        font-size: 18px
        &.john, &.authorOfVuetify
          font-size 14px

  #support
    margin 1em
    position: relative
    z-index: 1

    img
      margin-bottom 2em
    p
      font-weight 400
      text-align: center
      font-size: 21px
    @media $display-breakpoints.md-and-down
      p
        margin-bottom .5em
        line-height 1.2em
    @media $display-breakpoints.md-and-up
      p
        margin-bottom 0
        text-align: left
        line-height 1.5em
    @media $display-breakpoints.sm-only
      p
        font-size: 24px
        text-align: center
      margin 2em
    @media $display-breakpoints.md-only
      margin 4em
      p
        text-align: left
        font-size 24px
    @media $display-breakpoints.lg-only
      margin 7em
      p
        font-size 28px
    @media $display-breakpoints.xl-only
      margin 10em
      p
        font-size 36px

  .sponsors-and-backers
    .card
      z-index 1

      h2
        font-size 24px
        color #666666
        font-weight 300
        margin-bottom 1.5em
    .supporter
      max-width: 100%
      height: auto

  #callout
    position: relative
    color rgba(255,255,255,.98)

    @media $display-breakpoints.md-and-up
      padding: 2em 0;

    &:before
      content ''
      position absolute
      left 0
      right 0
      bottom 0
      height 100vw
      min-height 100%
      background url('/static/doc-images/slant-footer.svg') no-repeat 50% 100%
      background-size 100%
      width: 100%

      @media $display-breakpoints.xs-only
        background-position 50% 100%
        background-size 375%

      @media $display-breakpoints.sm-only
        background-size 175%

      @media $display-breakpoints.md-only
        background-size 140%

      @media $display-breakpoints.lg-only
        background-size 100%
        background-position 50% 109%

      @media $display-breakpoints.xl-only
        background-size 100%
        background-position 50% 110%

    img
      position relative
    h2
      position: relative
      font-size 32px
      color white
      font-weight 300
      @media $display-breakpoints.lg-and-up
          font-size 40px
          width: 70%

  #home-footer
    background: #37424b
    color: white
    display: block // todo: default of display flex causing issues

    a
      text-decoration: none
      color: #cfd8dc

      &:hover
        color: white
        cursor: pointer

    .flex
      padding: 2.5em 3em

      &.vuetify
        background: #303c42

        h5
          font-size: 21px

        img
          height: 32px
          margin-right: 10px
          vertical-align: middle

        span
          position: relative
          top: 3px

      h5
        color: white
        font-size: 16px

      ul
        list-style: none
        margin: 0
        padding: 0

        li:not(:last-child)
          margin-bottom: 12px

        li a
          font-size: 16px
          display: inline-block

          .icon
            margin-right: 8px
            font-size: 18px
            width: 25px
</style>
