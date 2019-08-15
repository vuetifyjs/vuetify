<template>
  <v-container>
    <v-row justify="space-around">
      <v-col
        v-for="tile in [false, true]"
        :key="tile"
        cols="12"
        md="4"
      >
        <v-sheet
          class="pa-12"
          color="grey lighten-3"
        >
          <div></div>
          <v-sheet
            :tile="tile"
            class="mx-auto"
            height="100"
            width="100"
          ></v-sheet>
          <div></div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
