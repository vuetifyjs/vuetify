<template>
  <v-layout style="overflow: hidden">
    <v-app-bar
      color="deep-purple"
      absolute
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
        v-model="group"
        color="deep-purple-accent-4"
        density="compact"
        nav
      >
        <v-list-item prepend-icon="mdi-home" title="Home" value="home"></v-list-item>

        <v-list-item prepend-icon="mdi-account" title="Account" value="account"></v-list-item>
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

<script setup>
  import { ref } from 'vue'

  const drawer = ref(false)
  const group = ref(null)
</script>

<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),
  }
</script>
