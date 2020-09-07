<template>
  <v-app-bar
    id="default-app-bar"
    :color="dark ? undefined : 'white'"
    app
    class="v-bar--underline"
    flat
    v-bind="{ [`clipped-${rtl ? 'left' : 'right'}`]: true }"
  >
    <v-app-bar-nav-icon
      class="hidden-lg-and-up"
      @click="drawer = !drawer"
    />

    <vuetify-logo-alt v-if="$vuetify.breakpoint.mobile" />

    <v-spacer />

    <default-search />

    <vertical-divider />

    <template v-if="$vuetify.breakpoint.smAndUp">
      <learn-menu />

      <team-link />

      <support-menu />

      <enterprise-link v-if="$vuetify.breakpoint.mdAndUp" />

      <vertical-divider />

      <store-link />
    </template>

    <settings-toggle />

    <template v-if="$vuetify.breakpoint.lgAndUp">
      <jobs-link />

      <notifications-menu />

      <vertical-divider />
    </template>

    <language-menu />
  </v-app-bar>
</template>

<script>
  // Utilities
  import { sync } from 'vuex-pathify'

  // Components
  import DefaultSearch from '@/layouts/default/Search'

  export default {
    name: 'DefaultBar',

    components: {
      DefaultSearch,
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
