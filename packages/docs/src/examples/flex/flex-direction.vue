<template>
  <div>
    <v-card
      class="d-flex flex-row mb-6"
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
        Flex item {{ n }}
      </v-card>
    </v-card>
    <v-card
      class="d-flex flex-row-reverse"
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
        Flex item {{ n }}
      </v-card>
    </v-card>
  </div>
</template>
