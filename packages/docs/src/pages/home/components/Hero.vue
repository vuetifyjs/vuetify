<template>
  <v-responsive
    class="white--text py-12"
    style="background: linear-gradient(to bottom, #1867c0, #5CBBF6)"
  >
    <v-container>
      <v-layout
        align-center
        justify-center
        wrap
      >
        <v-img
          :class="{
            'mx-5': $vuetify.breakpoint.mdAndUp,
            'mb-6': $vuetify.breakpoint.smAndDown
          }"
          :height="$vuetify.breakpoint.mdAndUp ? 256 : 135"
          :width="$vuetify.breakpoint.mdAndUp ? 256 : 135"
          class="shrink"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png"
        />
        <div
          class="text-center text-lg-left"
          :style="`flex: 0 1 ${$vuetify.breakpoint.mdAndDown ? '100%' : 'auto'}`"
        >
          <h1
            :class="$vuetify.breakpoint.smAndDown && 'display-1' || 'display-3'"
            class="font-weight-light mb-6 mx-4"
            v-html="$vuetify.breakpoint.smAndUp ? $t('Vuetify.Home.callout') : 'Vuetify.js'"
          />
          <v-layout
            :justify-center="$vuetify.breakpoint.mdAndDown"
            pa-4
            wrap
          >

            <v-dialog v-model="dialog" max-width="888">
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  :block="$vuetify.breakpoint.xsOnly"
                  class="primary--text ma-2"
                  color="white"
                  large
                  v-on="on"
                >
                  <v-icon left>mdi-vimeo</v-icon>
                  {{ $t('Vuetify.Home.whyVuetify') }}
                </v-btn>

              </template>

              <v-sheet v-if="dialog">
                <iframe
                  src="https://player.vimeo.com/video/350834301"
                  height="500"
                  width="100%"
                  frameborder="0"
                  allow="autoplay; fullscreen"
                  allowfullscreen
                />

                <div class="pt-3 pb-4 text-center">
                  Video by <a
                    href="https://www.vuemastery.com/"
                    target="_blank"
                    rel="noopener"
                  >
                    Vue Mastery</a>. Watch Vue Mastery’s free <a href="https://www.vuemastery.com/courses/beautify-with-vuetify/getting-started-with-vuetify/">Beautify with Vuetify course</a>.
                </div>
              </v-sheet>
            </v-dialog>

            <v-btn
              :block="$vuetify.breakpoint.xsOnly"
              :to="{
                name: 'Documentation',
                params: {
                  lang: $route.params.lang,
                  namespace: 'getting-started',
                  page: 'quick-start'
                }
              }"
              color="grey lighten-3"
              class="ma-2"
              large
              outlined
            >
              {{ $t('Vuetify.Home.getStarted') }}
            </v-btn>

            <v-btn
              :block="$vuetify.breakpoint.xsOnly"
              class="ma-2"
              color="grey lighten-3"
              href="https://github.com/vuetifyjs/vuetify"
              large
              outlined
            >
              <v-icon left>mdi-github-circle</v-icon>
              Github
            </v-btn>
          </v-layout>
        </div>
      </v-layout>
    </v-container>

    <feature />

    <tidelift />
  </v-responsive>
</template>

<script>
  export default {
    name: 'HomeHero',

    components: {
      Feature: () => import('./Feature'),
      Tidelift: () => import('./Tidelift'),
    },

    data: () => ({
      dialog: false,
    }),
  }
</script>
