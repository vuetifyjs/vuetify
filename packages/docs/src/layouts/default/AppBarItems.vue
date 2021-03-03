<template>
  <div class="flex-1-1-auto d-flex align-center justify-end">
    <default-search v-if="branch === 'master'" />

    <template v-if="$vuetify.breakpoint.smAndUp">
      <vertical-divider />

      <learn-menu />

      <support-menu />

      <template v-if="$vuetify.breakpoint.mdAndUp">
        <team-link />

        <vertical-divider />

        <store-link />

        <settings-toggle />

        <jobs-link />

        <notifications-menu />
      </template>
    </template>

    <vertical-divider v-if="$vuetify.breakpoint.smOnly" />

    <v-spacer v-else-if="$vuetify.breakpoint.xsOnly" />

    <language-menu />
  </div>
</template>

<script>
  // Components
  import DefaultSearch from '@/layouts/default/Search'

  // Utilities
  import { getBranch } from '@/util/helpers'

  export default {
    name: 'DefaultAppBarItems',

    components: { DefaultSearch },

    data: () => ({
      branch: 'next',
    }),

    mounted () {
      this.branch = getBranch()
    },
  }
</script>
