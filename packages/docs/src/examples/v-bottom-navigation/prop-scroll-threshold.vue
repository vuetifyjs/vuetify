<template>
  <v-card
    class="mx-auto overflow-hidden"
    height="200"
    max-width="500"
  >
    <v-bottom-navigation
      color="white"
      scroll-target="#scroll-threshold-example"
      scroll-threshold="500"
      absolute
      hide-on-scroll
      horizontal
    >
      <v-btn>
        <span>Recents</span>

        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn>
        <span>Favorites</span>

        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn>
        <span>Nearby</span>

        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-sheet
      id="scroll-threshold-example"
      class="overflow-y-auto pb-16"
      max-height="600"
    >
      <v-responsive height="1500"></v-responsive>
    </v-sheet>
  </v-card>
</template>
