<template>
  <div>
    <v-card
      class="d-flex flex-nowrap py-3"
      color="grey lighten-2"
      flat
      tile
      width="125"
    >
      <v-card
        v-for="n in 5"
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
