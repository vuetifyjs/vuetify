<template>
  <div class="flex-1-1-auto d-flex align-center justify-end">
    <default-search />

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
  import DefaultSearch from '@/layouts/default/Search'

  export default {
    name: 'DefaultAppBarItems',

    components: { DefaultSearch },
  }
</script>
