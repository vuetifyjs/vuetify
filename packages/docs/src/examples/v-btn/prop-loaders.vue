<template>
  <v-card
    class="mx-auto"
    max-width="450"
    title="Strengthen your passwords"
    text="Update your weak or re-used passwords with Password Checkup. It's free and only takes a few minutes. Click the Take Checkup button to get started."
  >

    <template v-slot:actions>
      <v-btn height="48">
        No Thanks
      </v-btn>

      <v-btn
        :loading="loading"
        class="flex-grow-1"
        height="48"
        variant="tonal"
        @click="load"
      >
        Take Checkup
      </v-btn>
    </template>
  </v-card>
</template>

<script>
  export default {
    data: () => ({ loading: false }),

    methods: {
      load () {
        this.loading = true
        setTimeout(() => (this.loading = false), 3000)
      },
    },
  }
</script>
