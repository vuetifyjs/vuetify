<template>
  <div class="text--primary">
    <!-- Using the elevation prop -->
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        v-bind="props"
        :elevation="isHovering ? 24 : 6"
        class="mx-auto pa-6"
      >
        Prop based elevation
      </v-card>
    </v-hover>

    <div class="my-6"></div>

    <!-- Using a dynamic class -->
    <v-hover v-slot="{ isHovering, props }">
      <div
        v-bind="props"
        :class="`elevation-${isHovering ? 24 : 6}`"
        class="mx-auto pa-6 transition-swing"
      >
        Class based elevation
      </div>
    </v-hover>
  </div>
</template>
