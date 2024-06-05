<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <v-textarea
          label="One row"
          row-height="15"
          rows="1"
          variant="outlined"
          auto-grow
        ></v-textarea>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-textarea
          label="Two rows"
          row-height="20"
          rows="2"
          variant="filled"
          auto-grow
        ></v-textarea>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-textarea
          label="Three rows"
          row-height="25"
          rows="3"
          variant="outlined"
          auto-grow
          shaped
        ></v-textarea>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-textarea
          label="Four rows"
          row-height="30"
          rows="4"
          variant="filled"
          auto-grow
          shaped
        ></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>
