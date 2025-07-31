<template>
  <v-card
    class="mx-auto"
    max-width="450"
    text="Update your weak or re-used passwords with Password Checkup. It's free and only takes a few minutes. Click the Take Checkup button to get started."
    title="Strengthen your passwords"
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

<script setup>
  import { ref } from 'vue'

  const loading = ref(false)
  function load () {
    loading.value = true
    setTimeout(() => (loading.value = false), 3000)
  }
</script>

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
