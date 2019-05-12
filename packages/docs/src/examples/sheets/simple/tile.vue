<template>
  <v-container grid-list-xl>
    <v-layout wrap justify-space-around>
      <v-flex
        v-for="tile in [false, true]"
        :key="tile"
        xs12
        md4
      >
        <v-sheet
          class="pa-5"
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
      </v-flex>
    </v-layout>
  </v-container>
</template>
