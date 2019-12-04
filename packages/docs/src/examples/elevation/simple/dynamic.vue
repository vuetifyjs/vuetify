<template>
  <div class="text--primary">
    <!-- Using the elevation prop -->
    <v-hover>
      <template v-slot="{ hover }">
        <v-card
          :elevation="hover ? 24 : 6"
          class="mx-auto pa-6"
        >
          Prop based elevation
        </v-card>
      </template>
    </v-hover>

    <div class="my-6"></div>

    <!-- Using a dynamic class -->
    <v-hover>
      <template v-slot="{ hover }">
        <div
          :class="`elevation-${hover ? 24 : 6}`"
          class="mx-auto pa-6 transition-swing"
        >
          Class based elevation
        </div>
      </template>
    </v-hover>
  </div>
</template>
