<template>
  <div>
    Caught a mistake? Want to Contribute to this page or the docs as a whole?
    Consider checking out the <span v-html="contributionGuide" />
    or
    <span v-html="contributionGithub" />
  </div>
</template>

<script>
  import { parseLink } from '@/util/helpers'

  export default {
    inject: ['lang', 'namespace', 'page'],

    computed: {
      contributionLink () {
        return `https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetifyjs.com/src/lang/${this.lang}/${this.namespace}/${this.page}.json`
      },
      contributionGuide () {
        return this.parseLink('', 'Contribution Guide', '/getting-started/contributing')
      },
      contributionGithub () {
        return this.parseLink('', 'edit this page on Github', this.contributionLink)
      }
    },

    methods: {
      parseLink
    }
  }
</script>
