<template>
  <v-app style="z-index: 0">
    <v-app-bar height="22" color="grey-darken-3" absolute elevation="0"></v-app-bar>
    <v-navigation-drawer width="72" color="grey-darken-2" absolute permanent></v-navigation-drawer>
    <v-navigation-drawer width="150" color="grey-darken-1" absolute permanent></v-navigation-drawer>
    <v-app-bar height="48" color="grey" absolute elevation="0"></v-app-bar>
    <v-navigation-drawer position="right" width="150" color="grey-lighten-1" absolute permanent></v-navigation-drawer>
    <v-app-bar position="bottom" height="48" color="grey-lighten-2" absolute elevation="0"></v-app-bar>
    <v-main>
      <v-card elevation="0" height="400px"></v-card>
    </v-main>
  </v-app>
</template>
