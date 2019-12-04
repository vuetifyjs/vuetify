<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col order="last">
        <v-card
          class="pa-2"
          outlined
          tile
        >
          First, but last
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-2"
          outlined
          tile
        >
          Second, but unordered
        </v-card>
      </v-col>
      <v-col order="first">
        <v-card
          class="pa-2"
          outlined
          tile
        >
          Third, but first
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
