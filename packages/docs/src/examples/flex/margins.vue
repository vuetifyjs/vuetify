<template>
  <div>
    <v-card class="d-flex mb-6" color="grey lighten-2" flat tile>
      <v-card v-for="n in 3" :key="n" class="pa-2" outlined tile>
        Flex item
      </v-card>
    </v-card>

    <v-card class="d-flex mb-6" color="grey lighten-2" flat tile>
      <v-card class="pa-2 mr-auto" outlined tile> Flex item </v-card>

      <v-card class="pa-2" outlined tile> Flex item </v-card>

      <v-card class="pa-2" outlined tile> Flex item </v-card>
    </v-card>

    <v-card class="d-flex" color="grey lighten-2" flat tile>
      <v-card class="pa-2" outlined tile> Flex item </v-card>

      <v-card class="pa-2" outlined tile> Flex item </v-card>

      <v-card class="pa-2 ml-auto" outlined tile> Flex item </v-card>
    </v-card>
  </div>
</template>
