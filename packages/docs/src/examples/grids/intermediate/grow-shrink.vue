<template>
  <v-container class="grey lighten-5">
    <v-row
      class="mb-6"
      no-gutters
    >
      <v-col
        v-for="n in 4"
        :key="n"
      >
        <v-card
          class="pa-2"
          tile
          outlined
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
          tile
          outlined
        >
          col-{{ n === 1 ? 8 : 4 }}
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
