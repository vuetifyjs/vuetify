<template>
  <div>
    <v-card
      class="d-flex mb-6"
      color="grey lighten-2"
      flat
      tile
    >
      <v-card
        v-for="n in 3"
        :key="n"
        class="pa-2"
        outlined
        tile
      >
        Flex item
      </v-card>
    </v-card>

    <v-card
      class="d-flex mb-6"
      color="grey lighten-2"
      flat
      tile
    >
      <v-card
        v-for="n in 3"
        :key="n"
        :class="n === 1 && 'mr-auto'"
        class="pa-2"
        outlined
        tile
      >
        Flex item
      </v-card>
    </v-card>

    <v-card
      class="d-flex mb-6"
      color="grey lighten-2"
      flat
      tile
    >
      <v-card
        v-for="n in 3"
        :key="n"
        :class="n === 3 && 'ml-auto'"
        class="pa-2"
        outlined
        tile
      >
        Flex item
      </v-card>
    </v-card>
  </div>
</template>
