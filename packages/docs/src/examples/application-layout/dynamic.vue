<template>
  <v-app style="z-index: 0">
    <template v-if="usePriority">
      <v-navigation-drawer v-if="showDrawer" color="grey-darken-2" absolute permanent priority="0"></v-navigation-drawer>
      <v-app-bar color="grey-lighten-2" absolute elevation="0" priority="1">Using priority</v-app-bar>
    </template>
    <template v-else>
      <v-navigation-drawer v-if="showDrawer" color="grey-darken-2" absolute permanent></v-navigation-drawer>
      <v-app-bar color="grey-lighten-2" absolute elevation="0">Not using priority</v-app-bar>
    </template>
    <v-main>
      <v-card height="200px" class="d-flex justify-center align-center">
        <v-btn class="ma-2" @click="showDrawer = !showDrawer">Toggle drawer</v-btn>
        <v-btn class="ma-2" @click="usePriority = !usePriority">Toggle priority</v-btn>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      usePriority: false,
      showDrawer: true,
    }),
  }
</script>
