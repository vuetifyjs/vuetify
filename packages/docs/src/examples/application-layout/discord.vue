<template>
  <v-card>
    <v-layout>
      <v-system-bar color="grey-darken-3"></v-system-bar>

      <v-navigation-drawer
        color="grey-darken-2"
        permanent
        width="72"
      ></v-navigation-drawer>

      <v-navigation-drawer
        color="grey-darken-1"
        permanent
        width="150"
      ></v-navigation-drawer>

      <v-app-bar
        color="grey"
        height="48"
        flat
      ></v-app-bar>

      <v-navigation-drawer
        color="grey-lighten-1"
        location="right"
        permanent
        width="150"
      ></v-navigation-drawer>

      <v-app-bar
        color="grey-lighten-2"
        flat
        height="48"
        location="bottom"
      ></v-app-bar>

      <v-main>
        <v-container
          class="d-flex justify-center align-center text-h5"
          style="min-height: 300px;"
        >
          Content
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
