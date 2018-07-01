<template lang="pug">
  views-doc
    template(slot-scope="{ namespace }")
      section#reporting-issues
        helpers-section-head(:value="`${namespace}.issuesHeader`")
        div.mb-3
          ul.browser-list
            li
              translation-translatable(:i18n="`${namespace}.issue1`")
                markdown(:source="$t(`${namespace}.issue1`)")
            ul.browser-list
              li
                translation-translatable(:i18n="`${namespace}.issue2`")
                  markdown(:source="$t(`${namespace}.issue2`)")
            li
              translation-translatable(:i18n="`${namespace}.issue3`")
                markdown(:source="$t(`${namespace}.issue3`)")
            li
              translation-translatable(:i18n="`${namespace}.issue4`")
                markdown(:source="$t(`${namespace}.issue4`)")
            li
              translation-translatable(:i18n="`${namespace}.issue5`")
                markdown(:source="$t(`${namespace}.issue5`)")
            li
              translation-translatable(:i18n="`${namespace}.issue6`")
                markdown(:source="$t(`${namespace}.issue6`)")
      section#pull-requests
        helpers-section-head(:value="`${namespace}.pullRequestsHeader`")
        div.mb-3
          ul.browser-list
            li(
              v-for="n in 3"
              :key="n"
            )
              translation-translatable(:i18n="`${namespace}.pullRequest${n}`")
                markdown(:source="$t(`${namespace}.pullRequest${n}`)")
      section#local-dev
        helpers-section-head(:value="`${namespace}.localDevHeader`")
        helpers-section-text(:value="`${namespace}.localDevText1`").mb-5
        helpers-markup(lang="cli").mb-5
          | $ git clone git@github.com:vuetifyjs/vuetify
        helpers-section-text(:value="`${namespace}.localDevText2`").mb-5
        helpers-markup(lang="cli").mb-5
          | $ git checkout dev
          | $ yarn // or npm install
          | $ yarn dev // or npm run dev
        helpers-section-text(:value="`${namespace}.localDevText3`")
</template>
