<template>
  <div class="py-4 mb-12">
    Caught a mistake or want to <strong v-html="contributionGuide" /> to the documentation?
    Edit <strong v-html="contributionGithub" />
    <template v-if="lang === 'en'">
      or <strong v-html="contributionLanguage" />
    </template>
    on GitHub!
  </div>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'
  import { parseLink } from '@/util/helpers'
  import {
    camelCase,
    upperFirst,
  } from 'lodash'

  export default {
    name: 'DocumentationContribution',

    props: {
      branch: {
        type: String,
        default: 'master',
      },
    },

    computed: {
      ...get('route/params@*'),
      contributionGuide () {
        return this.parseLink(this.lang, 'contribute', '/getting-started/contributing')
      },
      contributionLanguage () {
        const page = `https://github.com/vuetifyjs/vuetify/tree/${this.branch}/packages/docs/src/lang/en/${this.file}.json`
        return this.parseLink('', 'Content', page)
      },
      contributionGithub () {
        const page = `https://github.com/vuetifyjs/vuetify/tree/${this.branch}/packages/docs/src/data/pages/${this.file}.pug`
        return this.parseLink('', 'Layout', page)
      },
      file () {
        return `${this.namespace}/${upperFirst(camelCase(this.page))}`
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
        setTimeout(() => this.$router.go(), 1000)

        this.$router.replace({ params: { lang } })

        document.cookie = `currentLanguage=${lang};path=/;max-age=${60 * 60 * 24 * 7}` // expires in 7 days
      },
    },
  }
</script>
