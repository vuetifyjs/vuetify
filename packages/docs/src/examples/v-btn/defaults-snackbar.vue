<template>
  <v-sheet
    class="position-relative"
    min-height="100"
  >
    <div class="position-absolute d-flex align-center justify-center w-100 h-100">
      <v-btn
        size="x-large"
        @click="snackbar = !snackbar"
      >
        Toggle Snackbar
      </v-btn>
    </div>

    <v-snackbar
      v-model="snackbar"
      location="center"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!

      <template v-slot:actions>
        <v-btn @click="onClick">Close</v-btn>
      </template>
    </v-snackbar>
  </v-sheet>
</template>

<script>
  export default {
    data: () => ({
      snackbar: false,
    }),

    methods: {
      onClick () {
        this.snackbar = false
      },
    },
  }
</script>
