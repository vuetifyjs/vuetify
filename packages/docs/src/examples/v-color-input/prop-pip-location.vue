<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <v-color-input
          hide-details="auto"
        ></v-color-input>
      </v-col>
      <v-col cols="12" sm="6">
        <v-color-input
          hide-details="auto"
          pip-location="prepend-inner"
        ></v-color-input>
      </v-col>
      <v-col cols="12" sm="6">
        <v-color-input
          hide-details="auto"
          pip-location="append-inner"
        ></v-color-input>
      </v-col>
      <v-col cols="12" sm="6">
        <v-color-input
          hide-details="auto"
          pip-location="append"
        ></v-color-input>
      </v-col>
      <v-col cols="12" sm="6">
        <v-color-input
          hide-details="auto"
          label="I need no icon"
          hide-pip
        ></v-color-input>
      </v-col>
    </v-row>
  </v-container>
</template>
