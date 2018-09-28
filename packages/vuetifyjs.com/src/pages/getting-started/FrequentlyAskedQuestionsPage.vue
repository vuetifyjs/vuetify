<template lang="pug">
  views-doc
    template(slot-scope="{ namespace }")
      section#frequently-asked-questions
      template(
        v-for="(faq, i) in gotchas"
      )
        div.subheading
          helpers-markdown {{ faq.q }}
        v-divider
        v-card.mb-5.flat
          v-card-text
            helpers-markdown {{ faq.a }}
            helpers-markup(v-if="faq.a.indexOf('#modifying-options-of-a-loader')>-1", lang="js")
              |// vue.config.js
              |module.exports = {
              |  chainWebpack: config => {
              |    config.module
              |      .rule('vue')
              |      .use('vue-loader')
              |      .loader('vue-loader')
              |      .tap(options => Object.assign(options, {
              |            transformAssetUrls: {
              |               'v-img': ['src', 'lazy-src'],
              |                'v-card': 'src',
              |               'v-card-media': 'src',
              |               'v-responsive': 'src',
              |                //...
              |            }
              |            }))
              |  }
              |    //...
              |}

      div.text-xs-center
        div.mb-3
          translation-translatable(:i18n="`${namespace}.questionHeader`")
            span {{ $t(`${namespace}.questionHeader`) }}
        translation-translatable(:i18n="`${namespace}.questionButton`")
          v-btn(
            outline
            color="success"
            round
            href="https://chat.vuetifyjs.com"
            target="_blank"
            rel="noopener"
          ) {{ $t(`${namespace}.questionButton`) }}
</template>

<script>
  export default {
    computed: {
      gotchas () {
        return this.$t('GettingStarted.FrequentlyAskedQuestions.gotchas')
      }
    }
  }
</script>

<style lang="stylus">
  .question,
  .answer
    > p
      margin-bottom: 0
</style>
