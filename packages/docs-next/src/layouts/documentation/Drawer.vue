<template>
  <v-navigation-drawer
    id="documentation-drawer"
    v-model="drawer"
    :color="dark ? '#272727' : undefined"
    :right="rtl"
    app
    width="300"
  >
    <template #prepend>
      <documentation-control-panel />
    </template>

    <v-fade-transition hide-on-leave>
      <keep-alive>
        <documentation-list
          v-if="advanced"
          key="advanced"
          :items="advanced"
        />

        <documentation-list
          v-else
          key="simple"
          :items="nav"
        />
      </keep-alive>
    </v-fade-transition>

    <div class="pt-12" />
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import { get, sync } from 'vuex-pathify'

  export default {
    name: 'DocumentationDrawer',

    components: {
      DocumentationControlPanel: () => import(
        /* webpackChunkName: "documentation-control-panel" */
        './ControlPanel'
      ),
      DocumentationList: () => import(
        /* webpackChunkName: "documentation-list" */
        './List'
      ),
    },

    computed: {
      drawer: sync('app/drawer'),
      ...get('user', [
        'drawer@advanced',
        'dark',
        'rtl',
      ]),
      ...get('app', [
        'advanced',
        'nav',
      ]),
    },
  }
</script>
