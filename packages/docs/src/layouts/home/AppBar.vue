<template>
  <v-app-bar
    id="app-bar"
    :color="dark ? undefined : 'white'"
    app
    class="v-bar--underline"
    flat
  >
    <component
      :is="logo"
      :key="logo"
      :to="{
        name: 'Documentation',
        params: {
          category: 'introduction',
          page: 'why-vuetify'
        }
      }"
    />

    <v-spacer />

    <default-app-bar-items />
  </v-app-bar>
</template>

<script>
  // Components
  import DefaultAppBarItems from '@/layouts/default/AppBarItems'

  // Utilities
  import { get, sync } from 'vuex-pathify'

  export default {
    name: 'HomeBar',

    components: { DefaultAppBarItems },

    computed: {
      dark: sync('user/theme@dark'),
      search: get('app/search'),
      logo () {
        return this.$vuetify.breakpoint.lgAndUp
          ? 'vuetify-logo'
          : 'vuetify-logo-alt'
      },
    },
  }
</script>
