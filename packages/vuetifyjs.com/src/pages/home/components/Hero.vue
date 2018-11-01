<template>
  <v-card flat color="white">
    <v-container pa-5>
      <v-layout
        align-center
        justify-center
      >
        <v-img
          class="shrink mr-5"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/v.svg"
          height="216"
          width="216"
        />
        <div>
          <v-display-2
            class="mono font-weight-light mb-4"
            v-html="$t('Vuetify.Home.callout')"
          />
          <v-layout>
            <v-btn
              color="primary"
              depressed
              large
              round
              to="/getting-started/why-vuetify"
            >
              {{ $t('Vuetify.Home.whyVuetify') }}
            </v-btn>
            <v-btn
              color="primary"
              outline
              large
              round
              to="/getting-started/quick-start"
            >
              {{ $t('Vuetify.Home.getStarted') }}
            </v-btn>
            <v-btn
              class="grey--text"
              color="grey lighten-3"
              depressed
              large
              href="https://github.com/vuetifyjs/vuetify"
              rel="noopener"
              round
              target="_blank"
            >
              <v-icon
                large
                left
              >
                mdi-github-circle
              </v-icon>
              {{ $t('Vuetify.Home.github') }}
            </v-btn>
          </v-layout>
        </div>
      </v-layout>
    </v-container>
  </v-card>
</template>

<style lang="stylus" scoped>
  .display-2
    line-height: 1.3
</style>
