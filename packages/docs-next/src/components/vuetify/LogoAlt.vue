<template>
  <router-link
    :to="{
      name: 'Home',
      params: { locale }
    }"
    :aria-label="$i18n.t('logo')"
    class="d-none d-sm-flex align-center text--primary"
    style="text-decoration: none;"
    :title="$i18n.t('logo')"
    @click.native="$vuetify.goTo(0)"
  >
    <v-img
      :src="`https://cdn.vuetifyjs.com/images/logos/vuetify-logo-${theme.isDark ? 'dark' : 'light' }.png`"
      :alt="$i18n.t('logo')"
      class="shrink mr-2"
      contain
      transition="scale-transition"
      width="40"
    />

    <v-sheet
      class="display-1 hidden-sm-and-down font-weight-medium mr-0 mr-md-4"
      color="transparent"
    >
      Vuetify
    </v-sheet>
  </router-link>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'VuetifyAltLogo',

    inject: ['theme'],

    computed: { locale: get('route/params@locale') },
  }
</script>
