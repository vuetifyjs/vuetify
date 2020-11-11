<template>
  <div>
    <v-card
      class="d-flex align-start mb-6"
      color="grey lighten-2"
      flat
      height="100"
      tile
    >
      <v-card
        v-for="n in 3"
        :key="n"
        class="pa-2"
        outlined
        tile
      >
        align-start
      </v-card>
    </v-card>

    <v-card
      class="d-flex align-end mb-6"
      color="grey lighten-2"
      flat
      height="100"
      tile
    >
      <v-card
        v-for="n in 3"
        :key="n"
        class="pa-2"
        outlined
        tile
      >
        align-end
      </v-card>
    </v-card>

    <v-card
      class="d-flex align-center mb-6"
      color="grey lighten-2"
      flat
      height="100"
      tile
    >
      <v-card
        v-for="n in 3"
        :key="n"
        class="pa-2"
        outlined
        tile
      >
        align-center
      </v-card>
    </v-card>

    <v-card
      class="d-flex align-baseline mb-6"
      color="grey lighten-2"
      flat
      height="100"
      tile
    >
      <v-card
        v-for="n in 3"
        :key="n"
        class="pa-2"
        outlined
        tile
      >
        align-baseline
      </v-card>
    </v-card>

    <v-card
      class="d-flex align-stretch mb-6"
      color="grey lighten-2"
      flat
      height="100"
      tile
    >
      <v-card
        v-for="n in 3"
        :key="n"
        class="pa-2"
        outlined
        tile
      >
        align-stretch
      </v-card>
    </v-card>
  </div>
</template>
