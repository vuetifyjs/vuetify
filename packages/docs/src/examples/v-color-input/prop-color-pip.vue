<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-color-input
          hide-details="auto"
          label="Colored Pip"
        ></v-color-input>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-color-input
          :color-pip="false"
          hide-details="auto"
          label="Non Colored Pip"
        ></v-color-input>
      </v-col>
    </v-row>
  </v-container>

</template>
