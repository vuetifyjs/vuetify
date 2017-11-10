<template lang="pug">
  text-page(:data="$data")
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
            strong {{ $t('GettingStarted.Faq.question') }} &nbsp;
            span(v-html="faq.q")
          v-divider
          v-card(color="grey lighten-4")
            v-card-text
              strong {{ $t('GettingStarted.Faq.answer') }} &nbsp;
              div(v-html="faq.a")
      v-fade-transition
        div(
          v-if="!faqs.length"
        ).text-xs-center.mb-5
          h3 {{ $t('GettingStarted.Faq.noResultsFound') }}
          v-btn(
            color="primary"
            flat
            @click="resetSearch"
          ) {{ $t('GettingStarted.Faq.resetSearch') }}

      div.text-xs-center
        div.mb-3 {{ $t('GettingStarted.Faq.questionHeader') }}
        v-btn(
          outline
          color="success"
          round
          href="https://chat.vuetifyjs.com"
          target="_blank"
          rel="noopener"
        ) {{ $t('GettingStarted.Faq.questionButton') }}
</template>

<script>
  export default {
    data: () => ({
      header: "GettingStarted.Faq.header",
      headerText: "GettingStarted.Faq.headerText",
      search: ''
    }),
    computed: {
      gotchas () {
        return this.$t('GettingStarted.Faq.gotchas')
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
