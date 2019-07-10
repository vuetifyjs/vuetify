<template>
  <v-btn
    :aria-label="$t('Vuetify.AppToolbar.enterprise')"
    class="hidden-sm-and-down"
    min-width="48"
    text
    :to="path"
    @click="$ga.event('toolbar', 'click', 'enterprise')"
  >
    <span v-text="$t('Vuetify.AppToolbar.enterprise')" />
  </v-btn>
</template>

<script>
  export default {
    computed: {
      path () {
        const lang = this.$route.params.lang || this.$i18n.fallbackLocale

        return {
          path: `/${lang}/getting-started/enterprise`,
        }
      },
    },
  }
</script>
