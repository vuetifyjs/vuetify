<template>
  <v-container class="bg-surface-variant">
    <v-row
      class="mb-6"
      no-gutters
    >
      <v-col cols="4">
        <v-sheet class="pa-2 ma-2">
          .v-col-4
        </v-sheet>
      </v-col>
      <v-col
        cols="4"
        offset="4"
      >
        <v-sheet class="pa-2 ma-2">
          .v-col-4 .offset-4
        </v-sheet>
      </v-col>
    </v-row>
    <v-row
      class="mb-6"
      no-gutters
    >
      <v-col
        cols="3"
        offset="3"
      >
        <v-sheet class="pa-2 ma-2">
          .v-col-3 .offset-3
        </v-sheet>
      </v-col>
      <v-col
        cols="3"
        offset="3"
      >
        <v-sheet class="pa-2 ma-2">
          .v-col-3 .offset-3
        </v-sheet>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col
        cols="6"
        offset="3"
      >
        <v-sheet class="pa-2 ma-2">
          .v-col-6 .offset-3
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
