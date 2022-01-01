<template>
  <div>
    <h3 class="mb-3">align content end</h3>
    <v-card
      class="d-flex align-content-end flex-wrap"
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
