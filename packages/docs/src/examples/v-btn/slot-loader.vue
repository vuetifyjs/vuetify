<template>
  <div class="text-center">
    <v-btn
      :loading="loading"
      @click="loading = !loading"
    >
      Custom loader

      <template v-slot:loader>
        <v-progress-linear indeterminate></v-progress-linear>
      </template>
    </v-btn>
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading: false,
    }),

    watch: {
      loading (val) {
        if (!val) return

        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>
