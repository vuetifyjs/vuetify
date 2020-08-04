<template>
  <base-section
    id="home-hero"
    :class="$vuetify.theme.dark && 'theme--dark'"
    class="white--text py-4 py-md-12"
  >
    <v-responsive
      :max-width="1280 + 24"
      class="mx-auto pa-6"
      min-height="30vh"
    >
      <v-container class="pa-0">
        <v-row align="center">
          <v-col
            cols="12"
            md="7"
          >
            <v-responsive
              class="overflow-visible"
              max-width="625"
            >
              <base-title class="home-hero__title mb-4">
                <base-markdown>Vuetify.Home.callout</base-markdown>
              </base-title>

              <base-text dark>Vuetify.Home.text</base-text>

              <div class="py-4" />

              <div class="d-flex flex-wrap justify-left justify-sm-center justify-md-start align-center mx-n2">
                <base-btn
                  :to="`/${$route.params.lang}/getting-started/quick-start/`"
                  class="primary--text ma-2 grow"
                  color="white"
                  x-large
                  @click="$ga.event('home', 'click', 'get-started')"
                >
                  <v-icon
                    left
                    size="20"
                  >
                    mdi-speedometer
                  </v-icon>

                  {{ $t('Vuetify.Home.getStarted') }}
                </base-btn>

                <v-btn
                  :to="`/${$route.params.lang}/introduction/why-vuetify/`"
                  class="ma-2 grow"
                  color="white"
                  outlined
                  x-large
                  @click="$ga.event('home', 'click', 'why-vuetify')"
                >
                  <v-icon
                    left
                    size="20"
                  >
                    mdi-vuetify
                  </v-icon>

                  {{ $t('Vuetify.Home.whyVuetifyText2') }}
                </v-btn>

                <v-btn
                  class="ma-2 grow"
                  color="grey lighten-5"
                  href="https://github.com/vuetifyjs/vuetify"
                  rel="nofollower noopener"
                  target="_blank"
                  min-width="187"
                  light
                  x-large
                  depressed
                  @click="$ga.event('home', 'click', 'github')"
                >
                  <v-icon
                    left
                    size="20"
                  >
                    mdi-github
                  </v-icon>

                  Github
                </v-btn>
              </div>
            </v-responsive>
          </v-col>

          <v-col
            cols="12"
            md="5"
          >
            <base-card
              class="v-card--hero"
              color="black"
            >
              <v-lazy min-height="300">
                <iframe
                  allow="autoplay; fullscreen"
                  allowfullscreen
                  class="v-card--hero__iframe"
                  frameborder="0"
                  src="https://player.vimeo.com/video/350834301"
                  title="Vue Mastery Vuetify Course"
                />
              </v-lazy>
            </base-card>

            <div class="caption pt-3 pb-4 text-center grey--text text--lighten-4">
              Video by
              <a
                href="https://www.vuemastery.com/"
                target="_blank"
                @click="$ga.event('home', 'click', 'vuemastery link')"
              >Vue Mastery</a>.

              Watch Vue Mastery’s free&nbsp;<a
                href="https://www.vuemastery.com/courses/beautify-with-vuetify/getting-started-with-vuetify/"
                target="_blank"
                @click="$ga.event('home', 'click', 'vuemastery link')"
              >Vuetify lesson</a>.
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
  </base-section>
</template>

<script>
  export default {
    name: 'HomeHero',
  }
</script>

<style lang="sass">
  #home-hero
    background: linear-gradient(to bottom, #1867c0, #5CBBF6)

    a:not(.v-btn)
      color: inherit
      text-decoration: none

  .home-hero__title
    line-height: 1.2

  .v-card--hero
    background: #000
    border-radius: 6px
    height: 0
    margin: 0
    overflow: hidden
    padding-bottom: 70%
    position: relative
    width: 100%

    &__iframe
      display: block
      vertical-align: middle
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
</style>
