<template>
  <v-app-bar
    id="default-app-bar"
    :color="dark ? undefined : 'white'"
    app
    class="v-bar--underline"
    flat
    v-bind="{ [`clipped-${rtl ? 'left' : 'right'}`]: true }"
  >
    <vuetify-logo-alt v-if="$vuetify.breakpoint.mobile" />

    <v-spacer />

    <template v-if="!$vuetify.breakpoint.mobile">
      <default-search />

      <vertical-divider />
    </template>

    <template v-if="!search">
      <template v-if="!$vuetify.breakpoint.xsOnly">
        <learn-menu />

        <team-link />

        <support-menu />

        <vertical-divider />

        <store-link />

        <jobs-link />
      </template>

      <settings-toggle />

      <notifications-menu />

      <vertical-divider v-show="!$vuetify.breakpoint.xsOnly" />

      <language-menu />
    </template>
  </v-app-bar>
</template>

<script>
  // Utilities
  import { sync } from 'vuex-pathify'

  export default {
    name: 'DefaultBar',

    components: {
      DefaultSearch: () => import(
        /* webpackChunkName: "default-search" */
        '@/layouts/default/Search'
      ),
    },

    computed: {
      ...sync('app', [
        'drawer',
        'search',
      ]),
      ...sync('user', [
        'theme@dark',
        'rtl',
      ]),
      show () {
        return !this.$vuetify.breakpoint.mobile || this.search
      },
    },
  }
</script>

<style lang="sass">
  #default-app-bar
    .v-btn--active.v-btn--app:not(:hover):not(:focus)
      &::before
        opacity: 0
</style>
