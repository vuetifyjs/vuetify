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

    <store-link />

    <discord-link />

    <github-link />

    <v-divider
      class="mx-2"
      inset
      vertical
    />

    <default-language-menu />
  </v-app-bar>
</template>

<script>
  // Utilities
  import { sync } from 'vuex-pathify'

  export default {
    name: 'DefaultBar',

    components: {
      DefaultLanguageMenu: () => import('@/layouts/default/LanguageMenu'),
      DefaultSearch: () => import('@/layouts/default/Search'),
    },

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
