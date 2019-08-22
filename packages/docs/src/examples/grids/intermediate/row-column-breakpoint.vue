<template>
  <v-container class="grey lighten-5">
    <v-row
      class="mb-6"
      no-gutters
    >
      <v-col
        v-for="n in 2"
        :key="n"
        :sm="n === 1 ? 8 : 4"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          col-{{ n === 1 ? 8 : 4 }}
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col
        v-for="n in 3"
        :key="n"
        cols="sm"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          col
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
