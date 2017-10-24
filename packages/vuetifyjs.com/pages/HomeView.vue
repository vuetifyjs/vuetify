<template lang="pug">
  div#home
    #announcement-banner.primary--light
      p {{ $t('home.announcementBanner') }}
    v-parallax(
      jumbotron
    ).primary--light
      v-layout(align-center justify-center)
        v-flex.text-xs-center
          img(
            src="/static/v-alt.svg"
            alt="Logo"
            height="75px"
          )
          h1.mt-4.mb-5
            span {{ $t("home.heading1") }}
            | {{ $t("home.heading1cont") }}
          v-btn(
            color="secondary"
            to="/getting-started/quick-start"
          ).px-3 {{ $t("home.getStarted") }}
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
          v-flex(xs3 xl2).text-xs-center
            v-avatar
             img(src="/static/doc-images/john.jpg")
            p.john John Leider
            p.authorOfVuetify {{ $t("home.authorOfVuetify") }}

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
                target="_blank" rel="noopener"
              )
                img(src="/static/doc-images/patreon_logo.png" width="75%")
            v-flex(xs12 md9 xl7).mb-5
              p {{ $t("home.support.hasVuetifyHelped") }}
              p {{ $t("home.support.showYourSupport") }} <a href="https://www.patreon.com/vuetify" target="_blank">{{ $t("home.support.becomingAPatron") }}</a>.

    section#sponsors-and-backers.my-5
      v-container
        v-card
          h2.text-xs-center.text-md-left {{ $t("home.proudlySponsoredBy") }}
          v-layout(row wrap)
            v-flex(
              xs12
              sm6
              md4
              lg3
              v-for="(sponsor, i) in sponsors"
              :key="i"
            ).text-xs-center
              a(:href="sponsor.href" target="_blank" :title="sponsor.title" rel="noopener")
                img(:src="sponsor.src" :height="sponsor.height").sponsor
            v-flex(xs12 sm6 md4 lg3).text-xs-center
              v-btn(to="/vuetify/sponsors-and-backers" large).white.primary--text {{ $t("home.becomeSponsor") }}
                v-icon(right).primary--text fa-arrow-circle-right

    section#callout
      v-container
        v-container
          v-layout(row wrap)
            v-flex(xs12 md8 lg10)
              img(src="/static/v-alt.svg" height="50px")
              h2.mt-4.mb-5 {{ $t("home.callout") }}

    home-footer
</template>

<script>
  import HomeFooter from '@components/HomeFooter'

  export default {
    name: 'home-view',

    data: () => ({
      sponsors: [
        {
          title: 'LMAX Exchange',
          href: 'https://careers.lmax.com/?utm_source=vuetify&utm_medium=logo-link&utm_campaign=lmax-careers',
          src: '/static/doc-images/backers/lmax-exchange.png',
          height: '45px'
        },
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
        }
      ]
    }),

    components: {
      HomeFooter
    },

    computed: {
      features () {
        return this.$t('home.features')
      },
      checkFeatures () {
        return this.$t('home.checkFeatures')
      },
      checkFeaturesCtd () {
        return this.$t('home.checkFeaturesCtd')
      },
      letterFromAuthor () {
        return this.$t('home.letterFromAuthor')
      }
    }
  }
</script>
