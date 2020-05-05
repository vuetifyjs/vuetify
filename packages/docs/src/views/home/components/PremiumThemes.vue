<template>
  <base-section
    id="home-premium-themes"
    class="text-center"
  >
    <home-cards
      :cards="themes"
      :value="isLoading"
      heading="Vuetify.Home.premiumThemes"
      subheading="Vuetify.Home.premiumThemesText"
    />

    <v-btn
      :to="`/${$route.params.lang}/themes/premium/`"
      color="primary"
      large
      outlined
      rounded
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

    provide: { id: 'home-premium-themes' },

    components: {
      HomeCards: () => import('./Cards'),
    },

    data: () => ({ isLoading: true }),

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
