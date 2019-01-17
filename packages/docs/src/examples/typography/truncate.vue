<template>
  <v-card
    class="mx-auto"
    max-width="300"
  >
    <v-img src="https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg">
      <v-layout
        align-end
        fill-height
        pa-3
        white--text
      >
        <div class="title font-weight-light">Explore our beaches</div>
      </v-layout>
    </v-img>
    <v-card-title>
      <div class="text-truncate">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="purple"
        dark
        depressed
      >
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      //
    })
  }
</script>
