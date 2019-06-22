<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-textarea
          label="One row"
          rows="1"
          row-height="25"
        ></v-textarea>
      </v-flex>
      <v-flex xs12 sm6>
        <v-textarea
          label="Two rows"
          rows="2"
          row-height="25"
        ></v-textarea>
      </v-flex>
      <v-flex xs12 sm6>
        <v-textarea
          label="Three rows"
          rows="3"
          row-height="25"
        ></v-textarea>
      </v-flex>
      <v-flex xs12 sm6>
        <v-textarea
          label="Four rows"
          rows="4"
          row-height="25"
        ></v-textarea>
      </v-flex>
    </v-layout>
  </v-container>
</template>
