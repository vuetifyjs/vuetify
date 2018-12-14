<template>
  <router-view v-if="languageIsValid" />
  <not-found-page v-else to="/en/" />
</template>

<script>
  import languages from '@/data/i18n/languages.json'
  import NotFoundPage from '@/pages/general/404Page.vue'

  export default {
    components: {
      NotFoundPage
    },

    props: {
      lang: {
        type: String,
        default: 'en'
      }
    },

    data: () => ({
      availableLocales: languages.map(lang => lang.locale),
      languages
    }),

    computed: {
      languageIsValid () {
        return this.availableLocales.includes(this.lang)
      }
    }
  }
</script>
