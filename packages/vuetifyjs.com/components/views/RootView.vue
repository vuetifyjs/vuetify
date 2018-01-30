<template lang="pug">
  router-view(v-if="languageIsValid")
  not-found-page(v-else to="/en/")
</template>

<script>
  import { camelActual } from '@/util/helpers'
  import { mapState } from 'vuex'
  import languages from '@/i18n/languages'
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
      ...mapState('app', {
        loadedLangs: state => state.loadedLangs
      }),
      languageIsValid () {
        return this.availableLocales.includes(this.lang)
      }
    },

    created () {
      this.$i18n.locale = this.lang
      // if (this.$ssrContext && !this.languageIsValid) this.$ssrContext.res.status(404)
    },

    async beforeRouteUpdate (to, from, next) {
      const locale = to.params.lang
      const localeFile = camelActual(locale)

      if (this.loadedLangs.indexOf(locale) < 0) {
        await import(
          /* webpackChunkName: "lang-[request]" */
          /* webpackMode: "lazy-once" */
          `@/lang/${localeFile}`
          ).then(msgs => this.$i18n.setLocaleMessage(locale, msgs.default))
          .catch(err => Promise.resolve(err))
      }

      document.querySelector('html').setAttribute('lang', locale)
      this.$i18n.locale = locale
      next()
    }
  }
</script>
