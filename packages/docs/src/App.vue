<template>
  <router-view />
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

    created () {
      if (!this.languageIsValid) this.$router.push(`/${fallbackLocale}`)
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

  .v-application code
    box-shadow: none
    color: #c0341d
    background-color: #fbe5e1

  .v-application kbd > code
    background: transparent
    color: inherit
</style>
