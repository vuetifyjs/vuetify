<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 sm6>
        <v-textarea
          class="mx-2"
          label="prepend-icon"
          rows="1"
          prepend-icon="comment"
        ></v-textarea>
      </v-flex>
      <v-flex xs12 sm6>
        <v-textarea
          append-icon="comment"
          class="mx-2"
          label="append-icon"
          rows="1"
        ></v-textarea>
      </v-flex>
      <v-flex xs12 sm6>
        <v-textarea
          prepend-inner-icon="comment"
          class="mx-2"
          label="prepend-inner-icon"
          rows="1"
        ></v-textarea>
      </v-flex>
      <v-flex xs12 sm6>
        <v-textarea
          append-outer-icon="comment"
          class="mx-2"
          label="append-outer-icon"
          rows="1"
        ></v-textarea>
      </v-flex>
    </v-layout>
  </v-container>
</template>
