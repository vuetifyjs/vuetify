<template lang="pug">
  doc-view
    template(slot-scope="{ namespace }")
      section#frequently-asked-questions
      template(
        v-for="(faq, i) in faqs"
      )
        div.subheading
          markdown {{ faq.q }}
        v-divider
        v-card.mb-5.flat
          v-card-text
            markdown {{ faq.a }}

      v-fade-transition
        div(
          v-if="!faqs.length"
        ).text-xs-center.mb-5
          h3 {{ $t(`${namespace}.noResultsFound`) }}
          v-btn(
            color="primary"
            flat
            @click="resetSearch"
          ) {{ $t(`${namespace}.resetSearch`) }}

      div.text-xs-center
        div.mb-3
          translatable(:i18n="`${namespace}.questionHeader`")
            span {{ $t(`${namespace}.questionHeader`) }}
        translatable(:i18n="`${namespace}.questionButton`")
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
      },
      faqs () {
        return this.gotchas.filter(qa => {
          const answer = qa.a.toLowerCase()
          const question = qa.q.toLowerCase()
          const search = (this.search || '').toLowerCase()
          return answer.indexOf(search) > -1 ||
            question.indexOf(search) > -1
        })
      }
    },
    methods: {
      resetSearch () {
        this.search = ''
        this.$refs.search.focus()
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
