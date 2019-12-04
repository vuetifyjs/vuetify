<template>
  <div>
    <v-card
      class="d-flex align-content-space-around flex-wrap"
      color="grey lighten-2"
      flat
      tile
      min-height="200"
    >
      <v-card
        v-for="n in 20"
        :key="n"
        class="pa-2"
        outlined
        tile
      >
        Flex item
      </v-card>
    </v-card>
  </div>
</template>
