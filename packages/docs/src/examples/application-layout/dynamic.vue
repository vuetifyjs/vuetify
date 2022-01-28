<template>
  <v-app>
    <v-navigation-drawer color="grey-darken-2" permanent></v-navigation-drawer>

    <v-app-bar color="grey-lighten-2" elevation="0" :priority="priority"></v-app-bar>

    <v-main>
      <v-card height="200px" class="d-flex justify-center align-center">
        <v-switch v-model="priority" true-value="-1" false-value="0" label="Toggle priority"></v-switch>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      priority: 0,
    }),
  }
</script>
