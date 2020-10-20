<template>
  <v-card
    class="elevation-16 mx-auto"
    width="300"
  >
    <v-card-title class="headline">
      Rate Our Framework
    </v-card-title>
    <v-card-text>
      If you enjoy using Vuetify, please take a few seconds to rate your experience with the framework. It really helps!

      <div class="text-center mt-12">
        <v-rating
          v-model="rating"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          half-increments
          hover
          large
        ></v-rating>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-space-between">
      <v-btn text>
        No Thanks
      </v-btn>
      <v-btn
        color="primary"
        text
      >
        Rate Now
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      rating: 4.5,
    }),
  }
</script>
