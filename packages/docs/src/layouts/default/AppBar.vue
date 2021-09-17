<template>
  <v-app-bar
    id="app-bar"
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

    <vuetify-logo-alt
      v-if="$vuetify.breakpoint.smOnly || $vuetify.breakpoint.mdOnly"
      :to="{ name: 'Home' }"
      class="ml-0 mr-2 ml-md-2"
    />

    <default-app-bar-items />
  </v-app-bar>
</template>

<script>
  // Utilities
  import { sync } from 'vuex-pathify'

  // Components
  import DefaultAppBarItems from '@/layouts/default/AppBarItems'

  export default {
    name: 'DefaultBar',

    components: { DefaultAppBarItems },

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
