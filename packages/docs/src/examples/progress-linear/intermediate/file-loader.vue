<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-toolbar
      color="deep-purple accent-4"
      dark
      prominent
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>My Files</v-toolbar-title>

      <v-btn
        absolute
        bottom
        color="white"
        fab
        left
        light
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container style="height: 400px;">
      <v-layout
        align-content-center
        justify-center
        fill-height
        wrap
      >
        <v-flex
          xs12
          subtitle-1
          text-center
        >
          Getting your files
        </v-flex>
        <v-flex xs6>
          <v-progress-linear
            color="deep-purple accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
