<template>
  <router-view />
</template>

<script>
  import languages from '@/data/i18n/languages.json'

  const fallbackLocale = languages.find(lang => lang.fallback === true).locale

  export default {
    props: {
      lang: {
        type: String,
        default: fallbackLocale
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
    },

    created () {
      if (!this.languageIsValid) this.$router.push(`/${fallbackLocale}`)
    }
  }
</script>
