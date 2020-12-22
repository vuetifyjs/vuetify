<template>
  <div class="text-center">
    <v-sheet
      class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
      color="blue-grey darken-3"
      dark
    >
      <div class="grey--text text--lighten-1 text-body-2 mb-4">
        Are you sure you want to delete this album?
      </div>

      <v-btn
        :disabled="loading"
        class="ma-1"
        color="grey"
        plain
      >
        Cancel
      </v-btn>

      <v-btn
        :loading="loading"
        class="ma-1"
        color="error"
        plain
        @click="remove"
      >
        Delete
      </v-btn>
    </v-sheet>
  </div>
</template>

<script>
  export default {
    data: () => ({ loading: false }),

    methods: {
      async remove () {
        this.loading = true

        await new Promise(resolve => setTimeout(resolve, 3000))

        this.loading = false
      },
    },
  }
</script>
