<template>
  <v-layout>
    <div>
      Edit this <span v-html="contributionPageGithub" /> | <span v-html="contributionLanguageGithub" /> on Github
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
      contributionLanguageGithub () {
        return this.parseLink('', 'language', this.contributionLanguageLink)
      },
      contributionPageGithub () {
        return this.parseLink('', 'page', this.contributionPageLink)
      },
      contributionLanguageLink () {
        const file = `${this.params.namespace}/${this.page}.json`
        return `https://github.com/vuetifyjs/vuetify/tree/${this.branch}/packages/docs/src/lang/${this.params.lang}/${file}`
      },
      contributionPageLink () {
        const file = `${this.params.namespace}/${this.page}.json`
        return `https://github.com/vuetifyjs/vuetify/tree/${this.branch}/packages/docs/src/data/pages/${file}`
      },
    },

    methods: {
      parseLink,
    },
  }
</script>
