<template>
  <div class="py-4 mb-12">
    Caught a mistake or want to <strong v-html="contributionGuide" /> to the documentation?
    <strong v-html="contributionPageGithub" />
  </div>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'
  import { upperFirst, camelCase } from 'lodash'
  import { parseLink } from '@/util/helpers'

  export default {
    name: 'DocumentationContribution',

    props: {
      branch: {
        type: String,
        default: 'master',
      },
    },

    computed: {
      lang: get('route/params@lang'),
      namespace: get('route/params@namespace'),
      page: get('route/params@page'),
      contributionGuide () {
        return this.parseLink('', 'contribute', `/${this.lang}/getting-started/contributing`)
      },
      contributionLanguageCrowdin () {
        return this.parseLink('', 'Crowdin', `/${this.namespace}/${this.page}`)
      },
      contributionPageGithub () {
        return this.parseLink('', 'Edit this page on GitHub!', this.contributionPageLink)
      },
      contributionPageLink () {
        const file = `${this.namespace}/${upperFirst(camelCase(this.page))}.json`
        return `https://github.com/vuetifyjs/vuetify/tree/${this.branch}/packages/docs/src/data/pages/${file}`
      },
    },

    methods: {
      parseLink,
      changeLanguageEoUy (e) {
        // the anchor href doesn't fire
        e.preventDefault()

        const lang = 'eo-UY'

        // If we're switching in or out of translating
        // then we need to force a reload to make sure
        // that crowdin script is loaded (or unloaded)
        setTimeout(() => {
          this.$router.go()
        }, 1000)

        this.$router.replace({ params: { lang } })

        document.cookie = `currentLanguage=${lang};path=/;max-age=${60 * 60 * 24 * 7}` // expires in 7 days
      },
    },
  }
</script>
