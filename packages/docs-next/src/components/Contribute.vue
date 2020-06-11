<template>
  <div class="mt-16">
    <div class="blue-grey--text text--darken-1 d-flex align-center justify-space-between">
      <div class="font-weight-medium d-inline-flex align-baseline">
        <span class="mr-1">
          Edit This Page on
        </span>

        <a
          :href="href"
          class="mr-1"
          rel="noopener"
          target="_blank"
        >
          GitHub
        </a>

        <v-icon size="14">
          $mdiOpenInNew
        </v-icon>
      </div>

      <div class="text-body-2">
        <span class="font-weight-medium">
          Last Updated:
        </span>

        <span class="text--secondary">
          {{ at }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'Contribute',

    computed: {
      ...get('app', [
        'branch',
        'modified',
      ]),
      ...get('route', [
        'path',
        'params@category',
        'params@locale',
        'params@page',
      ]),
      at () {
        const stat = this.modified[this.path] || {}

        return stat.modified
      },
      href () {
        return `https://github.com/vuetifyjs/docs-next/tree/${this.branch}/src/pages/en/${this.category}/${this.page}.md`
      },
    },
  }
</script>
