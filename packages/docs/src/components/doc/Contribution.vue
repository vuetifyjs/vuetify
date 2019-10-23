<template>
  <v-layout>
    <div>
      Edit this
      <span v-html="contributionPageGithub" />
      on Github | Translate on
      <span
        @click="changeLanguageEoUy"
        v-html="contributionLanguageCrowdin"
      />
    </div>
    <v-spacer class="hidden-sm-and-down" />
    <div class="hidden-sm-and-down">
      <span class="hidden-md-and-up">&nbsp;—&nbsp;</span>
      <span
        class="pr-12"
        v-html="contributionGuide"
      />
    </div>
  </v-layout>
</template>

<script>
  // Utilities
  import {
    mapGetters,
    mapState,
  } from 'vuex'
  import { parseLink } from '@/util/helpers'

  export default {
    props: {
      branch: {
        type: String,
        default: 'master',
      },
    },
    computed: {
      ...mapGetters('documentation', [
        'namespace',
        'page',
      ]),
      ...mapState('route', ['params']),
      contributionGuide () {
        return this.parseLink('', 'Contribution Guide', `/${this.params.lang}/getting-started/contributing`)
      },
      contributionLanguageCrowdin () {
        return this.parseLink('', 'Crowdin', `/${this.params.namespace}/${this.params.page}`)
      },
      contributionPageGithub () {
        return this.parseLink('', 'page', this.contributionPageLink)
      },
      contributionPageLink () {
        const file = `${this.params.namespace}/${this.page}.json`
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
