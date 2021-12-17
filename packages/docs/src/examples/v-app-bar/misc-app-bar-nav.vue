<template>
  <v-layout style="overflow: hidden">
    <v-app-bar
      absolute
      color="deep-purple"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item prepend-icon="mdi-home" title="Home"></v-list-item>

          <v-list-item prepend-icon="mdi-account" title="Account"></v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-card
        class="mx-auto overflow-hidden"
        height="400"
      ></v-card>
    </v-main>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),
  }
</script>
