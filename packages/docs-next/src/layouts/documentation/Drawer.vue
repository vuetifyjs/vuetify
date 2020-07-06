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
      <documentation-drawer-prepend />
    </template>

    <keep-alive>
      <documentation-list
        :key="key"
        :items="items"
      />
    </keep-alive>

    <div class="pt-12" />
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import { get, sync } from 'vuex-pathify'

  export default {
    name: 'DocumentationDrawer',

    components: {
      DocumentationDrawerPrepend: () => import(
        /* webpackChunkName: "documentation-drawer-prepend" */
        './DrawerPrepend'
      ),
      DocumentationList: () => import(
        /* webpackChunkName: "documentation-list" */
        './List'
      ),
    },

    computed: {
      ...get('user', [
        'dark',
        'rtl',
      ]),
      ...get('app', [
        'nav',
        'advanced',
      ]),
      drawer: sync('app/drawer'),
      uadvanced: get('user/drawer@advanced'),
      key () {
        return !this.uadvanced ? 'simple' : 'advanced'
      },
      items () {
        return !this.uadvanced ? this.nav : this.advanced
      },
    },
  }
</script>
