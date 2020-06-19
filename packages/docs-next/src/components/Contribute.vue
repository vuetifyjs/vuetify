<template>
  <div class="mt-16">
    <div class="blue-grey--text text--darken-1 d-flex align-center justify-space-between">
      <div class="font-weight-medium d-flex align-baseline grow">
        <i18n path="edit-page">
          <template v-slot:url>
            <app-link :href="href">
              <span v-text="$t('github')" />
            </app-link>
          </template>
        </i18n>

        <v-spacer />

        <div class="text-body-2">
          <i18n
            tag="span"
            class="font-weight-medium mr-1"
            path="last-updated"
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
