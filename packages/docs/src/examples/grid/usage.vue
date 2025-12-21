<template>
  <v-container class="bg-surface-variant">
    <v-row>
      <v-col
        v-for="n in 3"
        :key="n"
        cols="12"
        sm="4"
      >
        <v-sheet class="pa-2">
          One of three columns
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
