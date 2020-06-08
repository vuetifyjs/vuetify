<template>
  <div class="mt-4">
    Caught a mistake or want to

    <router-link
      :to="`/${locale}/getting-started/contributing/`"
      v-text="'contribute'"
    />

    to the documentation?

    Edit This Page on

    <a
      :href="gitHref"
      rel="noopener noreferrer"
      target="_blank"
      v-text="'GitHub!'"
    />
  </div>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'Contribute',

    computed: {
      branch: get('app/branch'),
      ...get('route', [
        'params@category',
        'params@locale',
        'params@page',
      ]),
      gitHref () {
        return `https://github.com/vuetifyjs/docs-next/tree/${this.branch}/src/pages/en/${this.category}/${this.page}.md`
      },
    },
  }
</script>
