<template>
  <v-card
    class="overflow-hidden mx-auto"
    height="200"
    max-width="500"
  >
    <v-bottom-navigation
      scroll-target="#hide-on-scroll-example"
      absolute
      hide-on-scroll
      horizontal
    >
      <v-btn
        color="deep-purple-accent-4"
        variant="text"
      >
        <span>Recents</span>

        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn
        color="deep-purple-accent-4"
        variant="text"
      >
        <span>Favorites</span>

        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn
        color="deep-purple-accent-4"
        variant="text"
      >
        <span>Nearby</span>

        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-responsive
      id="hide-on-scroll-example"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-responsive height="1500"></v-responsive>
    </v-responsive>
  </v-card>
</template>
