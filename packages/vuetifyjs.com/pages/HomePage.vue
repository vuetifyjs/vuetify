<template lang="pug">
  div#home
    v-jumbotron(
      dark
      gradient="to bottom, #1867c0, #5CBBF6"
      height="auto"
    )
      v-container(fill-height).mt-5.mb-3
        v-layout(
          align-center
          justify-center
          wrap
        )
          img(
            src="/static/vuetify-logo-300.png"
            alt="Logo"
            style="logoStyles"
            :height="`${$vuetify.breakpoint.mdAndUp ? 256 : 192}px`"
            :width="`${$vuetify.breakpoint.mdAndUp ? 256 : 192}px`"
            :class="$vuetify.breakpoint.mdAndUp ? 'mr-5' : 'mb-3'"
            :key="$vuetify.breakpoint.mdAndUp ? 'big' : 'small'"
          )
          v-flex(:xs12="$vuetify.breakpoint.smAndDown").text-xs-center.text-md-left
            h1(
              class="mb-4"
              :class="[$vuetify.breakpoint.mdAndUp ? 'display-3' : 'display-1']"
              style="font-weight: 300;"
            )
              div(v-text="$t('Vuetify.Home.materialDesign')")
              div(v-text="$t('Vuetify.Home.componentFramework')")
            v-btn(
              :to="{ name: 'getting-started/QuickStart' }"
              class="primary--text"
              color="white"
              large
              style="min-width: 128px;"
            )
              | {{ $t("Vuetify.Home.getStarted") }}
            v-btn(
              color="white"
              href="https://github.com/vuetifyjs/vuetify"
              large
              outline
              rel="noopener"
              target="_blank"
            )
              v-icon(left) mdi-github-circle
              | Github

      v-container(grid-list-xl).mb-5
        v-layout(row wrap justify-center)
          v-flex(
            xs12 sm6 md4 lg4
            v-for="(feature, i) in features"
            :key="feature.title"
          )
            v-card(light).elevation-24.hide-overflow
              img(
                :src="feature.img"
                width="100%"
              ).mb-3
              v-card-text
                h3(
                  v-text="feature.title"
                  style="font-size: 18px; font-weight: 500;"
                ).mb-3.text-xs-center
                p(v-text="feature.text").text-xs-center

    section#sponsors-and-backers.my-5
      v-container
        v-layout
          v-flex(xs12)
            h2(v-text="$t('Vuetify.Home.proudlySponsoredBy')").text-xs-center.headline.mb-3.grey--text
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
                  )
              v-flex(xs12).text-xs-center.mt-3
                v-btn(
                  :to="{ name: 'getting-started/SponsorsAndBackers' }"
                  color="primary"
                  large
                  outline
                ) {{ $t("Vuetify.Home.becomeSponsor") }}
                  v-icon(right color="primary") chevron_right

    section#checked-features.mb-5
      v-container
        h2.text-xs-center.headline.mb-5.grey--text
          span {{ $t("Vuetify.Home.checkFeaturesTitle") }}
          | {{ $t("Vuetify.Home.checkFeaturesTitleCtd") }}
        v-layout(row wrap justify-center)
          v-flex(
            mx-3
            shrink
          )
            v-layout(
              v-for="(feature, i) in checkFeatures"
              :key="i"
              align-center
            ).my-2
              v-icon(
                color="green"
                size="36px"
              ).mr-3 check
              span.subheading {{ feature }}
          v-flex(
            mx-3
            shrink
          )
            v-layout(
              v-for="(feature, i) in checkFeaturesCtd"
              :key="i"
              align-center
            ).my-2
              v-icon(
                color="green"
                size="36px"
              ).mr-3 check
              span.subheading {{ feature }}

    section#using-vuetify.mb-5
      v-container(grid-list-xl)
        h2.text-xs-center.headline.mb-5.grey--text
          span {{ $t("Vuetify.Home.madeWithVuetify") }}
        v-layout(wrap)
          v-flex(
            v-for="(feature, i) in computedFeatured"
            :key="i"
            xs12
            sm6
            md4
          )
            v-card(
              :href="`${feature.url}?ref=vuetifyjs.com`"
              :img="feature.image"
              height="300px"
              target="_blank"
              rel="noopener"
              @click="$ga.event('home mwvjs click', 'click', feature.title)"
            ).elevation-24
        v-layout(
          justify-center
          pt-3
        )
          a(
            href="https://madewithvuejs.com?ref=vuetifyjs.com"
            target="_blank"
            rel="noopener"
            @click="$ga.event('home mwvjs click', 'click', 'madewithvuejs')"
          )
            img(
              src="/static/doc-images/powered-by-madewithvue-1.svg"
              height="65px"
            )

    v-jumbotron(
      dark
      gradient="to top, #1867c0, #5CBBF6"
      height="auto"
    )
      v-container.mt-4.mb-3
        v-layout(row wrap)
          v-flex(xs12)
            h5.mb-3
              v-layout(align-center justify-center column)
                img(
                  src="/static/v-alt.svg"
                  height="64px"
                  width="64px"
                ).mb-2
                span(v-text="$t('Vuetify.Home.callout')").subheading

        v-layout(justify-center).mb-3
          a(
            v-for="(social, i) in socials"
            :href="social.href"
            :key="i"
            :title="social.title"
            target="_blank"
            rel="noopener"
          ).social.mx-3
            v-icon(v-text="social.icon")

        v-layout(column text-xs-center)
          div Released under the&nbsp;
            a(
              href="https://opensource.org/licenses/MIT"
              rel="noopener"
              style="text-decoration: none;"
              target="_blank"
              v-text="$t('Vuetify.Home.mit')"
            ).body-2.white--text
          div Copyright &copy; 2016-{{ (new Date()).getFullYear() }} Vuetify, LLC
