<style lang="stylus" scoped>
  @import '../node_modules/vuetify/src/stylus/settings/_variables'

  #home
    background white
    color #455163
    #announcementBanner
      background #005caf
      color rgba(255,255,255,.98)
      font-weight 400
      padding 10px 16px
      display: block
      p
        margin 0

    .parallax.primary
      height: auto !important
      padding-top: 4em
      padding-bottom 4em
      img
        height 160px
      h1
        font-size 42px
        font-weight 400
        display block
        line-height 1.2em
        span
          font-size 32px
          font-weight 300
          line-height 1.2em
          display block
          margin-bottom .3em

      @media $display-breakpoints.xs-only
        img
          height 120px
        h1
          font-size 32px
          span
            font-size 24px
      .btn
        height 56px
        font-size 18px
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

  #sponsors-and-backers
    .card
      z-index 1
      padding: 2.5em 3em
      h2
        font-size 24px
        color #666666
        font-weight 300
        margin-bottom 1.5em
      img
        margin-bottom 1.5em
        max-width: 100%
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
      background url('/static/doc-images/slant-footer.svg') no-repeat  50% 100%
      background-size 100%
      @media $display-breakpoints.xs-only
        background-position 50% 105%
        background-size 375%
        height 300vw
      @media $display-breakpoints.sm-only
        background-size 175%
        height 300vw
      @media $display-breakpoints.md-only
        background-size 140%
        height 300vw
      @media $display-breakpoints.lg-only
        background-size 100%
        background-position 50% 109%
      @media $display-breakpoints.xl-only
        background-size 100%
        height 250vw
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

</style>


<template lang="pug">
  div#home
    #announcementBanner
      p {{ $t('home.announcementBanner')}}
    v-parallax(
      jumbotron
    ).primary
      v-layout(align-center justify-center)
        v-flex.text-xs-center
          img(src="/static/v-alt.svg" alt="Logo")
          h1.mt-4.mb-5
            span {{ $t("home.heading1")}}
            | {{ $t("home.heading1cont")}}
          v-btn(
            secondary
            to="/getting-started/quick-start"
          ).px-3 {{ $t("home.getStarted")}}
          p version 0.16.0

    section#features
      v-container
        v-layout(row wrap)
          v-flex(
            xs12 sm12 md4 lg4
            v-for="(feature, i) in features"
            :key="i"
          )

            img(:src="feature.img")
            h3 {{feature.title}}
            p {{feature.text}}

    section#checkFeatures
      v-container
        h2.text-xs-center
          span All the Tools You  Need
          | To Build Incredible User Interfaces
        v-layout(row wrap)
          v-flex.xs12.md5.offset-md1.lg4.offset-lg2.xl3.offset-xl3
            ul
              li(v-for="(feature, i) in checkFeatures" :key="i") {{feature}}
          v-flex.xs12.md5.lg4.xl3
            ul
              li(v-for="(feature, i) in checkFeaturesCtd" :key="i") {{feature}}

    section#letterFromAuthor
      v-container
        v-layout
          v-flex.xs9.xl8.offset-xl1
            v-card
              p(v-for="(p, i) in letterFromAuthor" :key="i") {{p}}
          v-flex.xs3.xl2.text-xs-center
            v-avatar
             img(src="/static/doc-images/john.jpg")
            p.john John Leider
            p.authorOfVuetify {{ $t("home.authorOfVuetify")}}
      v-container
    section#support
      v-container
          v-layout(row wrap)
            v-flex(xs6 offset-xs3 md3 offset-md0 offset-xl1).text-xs-center
              a(
                href="https://www.patreon.com/vuetify"
                target="_blank" rel="noopener"
              )
                img(src="/static/doc-images/patreon_logo.png" width="75%")
            v-flex(xs12 md9 xl7).mb-5
              p {{ $t("home.support.hasVuetifyHelped")}}
              p {{ $t("home.support.showYourSupport")}} <a href="https://www.patreon.com/vuetify" target="_blank">{{ $t("home.support.becomingAPatron")}}</a>.
    section#sponsors-and-backers.my-5
      v-container
        v-card
          h2.text-xs-center.text-md-left {{ $t("home.proudlySponsoredBy")}}
          v-layout(row wrap)
            v-flex(xs12 sm6 md4 lg3 v-for="(sponsor, i) in sponsors" :key="i").text-xs-center
                a(:href="sponsor.href" target="_blank" :title="sponsor.title" rel="noopener")
                  img(:src="sponsor.src"  :height="sponsor.height" ).sponsor
            v-flex(xs12 sm6 md4 lg3).text-xs-center
              v-btn(to="/vuetify/sponsors-and-backers" large).white.primary--text {{ $t("home.becomeSponsor")}}
                v-icon(right).primary--text fa-arrow-circle-right

    section#callout
      v-container
        v-container
          v-layout(row wrap)
            v-flex(xs12 md8 lg10)
              img(src="/static/v-alt.svg" height="50px")
              h2.mt-4.mb-5 {{ $t("home.callout")}}
    home-footer
</template>

<script>
  import HomeFooter from 'components/HomeFooter'

  export default {
    name: 'home-view',
    data(){
      return {
        sponsors: [
          {
            title: 'BrowserStack',
            href: 'https://www.browserstack.com/',
            src: '/static/doc-images/browser-stack.svg',
            height: '50px'
          },
          {
            title: 'Cloudflare',
            href: 'https://www.cloudflare.com/',
            src: '/static/doc-images/cloudflare.svg'
          },
          {
            title: 'LMAX Exchange',
            href: 'https://careers.lmax.com/?utm_source=vuetify&utm_medium=logo-link&utm_campaign=lmax-careers',
            src: '/static/doc-images/backers/lmax-exchange.png',
            height: '45px'
          }
        ]
      }
    },

    components: {
      HomeFooter
    },

    computed: {
      features(){
        return this.$t('home.features')
      },
      checkFeatures(){
        return this.$t('home.checkFeatures')
      },
      checkFeaturesCtd(){
        return this.$t('home.checkFeaturesCtd')
      },
      letterFromAuthor(){
        return this.$t('home.letterFromAuthor')
      }
    }
  }
</script>
