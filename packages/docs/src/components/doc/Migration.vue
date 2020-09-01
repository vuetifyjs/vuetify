<template>
  <v-card
    outlined
    class="pa-4"
  >
    <app-md>
      {{ migration || ' ' }}
    </app-md>
  </v-card>
</template>

<script>
  // Utilities
  import { getBranch } from '@/util/helpers'

  export default {
    name: 'GettingStartedMigrations',

    data: () => ({
      branch: undefined,
      migration: null,
    }),

    mounted () {
      this.branch = getBranch()

      fetch(`https://api.github.com/repos/vuetifyjs/vuetify/contents/MIGRATION.md?ref=${this.branch}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(res => {
          this.migration = res.content ? Buffer.from(res.content, 'base64').toString() : ' '
        })
        .catch(err => console.log(err))
    },
  }
</script>

<style lang="sass" scoped>
  ::v-deep pre
    background: #2d2d2d !important
    border-radius: 4px
    margin: 16px 0
    padding: 16px

    code
      background: transparent
      background-color: unset !important
      box-shadow: none !important
      color: #ccc !important
      font-family: "Inconsolata", monospace
      font-weight: 300
      font-size: 15px
      line-height: 1.55

  ::v-deep .migration-markdown
    h1, h2, h3, h4, h5, p, pre, ul
      margin-bottom: 16px !important
</style>
