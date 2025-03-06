<template>
  <v-container class="bg-surface-variant">
    <v-row>
      <v-col md="4">
        <v-sheet class="pa-2 ma-2">
          .v-col-md-4
        </v-sheet>
      </v-col>
      <v-col
        class="ms-auto"
        md="4"
      >
        <v-sheet class="pa-2 ma-2">
          .v-col-md-4 .ms-auto
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        class="ms-md-auto"
        md="4"
      >
        <v-sheet class="pa-2 ma-2">
          .v-col-md-4 .ms-md-auto
        </v-sheet>
      </v-col>
      <v-col
        class="ms-md-auto"
        md="4"
      >
        <v-sheet class="pa-2 ma-2">
          .v-col-md-4 .ms-md-auto
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        class="me-auto"
        cols="auto"
      >
        <v-sheet class="pa-2 ma-2">
          .v-col-auto .me-auto
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
