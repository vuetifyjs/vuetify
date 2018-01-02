<template lang="pug">
  doc-view
    template(slot-scope="{ namespace }")
      section#frequently-asked-questions
      v-text-field(
        label="Search"
        single-line
        clearable
        prepend-icon="filter_list"
        solo
        v-model="search"
        ref="search"
      ).mb-3
      v-expansion-panel(expand).mb-5
        v-expansion-panel-content(
          v-for="(faq, i) in faqs"
          v-bind:key="i"
        )
          div(slot="header").pr-5
            markdown(:source="faq.q").question
          v-divider
          v-card(color="grey lighten-4")
            v-card-text
              markdown(:source="faq.a").answer
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
        div.mb-3 {{ $t(`${namespace}.questionHeader`) }}
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
    data: () => ({
      search: ''
    }),

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
