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
        class="ms-auto"
      >
        <v-sheet class="pa-2 ma-2">
          .v-col-md-4 .ms-auto
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        md="4"
        class="ms-md-auto"
      >
        <v-sheet class="pa-2 ma-2">
          .v-col-md-4 .ms-md-auto
        </v-sheet>
      </v-col>
      <v-col
        md="4"
        class="ms-md-auto"
      >
        <v-sheet class="pa-2 ma-2">
          .v-col-md-4 .ms-md-auto
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="auto"
        class="me-auto"
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
