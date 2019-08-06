<template>
  <v-container px-0>
    <doc-markdown>{{ migration }}</doc-markdown>
  </v-container>
</template>

<script>
  import { getBranch } from '@/util/helpers'

  export default {
    inheritAttrs: false,

    data: () => ({
      migration: '',
      branch: undefined,
    }),

    mounted () {
      this.branch = getBranch()
      fetch(`https://api.github.com/repos/vuetifyjs/vuetify/contents/MIGRATION.md?ref=${this.branch}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(res => {
          const { content } = res
          this.migration = content ? atob(content) : ''
        })
        .catch(err => console.log(err))
    },
  }
</script>
