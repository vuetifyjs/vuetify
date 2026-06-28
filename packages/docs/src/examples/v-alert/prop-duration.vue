<template>
  <div>
    <v-btn
      v-if="!visible"
      @click="visible = true"
    >
      Show alert
    </v-btn>

    <v-alert
      v-else
      v-model="visible"
      closable
      :duration="3000"
      text="This alert will automatically dismiss after 3 seconds."
      type="info"
    ></v-alert>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const visible = ref(true)
</script>
