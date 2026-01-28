<template>
  <v-container>
    <v-row justify="space-around">
      <v-col
        v-for="elevation in [0, 1, 2, 3, 4, 5]"
        :key="elevation"
        cols="12"
        md="4"
      >
        <v-sheet
          class="pa-12"
          color="grey-lighten-3"
        >
          <v-sheet
            :elevation="elevation"
            class="mx-auto"
            height="100"
            width="100"
          ></v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
