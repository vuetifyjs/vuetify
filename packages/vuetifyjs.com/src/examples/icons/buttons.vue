<template>
  <div class="text-xs-center">
    <div>
      <v-btn color="primary" dark>Accept
        <v-icon dark right>check_circle</v-icon>
      </v-btn>

      <v-btn color="red" dark>Decline
        <v-icon dark right>block</v-icon>
      </v-btn>

      <v-btn dark>
        <v-icon dark left>remove_circle</v-icon>Cancel
      </v-btn>
    </div>

    <div>
      <v-btn color="orange darken-2" dark>
        <v-icon dark left>arrow_back</v-icon>Back
      </v-btn>

      <v-btn color="purple" dark>
        <v-icon dark>build</v-icon>
      </v-btn>

      <v-btn color="indigo" dark>
        <v-icon dark>backup</v-icon>
      </v-btn>
    </div>

    <div>
      <v-btn flat icon color="blue lighten-2">
        <v-icon>thumb_up</v-icon>
      </v-btn>

      <v-btn flat icon color="red lighten-2">
        <v-icon>thumb_down</v-icon>
      </v-btn>
    </div>
  </div>
</template>
