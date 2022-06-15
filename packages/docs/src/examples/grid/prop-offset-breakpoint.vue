<template>
  <v-container class="bg-surface-variant">
    <v-row
      class="mb-6"
      no-gutters
    >
      <v-col
        sm="5"
        md="6"
      >
        <v-sheet class="pa-2 ma-2">
          .v-col-sm-5 .v-col-md-6
        </v-sheet>
      </v-col>
      <v-col
        sm="5"
        offset-sm="2"
        md="6"
        offset-md="0"
      >
        <v-sheet class="pa-2 ma-2">
          .v-col-sm-5 .offset-sm-2 .v-col-md-6 .offset-md-0
        </v-sheet>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col
        sm="6"
        md="5"
        lg="6"
      >
        <v-sheet class="pa-2 ma-2">
          sm-6 md-5 lg-6
        </v-sheet>
      </v-col>
      <v-col
        sm="6"
        md="5"
        offset-md="2"
        lg="6"
        offset-lg="0"
      >
        <v-sheet class="pa-2 ma-2">
          .v-col-sm-6 md-5 .offset-md-2 .v-col-lg-6 .offset-lg-0
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
