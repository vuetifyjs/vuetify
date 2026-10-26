<template>
  <div>
    <v-btn-toggle
      v-model="timer"
      class="mb-4"
      density="compact"
      variant="outlined"
      divided
      mandatory
    >
      <v-btn text="top" value="top"></v-btn>
      <v-btn text="bottom" value="bottom"></v-btn>
      <v-btn text="close" value="close"></v-btn>
    </v-btn-toggle>

    <v-alert
      v-model="alert"
      :timeout="5000"
      :timer="timer"
      text="This alert closes after 5 seconds. Hovering it starts the countdown over."
      title="Saved"
      type="success"
      variant="tonal"
      closable
    ></v-alert>

    <div
      v-if="!alert"
      class="text-center"
    >
      <v-btn @click="alert = true">
        Reset
      </v-btn>
    </div>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const alert = shallowRef(true)
  const timer = shallowRef('close')
</script>

<script>
  export default {
    data: () => ({
      alert: true,
      timer: 'close',
    }),
  }
</script>