</template>

<script>
  import supporters from '@/assets/supporters'

  // Mixins
  import Message from '@/mixins/message'

  // Utilities
  import { mapMutations } from 'vuex'

  export default {
    name: 'HomePage',

    mixins: [Message],

    data: () => ({
      diamond: supporters.diamond,
      featured: [],
      palladium: supporters.palladium,
      socials: [
        {
          icon: 'mdi-reddit',
          href: 'https://www.reddit.com/r/vuetifyjs',
          title: 'Reddit'
        },
        {
          icon: 'mdi-medium',
          href: 'https://medium.com/vuetify',
          title: 'Medium'
        },
        {
          icon: 'mdi-github-circle',
          href: 'https://github.com/vuetifyjs/vuetify',
          title: 'Github'
        },
        {
          icon: 'mdi-twitter',
          href: 'https://twitter.com/vuetifyjs',
          title: 'Twitter'
        },
        {
          icon: 'mdi-facebook',
          href: 'https://www.facebook.com/vuetifyjs',
          title: 'Facebook'
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
      computedFeatured () {
        return this.featured.slice(0, 6)
      },
      features () {
        return this.$t('Vuetify.Home.features').reverse()
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

    mounted () {
      this.snackbar({
        color: '',
        msg: 'Vuetify is now on Reddit!',
        href: 'https://www.reddit.com/r/vuetifyjs/',
        text: 'Check it out',
        timeout: 10
      })

      this.$http({
        method: 'GET',
        url: 'https://madewithvuejs.com/api/tag/vuetify',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        this.featured = this.setFeatured(res.data)
      })
      .catch(err => console.log(err))
    },

    methods: {
      ...mapMutations('app', {
        snackbar: 'SNACKBAR'
      }),
      setFeatured (data) {
        if (!data) return []

        const featured = data.data.map(f => {
          f.hover = false

          return f
        })

        return this.shuffle(featured)
      },
      shuffle (array) {
        let currentIndex = array.length
        let temporaryValue
        let randomIndex

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex)
          currentIndex -= 1

          // And swap it with the current element.
          temporaryValue = array[currentIndex]
          array[currentIndex] = array[randomIndex]
          array[randomIndex] = temporaryValue
        }

        return array
      },
      snackHandler () {
        this.$router.push({ name: 'store/Index' })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .social
    text-decoration: none
</style>
