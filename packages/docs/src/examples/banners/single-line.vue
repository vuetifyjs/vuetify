<template>
  <v-card>
    <v-system-bar></v-system-bar>
    <v-toolbar flat>
      <v-toolbar-title>My Document</v-toolbar-title>
    </v-toolbar>
    <v-banner single-line>
      We can't save your edits while you are in offline mode.

      <template v-slot:actions>
        <v-btn text color="deep-purple accent-4">Get Online</v-btn>
      </template>
    </v-banner>
    <v-card-text class="grey lighten-4">
      <v-sheet max-width="800" height="300" class="mx-auto">
      </v-sheet>
    </v-card-text>
  </v-card>
</template>
