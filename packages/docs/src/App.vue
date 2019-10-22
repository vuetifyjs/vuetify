<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>
</template>

<script>
  // Mixins
  import Meta from '@/mixins/meta'

  // Utilities
  import { waitForReadystate } from '@/util/helpers'

  import languages from '@/data/i18n/languages.json'

  const fallbackLocale = languages.find(lang => lang.fallback === true).locale

  export default {
    name: 'App',

    mixins: [Meta],

    data: () => ({
      availableLocales: languages.map(lang => lang.alternate || lang.locale),
      languages,
    }),

    computed: {
      languageIsValid () {
        return this.availableLocales.includes(this.$route.params.lang)
      },
    },

    watch: {
      '$route.path' () {
        window.scrollTo(0, 0)
      },
    },

    created () {
      if (!this.languageIsValid) this.$router.push(`/${fallbackLocale}`)

      if (this.$ssrContext) return

      this.$vuetify.theme.dark = localStorage.getItem('vuetify__documentation__theme') === 'true'
    },

    async mounted () {
      if (!this.$route.hash) return

      await this.$nextTick()
      await waitForReadystate()

      this.$vuetify.goTo(this.$route.hash)
    },
  }
</script>

<style lang="sass">
  .text-decoration-none
    text-decoration: none

  .wf-loading .material-icons
    display: none

  .v-application .markdown code
    box-shadow: none
    color: #c0341d
    background-color: #fbe5e1

  .v-application .markdown kbd > code
    background: transparent
    color: inherit
</style>
