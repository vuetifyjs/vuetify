<template>
  <v-responsive
    class="white--text py-5"
    style="background: linear-gradient(to bottom, #1867c0, #5CBBF6)"
  >
    <tidelift />
    <v-container>
      <v-layout
        align-center
        justify-center
        wrap
      >
        <v-img
          :class="{
            'mr-5': $vuetify.breakpoint.mdAndUp,
            'mb-3': $vuetify.breakpoint.smAndDown
          }"
          :height="$vuetify.breakpoint.mdAndUp ? 256 : 135"
          :width="$vuetify.breakpoint.mdAndUp ? 256 : 135"
          class="shrink"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png"
        />
        <div class="text-xs-center text-lg-left">
          <h1
            :class="$vuetify.breakpoint.smAndDown && 'display-1' || 'display-3'"
            class="font-weight-light mb-4"
            v-html="$vuetify.breakpoint.smAndUp ? $t('Vuetify.Home.callout') : 'Vuetify.js'"
          />
          <v-layout
            justify-center
            wrap
          >
            <v-btn
              :to="{
                name: 'Documentation',
                params: {
                  lang: $route.params.lang,
                  namespace: 'getting-started',
                  page: 'quick-start'
                }
              }"
              class="primary--text ml-0"
              color="white"
              large
            >
              {{ $t('Vuetify.Home.getStarted') }}
            </v-btn>
            <v-btn
              color="white"
              href="https://github.com/vuetifyjs/vuetify"
              large
              outline
            >
              <v-icon left>mdi-github-circle</v-icon>
              Github
            </v-btn>
            <v-btn
              color="grey lighten-3 mr-0"
              outline
              href="https://community.vuetifyjs.com"
              large
              rel="noopener"
              target="_blank"
            >
              <v-icon left>mdi-discord</v-icon>
              {{ $t('Vuetify.Home.getHelp') }}
            </v-btn>
          </v-layout>
        </div>
      </v-layout>
    </v-container>

    <feature />
  </v-responsive>
</template>

<script>
  export default {
    components: {
      Feature: () => import('./Feature'),
      Tidelift: () => import('./Tidelift')
    }
  }
</script>
