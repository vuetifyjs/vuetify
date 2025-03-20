<template>
  <v-layout class="rounded rounded-md">
    <v-system-bar color="grey-darken-3"></v-system-bar>

    <v-navigation-drawer
      color="grey-darken-2"
      width="72"
      permanent
    ></v-navigation-drawer>

    <v-navigation-drawer
      color="grey-darken-1"
      width="150"
      permanent
    ></v-navigation-drawer>

    <v-app-bar
      color="grey"
      height="48"
      flat
    ></v-app-bar>

    <v-navigation-drawer
      color="grey-lighten-1"
      location="right"
      width="150"
      permanent
    ></v-navigation-drawer>

    <v-app-bar
      color="grey-lighten-2"
      height="48"
      location="bottom"
      flat
    ></v-app-bar>

    <v-main class="d-flex align-center justify-center" height="300">
      <v-container>
        <v-sheet
          border="dashed md"
          color="surface-light"
          height="150"
          rounded="lg"
          width="100%"
        ></v-sheet>
      </v-container>
    </v-main>
  </v-layout>
</template>
