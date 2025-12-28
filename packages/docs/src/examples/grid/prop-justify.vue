<template>
  <v-container class="bg-surface-variant">
    <v-row class="justify-start">
      <v-col
        v-for="k in 2"
        :key="k"
        cols="4"
      >
        <v-sheet class="pa-2">
          justify-start
        </v-sheet>
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-col
        v-for="k in 2"
        :key="k"
        cols="4"
      >
        <v-sheet class="pa-2">
          justify-center
        </v-sheet>
      </v-col>
    </v-row>

    <v-row class="justify-end">
      <v-col
        v-for="k in 2"
        :key="k"
        cols="4"
      >
        <v-sheet class="pa-2">
          justify-end
        </v-sheet>
      </v-col>
    </v-row>

    <v-row class="justify-space-around">
      <v-col
        v-for="k in 2"
        :key="k"
        cols="4"
      >
        <v-sheet class="pa-2">
          justify-space-around
        </v-sheet>
      </v-col>
    </v-row>

    <v-row class="justify-space-between">
      <v-col
        v-for="k in 2"
        :key="k"
        cols="4"
      >
        <v-sheet class="pa-2">
          justify-space-between
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
