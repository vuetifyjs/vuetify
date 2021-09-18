<template>
  <v-app>
    <app-bar />
    <app-drawer />
    <v-main>
      <div class="px-4 py-10 text-center">
        <router-view />
        <div class="mt-5 mx-auto text-center">
          [Default Layout]
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
// Utilities
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'DefaultLayout',

  })
</script>
