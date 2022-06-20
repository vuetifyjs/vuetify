<template>
  <v-layout>
    <v-navigation-drawer color="grey-darken-2" permanent></v-navigation-drawer>

    <v-app-bar color="grey-lighten-2" elevation="0" :order="order"></v-app-bar>

    <v-main>
      <v-card height="200px" class="d-flex justify-center align-center">
        <v-switch v-model="order" true-value="-1" false-value="0" label="Toggle order"></v-switch>
      </v-card>
    </v-main>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      order: 0,
    }),
  }
</script>
