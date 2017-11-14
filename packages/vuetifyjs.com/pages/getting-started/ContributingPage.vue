<template lang="pug">
  text-page(:data="$data" id="contributing-page")
    section#reporting-issues
      section-heading(value="GettingStarted.Contributing.issuesHeader")
      div.mb-3
        ul.browser-list
          li(v-html="$t('GettingStarted.Contributing.issue1')")
          ul
            li(v-html="$t('GettingStarted.Contributing.issue2')")
          li(v-html="$t('GettingStarted.Contributing.issue3')")
          li(v-html="$t('GettingStarted.Contributing.issue4')")
          li(v-html="$t('GettingStarted.Contributing.issue5')")
    section#pull-requests
      section-heading(value="GettingStarted.Contributing.pullRequestsHeader")
      div.mb-3
        ul.browser-list
          li(
            v-for="n in 3"
            :key="n"
            v-html="$t(`GettingStarted.Contributing.pullRequest${n}`)"
          )
    section#local-dev
      section-heading(value="GettingStarted.Contributing.localDevHeader")
      section-text(value="GettingStarted.Contributing.localDevText1").mb-5
      markup(lang="cli").mb-5
        |git clone git@github.com:vuetifyjs/vuetify
      section-text(value="GettingStarted.Contributing.localDevText2").mb-5
      markup(lang="cli").mb-5
        |git checkout dev
        |npm install // or yarn
        |npm run dev
      section-text(value="GettingStarted.Contributing.localDevText3")
</template>
<script>
  export default {
    name: 'contribution-page',
    data: () => ({
      header: "GettingStarted.Contributing.header",
      headerText: "GettingStarted.Contributing.headerText",
      toc: "GettingStarted.Contributing.toc"
    })
  }
</script>
