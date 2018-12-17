<template>
  <v-card
    flat
    class="py-4"
    color="white"
  >
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
          :height="$vuetify.breakpoint.mdAndUp ? 216 : 135"
          :width="$vuetify.breakpoint.mdAndUp ? 216 : 135"
          class="shrink"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/v.svg"
        />
        <div class="text-xs-center">
          <v-display-2
            :class="$vuetify.breakpoint.smAndDown && 'headline'"
            tag="h1"
            class="mono font-weight-light mb-4 text-md-left"
            v-html="$vuetify.breakpoint.mdAndUp ? $t('Vuetify.Home.callout') : 'Vuetify.js'"
          />
          <v-layout
            justify-center
            wrap
          >
            <v-btn
              color="primary"
              depressed
              large
              round
              to="getting-started/quick-start"
            >
              {{ $t('Vuetify.Home.getStarted') }}
            </v-btn>
            <v-btn
              color="primary"
              outline
              large
              round
              to="getting-started/why-vuetify"
            >
              {{ $t('Vuetify.Home.whyVuetify') }}
            </v-btn>
            <v-btn
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
