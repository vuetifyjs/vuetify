<template>
  <v-card>
    <v-toolbar color="primary">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-btn icon="mdi-magnify"></v-btn>

      <v-btn icon="mdi-dots-vertical"></v-btn>

      <template v-slot:extension>
        <v-tabs
          v-model="model"
          align-tabs="center"
        >
          <v-tab
            v-for="i in 3"
            :key="i"
            :text="`Item ${i}`"
            :value="i"
          ></v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-window v-model="model">
      <v-tabs-window-item
        v-for="i in 3"
        :key="i"
        :value="i"
      >
        <v-card>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

  const model = ref('tab-2')
</script>

<script>
  export default {
    data () {
      return {
        model: 'tab-2',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
  }
</script>
