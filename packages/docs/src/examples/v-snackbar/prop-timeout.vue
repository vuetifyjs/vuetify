<template>
  <div class="text-center">
    <v-btn
      color="orange-darken-2"
      @click="snackbar = true"
    >
      Open Snackbar
    </v-btn>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}

      <template v-slot:actions>
        <v-btn
          color="blue"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const snackbar = ref(false)
  const text = ref('My timeout is set to 2000.')
  const timeout = ref(2000)
</script>

<script>
  export default {
    data: () => ({
      snackbar: false,
      text: 'My timeout is set to 2000.',
      timeout: 2000,
    }),
  }
</script>
