<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer color="grey-darken-2" permanent></v-navigation-drawer>

    <v-app-bar
      :order="order"
      color="grey-lighten-2"
      title="Application bar"
      flat
    >
      <template v-slot:append>
        <v-switch
          v-model="order"
          false-value="0"
          label="Toggle order"
          true-value="-1"
          hide-details
          inset
        ></v-switch>
      </template>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      Main Content
    </v-main>
  </v-layout>
</template>

<script setup>
  import { ref } from 'vue'

  const order = ref(0)
</script>

<script>
  export default {
    data: () => ({
      order: 0,
    }),
  }
</script>
