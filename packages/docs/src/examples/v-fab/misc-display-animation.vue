<template>
  <v-card
    class="mx-auto"
    max-width="360"
  >
    <v-layout>
      <v-app-bar absolute extended>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <template v-slot:extension>
          <v-fab
            :active="!hidden"
            class="ms-4"
            icon="mdi-plus"
            location="bottom start"
            size="small"
            absolute
            offset
          ></v-fab>
        </template>
      </v-app-bar>

      <v-main>
        <v-sheet class="pa-4 text-center" color="surface-light" height="300">
          <v-btn
            :text="hidden ? 'Show' : 'Hide'"
            color="surface-variant"
            width="80"
            @click="hidden = !hidden"
          >
          </v-btn>
        </v-sheet>

        <v-sheet height="125">
          <v-fab
            :active="!hidden"
            class="me-4"
            icon="mdi-plus"
            location="top end"
            absolute
            offset
          ></v-fab>
        </v-sheet>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const hidden = ref(false)
</script>

<script>
  export default {
    data: () => ({
      hidden: false,
    }),
  }
</script>
