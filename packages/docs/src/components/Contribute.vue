<template>
  <div>
    <div class="blue-grey--text text--darken-1 d-flexalign-center justify-space-between">
      <div class="font-weight-medium d-flex align-baseline grow flex-wrap">
        <i18n
          class="mb-2 mb-md-0"
          path="contribute.edit-page"
        >
          <template v-slot:url>
            <app-link :href="href">
              <span v-text="$t('github')" />
            </app-link>
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

  export default {
    name: 'Contribute',

    computed: {
      ...get('app', [
        'branch',
        'modified',
      ]),
      ...get('route', [
        'params@category',
        'params@page',
      ]),
      at () {
        const stat = this.modified[`/${this.category}/${this.page}/`] || {}

        return stat.modified
      },
      href () {
        return `https://github.com/vuetifyjs/docs-next/tree/${this.branch}/src/pages/en/${this.category}/${this.page}.md`
      },
    },
  }
</script>
