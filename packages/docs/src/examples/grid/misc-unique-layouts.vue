<template>
  <v-container class="bg-surface-variant">
    <!-- Stack the columns on mobile by making one full-width and the other half-width -->
    <v-row>
      <v-col
        cols="12"
        md="8"
      >
        <v-card
          class="pa-2"
          rounded="0"
          variant="outlined"
        >
          v-col-12 v-col-md-8
        </v-card>
      </v-col>
      <v-col
        cols="6"
        md="4"
      >
        <v-card
          class="pa-2"
          rounded="0"
          variant="outlined"
        >
          v-col-6 v-col-md-4
        </v-card>
      </v-col>
    </v-row>

    <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
    <v-row>
      <v-col
        v-for="n in 3"
        :key="n"
        cols="6"
        md="4"
      >
        <v-card
          class="pa-2"
          rounded="0"
          variant="outlined"
        >
          v-col-6 v-col-md-4
        </v-card>
      </v-col>
    </v-row>

    <!-- Columns are always 50% wide, on mobile and desktop -->
    <v-row>
      <v-col
        v-for="n in 2"
        :key="n"
        cols="6"
      >
        <v-card
          class="pa-2"
          rounded="0"
          variant="outlined"
        >
          v-col-6
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
