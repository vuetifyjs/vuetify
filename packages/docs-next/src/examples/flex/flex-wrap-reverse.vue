<template>
  <div>
    <v-card
      class="d-flex flex-wrap-reverse"
      color="grey lighten-2"
      flat
      tile
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
