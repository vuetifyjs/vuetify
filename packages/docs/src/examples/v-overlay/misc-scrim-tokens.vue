<template>
  <v-layout class="scrim-demo rounded-lg" min-height="320">
    <v-navigation-drawer v-model="drawer" absolute disable-resize-watcher temporary>
      <v-list-item title="Shared scrim tokens"></v-list-item>
      <v-btn class="ma-4" @click="drawer = false">Close drawer</v-btn>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-card class="pa-6" title="Backdrop blur">
          <p class="mb-4">The drawer and overlay share blur and tint tokens.</p>
          <v-btn class="mr-2 mb-2" @click="drawer = true">Open drawer</v-btn>
          <v-btn class="mb-2" color="primary" @click="overlay = true">Open overlay</v-btn>
        </v-card>

        <v-overlay
          v-model="overlay"
          :location-strategy="() => undefined"
          :opacity="0.5"
          class="align-center justify-center"
          scrim="primary"
          contained
        >
          <v-card class="pa-6" title="Custom tint">
            <p class="mb-4">Primary tint and 0.5 opacity override the shared defaults.</p>
            <v-btn @click="overlay = false">Close overlay</v-btn>
          </v-card>
        </v-overlay>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const drawer = shallowRef(false)
  const overlay = shallowRef(false)
</script>

<style scoped>
  .scrim-demo {
    --v-scrim-blur: 8px;
    --v-scrim-color: rgb(0 0 0);
    --v-scrim-opacity: 0.24;
  }
</style>
