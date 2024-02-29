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
            :model-value="!hidden"
            absolute
            class="ms-4"
            icon="mdi-plus"
            offset
            size="small"
            location="bottom start"
          ></v-fab>
        </template>
      </v-app-bar>

      <v-main>
        <v-sheet class="pa-4 text-center" color="surface-light" height="300">
          <v-btn
            color="surface-variant"
            width="80"
            @click="hidden = !hidden"
          >
            <v-scroll-y-transition mode="out-in">
              <div :key="hidden">
                {{ hidden ? 'Show' : 'Hide' }}
              </div>
            </v-scroll-y-transition>
          </v-btn>
        </v-sheet>

        <v-sheet height="125">
          <v-fab
            :model-value="!hidden"
            absolute
            class="me-4"
            offset
            icon="mdi-plus"
            location="top end"
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
