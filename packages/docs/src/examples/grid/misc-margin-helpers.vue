<template>
  <v-container class="bg-surface-variant">
    <v-row>
      <v-col md="4">
        <v-sheet class="pa-2 ma-2">
          .v-col-md-4
        </v-sheet>
      </v-col>
      <v-col
        md="4"
        class="ml-auto"
      >
        <v-sheet class="pa-2 ma-2">
          .v-col-md-4 .ml-auto
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        md="4"
        class="ml-md-auto"
      >
        <v-sheet class="pa-2 ma-2">
          .v-col-md-4 .ml-md-auto
        </v-sheet>
      </v-col>
      <v-col
        md="4"
        class="ml-md-auto"
      >
        <v-sheet class="pa-2 ma-2">
          .v-col-md-4 .ml-md-auto
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="auto"
        class="mr-auto"
      >
        <v-sheet class="pa-2 ma-2">
          .v-col-auto .mr-auto
        </v-sheet>
      </v-col>
      <v-col cols="auto">
        <v-sheet class="pa-2 ma-2">
          .v-col-auto
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
