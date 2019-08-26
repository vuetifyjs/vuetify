<template>
  <v-card
    class="text-center py-12"
    flat
  >
    <h3
      class="font-weight-medium grey--text text--darken-2"
      v-text="$t('Vuetify.Home.premiumThemes')"
    />

    <v-container
      class="mb-6"
      grid-list-xl
    >
      <v-layout
        align-center
        fill-height
        justify-center
        wrap
      >
        <v-flex
          v-for="(theme, i) in themes"
          :key="i"
          xs12
          sm6
          md4
        >
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                :title="`Link to ${theme.title}`"
                :href="`${theme.url}?ref=vuetifyjs.com`"
                class="v-card--mwvjs"
                elevation="24"
                target="_blank"
                rel="noopener"
                @click="$ga.event('home', 'click', 'theme', theme.title)"
              >
                <v-img
                  :alt="theme.title"
                  :src="theme.src"
                  height="300px"
                  width="100%"
                >
                  <v-fade-transition>
                    <v-overlay
                      v-show="hover"
                      absolute
                      opacity="0.9"
                    >
                      <h3
                        class="headline mb-2"
                        v-text="theme.title"
                      />
                      <div
                        class="overline grey--text mb-12 px-6"
                        v-text="theme.description"
                      />
                      <v-btn
                        :aria-label="`Link to ${theme.title}`"
                        color="success"
                        fab
                        large
                        tabindex="-1"
                      >
                        <v-icon>mdi-open-in-new</v-icon>
                      </v-btn>
                    </v-overlay>
                  </v-fade-transition>
                </v-img>
              </v-card>
            </template>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>

    <v-btn
      color="primary"
      large
      outlined
      rounded
      to="themes/premium"
    >
      <span class="caption font-weight-bold">
        {{ $t("Vuetify.Home.seeMoreThemes") }}
      </span>
    </v-btn>
  </v-card>
</template>

<script>
  export default {
    name: 'HomePremiumThemes',

    data: vm => ({
      themes: [
        {
          title: vm.$t('Themes.Premium.templates.dashboard-pro.title'),
          description: vm.$t('Themes.Premium.templates.dashboard-pro.description'),
          src: 'https://cdn.vuetifyjs.com/images/starter/vuetify-admin-dashboard-pro.jpg',
          url: 'https://www.creative-tim.com/product/vuetify-material-dashboard-pro',
        },
        {
          title: vm.$t('Themes.Premium.templates.material-kit.title'),
          description: vm.$t('Themes.Premium.templates.material-kit.description'),
          src: 'https://cdn.vuetifyjs.com/images/starter/vuetify-material-kit.png',
          url: 'https://store.vuetifyjs.com/product/material-kit-theme',
        },
        {
          title: vm.$t('Themes.Premium.templates.alpha.title'),
          description: vm.$t('Themes.Premium.templates.alpha.description'),
          src: 'https://cdn.vuetifyjs.com/images/starter/vuetify-alpha-theme.png',
          url: 'https://store.vuetifyjs.com/product/vuetify-alpha-theme',
        },
      ],
    }),
  }
</script>

<style lang="sass">
  .v-card--mwvjs:focus .v-overlay
    display: flex !important
</style>
