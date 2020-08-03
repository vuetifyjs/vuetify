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
      class="hidden-md-and-up"
      @click="drawer = !drawer"
    />

    <default-search />

    <v-spacer />

    <guide-link />

    <div class="mx-3" />

    <store-link />

    <jobs-link />

    <settings-toggle />

    <notifications-menu />

    <v-divider
      class="mx-2 my-auto"
      inset
      vertical
      style="max-height: 12px;"
    />

    <language-menu />
  </v-app-bar>
</template>

<script>
  // Utilities
  import { sync } from 'vuex-pathify'

  export default {
    name: 'DefaultBar',

    components: { DefaultSearch: () => import('@/layouts/default/Search') },

    computed: {
      ...sync('user', [
        'theme@dark',
        'rtl',
      ]),
      drawer: sync('app/drawer'),
    },

    watch: {
      rtl (val) {
        this.$vuetify.rtl = val
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
