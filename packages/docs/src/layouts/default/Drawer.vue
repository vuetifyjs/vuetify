<template>
  <v-navigation-drawer
    id="default-drawer"
    v-model="drawer"
    :color="dark ? '#272727' : undefined"
    :right="rtl"
    app
    floating
    width="300"
  >
    <template #prepend>
      <default-drawer-prepend />
    </template>

    <default-become-a-sponsor />

    <keep-alive>
      <default-list
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

  // Components
  import DefaultBecomeASponsor from './BecomeASponsor'
  import DefaultDrawerPrepend from './DrawerPrepend'
  import DefaultList from './List'

  export default {
    name: 'DefaultDrawer',

    components: {
      DefaultBecomeASponsor,
      DefaultDrawerPrepend,
      DefaultList,
    },

    computed: {
      ...get('user', [
        'rtl',
        'theme@dark',
      ]),
      ...get('app', [
        'alphabetical',
        'nav',
      ]),
      drawer: sync('app/drawer'),
      ualphabetical: get('user/drawer@alphabetical'),
      key () {
        return !this.ualphabetical ? 'simple' : 'alphabetical'
      },
      items () {
        return !this.ualphabetical ? this.nav : this.alphabetical
      },
    },
  }
</script>
