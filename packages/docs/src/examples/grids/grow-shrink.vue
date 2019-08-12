<template>
  <v-container class="grey lighten-5">
    <v-row
      class="mb-3"
      no-gutters
    >
      <v-col
        v-for="n in 4"
        :key="n"
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

    <v-row no-gutters>
      <v-col
        v-for="n in 2"
        :key="n"
        :cols="n === 1 ? 8 : 4"
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
  </v-container>
</template>
