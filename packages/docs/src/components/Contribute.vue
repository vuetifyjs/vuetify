<template>
  <div v-if="category !== 'api'">
    <div class="blue-grey--text text--darken-1 d-flexalign-center justify-space-between">
      <div class="font-weight-medium d-flex align-baseline grow flex-wrap">
        <i18n
          class="mb-2 mb-md-0"
          path="contribute.edit-page"
        >
          <template v-slot:url>
            <app-link :href="href">GitHub</app-link>
          </template>
        </i18n>

        <v-spacer class="hidden-sm-and-down" />

        <div
          v-if="at"
          class="text-body-2"
        >
          <i18n
            tag="span"
            class="font-weight-medium mr-1"
            path="contribute.last-updated"
          />

          <span
            class="text--secondary"
            v-text="at"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  // Data
  import modified from '@/data/modified'

  export default {
    name: 'Contribute',

    computed: {
      ...get('app', [
        'branch',
      ]),
      ...get('route', [
        'params@category',
        'params@page',
      ]),
      at () {
        const stat = modified[`/${this.category}/${this.page}/`] || {}

        return stat.modified
      },
      href () {
        return `https://github.com/vuetifyjs/vuetify/tree/${this.branch}/packages/docs/src/pages/en/${this.category}/${this.page}.md`
      },
    },
  }
</script>
