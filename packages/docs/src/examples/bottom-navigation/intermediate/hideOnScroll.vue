<template>
  <v-card
    class="hide-overflow mx-auto"
    height="200"
    max-width="500"
  >
    <v-bottom-navigation
      scroll-target="#scroll-area-1"
      hide-on-scroll
      absolute
      color="white"
      horizontal
    >
      <v-btn text color="teal">
        <span>Recents</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn text color="teal">
        <span>Favorites</span>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn text color="teal">
        <span>Nearby</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-sheet
      id="scroll-area-1"
      class="scroll-y"
      max-height="600"
    >
      <v-container style="height: 1500px;">

      </v-container>
    </v-sheet>
  </v-card>
</template>
