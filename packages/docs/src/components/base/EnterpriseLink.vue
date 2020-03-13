<template>
  <v-btn
    :aria-label="$t('Vuetify.AppToolbar.enterprise')"
    class="hidden-sm-and-down"
    min-width="48"
    text
    :to="path"
    @click="$ga.event('toolbar', 'click', 'enterprise')"
  >
    <base-nav-text>Vuetify.AppToolbar.enterprise</base-nav-text>
  </v-btn>
</template>

<script>
  export default {
    computed: {
      path () {
        const lang = this.$route.params.lang || this.$i18n.fallbackLocale

        return {
          path: `/${lang}/professional-support/enterprise/`,
        }
      },
    },
  }
</script>
