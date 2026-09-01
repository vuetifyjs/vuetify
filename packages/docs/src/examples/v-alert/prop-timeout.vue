<template>
  <div>
    <v-alert
      v-model="alert"
      :timeout="3000"
      title="Auto-dismiss Alert"
      type="success"
      variant="tonal"
      closable
    >
      This alert dismisses itself 3 seconds after it appears. The countdown pauses while you hover or focus it.
    </v-alert>

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
  import { ref } from 'vue'

  const alert = ref(true)
</script>

<script>
  export default {
    data: () => ({
      alert: true,
    }),
  }
</script>
