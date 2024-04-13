<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-toolbar
      color="deep-purple-accent-4"
      prominent
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>My Files</v-toolbar-title>

      <v-btn
        color="white"
        location="bottom left"
        absolute
        fab
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
      <v-row
        align-content="center"
        class="fill-height"
        justify="center"
      >
        <v-col
          class="text-subtitle-1 text-center"
          cols="12"
        >
          Getting your files
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="deep-purple-accent-4"
            height="6"
            indeterminate
            rounded
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
