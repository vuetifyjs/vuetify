<template>
  <v-card>
    <v-layout>
      <v-app-bar
        absolute
        flat
        color="indigo"
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-app-bar-title>Page title</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon="mdi-magnify"></v-btn>

        <v-btn icon="mdi-dots-vertical">
          <v-icon></v-icon>
        </v-btn>

        <template v-slot:extension>
          <v-tabs
            v-model="tabs"
            align-tabs="title"
          >
            <v-tab text="Item One" value="one"></v-tab>

            <v-tab text="Item Two" value="two"></v-tab>

            <v-tab text="Item Three" value="three"></v-tab>

            <v-tabs-slider color="pink"></v-tabs-slider>
          </v-tabs>
        </template>
      </v-app-bar>

      <v-main>
        <v-sheet height="150"></v-sheet>
      </v-main>

      <v-fade-transition>
        <v-fab
          :key="activeFab.icon"
          app
          absolute
          class="ms-4 mb-4"
          :color="activeFab.color"
          :icon="activeFab.icon"
          size="64"
          location="bottom left"
        ></v-fab>
      </v-fade-transition>
    </v-layout>
  </v-card>
</template>

<script setup>
  import { computed, ref } from 'vue'

  const tabs = ref(null)
  const activeFab = computed(() => {
    switch (tabs.value) {
      case 'one': return { color: 'success', icon: 'mdi-share-variant' }
      case 'two': return { color: 'red', icon: 'mdi-pencil' }
      case 'three': return { color: 'green', icon: 'mdi-chevron-up' }
      default: return {}
    }
  })
</script>

<script>
  export default {
    data: () => ({
      tabs: null,
    }),

    computed: {
      activeFab () {
        switch (this.tabs) {
          case 'one': return { color: 'success', icon: 'mdi-share-variant' }
          case 'two': return { color: 'red', icon: 'mdi-pencil' }
          case 'three': return { color: 'green', icon: 'mdi-chevron-up' }
          default: return {}
        }
      },
    },
  }
</script>
