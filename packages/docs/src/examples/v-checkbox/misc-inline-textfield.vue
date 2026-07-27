<template>
  <v-card>
    <v-card-text>
      <div class="d-flex pa-4">
        <v-checkbox-btn
          v-model="includeFiles"
          class="pe-2"
        ></v-checkbox-btn>
        <v-text-field
          label="Include files"
          hide-details
        ></v-text-field>
      </div>
      <div class="d-flex pa-4">
        <v-checkbox-btn
          v-model="enabled"
          class="pe-2"
        ></v-checkbox-btn>
        <v-text-field
          :disabled="!enabled"
          label="I only work if you check the box"
          hide-details
        ></v-text-field>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const includeFiles = ref(true)
  const enabled = ref(false)
</script>

<script>
  export default {
    data: () => ({
      includeFiles: true,
      enabled: false,
    }),
  }
</script>
