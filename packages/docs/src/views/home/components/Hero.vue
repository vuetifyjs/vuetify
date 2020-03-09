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
              max-width="550"
            >
              <base-title class="home-hero__title mb-4">
                <base-markdown>Vuetify.Home.callout</base-markdown>
              </base-title>

              <base-text dark>Vuetify.Home.text</base-text>

              <div class="py-4" />

              <base-btn
                :block="$vuetify.breakpoint.smAndDown"
                :to="`/${$route.params.lang}/introduction/why-vuetify/`"
                class="primary--text my-6"
                color="white"
                x-large
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
                :block="$vuetify.breakpoint.smAndDown"
                class="my-6 ma-md-6"
                color="white"
                href="https://github.com/vuetifyjs/vuetify"
                min-width="187"
                outlined
                rel="nofollower noopener"
                target="_blank"
                x-large
              >
                <v-icon
                  left
                  size="20"
                >
                  mdi-github-face
                </v-icon>

                Github
              </v-btn>
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
                rel="noopener"
              >
                Vue Mastery
              </a>.

              Watch Vue Mastery’s free <a href="https://www.vuemastery.com/courses/beautify-with-vuetify/getting-started-with-vuetify/">Vuetify lesson</a>.
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

    &.theme--dark
      background: linear-gradient(to bottom, #2196F3, #5CBBF6)

    a
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
