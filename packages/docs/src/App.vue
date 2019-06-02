<template>
  <v-app>
    <router-view />

    <core-toolbar v-if="hasToolbar" />
  </v-app>
</template>

<script>
  // Mixins
  import Meta from '@/mixins/meta'

  // Utilities
  import { waitForReadystate } from '@/util/helpers'
  import { mapState } from 'vuex'

  import languages from '@/data/i18n/languages.json'

  const fallbackLocale = languages.find(lang => lang.fallback === true).locale

  export default {
    mixins: [Meta],

    data: () => ({
      availableLocales: languages.map(lang => lang.alternate || lang.locale),
      languages,
    }),

    computed: {
      ...mapState('app', ['isLoading']),
      ...mapState('route', ['hash', 'name']),
      languageIsValid () {
        return this.availableLocales.includes(this.$route.params.lang)
      },
      hasToolbar () {
        return this.languageIsValid && this.name !== 'Layouts'
      },
    },

    created () {
      if (!this.languageIsValid) this.$router.push(`/${fallbackLocale}`)
    },

    async mounted () {
      if (!this.hash) return

      await this.$nextTick()
      await waitForReadystate()

      this.$vuetify.goTo(this.hash)
    },
  }
</script>

<style>
  .text-decoration-none {
    text-decoration: none;
  }

  .wf-loading .material-icons {
    display: none;
  }
</style>
