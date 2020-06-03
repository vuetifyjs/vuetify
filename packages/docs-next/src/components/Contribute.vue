<template>
  <div>
    Caught a mistake or want to <strong v-html="contribute" /> to the documentation?
    <template v-if="locale === 'en'">
      Edit This Page on <strong v-html="gitHub" />!
    </template>
  </div>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'
  import {
    getBranch,
    parseLink,
  } from '@/util/helpers'

  export default {
    name: 'Contribute',

    data: () => ({
      branch: 'master',
    }),

    computed: {
      ...get('route', [
        'params@category',
        'params@locale',
        'params@page',
      ]),
      contribute () {
        return parseLink('contribute', `../../../${this.locale}/getting-started/contributing`)
      },
      gitHub () {
        const link = `https://github.com/vuetifyjs/docs-next/tree/${this.branch}/src/pages/en/${this.category}/${this.page}.md`
        return parseLink('GitHub', link)
      },
    },

    mounted () {
      this.branch = getBranch()
    },
  }
</script>
