<template>
  <base-section
    id="home-premium-themes"
    class="text-center"
  >
    <home-cards
      heading="Vuetify.Home.premiumThemes"
      subheading="Vuetify.Home.premiumThemesText"
      :cards="themes"
      :value="isLoading"
    />

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
  </base-section>
</template>

<script>
  // Utilities
  import {
    get,
  } from 'vuex-pathify'

  export default {
    name: 'HomePremiumThemes',

    components: {
      HomeCards: () => import('./Cards'),
    },

    data: () => ({
      isLoading: true,
    }),

    computed: {
      templates: get('documentation/themes'),
      themes () {
        return this.templates.slice(0, 4)
      },
    },

    mounted () {
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    },
  }
</script>
