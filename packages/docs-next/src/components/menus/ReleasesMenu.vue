<template>
  <app-menu
    v-if="$vuetify.breakpoint.mdAndUp"
    :items="items"
  >
    <template #activator="{ attrs, on }">
      <app-btn
        class="text-lowercase mr-2"
        v-bind="attrs"
        v-on="on"
      >
        <span v-text="`v${version}`" />

        <app-chevron-down />
      </app-btn>
    </template>
  </app-menu>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'ReleasesMenu',

    computed: {
      items () {
        return [
          { heading: 'documentation' },
          {
            title: '1.5.x',
            href: 'https://v15.vuetifyjs.com',
          },
          {
            title: '1.0.x',
            href: 'https://v1.vuetifyjs.com',
          },
        ]
      },
      version: get('app/version'),
    },
  }
</script>
