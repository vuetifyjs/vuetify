<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-textarea
          label="One row"
          auto-grow
          outlined
          rows="1"
          row-height="15"
        ></v-textarea>
      </v-flex>
      <v-flex xs12 sm6>
        <v-textarea
          filled
          auto-grow
          label="Two rows"
          rows="2"
          row-height="20"
        ></v-textarea>
      </v-flex>
      <v-flex xs12 sm6>
        <v-textarea
          label="Three rows"
          auto-grow
          outlined
          rows="3"
          row-height="25"
          shaped
        ></v-textarea>
      </v-flex>
      <v-flex xs12 sm6>
        <v-textarea
          filled
          auto-grow
          label="Four rows"
          rows="4"
          row-height="30"
          shaped
        ></v-textarea>
      </v-flex>
    </v-layout>
  </v-container>
</template>
