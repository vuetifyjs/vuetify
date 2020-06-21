<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
    width="300"
  >
    <v-fade-transition mode="out-in">
      <keep-alive>
        <documentation-list
          v-if="advanced"
          key="advanced"
          :items="anav"
        />

        <documentation-list
          v-else
          key="simple"
          :items="nav"
        />
      </keep-alive>
    </v-fade-transition>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import { get, sync } from 'vuex-pathify'

  export default {
    name: 'DocumentationDrawer',

    components: { DocumentationList: () => import('./List') },

    computed: {
      drawer: sync('app/drawer'),
      advanced: get('user/drawer@advanced'),
      anav: get('app/advanced'),
      nav: get('app/nav'),
    },
  }
</script>
